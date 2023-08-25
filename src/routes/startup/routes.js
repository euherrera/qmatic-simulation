const express = require('express');
const config = require('../../../config/conf');
const mainRoute = require('../index');
const swaggerRouter = require('../docs.route');
const blueYonderRouter = require('../blueYonder.route');
const notificationsRouter = require('../notifications.route');
const cors = require('../../middleware/cors.middleware');
const securityHeaders = require('../../middleware/security-headers.middleware');
const auth = require('../../middleware/auth/auth.middleware');
const { NotFoundError } = require('../../errors');
const logger = require('../../utils/logger');

module.exports = function (app) {
    app.use(express.json({ limit: '10mb', extended: true }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));
    app.use(cors);
    app.use(securityHeaders);

    app.use('/docs', swaggerRouter);
    /***Store ***/
    app.get('/stores/:id/shipments', blueYonderRouter);
    app.post('/stores', notificationsRouter);
    /****** Excluded url must be here. Don't change this hardcode! */
    const excludedUrls = ['/health', '/version'];
    if (config.authOptions.auth) {
        app.use(auth.skipExcludedUrls(auth.authorize, excludedUrls));
    }
    /****** */
    app.use('/', mainRoute());
    app.use((req, res, next) => {
        const message = 'API path not found';
        logger.error(message);
        return next(new NotFoundError(message));
    });
}
