const express = require('express');
const userRouter = express.Router();
const {
  authenticateUser, authorizeRoles,
} = require('../../middleware/full-auth');
const { upload } = require('../../middleware/multer');
const {
    httpGetAllUsers,
    httpGetSingleUser,
    httpShowCurrentUser,
    httpUpdateUser,
    httpUpdateUserPassword,
    httpDeleteUser,
    httpCreateAdmin,
    httpSearchUser,
    httpEditShippingAddress,
    httpGetAllUserAuctionBid
} = require('./user.controller');

userRouter.get('/', authenticateUser, httpGetAllUsers)
userRouter.get('/showme', authenticateUser, httpShowCurrentUser )
userRouter.patch('/updateUser/:id', authenticateUser, upload.single("file"), httpUpdateUser)
userRouter.patch('/updatePassword',authenticateUser, httpUpdateUserPassword )
userRouter.get('/:userId', authenticateUser, httpGetSingleUser )
userRouter.delete('/deleteMe/:id', authenticateUser, httpDeleteUser)
userRouter.patch('/:id', authenticateUser, authorizeRoles('admin'), httpCreateAdmin)
userRouter.post('/search/user', authenticateUser, authorizeRoles('admin'), httpSearchUser)
userRouter.patch('/change/shippingAddress', authenticateUser, httpEditShippingAddress)
userRouter.get('/get/auction/bid', authenticateUser, httpGetAllUserAuctionBid)

module.exports = userRouter;