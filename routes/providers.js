const express = require('express');
const router = express.Router();
const { getAllProviders } = require('../controllers/providerController');

// @route   GET /api/providers
// @desc    Get all service providers
// @access  Public
router.get('/', getAllProviders);

module.exports = router;