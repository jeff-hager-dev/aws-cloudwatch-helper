# AWS Cloudwatch Helpers

Collection of methods to help interactions with AWS Cloudwatch Logs 

## Set up Instructions

1. `yarn install`
1. `yarn add aws-sdk --peer` : AWS-SDK is a peer dependency so it is on the dev to add it. Shouldn't be neccessary if it is install globally on the system.
1. Set up env vars. See section below

## Environment Variables

- `NODE_ENV`: Your Node environment
- `AWS_PROFILE`: AWS profile with full access to cloudwatch logs
- `AWS_REGION`: The aws region your log group lives in.

## Usage Example

```javascript
(async function () {

  process.env.NODE_ENV = "<node-env";
  process.env.AWS_PROFILE = "<profile-with-full-cloudwatch-rights>";
  process.env.AWS_REGION = "<region-you-will-be-working-in";

  const awsCloudWatchHelper = require('./index');

  const results = await awsCloudWatchHelper.clearLogStreams({
    logGroupName: "<log-group-name>"
  });

  console.log("FINISHED: ", JSON.stringify(results, null, 2));
})();
```
