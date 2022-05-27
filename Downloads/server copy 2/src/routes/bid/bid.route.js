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

bidRouter.get("/:id", authenticateUser,  httpGrabBid);
bidRouter.post("/create/:id", authenticateUser, httpCreateBid);
bidRouter.get('/single/:id/', authenticateUser, httpGetSingleBid)
bidRouter.post('/sendmail/:id',authenticateUser, sendMessage)
bidRouter.patch('/:id/buy', authenticateUser, httpBuy)
bidRouter.patch('/:id', authenticateUser, httpUpdateBid)

module.exports =  bidRouter;