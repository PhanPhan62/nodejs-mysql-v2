const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const nhanvienController = require('../controllers/nhanvienController');

// Create a new user
router.post('/users', userController.createUser);

// Read all users
router.get('/users', userController.getAllUsers);

// Read a single user by ID
router.get('/users/show/:id', userController.getUserById);
router.get('/users/edit/:id', userController.getUserByIdEdit);

// Update a user by ID
router.post('/users/edit/:id', userController.updateUser);

// Delete a user by ID
router.delete('/users/delete/:id', userController.deleteUser);

module.exports = router;