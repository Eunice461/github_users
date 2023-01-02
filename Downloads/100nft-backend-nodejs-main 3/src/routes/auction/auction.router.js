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
    httpCreateAuctionFromOriginalToken,
} = require('./auction.controller')

const auctionRouter = express.Router();

auctionRouter.get('/', authenticateUser, httpGetAllAuction)
auctionRouter.post('/', authenticateUser, httpCreateNewAuction)
auctionRouter.post('/original', authenticateUser, httpCreateAuctionFromOriginalToken)
auctionRouter.get('/:id', authenticateUser, httpSingleGetAuction)
auctionRouter.delete('/:id', authenticateUser, httpDeleteAuction)
auctionRouter.get('/user/auction', authenticateUser, httpGetAllUserAuction)
auctionRouter.get('/get/expirationDate', authenticateUser, httpGetAllExpirationDate)

module.exports = auctionRouter;