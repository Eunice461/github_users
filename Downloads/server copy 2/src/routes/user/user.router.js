const express = require('express');
const userRouter = express.Router();
const {
  authenticateUser,
} = require('../../middleware/full-auth');
const { upload } = require('../../middleware/multer');
const {
    httpGetAllUsers,
    httpGetSingleUser,
    httpShowCurrentUser,
    httpUpdateUser,
    httpUpdateUserPassword,
    httpDeleteUser,
} = require('./user.controller');

userRouter.get('/', authenticateUser, httpGetAllUsers)
userRouter.get('/showme', authenticateUser, httpShowCurrentUser )
userRouter.patch('/updateUser/:id', authenticateUser, upload.single("file"), httpUpdateUser)
userRouter.patch('/updatePassword',authenticateUser, httpUpdateUserPassword )
userRouter.get('/:userId', authenticateUser, httpGetSingleUser )
userRouter.delete('/deleteMe/:id', authenticateUser, httpDeleteUser)

module.exports = userRouter;