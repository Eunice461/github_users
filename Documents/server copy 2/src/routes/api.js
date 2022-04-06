const express = require('express')

const authRouter = require('./auth/auth.router')
const verifyEmail = require('./verifyEmail/emailVerifyRoute')
const tokenRouter = require('./token/token.router')
const auctionRouter = require('./auction/auction.router')
const orderRouter = require('./order/order.router')
const userRouter = require('./user/user.router')
const cartRouter = require('./cart/cart.router')

const api = express.Router()

api.use('/',verifyEmail )
api.use('/', authRouter)
api.use('/users', userRouter)
api.use('/token', tokenRouter)
api.use('/auction', auctionRouter)
api.use('/order', orderRouter)
api.use('/cart', cartRouter)

module.exports = api;