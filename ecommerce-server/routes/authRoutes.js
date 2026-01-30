const express = require('express');
const passport = require('passport');
const generateToken = require('../utils/generateToken'); 
const router = express.Router();

// 1. GITHUB-A GİRİŞ
// session: false <-- BUNU ƏLAVƏ ETDİK
router.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }));

// 2. CALLBACK (GITHUB-DAN QAYIDIŞ)
router.get(
  '/github/callback',
  // session: false <-- BURADA DA MÜTLƏQ OLMALIDIR
  passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login', session: false }),
  (req, res) => {
    // Giriş uğurludursa
    if (req.user) {
        const token = generateToken(req.user._id);

        // Tokeni Frontend-ə göndəririk
        res.redirect(`http://localhost:3000/auth-success?token=${token}`);
    } else {
        res.redirect('http://localhost:3000/login');
    }
  }
);

module.exports = router;