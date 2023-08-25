const axios = require('axios');
const configBy = require('../../config/conf');
const { DefaultError } = require('../errors');
const logger = require('../utils/logger');
const getBYToken = require('./token/token.by');

class NotificationsService {
  constructor() {
    if (configBy.blueYonderApi) {
        this.BYClient = configBy.blueYonderApi;
        console.log('it exists')
      } else {
        throw new DefaultError('Missing blue yonder API details in the configuration');
      }
  }

  async postBlueYonder(id, shipId) {
    logger.info('post BY invoked');
    const tokenBY = await getBYToken(this.BYClient);
    // Prepare request
    //const { eventType, orderNumber, orderStatus, customerId, name } = req.body;
    const checkin = await axios
      .post(`${this.BYClient.base_url}/${id}/shipments/${shipId}/actions/customer-checkin`, {}, {
        headers: {
          Authorization: `Bearer ${tokenBY}`,
        },
      })
      .then((response) => {
        logger.info('Post BY service success');
        return response.data;
      })
      .catch((error) => {
        logger.error('Post BY service error');
        return error.toString();
      });
    return checkin;
    }

}

const notificationsService = new NotificationsService();
module.exports = notificationsService;
