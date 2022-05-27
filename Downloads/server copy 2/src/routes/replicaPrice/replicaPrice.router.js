const express = require('express')

const replicaPriceRouter = express.Router()

const {
  httpAddReplicaPrice,
  httpGetReplicaPrice,
  httpEditReplicaPrice,
  httpDeleteReplicaPrice
} = require('./replicaPrice.controller')

const {
    authenticateUser,
    authorizeRoles
  } = require('../../middleware/full-auth');

  replicaPriceRouter.post('/replica',authenticateUser, authorizeRoles('admin'), httpAddReplicaPrice)
  replicaPriceRouter.get('/replica', authenticateUser, httpGetReplicaPrice)
  replicaPriceRouter.patch('/replica/:id', authenticateUser, authorizeRoles('admin'), httpEditReplicaPrice)
  replicaPriceRouter.delete('/replica/:id',authenticateUser, authorizeRoles('admin'), httpDeleteReplicaPrice)



module.exports = replicaPriceRouter