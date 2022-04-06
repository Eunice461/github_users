const express = require('express');
const router = express.Router();

const {emailVerify, verifyForgetPassword, resendEmailVerificationLink} = require('../verifyEmail/verifyEmailJwt')

router.post('/verification/:token', emailVerify)
router.post('/resendlink', resendEmailVerificationLink)
router.patch("/resetPassword/:token", verifyForgetPassword);

module.exports = router
