const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Service management
router.post('/services', authenticateJWT, authorizeRoles('admin'), adminController.createService);
router.put('/services/:id', authenticateJWT, authorizeRoles('admin'), adminController.updateService);
router.delete('/services/:id', authenticateJWT, authorizeRoles('admin'), adminController.deleteService);
router.get('/services', authenticateJWT, authorizeRoles('admin'), adminController.listServices);

// User management
router.get('/users', authenticateJWT, authorizeRoles('admin'), adminController.listUsers);

// Analytics
router.get('/analytics', authenticateJWT, authorizeRoles('admin'), adminController.analytics);

module.exports = router;
