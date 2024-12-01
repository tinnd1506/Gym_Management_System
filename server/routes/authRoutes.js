const express = require('express');
const userService = require('../domain/Authetication/AuthService');

const router = express.Router();

router.post('/register', userService.registerHandler.bind(userService));
router.post('/login', userService.loginHandler.bind(userService));
router.post('/logout', userService.logoutHandler.bind(userService));

module.exports = router;