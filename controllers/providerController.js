const User = require('../models/User');

/**
 * @desc    Get all service providers
 * @route   GET /api/providers
 * @access  Public
 */
exports.getAllProviders = async (req, res, next) => {
  try {
    // Find all users with the 'provider' role.
    // We use .select() to only return fields that are safe for public display,
    // excluding sensitive information like passwords or emails.
    // I'm assuming your User model has fields like 'name', 'profile', and 'averageRating'
    // based on the features described in your README.
    const providers = await User.find({ role: 'provider' })
      .select('name profileImage averageRating profile')
      .lean();

    res.status(200).json({
      success: true,
      data: providers,
    });
  } catch (err) {
    next(err); // Pass errors to the centralized error handler
  }
};