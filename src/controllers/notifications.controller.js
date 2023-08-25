const { logger } = require('../utils/logger');

class NotificationsController {
  constructor(notificationsService) {
    this.notificationsService = notificationsService;
  }

  async postBlueYonder(req, res) {
    logger.info('post to BY method was invoked');
    const id = Object.values(req.body['orderId']).join('');
    const storeName = Object.values(req.body['storeName']).join('');
    const shipId = Object.values(req.body['shipId']).join('');
    const customerCheckedIn = Object.values(req.body['customerCheckedIn']).join('');
    const status = Object.values(req.body['status']).join('');
   
    if (customerCheckedIn == 'true') {
      return res.render(
        'notification', 
        { 
          title: 'qmatic simulator!', 
          mainText: 'Hi! ',
          orderMessageAmber: `Your order ${id} has already been checked in`
        }
        );
    } else if (status == 'STAGED') {
      return res.render(
        'notification', 
        { 
          title: 'qmatic simulator!', 
          mainText: 'Hi! ',
          orderMessageAmber: `Your order ${id} is not ready for collection`
        }
        );
    } else {
    
        await this.notificationsService.postBlueYonder(id, shipId);
        
        console.log('req', req.body);
        return res.render(
          'notification', 
          { 
            title: 'qmatic simulator!', 
            mainText: 'Hi! ',
            orderMessage: `Your order ${id} is currently being packed at store ${storeName}`
          }
          );
    }
  }
}

module.exports = NotificationsController;

