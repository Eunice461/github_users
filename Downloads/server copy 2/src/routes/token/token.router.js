const express = require('express')

const {
    authenticateUser, authorizeRoles,
  } = require('../../middleware/full-auth');

const { 
    httpCreateNewToken,
    httpGetToken,
    httpGetAllToken,
    httpDeleteToken,
    httpSearchToken,
    httpLikeToken,
    httpGetAllTokenLikes,
    httpEditWalletAddress,
    httpSearchTrendingToken,
    httpGetAllUserToken,
    httpCreateCommisssion,
    httpGetRandomToken

} = require('./token.controller')

const tokenRouter = express.Router();

tokenRouter.post('/', authenticateUser, httpCreateNewToken)
tokenRouter.get('/', httpGetAllToken)
tokenRouter.get('/:id', httpGetToken)
tokenRouter.delete('/:id', authenticateUser, httpDeleteToken)
tokenRouter.post('/search/token', httpSearchToken);
tokenRouter.get('/get/trendingtoken', httpSearchTrendingToken)
tokenRouter.patch('/:id/like', authenticateUser, httpLikeToken)
tokenRouter.post('/getAlllike', authenticateUser, httpGetAllTokenLikes)
tokenRouter.patch('/:id/editwalletaddress', authenticateUser, httpEditWalletAddress)
tokenRouter.get('/user/token', authenticateUser, httpGetAllUserToken)
tokenRouter.post('/add/commission', authorizeRoles('admin') , httpCreateCommisssion)
tokenRouter.get('/random/token', authenticateUser, httpGetRandomToken)

module.exports = tokenRouter;