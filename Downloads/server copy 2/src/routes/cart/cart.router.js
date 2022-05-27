const express = require('express');

const {
  authenticateUser,
  authorizeRoles,
} = require('../../middleware/full-auth');

const cartRouter = express.Router();

const {
    httpCreateCart,
	  httpRemoveSpecificCartItem,
	  httpClearCart,
	  httpGetLoggedUserCart,
	  httpUpdateCartItemQuantity
} = require('./cart.controller')

cartRouter.post('/', authenticateUser,  httpCreateCart);
cartRouter.get('/', authenticateUser, httpGetLoggedUserCart)
cartRouter.delete('/', authenticateUser, httpClearCart)
cartRouter.patch('/:itemId', authenticateUser, httpUpdateCartItemQuantity)
cartRouter.delete('/:itemId', authenticateUser, httpRemoveSpecificCartItem)

module.exports = cartRouter;
