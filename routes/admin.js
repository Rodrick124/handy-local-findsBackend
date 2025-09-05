const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const { serviceValidation } = require('../middleware/routeValidations');
const { validate } = require('../middleware/validation');

// Service management
router.post('/services', authenticateJWT, authorizeRoles('admin'), serviceValidation, validate, adminController.createService);
router.put('/services/:id', authenticateJWT, authorizeRoles('admin'), serviceValidation, validate, adminController.updateService);
router.delete('/services/:id', authenticateJWT, authorizeRoles('admin'), adminController.deleteService);
router.get('/services', authenticateJWT, authorizeRoles('admin'), adminController.listServices);

// User management
router.get('/users', authenticateJWT, authorizeRoles('admin'), adminController.listUsers);
router.delete('/users/:id', authenticateJWT, authorizeRoles('admin'), adminController.deleteUser);

// Analytics
// Analytics
router.get('/analytics/summary', authenticateJWT, authorizeRoles('admin'), adminController.getSummary);
router.get('/analytics/user-signups', authenticateJWT, authorizeRoles('admin'), adminController.getUserSignups);
router.get('/analytics/provider-rankings', authenticateJWT, authorizeRoles('admin'), adminController.getProviderRankings);
router.get('/analytics/booking-stats', authenticateJWT, authorizeRoles('admin'), adminController.getBookingStats);

module.exports = router;
