const express = require('express');
const router = express.Router();
const DVTController = require('../controllers/donvitinhController');

router.get('/dvt', DVTController.getAllDV);

module.exports = router;