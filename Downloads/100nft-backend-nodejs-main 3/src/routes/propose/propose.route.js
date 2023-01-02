const express = require('express')

const {
    authenticateUser,
    authorizeRoles
  } = require('../../middleware/full-auth');
  
  const proposeRouter = express.Router();
  
  const { 
    httpCreateProposeForReplica,
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
    httpGetRandomPropose,
    httpRemoveCommission,
    httpAdminGet,
    httpCreateAllCommission,
    httpRemoveAllCommission} = require('./propose.controller')

    proposeRouter.post('/:id/original', authenticateUser, httpCreateProposeForReplica);
    proposeRouter.get('/', httpGetAllToken)
    proposeRouter.get('/:id', httpGetToken)
    proposeRouter.delete('/:id', authenticateUser, authorizeRoles('admin'), httpDeleteToken)
    proposeRouter.post('/search/token', httpSearchToken);
    proposeRouter.get('/get/trendingtoken', httpSearchTrendingToken)
    proposeRouter.patch('/:id/like', authenticateUser, httpLikeToken)
    proposeRouter.get('/get/alllike', authenticateUser, httpGetAllTokenLikes)
    proposeRouter.patch('/:id/editwalletaddress', authenticateUser, httpEditWalletAddress)
    proposeRouter.get('/user/token', authenticateUser, httpGetAllUserToken)
    proposeRouter.patch('/add/commission/:id', authenticateUser, authorizeRoles('admin') , httpCreateCommisssion)
    proposeRouter.patch('/remove/commission/:id', authenticateUser, authorizeRoles('admin'), httpRemoveCommission)
    proposeRouter.get('/random/token', httpGetRandomPropose)
    proposeRouter.get('/getalltoken/admin', authenticateUser, authorizeRoles('admin'),  httpAdminGet)
    proposeRouter.patch('/addall/commission', authenticateUser, authorizeRoles('admin'), httpCreateAllCommission)
    proposeRouter.patch('/removeall/commission', authenticateUser, authorizeRoles('admin'), httpRemoveAllCommission)
   
  module.exports = proposeRouter;