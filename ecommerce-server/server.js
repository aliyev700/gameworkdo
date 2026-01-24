const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const productRoutes = require('./routes/productRoutes');

dotenv.config({ path: path.join(__dirname, '.env') });

connectDb();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('API işləyir...');
});

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`Server ${port} portunda işləyir`);
});

