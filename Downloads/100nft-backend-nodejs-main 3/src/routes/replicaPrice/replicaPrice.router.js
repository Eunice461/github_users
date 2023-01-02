const express = require('express')

const replicaPriceRouter = express.Router()

const {
    httpAddReplicaPrice,
    httpEditReplicaPrice,
    httpGetReplicaPrice,
    httpDeleteReplicaPrice
} = require('./replicaPrice.controller')

const {
    authenticateUser,
    authorizeRoles
  } = require('../../middleware/full-auth');

  replicaPriceRouter.post('/',authenticateUser, authorizeRoles('admin'), httpAddReplicaPrice)
  replicaPriceRouter.get('/', authenticateUser, httpGetReplicaPrice)
  replicaPriceRouter.patch('/:id', authenticateUser, authorizeRoles('admin'), httpEditReplicaPrice)
  replicaPriceRouter.delete('/:id', authenticateUser, authorizeRoles('admin'), httpDeleteReplicaPrice)



module.exports = replicaPriceRouter