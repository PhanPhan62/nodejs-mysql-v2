const express = require('express');
const router = express.Router();
const nhanvienController = require('../controllers/nhanvienController');
// const userController = require('../controllers/userController');

router.get('/nhanvien', nhanvienController.getAllNV);

module.exports = router;