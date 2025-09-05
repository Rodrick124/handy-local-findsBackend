const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Public browse services
router.get('/', serviceController.browseServices);

module.exports = router;
