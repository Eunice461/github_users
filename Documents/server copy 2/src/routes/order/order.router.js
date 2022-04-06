const express = require('express');

const {
  authenticateUser,
} = require('../../middleware/full-auth');

const orderRouter = express.Router();

const {
  httpAddOrder,
  httpGetMyCurrentOrders,
  httpGetSingleOrder,
  httpUpdateToPaid,
  httpUpdateOrderToDelivered,
  htppGetAllOrders,
  httpUpdateOrderToCancelled

} = require('./order.controller');

orderRouter.post('/', authenticateUser, httpAddOrder)
orderRouter.get('/', authenticateUser, htppGetAllOrders)
orderRouter.get('/showAllMyOrders', authenticateUser,  httpGetMyCurrentOrders)
orderRouter.get('/:id', authenticateUser, httpGetSingleOrder)
orderRouter.patch('/:id/pay', authenticateUser, httpUpdateToPaid);
orderRouter.patch('/:id/deliver', authenticateUser, httpUpdateOrderToDelivered);
orderRouter.patch('/:id/cancelled', authenticateUser, httpUpdateOrderToCancelled);




module.exports = orderRouter;