const express = require('express')

const {
    httpCreateReplicas,
    httpGetAllReplicas,
    httpGetSingleReplicas,
    httpDeleteReplica,
} = require('./replicas.controller')

const {
    authenticateUser,
  } = require('../../middleware/full-auth');

const replicaRouter = express.Router()

replicaRouter.post('/:id', authenticateUser, httpCreateReplicas)
replicaRouter.get('/', authenticateUser, httpGetAllReplicas)
replicaRouter.get('/:id', authenticateUser, httpGetSingleReplicas)
replicaRouter.delete('/:id', authenticateUser, httpDeleteReplica)

module.exports = replicaRouter