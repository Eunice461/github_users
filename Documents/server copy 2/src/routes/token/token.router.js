const express = require('express')

const {
    authenticateUser,
  } = require('../../middleware/full-auth');

const { 
    httpCreateNewToken,
    httpGetToken,
    httpGetAllToken,
    httpDeleteToken,
    httpSearchPost,
    httpNumberOfSales,
    getPagana

} = require('./token.controller')

const tokenRouter = express.Router();

tokenRouter.post('/', authenticateUser, httpCreateNewToken)
tokenRouter.get('/', authenticateUser, httpGetAllToken)
tokenRouter.get('/:id', authenticateUser, httpGetToken)
tokenRouter.delete('/:id', authenticateUser, httpDeleteToken)
tokenRouter.get('/search/token', authenticateUser, httpSearchPost);

module.exports = tokenRouter;