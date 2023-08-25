const express = require('express');
const healthRouter = require('./health.route');
const swaggerRouter = require('./docs.route');
const blueYonderRouter = require('./blueYonder.route');
const notificationsRouter = require('./notifications.route');

module.exports = () => {
  const router = express.Router();
  router.use('/docs', swaggerRouter);
  router.use('/store', blueYonderRouter);
  router.use('/store', notificationsRouter);
  router.use('/', healthRouter);

  return router;
};

