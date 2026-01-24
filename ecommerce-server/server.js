const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors'); // Kitabxana çağırılır
const connectDb = require('./config/db');
const productRoutes = require('./routes/productRoutes');

dotenv.config({ path: path.join(__dirname, '.env') });

connectDb();

const app = express();
const port = process.env.PORT || 5001;

// --- DÜZƏLİŞ EDİLƏN HİSSƏ ---
app.use(cors()); // <--- BU SƏTİR ÇATIŞMIRDI. Bunu mütləq bura yaz.
// ----------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes')); 
app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`Server ${port} portunda işləyir`);
});