const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ad vacibdir'],
    },
    email: {
      type: String,
      required: [true, 'Email vacibdir'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Şifrə vacibdir'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    // --- YENİ: Səbət (Cart) hissəsi ---
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Məhsul modelinə bağlanır
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
        }
      }
    ]
    // ----------------------------------
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);