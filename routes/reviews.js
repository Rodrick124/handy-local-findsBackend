const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');
const reviewController = require('../controllers/reviewController');

// Seeker: add review
router.post('/', authenticateJWT, authorizeRoles('seeker'), reviewController.addReview);

// Public: get reviews for a service
router.get('/:serviceId', reviewController.getServiceReviews);

module.exports = router;
