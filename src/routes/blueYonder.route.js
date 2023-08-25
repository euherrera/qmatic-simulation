const express = require('express');
const { blueYonderService } = require('../services');
const { BlueYonderController } = require('../controllers');

const blueYonderController = new BlueYonderController(blueYonderService);
const router = express.Router();
router.get('/stores/:id/shipments', blueYonderController.getBYInfo.bind(blueYonderController));
module.exports = router;

/**
 * @swagger
 * /store/{id}/shipments:
 *   get:
 *     summary: Returns an C&C order from Blue Yonder by id
 *     description: Get Order
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
