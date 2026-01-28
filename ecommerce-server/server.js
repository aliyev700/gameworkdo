const path = require('path');
const dotenv = require('dotenv');

// 1. Env faylını oxuyuruq
dotenv.config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');

// --- YENİ: Passport Import ---
const passport = require('passport'); 
require('./config/passport'); // Yaratdığımız config faylını işə salır

// 2. Verilənlər bazasına qoşuluruq
connectDb();

const app = express();
const port = process.env.PORT || 5001;

// 3. Middleware-lər
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- YENİ: Passport Middleware (Bura mütləq lazımdır) ---
app.use(passport.initialize());

// 4. Marşrutlar (Routes)
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes')); 

// --- YENİ: Auth Route (GitHub üçün ayrıca yol) ---
// Bunu yaratmaq üçün növbəti addımda "authRoutes.js" faylı düzəldəcəyik
app.use('/api/auth', require('./routes/authRoutes')); 

// 5. Statik Qovluq
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 6. Xəta Tutucu
app.use((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

app.listen(port, () => {
    console.log(`Server ${port} portunda işləyir`);
});