# Polly

Sample project to show case serverless technology and speech translations.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

there is also a REACT UI that gets deployed to S3 to present the tool


## Install Notes

Step One - install the
*polly-cfn-base.json* template
which creates 2 S3 buckets, domain names and DynamoDB for meta data,  additionally an API and lambda function get created with a *serverless.yml* file.

creates

- S3 bucket for audio
- s3 bucket for build
- S3 bucket for static web content
- CDN
- Code build project and role (build API layer)
- DynamoDB table
- SNS topics (general and newposts)
- DNS (Route53) entry for Web




The end result is controlled by two stacks in *AWS CloudFormation*.


10/22/18 - added a webhook in the polly github connecting to develop pipeline in mcliff1 AWS account

**AWS CodePipeline**

The API folder was created with the *serverless* tool.
`serverless create --template aws-python3 --path api` (**NOTE** I had to run this on a EC2 instance set up for Node)

## Build Notes

In order to have the Code Pipeline get trigger automatically you need to add a WebHook to this added to this git, so when a code commit occurs it sends the event to **AWS CodePipeline**

- Source: has no input artifacts and GitHub as the source, output artifact called *MyApp*, it does have configuration on the *master* branch.
- Build: input artifact is *MyApp* with action to run **CodeBuild** with projectname *pollybase*.  This has an output of *MyAppBuild*


To run serverless command execute

```
sls --basestack <stackname> --stage <deploymentname> --region <AWS::Region> deploy
```

## TODO

- Review and reduce permission sets on CodeBuild role to required assets
