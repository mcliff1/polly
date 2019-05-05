# Polly

Sample project to show case serverless technology and speech translations.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

there is also a REACT UI that gets deployed to S3 to present the tool

### May 4 - Build and Setup

To run in a AWS account, Travis CI can be used as follows:
- in the AWS account create the *polly-cfn-base.json* stack,  in Travis CI (linked to your Github where this is cloned too) (whatever region you create the base stack)
-  the Environment Variables *AWS_ACCESS_KEY_ID* and *AWS_SECRET_ACCESS_KEY* to a User that has the role created in the base stack.
- for the branch you want to build create the */travisci/polly/BRANCH* **SSM** parameter with the following properties in JSON format: CertARN, Domain, Hostname


```
{
  "StackName": "name_of_stack_for_the_branch",
  "CertARN": "arn_of_cert_in_us_east_1",
  "DomainName": "domain_name_in_r53_hosted_zones",
  "WebName": "polly-web",
  "ApiName": "polly-api"
}
```

* [Production](https://polly.mattcliff.net/)
* [Dev](https://polly-dev.mattcliff.net/)


TODO: permissions in the CodeBuildPolicy should line up with naming conventions for stack resources

## Architecture

contains a REACT static layer server through an **AWS CloudFront** and a python backed **Lambda** function served through **API Gateway**. A **S3**, and **DynamoDB** are used to store session information and outputs.

the *handler.py* code stores the request in dynamo with and generates unique request id.  The request is is posted to the SNS topic, which is set up as the trigger for the *convert_audio.py* function.

The *src/actions/index.js* file has the configuration for the API endpoint url.

#### 11/3/2018

split the List to a new page


## Setup/build

### Install Notes

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


### Build Notes

10/22/18 - added a webhook in the polly github connecting to develop pipeline in mcliff1 AWS account

**AWS CodePipeline**

The API folder was created with the *serverless* tool.
`serverless create --template aws-python3 --path api` (**NOTE** I had to run this on a EC2 instance set up for Node)


**TODO** need to figure out how to get the API property environment specific for REACT (with Angular we do this with environment.ts files) I may need ot put this in buildspec

In order to have the Code Pipeline get trigger automatically you need to add a WebHook to this added to this git, so when a code commit occurs it sends the event to **AWS CodePipeline**

- Source: has no input artifacts and GitHub as the source, output artifact called *MyApp*, it does have configuration on the *master* branch.
- Build: input artifact is *MyApp* with action to run **CodeBuild** with projectname *pollybase*.  This has an output of *MyAppBuild*


To run serverless command execute

```
sls --basestack <stackname> --stage <deploymentname> --region <AWS::Region> deploy
```

To run the REACT piece locally
`npm run start`


To pass environment variables into react from the shell they MUST start with *REACT_APP*.

## CORS

Had all sorts of trouble trying to get CI stream working with CORS in the target environments,  the issue was a combination, but 1 part of CloudFront settings (methods allowed on the default cache behavior); and the other, in the react code was missing part of the api string.

## TODO

- Review and reduce permission sets on CodeBuild role to required assets


### Build Notes

finally figured out why my polly form wasn't updating,  but it is still not getting the new audio (the meta data is there)
