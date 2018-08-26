# Polly

Sample project to show case serverless technology and speech translations.

Includes
*polly-cfn-base.json* which creates 2 S3 buckets, domain names and DynamoDB for meta data,  additionally an API and lambda function get created with a *serverless.yml* file.

The end result is controlled by two stacks in *AWS CloudFormation*.

there is also a REACT UI that gets deployed to S3 to present the tool


## Install Notes
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


The API folder was created with the *serverless* tool.
`serverless craete --template aws-python3 --path api` (**NOTE** I had to run this on a EC2 instance set up for Node)

## Build Notes

we have a hook in github from the Code Pipeline in us-west-2

WebHook in Git is
`https://us-west-2.webhooks.aws/trigger?t=eyJlbmNyeXB0ZWREYXRhIjoiWklwZFM5TnJiaEFWM2NWR3VrenlCMGVIMHBoaE13Q0hISTBFVjlsOUt6QWZKUlNPZkJFbkJsM3o2d1VnOGlaaVlubUFoNGV5Y2ZaR2tDUjdYMnJ0UWRIRE5WTjNLTG5rcGJNNjFSalRVK2xka2dLdlRQZndWYmtEL2l1ZjQ5bi96cGZjWG9RRzRCa1MreWZFUDNwUUpRUjZBMWpHc21YVDJ1UU9kMllnU1lCTlRnPT0iLCJpdlBhcmFtZXRlclNwZWMiOiJ4azdOaXljaHh4WkxtalV3IiwibWF0ZXJpYWxTZXRTZXJpYWwiOjF9&v=1`

This hook was created in **AWS CodePipeline**

## TODO

- Review and reduce permission sets on CodeBuild role to required assets
