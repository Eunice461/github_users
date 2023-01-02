const express = require('express')

const {
    authenticateUser,
    authorizeRoles
  } = require('../../middleware/full-auth');
  

  const proposedhashRouter = express.Router();

  const {
    httpSendHash,
    httpGetUserHash,
    httpGetSingleHash
} 
= require('./proposedHash.controller')

 proposedhashRouter.post('/' , authenticateUser, httpSendHash)
 proposedhashRouter.get('/' , authenticateUser,  httpGetUserHash)
proposedhashRouter.get('/:id', authenticateUser, httpGetSingleHash)

  module.exports = proposedhashRouter