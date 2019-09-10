
module.exports = {
  Initialize,
  getClient
};

let _cloudWatchClient = null;

function Initialize(){

}

function getClient(){
  if(!_cloudWatchClient){
    Initialize();
  }
  const AWS = require("aws-sdk");
  _cloudWatchClient = new AWS.CloudWatchLogs();
  return _cloudWatchClient;
}
