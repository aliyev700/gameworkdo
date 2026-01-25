const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Bunu aşağıda yaratmalıyıq

// DÜZƏLİŞ: '/register' yerinə '/' qoydum.
// Çünki server.js-də '/api/users' demisən.
// Belə olanda ünvan: http://localhost:127.0.0.1:5001/api/users olur.
router.post('/', registerUser); 

// Login ünvanı: http://localhost:127.0.0.1:5001/api/users/login
router.post('/login', loginUser);

// Profil ünvanı: http://localhost:127.0.0.1:5001/api/users/me
router.get('/me', protect, getMe);

module.exports = router;