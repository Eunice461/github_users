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
	  httpUpdateCartItemQuantity,
	  httpEditCart,
	  httpSingleUserCart
} = require('./cart.controller')

cartRouter.post('/', authenticateUser,  httpCreateCart);
cartRouter.get('/', authenticateUser, httpGetLoggedUserCart)
cartRouter.delete('/', authenticateUser, httpClearCart)
cartRouter.patch('remove/:itemId', authenticateUser, httpUpdateCartItemQuantity)
cartRouter.delete('/:itemId', authenticateUser, httpRemoveSpecificCartItem)
cartRouter.patch('/:itemId', authenticateUser, httpEditCart)
cartRouter.get('/:itemId/single', authenticateUser, httpSingleUserCart)

module.exports = cartRouter;
