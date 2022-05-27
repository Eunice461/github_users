const express = require('express')

const {
    authenticateUser,
    authorizeRoles
  } = require('../../middleware/full-auth');
  
  const proposeRouter = express.Router();
  
  const { httpCreatePropose,
    httpGetAllPropose,} = require('./propose.controller')

    proposeRouter.post('/:id', authenticateUser, httpCreatePropose)
   
  module.exports = proposeRouter