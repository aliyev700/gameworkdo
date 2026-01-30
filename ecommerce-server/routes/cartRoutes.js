const express = require('express');
const router = express.Router();

// Controller funksiyalarını import edirik
const { 
    addToCart, 
    getCart, 
    updateCartItem, 
    removeFromCart 
} = require('../controllers/cartController');

const { protect } = require('../middleware/authMiddleware'); 

// 1. Səbətə əlavə etmək (POST)
router.post('/add', protect, addToCart);

// 2. Səbəti gətirmək (GET)
router.get('/', protect, getCart);

// 3. Sayı dəyişmək (PUT)
router.put('/', protect, updateCartItem);

// 4. Səbətdən silmək (DELETE)
// Diqqət: /:id yazdıq ki, productId-ni URL-dən götürsün
router.delete('/:id', protect, removeFromCart);

module.exports = router;