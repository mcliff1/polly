import boto3
import os
import uuid
import logging
import json
from boto3.dynamodb.conditions import Key, Attr

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.DEBUG)
logging.getLogger('boto3').setLevel(logging.WARN)
logging.getLogger('botocore').setLevel(logging.WARN)

"""
expects to have  string object 'postId' passed in as data

returns JSON object from DB for data of id or all of database
"""
def handle_get(event):
    method = 'handle_get():'
    LOGGER.debug('%sbegin:%s', method, event)

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['DB_TABLE_NAME'])
    data = event['queryStringParameters']
    postId = data['postId']

    if postId=="*":
        items = table.scan()
    else:
        items = table.query(
            KeyConditionExpression=Key('id').eq(postId)
        )

    return {
        "body": json.dumps(items["Items"]),
        "statusCode" : 200,
        "headers": {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    }

    #return items["Items"]


"""
event should have parameters voice and text that
   represent the string objects to pass into polly
"""
def handle_post(event):
    method = 'handle_post():'
    LOGGER.debug('%sbegin', method)

    data = json.loads(event['body'])
    recordId = str(uuid.uuid4())
    voice = data["voice"]
    text = data["text"]
    LOGGER.debug('%sinsert:{id=%s, text=%s, voice=%s}', method, recordId, text, voice)

    #Creating new record in DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['DB_TABLE_NAME'])
    table.put_item(
        Item={
            'id' : recordId,
            'text' : text,
            'voice' : voice,
            'status' : 'PROCESSING'
        }
    )

    #Sending notification about new post to SNS
    client = boto3.client('sns')
    client.publish(
        TopicArn = os.environ['SNS_TOPIC'],
        Message = recordId
    )

    #return recordId
    return {
        "body": '{"recordId" : "' + recordId + '"}',
        "statusCode" : 200,
        "headers": {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    }




def apihandler(event, context):

    operation = event['httpMethod']
    operations = {
        'POST' : lambda data: handle_post(data),
        'GET' : lambda data: handle_get(data)
    }

    # see if we can delegate the call
    if (operation in operations):
        return operations[operation](event)

    logging.error("unknown method(%s) or resource(%s)", operation, resource)

    return {
        "body": {"message" : "unknown method(%s) or bot_type(%s)" % (operation, bot_type)},
        "statusCode" : 400,
        "headers": {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        },
    }
