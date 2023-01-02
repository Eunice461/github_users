const express = require('express')

const {
    authenticateUser, authorizeRoles,
  } = require('../../middleware/full-auth');

const { 
  httpCreateOriginalFromAdminToken,
    httpGetToken,
    httpGetAllToken,
    httpDeleteToken,
    httpLikeToken,
    httpEditWalletAddress,
    httpGetAllUserToken,
    httpAdminGet,

} = require('./originalToken.controller')

const tokenRouter = express.Router();

tokenRouter.post('/:id', authenticateUser, httpCreateOriginalFromAdminToken)
tokenRouter.get('/', authenticateUser, httpGetAllToken)
tokenRouter.get('/:id',authenticateUser, httpGetToken)
tokenRouter.delete('/:id', authenticateUser, httpDeleteToken)
tokenRouter.patch('/:id/like', authenticateUser, httpLikeToken)
tokenRouter.patch('/:id/editwalletaddress', authenticateUser, httpEditWalletAddress)
tokenRouter.get('/user/token', authenticateUser, httpGetAllUserToken)
tokenRouter.get('/getalltoken/admin', authenticateUser, authorizeRoles('admin'),  httpAdminGet)

module.exports = tokenRouter;