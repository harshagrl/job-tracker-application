const express = require('express');
const {
  register,
  login,
  getMe,
  logout,
  updateDetails
} = require('../controllers/authController');
const {
  protect
} = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.get('/logout', protect, logout);

module.exports = router;