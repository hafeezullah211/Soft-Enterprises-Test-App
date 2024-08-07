const express = require('express');
const { registerUser, authUser, getUserDetails } = require('../controllers/authController');
const router = express.Router();
const { protect } = require('../middelware/authMiddleware'); 


router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserDetails);

module.exports = router;
