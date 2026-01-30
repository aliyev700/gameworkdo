const User = require('../models/User');

// --- SƏBƏTƏ ƏLAVƏ ET ---
const addToCart = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'İstifadəçi təsdiqlənməyib' });
    }

    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    }

    if (!user.cart) {
      user.cart = [];
    }

    // Məhsul artıq səbətdə varmı?
    const existingItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Varsa sayını artır
      user.cart[existingItemIndex].quantity += Number(quantity);
    } else {
      // Yoxdursa yeni əlavə et
      user.cart.push({ product: productId, quantity: Number(quantity) });
    }

    await user.save();

    res.status(200).json(user.cart);

  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    res.status(500).json({ message: "Server xətası: " + error.message });
  }
};

// --- SƏBƏTİ GƏTİR ---
const getCart = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'İstifadəçi təsdiqlənməyib' });
    }

    const user = await User.findById(req.user._id).populate({
      path: 'cart.product',
      strictPopulate: false
    });

    if (!user) {
      return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    }

    if (!user.cart) {
      return res.status(200).json([]);
    }

    // Silinmiş (backend-dən silinib amma səbətdə qalan) məhsulları təmizləyirik
    const activeCartItems = user.cart.filter(item => item.product != null);

    if (activeCartItems.length !== user.cart.length) {
      user.cart = activeCartItems;
      await user.save();
    }

    res.status(200).json(activeCartItems);

  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ message: "Səbəti gətirərkən xəta: " + error.message });
  }
};

// --- SƏBƏTDƏKİ SAYI DƏYİŞ (ARTIR/AZALT) ---
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const itemIndex = user.cart.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      if (quantity > 0) {
        user.cart[itemIndex].quantity = quantity;
      } else {
        return res.status(400).json({ message: "Say 1-dən az ola bilməz" });
      }

      await user.save();

      // Cavabı dərhal yenilənmiş halda qaytarırıq
      const updatedUser = await User.findById(req.user._id).populate({
        path: 'cart.product',
        strictPopulate: false
      });

      const validCart = updatedUser.cart.filter(item => item.product != null);

      res.status(200).json(validCart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    console.error("UPDATE CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// --- YENİ: SƏBƏTDƏN SİL (REMOVE) ---
const removeFromCart = async (req, res) => {
  try {
    // Route-dan gələn ID: /api/cart/:id
    const productId = req.params.id;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Massivdən ID-si uyğun gəlməyənləri saxlayırıq (yəni uyğun gələni silirik)
    user.cart = user.cart.filter(item => item.product.toString() !== productId);

    await user.save();

    // Frontend-in dərhal yenilənməsi üçün yeni siyahını qaytarırıq
    const updatedUser = await User.findById(userId).populate({
      path: 'cart.product',
      strictPopulate: false
    });

    const validCart = updatedUser.cart.filter(item => item.product != null);

    res.status(200).json(validCart);

  } catch (error) {
    console.error("REMOVE CART ERROR:", error);
    res.status(500).json({ message: "Silinərkən xəta: " + error.message });
  }
};

// Module exports-a removeFromCart əlavə etdik
module.exports = { addToCart, getCart, updateCartItem, removeFromCart };