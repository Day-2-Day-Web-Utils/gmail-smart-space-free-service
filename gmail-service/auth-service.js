const config = require('config');
const { google } = require("googleapis");


exports.authenticateUser = async function () {
  const oAuth2Client = new google.auth.OAuth2(
    config.get('gmail.client_id'),
    config.get('gmail.client_secret'),
    config.get('gmail.redirect_uri'),
  );

oAuth2Client.setCredentials({ refresh_token:  config.get('gmail.refresh_token') });
    const access_token = await oAuth2Client.getAccessToken();
    return access_token.token?access_token.token:'';
}
