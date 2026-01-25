const path = require('path');
const dotenv = require('dotenv');

// 1. Env faylını EN BIRINCI oxuyuruq ki, aşağıdakı fayllar onu görə bilsin
dotenv.config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');

// 2. Verilənlər bazasına qoşuluruq
connectDb();

const app = express();
const port = process.env.PORT || 5001;

// 3. Middleware-lər
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 4. Marşrutlar (Routes)
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// 5. Sadə Xəta Tutucu (Error Handler) - Əlavə etmək yaxşıdır
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