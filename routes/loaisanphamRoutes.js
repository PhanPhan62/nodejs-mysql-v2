const express = require('express');
const router = express.Router();
const loaisanphamController = require('../controllers/loaisanphamControllers');

// Create a new user
router.post('/loaisp', loaisanphamController.createLoaisp);
// router.get('/', loaisanphamController.checkPermission);

// Read all loaisp
router.get('/loaisp', loaisanphamController.getAllLoaisp);

// Read a single Loaisp by ID
router.get('/loaisp/:id', loaisanphamController.getLoaispById);

// Read a single Loaisp pass
router.get('/loaisppass/:id', loaisanphamController.getLoaispPass);

// Update a Loaisp by ID
router.put('/loaisp/:id', loaisanphamController.updateLoaisp);

// Delete a Loaisp by ID
router.delete('/loaisp/:id', loaisanphamController.deleteLoaisp);

module.exports = router;