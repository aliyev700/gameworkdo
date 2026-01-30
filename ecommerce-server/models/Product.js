const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    }
}, {
    timestamps: true
});

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: { type: String, required: true },
    
    image: { type: String, required: true },
    
    images: [String],

    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },

    reviews: [reviewSchema], 

    // --- DƏYİŞDİRİLƏN HİSSƏ BURADIR ---
    // Köhnə kod: styles: [String],
    // Yeni kod (Həm ad, həm şəkil saxlayır):
    styles: [
        {
            name: { type: String, required: true }, // Məs: "0.2v"
            image: { type: String, required: false } // Məs: "/uploads/image-123.jpg"
        }
    ],
    // ------------------------------------

    style: { type: String, default: "Standard" }, // Bunu saxlaya bilərsən, ziyanı yoxdur

    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);