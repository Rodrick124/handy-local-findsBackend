const express = require('express');
const router = express.Router();
const multer = require('multer');
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const { authenticateJWT } = require('../middleware/auth');

// Multer setup for profile image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateJWT, getProfile);
router.put('/profile', authenticateJWT, upload.single('profileImage'), updateProfile);

module.exports = router;
