const express = require('express')

const {
    httpCreateReplicas,
    httpGetAllReplicas,
    httpGetSingleReplicas,
    httpDeleteReplica,
    httpGetColor,
    httpAdminDeleteReplica,
} = require('./replicas.controller')

const {
    authenticateUser, authorizeRoles,
  } = require('../../middleware/full-auth');

const replicaRouter = express.Router()

replicaRouter.post('/:id', authenticateUser, httpCreateReplicas)
replicaRouter.get('/user', authenticateUser, httpGetAllReplicas)
replicaRouter.get('/:id', authenticateUser, httpGetSingleReplicas)
replicaRouter.delete('/:id', authenticateUser, httpDeleteReplica)
replicaRouter.get('/get/color', authenticateUser, authorizeRoles('admin'),  httpGetColor)
replicaRouter.delete('/:id/admin', authenticateUser, authorizeRoles('admin'), httpAdminDeleteReplica)

module.exports = replicaRouter