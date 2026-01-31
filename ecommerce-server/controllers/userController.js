const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); 
const sendEmail = require('../utils/sendEmail'); 


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Bütün xanaları doldurun' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Bu email artıq istifadə olunub' });
        }

       
        
        const user = await User.create({
            name,
            email,
            password, 
            isAdmin: false 
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

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

       
        if (user && (await user.matchPassword(password))) {
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

const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Bu email ilə istifadəçi tapılmadı" });
      }

      const resetToken = crypto.randomBytes(20).toString('hex');

      user.resetPasswordToken = resetToken;
      user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; 
  
      await user.save();

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

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Keçərsiz və ya vaxtı bitmiş token" });
      }

     
      user.password = password;

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