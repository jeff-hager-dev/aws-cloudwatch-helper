const CloudWatchClient = require('./cloudwatchClient');

module.exports = getAllLogStreams;

/**
 * Gets AWS CloudWatch Log stream information
 *
 * @param params.logGroupName Name of the log group in AWS CloudWatch
 * @param params.client CloudWatch Client from  `new AWS.CloudWatchLogs();`
 * @param params.logTotalLimit The max number of CloudWatch streams returned. Default is 1000. This is to help with throttling issues
 * @returns {Promise<Array>}
 */
async function getAllLogStreams(params) {
  try {
    let results = [];
    const logTotalLimit = params.logTotalLimit || 1000;
    const client = params.client || CloudWatchClient.getClient();

    const clientParams = {
      logGroupName: params.logGroupName, /* required */
      descending: true,
      limit: 50,
      orderBy: "LastEventTime"
    };

    let {nextToken, logStreams} = await client.describeLogStreams(clientParams).promise();
    results = results.concat(logStreams);

    while (nextToken && results.length < logTotalLimit) {
      clientParams.nextToken = nextToken;
      const describeResults = await client.describeLogStreams(clientParams).promise();

      results = results.concat(describeResults.logStreams);
      nextToken = describeResults.nextToken;
    }

    return results;

  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return [];
  }
}

