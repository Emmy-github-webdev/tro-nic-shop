import express from 'express'
const router = express.Router()
import {protecct, admin} from '../middleware/authMiddleware.js'

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered
} from '../controllers/orderController.js'



router.route('/').post(protecct, addOrderItems);
router.get('/', protecct, admin, getOrders);
router.route('/myorders').get(protecct, getMyOrders);
router.get('/:id', protecct, getOrderById);
router.put('/:id/pay', protecct, updateOrderToPaid);
router.put('/:id/deliver', protecct, admin, updateOrderToDelivered);



export default router;