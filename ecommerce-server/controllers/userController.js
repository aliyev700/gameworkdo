const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Token yaratmaq üçün lazımdır
const sendEmail = require('../utils/sendEmail'); // Email göndərmək üçün

// Token yaratmaq funksiyası
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// 1. QEYDİYYAT (Register)
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Bütün xanaları doldurun' });
        }

        // Email yoxlanışı
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Bu email artıq istifadə olunub' });
        }

        // Şifrəni heşləmək
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // İstifadəçini yaratmaq
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isAdmin: false // Susmaya görə hər kəs sadə userdir
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'İstifadəçi yaradıla bilmədi' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// 2. GİRİŞ (Login)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Useri tap
        const user = await User.findOne({ email });

        // Şifrəni yoxla
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                message: "Giriş Uğurludur!"
            });
        } else {
            res.status(401).json({ message: 'Email və ya şifrə yanlışdır' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// 3. İSTİFADƏÇİ MƏLUMATLARI (Get Me)
const getMe = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "İcazə yoxdur" });
    }

    const { _id, name, email, isAdmin } = req.user;

    res.status(200).json({
        id: _id,
        name,
        email,
        isAdmin,
    });
}

// 4. PAROLU UNUTDUM (Forgot Password)
const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Bu email ilə istifadəçi tapılmadı" });
      }
  
      // Token yaradırıq (random kod)
      const resetToken = crypto.randomBytes(20).toString('hex');
  
      // Tokeni bazaya yazırıq 
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 dəqiqə vaxt verir
  
      await user.save();
  
      // Linki hazırlayırıq (Frontend adresi: localhost:3000)
      const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
  
      const message = `Parolunuzu yeniləmək üçün bu linkə daxil olun:\n\n${resetUrl}`;
  
      try {
        await sendEmail({
          email: user.email,
          subject: 'GameWorkDo - Parol Yeniləmə',
          message,
        });
  
        res.status(200).json({ success: true, message: "Email göndərildi" });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return res.status(500).json({ message: "Email göndərilə bilmədi" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// 5. PAROLU YENİLƏ (Reset Password)
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      // Bazada bu tokenə sahib və vaxtı keçməmiş istifadəçini tapırıq
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Keçərsiz və ya vaxtı bitmiş token" });
      }
  
      // Yeni şifrəni heşləyirik (Çünki sən registerdə manual heşləyirsən)
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Tokenləri təmizləyirik
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
  
      res.status(200).json({ success: true, message: "Parol uğurla yeniləndi" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    registerUser, 
    loginUser, 
    getMe, 
    forgotPassword, 
    resetPassword 
};