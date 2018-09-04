# -*- coding: utf-8 -*-
""" env - Bucket Name (pollyaudio)

# DBTAble name
# SNS Trigger - (ARN - NewPosts)
"""

import os
import logging
from contextlib import closing
import boto3
from boto3.dynamodb.conditions import Key, Attr

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.DEBUG)
logging.getLogger('boto3').setLevel(logging.WARN)
logging.getLogger('botocore').setLevel(logging.WARN)


def lambda_handler(event, context):
    """
    Main entry point
    """
    method = 'lambda_handler():'
    LOGGER.debug('%sbegin:%s', method, str(event))
    post_id = event['Records'][0]['Sns']['Message']

    LOGGER.debug('%sText to Speech function. Post ID in DynamoDB: %s', method, post_id)

    #Retrieving information about the post from DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['DB_TABLE_NAME'])
    post_item = table.query(
        KeyConditionExpression=Key('id').eq(post_id)
    )


    text = post_item['Items'][0]['text']
    voice = post_item['Items'][0]['voice']

    rest = text

    #Because single invocation of the polly synthesize_speech api can
    # transform text with about 1,500 characters, we are dividing the
    # post into blocks of approximately 1,000 characters.
    text_blocks = []
    while len(rest) > 1100:
        begin = 0
        end = rest.find(".", 1000)

        if end == -1:
            end = rest.find(" ", 1000)

        text_block = rest[begin:end]
        rest = rest[end:]
        text_blocks.append(text_block)
    text_blocks.append(rest)

    #For each block, invoke Polly API, which will transform text into audio
    polly = boto3.client('polly')
    for text_block in text_blocks:
        response = polly.synthesize_speech(
            OutputFormat='mp3',
            Text=text_block,
            VoiceId=voice
        )

        #Save the audio stream returned by Amazon Polly on Lambda's temp
        # directory. If there are multiple text blocks, the audio stream
        # will be combined into a single file.
        if 'AudioStream' in response:
            with closing(response['AudioStream']) as stream:
                output = os.path.join('/tmp/', post_id)
                with open(output, 'ab') as file:
                    file.write(stream.read())


    LOGGER.debug('%sconversion complete now uploading file to S3: postId:%s', method, post_id)
    s3_client = boto3.client('s3')
    s3_client.upload_file('/tmp/' + post_id, os.environ['BUCKET_NAME'], post_id + ".mp3")
    s3_client.put_object_acl(ACL='public-read',
                             Bucket=os.environ['BUCKET_NAME'],
                             Key=post_id + '.mp3')

    location = s3_client.get_bucket_location(Bucket=os.environ['BUCKET_NAME'])
    region = location['LocationConstraint']

    if region is None:
        url_begining = 'https://s3.amazonaws.com/'
    else:
        url_begining = 'https://s3-' + str(region) + '.amazonaws.com/' \

    url = url_begining \
            + str(os.environ['BUCKET_NAME']) \
            + "/" \
            + str(post_id) \
            + '.mp3'
    #Updating the item in DynamoDB
    LOGGER.debug('%supdateing record in dynamodb:url:%s', method, url)
    response = table.update_item(
        Key={'id':post_id},
        UpdateExpression='SET #statusAtt = :statusValue, #urlAtt = :urlValue',
        ExpressionAttributeValues={':statusValue': 'UPDATED', ':urlValue': url},
        ExpressionAttributeNames={'#statusAtt': 'status', '#urlAtt': 'url'},
    )

    return()
