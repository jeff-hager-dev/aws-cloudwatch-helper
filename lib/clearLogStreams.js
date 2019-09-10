const CloudWatchClient = require('./cloudwatchClient');
const getAllLogStreams = require('./getAllLogStreams');

module.exports = clearLogStreams;

/**
 * Clears Cloudwatch logs 1000 at a time.
 *
 * @param params.logGroupName Name of the log group in AWS CloudWatch
 * @param params.client CloudWatch Client from  `new AWS.CloudWatchLogs();`
 * @returns {Promise<({} & {$response: Response<{}, AWSError>})[]>}
 */
async function clearLogStreams(params) {
  try {
    const client = params.client || CloudWatchClient.getClient();
    const logStreams = await getAllLogStreams({
      client,
      logGroupName: params.logGroupName
    });

    console.log(`##> RETRIEVED ${logStreams.length} stream(s)`);

    const deletePromises = logStreams.map(async stream => {
      try {
        console.log(`##> Attempting to delete ${params.logGroupName}/${stream.logStreamName}`);

        await client.deleteLogStream({
          logGroupName: params.logGroupName,
          logStreamName: stream.logStreamName
        }).promise();

        return {
          message: `DELETED ${params.logGroupName}/${stream.logStreamName}`
        };
      } catch (error) {
        return {message: "MESSAGED: FAILED TO DELETE: ", error}
      }
    });
    return await Promise.all(deletePromises);

  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return [];
  }
}
