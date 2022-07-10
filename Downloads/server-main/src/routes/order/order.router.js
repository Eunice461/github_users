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
  httpGetIncome

} = require('./order.controller');

orderRouter.post('/', authenticateUser, httpAddOrder)
orderRouter.get('/', authenticateUser, authorizeRoles('admin'),  htppGetAllOrders)
orderRouter.get('/:id', authenticateUser, httpGetSingleOrder)
orderRouter.patch('/:id', authenticateUser, httpEditOrder);
orderRouter.get('/allnew/order', authenticateUser, authorizeRoles('admin'), htppGetAllNewOrders)
orderRouter.get('/get/income', authenticateUser, authorizeRoles('admin'), httpGetIncome)

module.exports = orderRouter;