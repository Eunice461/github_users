const express = require('express')

const {
    authenticateUser, authorizeRoles,
  } = require('../../middleware/full-auth');

const { 
    httpCreateNewToken,
    httpGetToken,
    httpGetAllToken,
    httpDeleteToken,
    httpLikeToken,
    httpAdminGet,
    httpGetAllTokenLikes

} = require('./adminToken.controller')

const adminTokenRouter = express.Router();

adminTokenRouter.post('/', authenticateUser, authorizeRoles('admin'), httpCreateNewToken)
adminTokenRouter.get('/', httpGetAllToken)
adminTokenRouter.get('/:id', httpGetToken)
adminTokenRouter.delete('/:id', authenticateUser, httpDeleteToken)
adminTokenRouter.patch('/:id/like', authenticateUser, httpLikeToken)
adminTokenRouter.get('/get/alllike', authenticateUser, httpGetAllTokenLikes)
adminTokenRouter.get('/getalltoken/admin', authenticateUser, authorizeRoles('admin'),  httpAdminGet)

module.exports = adminTokenRouter;