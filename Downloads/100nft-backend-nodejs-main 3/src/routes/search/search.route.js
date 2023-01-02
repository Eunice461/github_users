const express = require('express')

const {
    authenticateUser, authorizeRoles,
  } = require('../../middleware/full-auth');

const { 
    httpSearchToken
} = require('./search.controller')

const searchRouter = express.Router();

searchRouter.post('/', httpSearchToken);

module.exports = searchRouter