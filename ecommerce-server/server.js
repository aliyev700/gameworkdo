const express = require('express');
const cors = require('cors'); // Yalnız bir dəfə yazılmalıdır
const path = require('path');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const productRoutes = require('./routes/productRoutes');

// Env faylını oxuyuruq
dotenv.config({ path: path.join(__dirname, '.env') });

// Verilənlər bazasına qoşuluruq
connectDb();

const app = express();
const port = process.env.PORT || "127.0.0.1:5001";

// Middleware-lər
app.use(cors()); // CORS icazəsi (yalnız bir dəfə)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Marşrutlar (Routes)
app.use('/api/users', require('./routes/userRoutes')); 
app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`Server ${port} portunda işləyir`);
});