const express = require('express')
const bidRouter = express.Router();

const {
    httpGrabBid, 
    httpCreateBid ,
    httpGetSingleBid,
    httpUpdateBid,
    sendMessage,
    httpBuy,
} =  require('../bid/bid.controller')
const {authenticateUser} = require('../../middleware/full-auth')

bidRouter.get("/:auctionId", authenticateUser,  httpGrabBid);
bidRouter.post("/create/:auctionId", authenticateUser, httpCreateBid);
bidRouter.get('/single/:bidId', authenticateUser, httpGetSingleBid)
bidRouter.post('/sendmail/:bidId',authenticateUser, sendMessage)
bidRouter.patch('/:bidId/buy', authenticateUser, httpBuy)
bidRouter.patch('/:bidId', authenticateUser, httpUpdateBid)


module.exports =  bidRouter