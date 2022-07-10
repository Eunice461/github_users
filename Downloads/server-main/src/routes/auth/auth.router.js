const express = require('express');
const { authenticateUser } = require('../../middleware/full-auth');
const refreshTokenverify = require('../../middleware/refresh-token');
const router = express.Router();

const { register, login, logout, admin 
    } = require('./auth.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/admin', admin)
router.post('/refreshtoken', refreshTokenverify )
router.post('/logout', authenticateUser, logout);

module.exports = router;
