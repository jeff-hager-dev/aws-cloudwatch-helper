
const AWS = require("aws-sdk");

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
  _cloudWatchClient = new AWS.CloudWatchLogs();
  return _cloudWatchClient;
}
