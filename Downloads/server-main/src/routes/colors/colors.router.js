const express = require('express')

const {
    authenticateUser,
    authorizeRoles
  } = require('../../middleware/full-auth');
  
const Color = require('../../models/Color');

  const colorRouter = express.Router();
  
  const {httpAddColor,
    httpEditColor,
    httpGetAllColors,
    httpRemoveColor,
    httpGetSingleColor} = require('./colors.controller')

    colorRouter.post('/', authenticateUser, authorizeRoles('admin'), httpAddColor)
    colorRouter.get('/', authenticateUser, httpGetAllColors)
    colorRouter.get('/:id', authenticateUser, httpGetSingleColor)
    colorRouter.patch('/:id', authenticateUser, authorizeRoles('admin'), httpEditColor)
    colorRouter.delete('/:id', authenticateUser, authorizeRoles('admin'), httpRemoveColor)

  module.exports = colorRouter