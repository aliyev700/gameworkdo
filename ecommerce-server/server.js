const path = require('path');
const dotenv = require('dotenv');

// Env faylını oxuyuruq
dotenv.config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const passport = require('passport'); // <--- 1. Bunu açdıq

// Passport Config (Bu faylın mövcud olduğuna əmin ol: config/passport.js)
require('./config/passport'); // <--- 2. Bunu açdıq

// Verilənlər bazasına qoşuluruq
connectDb();

const app = express();
const port = process.env.PORT || 5001;

// Middleware-lər
app.use(cors({
    origin: "*", 
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport Middleware
app.use(passport.initialize()); // <--- 3. Bunu açdıq

// --- MARŞRUTLAR (Routes) ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes')); 
app.use('/api/orders', require('./routes/orderRoutes')); 

// Auth Routes (GitHub üçün)
app.use('/api/auth', require('./routes/authRoutes')); // <--- 4. Bunu açdıq

// Statik Qovluq (Şəkillər üçün)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Xəta Tutucu
app.use((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

app.listen(port, () => {
    console.log(`Server ${port} portunda işləyir...`);
});