const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
                isAdmin: user.isAdmin, // <--- BUNU ƏLAVƏ ETDİM (Vacibdir)
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
                isAdmin: user.isAdmin, // <--- BUNU DA ƏLAVƏ ETDİM
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

// 3. İSTİFADƏÇİ MƏLUMATLARI (Profile)
const getMe = async (req, res) => {
    // req.user authMiddleware-dən gəlir
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

module.exports = { registerUser, loginUser, getMe };