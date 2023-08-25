const express = require('express');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const config = require('../config/conf');
const app = express();


app.set('view engine', 'pug');
app.use('/static', express.static('public'))


require('./routes/startup/routes')(app);
require('./routes/startup/logging')(app);

dotenv.config();

async function createServer() {
  
  app.disable('x-powered-by');

  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  
  const server = app.listen(config.port, () => {
    logger.info(`Example app listening on port ${config.port}`);
  });

  server.timeout = config.serverTimeOutMilliseconds;
}

createServer();

module.exports = app;
