const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
} = require('../controllers/orderController');

// Middleware-ləri (Qoruma) əlavə edirik
// Əgər authMiddleware faylın yoxdursa, bunları kommentə al, amma 90% var.
const { protect, admin } = require('../middleware/authMiddleware');

// --- MARŞRUTLAR ---

// 1. Yeni sifariş yaratmaq (POST)
router.route('/').post(protect, addOrderItems);

// 2. Mənim sifarişlərim (GET) - BU, /:id-dən YUXARIDA OLMALIDIR
router.route('/myorders').get(protect, getMyOrders);

// 3. ID ilə sifarişi gətirmək (GET)
router.route('/:id').get(protect, getOrderById);

// 4. Ödəniş etmək (PUT)
router.route('/:id/pay').put(protect, updateOrderToPaid);

// 5. Çatdırılma statusu (PUT) - Yalnız Admin
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;