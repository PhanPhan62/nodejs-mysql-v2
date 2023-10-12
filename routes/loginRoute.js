const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/loginControllers');

// Create a new user
router.get('/login', loginControllers.login);
// router.get('/', loaisanphamController.checkPermission);

module.exports = router;