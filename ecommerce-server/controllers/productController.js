const asyncHandler = require('express-async-handler');
const Product = require('../models/Product'); 


const getProducts = asyncHandler(async (req, res) => {
    let query = {};

    
    if (req.query.keyword) {
        query.name = {
            $regex: req.query.keyword,
            $options: 'i' 
        };
    }

    // 2. Markaya görə filtr
    if (req.query.brand) {
        query.brand = req.query.brand;
    }

    // 3. Kateqoriyaya görə filtr
    if (req.query.category) {
        query.category = req.query.category;
    }
    
    // 4. Qiymət aralığı (Min - Max)
    if (req.query.minPrice || req.query.maxPrice) {
        query.price = {};
        if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
        if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }
    
    // 5. Stok vəziyyəti
    if (req.query.inStock) {
        if (req.query.inStock === 'true') {
            query.countInStock = { $gte: 1 }; 
        } else if (req.query.inStock === 'false') {
            query.countInStock = { $lte: 0 }; 
        }
    }

    const products = await Product.find(query);
    res.json(products);
});

// @desc    Məhsulu ID ilə gətir
// @route   GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id);   
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Məhsul tapılmadı');
    }
});

// @desc    Yeni məhsul yarat
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { 
        name, price, description, image, images, 
        brand, category, countInStock, styles, style 
    } = req.body;

    const product = new Product({
        name,
        price,
        user: req.user._id,
        image,
        images: images || [], // Boşdursa boş massiv
        brand,
        category,
        styles: styles || [], // Boşdursa boş massiv
        style: style || "Standard",
        countInStock,
        numReviews: 0,
        description
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Məhsulu sil
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Məhsul uğurla silindi' });
    } else {
        res.status(404);
        throw new Error('Məhsul tapılmadı');
    }
});

// @desc    Məhsulu yenilə (Edit)
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { 
        name, price, description, image, images, 
        brand, category, countInStock, styles, style 
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        
        // --- DÜZƏLİŞ: 0 rəqəmi üçün yoxlama ---
        // Əgər price 0 gələrsə, "||" operatoru onu false sayır və dəyişmir.
        // Ona görə də "undefined" olub olmadığını yoxlayırıq.
        if (price !== undefined) product.price = price;
        if (countInStock !== undefined) product.countInStock = countInStock;
        
        // Massivlər üçün (Yenisi gəlibsə onu götür, yoxsa köhnə qalsın)
        if (images) product.images = images;
        if (styles) product.styles = styles;
        if (style) product.style = style;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Məhsul tapılmadı');
    }
});

// @desc    Məhsula rəy yaz
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    
    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(
            r => r.user.toString() === req.user._id.toString()
        ); 
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Siz artıq bu məhsulu rəyləndirmisiniz');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        
        // Reytinq ortalamasını hesabla
        product.rating = 
            product.reviews.reduce((acc, item) => item.rating + acc, 0) / 
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Rəy əlavə edildi' });
    } else {
        res.status(404);
        throw new Error('Məhsul tapılmadı');
    }
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    createProductReview 
};