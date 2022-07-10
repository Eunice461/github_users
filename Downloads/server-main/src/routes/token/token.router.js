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
    httpGetRandomToken,
    httpRemoveCommission,
    httpAdminGet,
    httpCreateAllCommission

} = require('./token.controller')

const tokenRouter = express.Router();

tokenRouter.post('/', authenticateUser, httpCreateNewToken)
tokenRouter.get('/', httpGetAllToken)
tokenRouter.get('/:id', httpGetToken)
tokenRouter.delete('/:id', authenticateUser, httpDeleteToken)
tokenRouter.post('/search/token', httpSearchToken);
tokenRouter.get('/get/trendingtoken', httpSearchTrendingToken)
tokenRouter.patch('/:id/like', authenticateUser, httpLikeToken)
tokenRouter.get('/get/alllike', authenticateUser, httpGetAllTokenLikes)
tokenRouter.patch('/:id/editwalletaddress', authenticateUser, httpEditWalletAddress)
tokenRouter.get('/user/token', authenticateUser, httpGetAllUserToken)
tokenRouter.patch('/add/commission/:id', authenticateUser, authorizeRoles('admin') , httpCreateCommisssion)
tokenRouter.patch('/remove/commission/:id', authenticateUser, authorizeRoles('admin'), httpRemoveCommission)
tokenRouter.get('/random/token', httpGetRandomToken)
tokenRouter.get('/getalltoken/admin', authenticateUser, authorizeRoles('admin'),  httpAdminGet)
tokenRouter.patch('/addall/commission', authenticateUser, authorizeRoles('admin'), httpCreateAllCommission)

module.exports = tokenRouter;