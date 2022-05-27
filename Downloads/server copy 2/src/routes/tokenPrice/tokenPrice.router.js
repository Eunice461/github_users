const express = require('express')

const tokenPriceRouter = express.Router()

const {
    httpAddTokenPrice,
    httpEditTokenPrice,
    httpGetTokenPrice,
    httpDeleteTokenPrice
} = require('./tokenPrice.controller')

const {
    authenticateUser,
    authorizeRoles
  } = require('../../middleware/full-auth');

  tokenPriceRouter.post('/token',authenticateUser, authorizeRoles('admin'), httpAddTokenPrice)
  tokenPriceRouter.get('/token', authenticateUser, httpGetTokenPrice)
  tokenPriceRouter.patch('/token/:id', authenticateUser, authorizeRoles('admin'), httpEditTokenPrice)
  tokenPriceRouter.delete('/token/:id', authenticateUser, authorizeRoles('admin'), httpDeleteTokenPrice)



module.exports = tokenPriceRouter