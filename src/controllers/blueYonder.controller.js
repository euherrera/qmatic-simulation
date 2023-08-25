const { logger } = require('../utils/logger');

class BlueYonderController {
  constructor(blueYonderService) {
    this.blueYonderService = blueYonderService;
    
  }

  async getBYInfo(req, res) {
    logger.info('getByinfo method was invoked');
    const query = req.query.query;
    const { id } = req.params;
    console.log('query', query);
    const info = await this.blueYonderService.getBYInfo(id, query);
    console.log(info);
    const shipId = info.content[0].shipmentId;
    const customerCheckedIn = info.content[0].customerCheckedIn.toString();
    const status = info.content[0].status;
    return res.render(
        'layout', 
        { 
          title: 'qmatic simulator!', 
          mainText: 'Hi! ',
          orderMessage: `Your order num is ${query} and your store is ${id}`,
          query: `${query}`,
          store: id,
          subText: `Your store is `,
          shipId: shipId,
          customerCheckedIn: customerCheckedIn,
          status: status
        }
        );

  }
}

module.exports = BlueYonderController;
