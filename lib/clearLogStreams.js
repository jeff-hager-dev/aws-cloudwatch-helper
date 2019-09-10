const CloudWatchClient = require('./cloudwatchClient');

module.exports = clearLogStreams;

async function clearLogStreams(params){
  const client = CloudWatchClient.getClient();
}