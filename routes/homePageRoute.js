const express = require('express');
const router = express.Router();
const homePageController = require('../controllers/homePageController');

// Create a new user
router.get('/', homePageController.homePage);
router.get('/sanpham', homePageController.product);
router.get('/chitietsanpham/:id', homePageController.productDetail);
router.get('/phan', (res, req) => {
    req.json("skjdhvkjsdv")
});
module.exports = router;