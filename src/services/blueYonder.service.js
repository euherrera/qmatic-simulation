const axios = require('axios');
const configBy = require('../../config/conf');
const { DefaultError } = require('../errors');
const getBYToken = require('./token/token.by');
const logger = require('../utils/logger');

class BlueYonderService {
  constructor() {
    if (configBy.blueYonderApi) {
      this.BYClient = configBy.blueYonderApi;
      console.log('it exists')
    } else {
      throw new DefaultError('Missing blue yonder API details in the configuration');
    }
  }


  async getBYInfo(id, query) {
    const tokenBY = await getBYToken(this.BYClient);
    console.log('token', await getBYToken(this.BYClient));
      const shipId = axios.get(`${this.BYClient.base_url}/${id}/shipments?query=${query}`, {
        headers: {
          Authorization: `Bearer ${tokenBY}`,
        },
      })
      .then((response) => {
        logger.info('Get BY success');
        //console.log(response);
        return response.data;
      })
      .catch((error) => {
        logger.error('Get BY service error');
        return error.toString();
      });
     
      return shipId;
  }

}

const blueYonderService = new BlueYonderService();
module.exports = blueYonderService;
