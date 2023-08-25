const express = require('express');
const { notificationsService } = require('../services');
const { NotificationsController } = require('../controllers');
const validateDto = require('../middleware/validate-dto');
const notificationsSchema = require('../schema/notification.schema');

const notificationsController = new NotificationsController(notificationsService);
const router = express.Router();
router.post('/stores', validateDto(notificationsSchema), notificationsController.postBlueYonder.bind(notificationsController));
module.exports = router;


/**
 * @swagger
 * /store:
 *   post:
 *     summary: post an C&C checkein order from Blue Yonder 
 *     description: Post Order
 *     tags: [Store]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Store'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
