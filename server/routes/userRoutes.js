const express = require('express');
const userService = require('../domain/User/UserService');
const authenticateToken = require('../middleware/authMiddleware');
const validateContentType = require('../middleware/contentTypeMiddleware');

const router = express.Router();

router.get('/profile', authenticateToken, userService.viewProfileHandler.bind(userService));
router.put('/profile', validateContentType, authenticateToken, userService.editProfileHandler.bind(userService));

module.exports = router;