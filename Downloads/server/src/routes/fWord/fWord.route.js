const express = require('express')

const {
    authenticateUser,
    authorizeRoles
  } = require('../../middleware/full-auth');

  const fwordRouter = express.Router();
  
  const {
    httpCreateFWord,
    httpGetAllFWord,
    httpDeleteFword} = require('./fWord.controller')

    fwordRouter.post('/', authenticateUser, authorizeRoles('admin'), httpCreateFWord)
    fwordRouter.get('/', authenticateUser, authorizeRoles('admin'), httpGetAllFWord)
    fwordRouter.delete('/', authenticateUser, authorizeRoles('admin'), httpDeleteFword )

  module.exports = fwordRouter