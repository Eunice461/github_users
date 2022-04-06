const express = require('express');
const refreshTokenverify = require('../../middleware/refresh-token');
const router = express.Router();

const { register, login, logout, 
    httpGetResetPasswordLink,
    } = require('./auth.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/refreshtoken', refreshTokenverify )
router.get('/logout', logout);
router.post("/forgotPassword", httpGetResetPasswordLink);

module.exports = router;
