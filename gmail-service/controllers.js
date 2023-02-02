const axios = require("axios");
const CONSTANTS = require('./constants');
const authService = require('./auth-service');
const restUtils = require('../utils/utils');



async function fetchMessageCountForAllLabels(email,token,labels_api_response){
  try {
    let summaryResponse={};
    if(labels_api_response && labels_api_response.data &&  labels_api_response.data.labels && labels_api_response.data.labels.length > 0){
      for(let inx=0;inx<labels_api_response.data.labels.length ;inx++){
        let label_id = labels_api_response.data.labels[inx].id;
        let request_url = await restUtils.uriBuilder(CONSTANTS.gmail_base_api_url,CONSTANTS.user_controller,email,CONSTANTS.labels_api,label_id);
        let config = await restUtils.generateRestConfig(request_url,token);
        let api_response = await axios(config);
        summaryResponse[label_id] = api_response.data.messagesTotal?api_response.data.messagesTotal: '';
      }
      return summaryResponse;
    }
    return [];
  } catch(error){
    console.log(error);
    throw error;
  }
}

async function getUserMailSummary(req, res) {
    try {
        let summaryResponse = {};
        const token = await authService.authenticateUser();
        let profile_request_url = await restUtils.uriBuilder(CONSTANTS.gmail_base_api_url,CONSTANTS.user_controller,req.params.email,CONSTANTS.profile_api);
        let profile_api_config = await restUtils.generateRestConfig(profile_request_url,token);
        let profile_api_response = await axios(profile_api_config);
        let labels_request_url = await restUtils.uriBuilder(CONSTANTS.gmail_base_api_url,CONSTANTS.user_controller,req.params.email,CONSTANTS.labels_api);
        let labels_api_config = await restUtils.generateRestConfig(labels_request_url,token);
        let labels_api_response = await axios(labels_api_config);
        summaryResponse = await fetchMessageCountForAllLabels(req.params.email,token,labels_api_response);
        summaryResponse['TOTAL_MESSAGES'] = profile_api_response.data.messagesTotal?profile_api_response.data.messagesTotal: "";
        res.json(summaryResponse);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

module.exports = {
  getUserMailSummary,
};
