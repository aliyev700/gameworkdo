const express = require('express');
const router = express.Router();
const { 
    getProducts, 
    getProductById, 
    createProduct,
    deleteProduct, 
    updateProduct,
    createProductReview
} = require('../controllers/productController');

// "admin" middleware-ni əlavə etdik (Vacibdir!)
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getProducts) // Hər kəs görə bilər
    .post(protect, admin, createProduct); // Yalnız Admin yarada bilər

router.route('/:id')
    .get(getProductById) // Hər kəs baxa bilər
    .delete(protect, admin, deleteProduct) // Yalnız Admin silə bilər
    .put(protect, admin, updateProduct);   // Yalnız Admin dəyişə bilər

// Rəy yazmaq üçün Admin olmağa ehtiyac yoxdur, sadəcə login olmaq kifayətdir
router.route('/:id/reviews').post(protect, createProductReview);

module.exports = router;