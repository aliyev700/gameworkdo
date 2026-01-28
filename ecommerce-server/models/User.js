const mongoose = require('mongoose');

// 1. Səbət üçün sxem (olduğu kimi qalır)
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
}, { _id: false }); 

// 2. Əsas User sxemi
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    
    // --- DƏYİŞİKLİK 1: required: true yerinə required: false yazırıq ---
    // Çünki GitHub ilə girənlərin parolu olmur
    password: { type: String, required: false }, 
    
    isAdmin: { type: Boolean, required: true, default: false },
    
    // --- DƏYİŞİKLİK 2: Bunu əlavə edirik ---
    githubId: { type: String }, 
    
    cart: [cartItemSchema] 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);