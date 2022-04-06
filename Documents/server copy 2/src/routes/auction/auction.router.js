const express = require('express')

const {
    authenticateUser,
  } = require('../../middleware/full-auth');

const { 
    httpCreateNewAuction,
    httpSingleGetAuction,
    httpGetAllAuction,
    httpDeleteAuction,
    httpUpdateAuction
} = require('./auction.controller')

const auctionRouter = express.Router();

auctionRouter.get('/', authenticateUser, httpGetAllAuction)
auctionRouter.post('/', authenticateUser, httpCreateNewAuction)
auctionRouter.patch('/:auctionId/buy', authenticateUser, httpUpdateAuction)
auctionRouter.get('/:id', authenticateUser, httpSingleGetAuction)
auctionRouter.delete('/:id', authenticateUser, httpDeleteAuction)

module.exports = auctionRouter;