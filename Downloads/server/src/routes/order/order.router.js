const express = require('express');

const {
  authenticateUser, authorizeRoles,
} = require('../../middleware/full-auth');

const orderRouter = express.Router();

const {
  httpAddOrder,
  httpGetSingleOrder,
  httpEditOrder,
  htppGetAllOrders,
  htppGetAllNewOrders,
  httpGetIncome,
  httpGetAllUserOrder,
  httpSendMessage

} = require('./order.controller');

orderRouter.post('/', authenticateUser, httpAddOrder)
orderRouter.post('/get', authenticateUser, authorizeRoles('admin'),  htppGetAllOrders)
orderRouter.get('/get/user', authenticateUser, httpGetAllUserOrder)
orderRouter.get('/:id', authenticateUser, httpGetSingleOrder)
orderRouter.patch('/:id', authenticateUser, httpEditOrder);
orderRouter.get('/allnew/order', authenticateUser, authorizeRoles('admin'), htppGetAllNewOrders)
orderRouter.get('/get/income', authenticateUser, authorizeRoles('admin'), httpGetIncome)
orderRouter.post('/send/message', authenticateUser, httpSendMessage)

module.exports = orderRouter;