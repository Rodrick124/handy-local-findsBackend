const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

// Seeker: create booking, get own bookings
router.post('/', authenticateJWT, authorizeRoles('seeker'), bookingController.createBooking);
router.get('/', authenticateJWT, authorizeRoles('seeker', 'provider'), (req, res, next) => {
  if (req.user.role === 'seeker') return bookingController.getSeekerBookings(req, res, next);
  if (req.user.role === 'provider') return bookingController.getProviderBookings(req, res, next);
});

// Provider: update booking status
router.put('/:id/status', authenticateJWT, authorizeRoles('provider'), bookingController.updateBookingStatus);

module.exports = router;
