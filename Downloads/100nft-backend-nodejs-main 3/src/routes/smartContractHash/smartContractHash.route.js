const express = require('express')

const {
    authenticateUser,
    authorizeRoles
  } = require('../../middleware/full-auth');
  

  const hashRouter = express.Router();

  const {
    httpSendHash,
    httpGetUserHash,
    httpGetSingleHash
} 
= require('./smartContractHash.controller')

  hashRouter.post('/' , authenticateUser, httpSendHash)
  hashRouter.get('/' , authenticateUser,  httpGetUserHash)
  hashRouter.get('/:id', authenticateUser, httpGetSingleHash)

  module.exports = hashRouter