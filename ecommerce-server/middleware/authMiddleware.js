const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login olub-olmadığını yoxlayan funksiya
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Tokeni "Bearer tokenkodu" sözündən ayırırıq
            token = req.headers.authorization.split(' ')[1];

            // Tokeni deşifrə edirik
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Useri tapıb req.user-ə yazırıq (şifrəsiz)
            req.user = await User.findById(decoded.id).select('-password');

            next(); 
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'İcazə yoxdur, token yanlışdır' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'İcazə yoxdur, token tapılmadı' });
    }
};

// --- BU HİSSƏ MÜTLƏQ OLMALIDIR ---
// Admin olub-olmadığını yoxlayan funksiya
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // Admindirsə icazə ver
    } else {
        res.status(401).json({ message: 'Admin icazəsi tələb olunur' });
    }
};

// Hər ikisini export edirik
module.exports = { protect, admin };