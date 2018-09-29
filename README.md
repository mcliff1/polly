# Polly

Sample project to show case serverless technology and speech translations.

Includes
*polly-cfn-base.json* which creates 2 S3 buckets, domain names and DynamoDB for meta data,  additionally an API and lambda function get created with a *serverless.yml* file.

The end result is controlled by two stacks in *AWS CloudFormation*.

there is also a REACT UI that gets deployed to S3 to present the tool


## Install Notes
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

**AWS CodePipeline**

The API folder was created with the *serverless* tool.
`serverless create --template aws-python3 --path api` (**NOTE** I had to run this on a EC2 instance set up for Node)

## Build Notes

WebHook to this added to this git, so when a code commit occurs it sends the event to **AWS CodePipeline**

It is encoded to call *arn:aws:codepipeline:us-west-2:220065781146:custom_git_hook_polly* (this is my testing AWS account), this has 2 stages

- Source: has no input artifacts and GitHub as the source, output artifact called *MyApp*, it does have configuration on the *master* branch.
- Build: input artifact is *MyApp* with action to run **CodeBuild** with projectname *pollybase*.  This has an output of *MyAppBuild*


## TODO

- Review and reduce permission sets on CodeBuild role to required assets
