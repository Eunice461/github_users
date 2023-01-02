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
  htppGetAllOngoingOrders,
  httpGetIncome,
  httpGetAllUserOrder,
  httpSendMessage,
  httpGetWeeklyIncome,
  httpGetNewlyOrderPerWeek
  
} = require('./order.controller');

orderRouter.post('/', authenticateUser, httpAddOrder)
orderRouter.post('/get', authenticateUser, authorizeRoles('admin'),  htppGetAllOrders)
orderRouter.get('/get/user', authenticateUser, httpGetAllUserOrder)
orderRouter.get('/:id', authenticateUser, httpGetSingleOrder)
orderRouter.patch('/:id', authenticateUser, httpEditOrder);
orderRouter.get('/allnew/order', authenticateUser, authorizeRoles('admin'), htppGetAllNewOrders)
orderRouter.get('/allongoing/order', authenticateUser, authorizeRoles('admin'), htppGetAllOngoingOrders)
orderRouter.get('/get/income', authenticateUser, authorizeRoles('admin'), httpGetIncome)
orderRouter.post('/send/message', authenticateUser, httpSendMessage)
orderRouter.get('/get/order/weekly/income', authenticateUser, authorizeRoles('admin'), httpGetWeeklyIncome)
orderRouter.get('/get/order/weekly/list', authenticateUser, authorizeRoles('admin'), httpGetNewlyOrderPerWeek)

module.exports = orderRouter;