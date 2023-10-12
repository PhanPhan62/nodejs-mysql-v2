const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController.js');

router.get('/menu', menuController.showMenu);

module.exports = router;