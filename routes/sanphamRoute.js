const express = require('express');
const router = express.Router();
const sanphamController = require('../controllers/sanphamController');

// Create a new user
router.post('/sp', sanphamController.create);

// Read all users
router.get('/sp', sanphamController.getAllUsers);

// Read a single user by ID
router.get('/sp/show/:id', sanphamController.getUserById);
router.get('/sp/edit/:id', sanphamController.getUserByIdEdit);

// Update a user by ID
router.post('/sp/edit/:id', sanphamController.updateUser);

// Delete a user by ID
router.delete('/sp/delete/:id', sanphamController.deleteUser);

module.exports = router;