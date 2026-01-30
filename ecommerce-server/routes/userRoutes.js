const express = require('express');
const router = express.Router();

// 1. Controller-dən bütün funksiyaları, o cümlədən yenilərini import edirik
const { 
    registerUser, 
    loginUser, 
    getMe, 
    forgotPassword, // <--- YENİ
    resetPassword   // <--- YENİ
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware'); 

// Qeydiyyat: POST /api/users
router.post('/', registerUser); 

// Login: POST /api/users/login
router.post('/login', loginUser);

// Profil: GET /api/users/me (Login tələb olunur)
router.get('/me', protect, getMe);

// ---------------------------------------------------
// YENİ ROUTE-LAR (Parol bərpası üçün)
// ---------------------------------------------------

// Parolu Unutdum (Email göndərir): POST /api/users/forgot-password
router.post('/forgot-password', forgotPassword);

// Parolu Yenilə (Token ilə): PUT /api/users/reset-password/:token
router.put('/reset-password/:token', resetPassword);

module.exports = router;