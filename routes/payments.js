const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

// Seeker: make payment
router.post('/', authenticateJWT, authorizeRoles('seeker'), paymentController.makePayment);

// Public: get payment details for booking
router.get('/:bookingId', paymentController.getPaymentDetails);

module.exports = router;
