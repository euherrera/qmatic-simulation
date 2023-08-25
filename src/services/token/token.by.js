const axios = require('axios');
const https = require('https');
const logger = require('../../utils/logger');
const qs = require('qs');

async function getBYToken(BYClient) {
    const params = {
      client_id: BYClient.client_id,
      client_secret: BYClient.client_secret,
      scope: BYClient.scope,
      grant_type: BYClient.grant_type,
    };

    const data = await axios
      .post(`https://login.microsoftonline.com/blueyondereu.onmicrosoft.com/oauth2/v2.0/token`, qs.stringify(params), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      })
      .then((response) => {
        logger.info('Get BY token success');
        return response.data;
      })
      .catch((error) => {
        logger.error('Get BY token error');
        return error.toString();
      });

    return data.access_token;
  }

  module.exports = getBYToken;
