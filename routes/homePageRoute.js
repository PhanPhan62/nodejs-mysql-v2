const express = require('express');
const router = express.Router();
const homePageController = require('../controllers/homePageController');

// Create a new user
router.get('/', homePageController.homePage);

module.exports = router;