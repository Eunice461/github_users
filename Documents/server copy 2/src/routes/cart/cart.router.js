const express = require('express');

const {
  authenticateUser,
  authorizeRoles,
} = require('../../middleware/full-auth');

const cartRouter = express.Router();

const {
    httpCreateCart,
    httpEditCart,
    httpDeleteCart,
    httpGetSingleCart,
    httpGetAllCart
} = require('./cart.controller')

cartRouter.post('/', authenticateUser, httpCreateCart);
cartRouter.patch('/:cartId', authenticateUser, httpEditCart)
cartRouter.delete('/:cartId', authenticateUser, httpDeleteCart)
cartRouter.get('/find/:userId', authenticateUser, httpGetSingleCart);
cartRouter.get('/', authenticateUser, httpGetAllCart)

module.exports = cartRouter
