const express = require('express');
const router = express.Router();
const homePageController = require('../controllers/homePageController');

// Create a new user
router.get('/', homePageController.homePage);
router.get('/sanpham', homePageController.product);
router.get('/chitietsanpham/sanpham/:id', homePageController.productDetail);
module.exports = router;