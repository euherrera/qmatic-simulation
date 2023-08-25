const errorMessage = require('../../middleware/error_messages.middleware');
const logger = require('../../utils/logger');
const config = require('../../../config/conf');

module.exports = function (app) {
    app.use((error, req, res, next) => {
        if (error) {
          const status = error.status || 500;
          const message = error.customMessage || errorMessage(status);
          const response = {
            status,
            message,
          };
          if (config.errorDetails) {
            response.details = error.details;
            response.systemMessage = error.message;
          }
    
          logger.error('Unexpected error', error);
          return res.render(
            'notification', 
            { 
              title: 'qmatic simulator!', 
              mainText: 'Hi! ',
              defaultText: 'please get in touch with one of our members of staff',
            }
            );
        }
    
        return next(error);
      });
}