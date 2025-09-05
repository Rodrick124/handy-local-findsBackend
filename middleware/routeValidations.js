const { body, validationResult } = require('express-validator');

// Service validation
const serviceValidation = [
  body('name').notEmpty().withMessage('Service name required'),
  body('description').notEmpty().withMessage('Description required'),
  body('category').notEmpty().withMessage('Category required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be positive'),
];

// Booking validation
const bookingValidation = [
  body('serviceId').notEmpty().withMessage('Service ID required'),
  body('providerId').notEmpty().withMessage('Provider ID required'),
  body('scheduledDate').isISO8601().withMessage('Valid date required'),
];

// Review validation
const reviewValidation = [
  body('serviceId').notEmpty().withMessage('Service ID required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating 1-5 required'),
];

// Payment validation
const paymentValidation = [
  body('bookingId').notEmpty().withMessage('Booking ID required'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be positive'),
];

module.exports = {
  serviceValidation,
  bookingValidation,
  reviewValidation,
  paymentValidation,
};
