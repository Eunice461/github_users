const express = require('express');
const userRouter = express.Router();
const {
  authenticateUser,
} = require('../../middleware/full-auth');
const {
    httpGetAllUsers,
    httpGetSingleUser,
    httpShowCurrentUser,
    httpUpdateUser,
    httpUpdateUserPassword,
    httpDeleteUser,
} = require('./user.controller');

userRouter.get('/', [authenticateUser, httpGetAllUsers])
userRouter.get('/showme', authenticateUser, httpShowCurrentUser )
userRouter.patch('/updateUser', authenticateUser, httpUpdateUser)
userRouter.patch('/updatePassword',authenticateUser, httpUpdateUserPassword )
userRouter.get('/:userId', authenticateUser, httpGetSingleUser )
userRouter.delete('/deleteMe', authenticateUser, httpDeleteUser)

module.exports = userRouter;