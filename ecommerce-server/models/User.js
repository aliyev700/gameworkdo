const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Əgər bu yoxdursa: npm install bcryptjs

// 1. Səbət üçün sxem
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
    password: { type: String, required: false }, // GitHub üçün false
    isAdmin: { type: Boolean, required: true, default: false },
    githubId: { type: String }, 
    cart: [cartItemSchema] 
  },
  {
    timestamps: true,
  }
);

// --- VACİB: Parolun yoxlanması funksiyası ---
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Əgər istifadəçinin parolu yoxdursa (GitHub ilə giribsə), false qaytar
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

// --- VACİB: Parolun şifrələnməsi (Save etməzdən əvvəl) ---
userSchema.pre('save', async function (next) {
  // Əgər parol dəyişməyibsə və ya yoxdursa, işləmə
  if (!this.isModified('password') || !this.password) {
    next();
  }

  // Parolu şifrələ (Hash)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);