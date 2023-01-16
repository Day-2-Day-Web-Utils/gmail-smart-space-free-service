const axios = require("axios");
const CONSTANTS = require('./constants');
const authService = require('./auth-service');
const restUtils = require('../utils/utils');



async function fetchMessageCountForAllLabels(email,token){
  try {
    let summaryResponse={};
    let request_url = await restUtils.uriBuilder(CONSTANTS.gmail_base_api_url,CONSTANTS.user_controller,email,CONSTANTS.labels_api);
    console.log('Request URL from builder = ', request_url);
    let config = await restUtils.generateRestConfig(request_url,token);
    let api_response = await axios(config);
    console.log('api_response labels = ',api_response.data);
    if(api_response && api_response.data &&  api_response.data.labels && api_response.data.labels.length > 0){
      for(let label=0;label<api_response.data.labels.length ;label++){
        request_url = await restUtils.uriBuilder(CONSTANTS.gmail_base_api_url,CONSTANTS.user_controller,email,CONSTANTS.labels_api,api_response.data.labels[label].id);
        let label_id = api_response.data.labels[label].id;
            console.log('Request URL from builder = ', request_url);
            config = await restUtils.generateRestConfig(request_url,token);
            api_response = await axios(config);
            console.log('ID & Resp',label_id,api_response.data.messagesTotal);
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
        let request_url = await restUtils.uriBuilder(CONSTANTS.gmail_base_api_url,CONSTANTS.user_controller,req.params.email,CONSTANTS.profile_api);
        let config = await restUtils.generateRestConfig(request_url,token);
        let api_response = await axios(config);
        summaryResponse['Total Messages'] = api_response.data.messagesTotal?api_response.data.messagesTotal: "";
        summaryResponse = await fetchMessageCountForAllLabels(req.params.email,token);
        console.log('Summary Response = ',summaryResponse);
        res.json(summaryResponse);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

module.exports = {
  getUserMailSummary,
};
