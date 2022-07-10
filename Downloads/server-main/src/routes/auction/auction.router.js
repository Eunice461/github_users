const express = require('express')

const {
    authenticateUser,
  } = require('../../middleware/full-auth');

const { 
    httpCreateNewAuction,
    httpSingleGetAuction,
    httpGetAllAuction,
    httpDeleteAuction,
    httpGetAllUserAuction,
    httpGetAllExpirationDate,
    httpDeleteAllAuction
} = require('./auction.controller')

const auctionRouter = express.Router();

auctionRouter.get('/', authenticateUser, httpGetAllAuction)
auctionRouter.post('/', authenticateUser, httpCreateNewAuction)
auctionRouter.get('/:id', authenticateUser, httpSingleGetAuction)
auctionRouter.delete('/:id', authenticateUser, httpDeleteAuction)
auctionRouter.get('/user/auction', authenticateUser, httpGetAllUserAuction)
auctionRouter.get('/get/expirationDate', authenticateUser, httpGetAllExpirationDate)
auctionRouter.delete('/delete/all', authenticateUser, httpDeleteAllAuction)

module.exports = auctionRouter;