const express = require('express');
const router = express.Router();
const multer = require('multer');
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const { authenticateJWT } = require('../middleware/auth');
const { registerValidation, loginValidation, validate } = require('../middleware/validation');

// Multer setup for profile image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG images are allowed'), false);
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/profile', authenticateJWT, getProfile);
router.put('/profile', authenticateJWT, upload.single('profileImage'), updateProfile);

module.exports = router;
