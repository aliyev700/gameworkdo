'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { apiCall } from '../../utils/api';
import { useAuth } from '../../hooks/useAuth';

interface Review {
    _id: string;
    name: string;
    rating: number;
    comment: string;
    user: string;
    createdAt: string;
}

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    images: string[];
    category: string;
    brand: string;
    countInStock: number;
    rating: number;
    numReviews: number;
    description: string;
    styles: string[];
    style: string;
    reviews: Review[];
    createdAt: string;
}

const ProductDetailPage = () => {
    const params = useParams();
    const productId = params.id as string;
    const { user, token: hookToken, isAuthenticated, loading: authLoading } = useAuth();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);
    const [reviewError, setReviewError] = useState('');

    const [localToken, setLocalToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                try {
                    const parsedUser = JSON.parse(userInfo);
                    if (parsedUser.token) {
                        setLocalToken(parsedUser.token);
                    }
                } catch (err) {
                    console.error("UserInfo parse error", err);
                }
            }
        }
    }, []);

    const activeToken = hookToken || localToken;
    const userIsAuthenticated = !!activeToken || isAuthenticated;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await apiCall(`/products/${productId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }

                const data = await response.json();
                setProduct(data);
                setError('');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching product');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!activeToken) {
            setReviewError('Please login to submit a review');
            return;
        }

        if (!reviewComment.trim()) {
            setReviewError('Please enter a comment');
            return;
        }

        try {
            setSubmittingReview(true);
            setReviewError('');

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

            const response = await fetch(`${apiUrl}/products/${productId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${activeToken}`
                },
                body: JSON.stringify({
                    rating: reviewRating,
                    comment: reviewComment,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit review');
            }

            const updatedResponse = await fetch(`${apiUrl}/products/${productId}`);
            const updatedProduct = await updatedResponse.json();
            setProduct(updatedProduct);

            setReviewComment('');
            setReviewRating(5);
            alert("Rəyiniz uğurla göndərildi!");

        } catch (err) {
            setReviewError(err instanceof Error ? err.message : 'Error submitting review');
            console.error('Error submitting review:', err);
        } finally {
            setSubmittingReview(false);
        }
    };

    // --- LOADING COMPONENT ---
    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                        {/* Qırmızı spin effekti */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-black rounded-full animate-spin blur-sm"></div>
                        <div className="absolute inset-2 bg-black rounded-full border border-red-900/50"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-red-600 text-xs font-bold animate-pulse">LOADING</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- ERROR COMPONENT ---
    if (error || !product) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center p-8 border border-red-900/30 rounded-2xl bg-neutral-950 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                    <p className="text-3xl font-bold text-red-500 mb-6 drop-shadow-lg">
                        {error || 'Product not found'}
                    </p>
                    <Link href="/shop">
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-none skew-x-[-10deg] border border-red-500 transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                            <span className="block skew-x-[10deg]">BACK TO SHOP</span>
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    const allImages = [product.image, ...product.images].filter(Boolean);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-red-500 selection:text-white">

            {/* --- Animated Background Effects --- */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-800/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-red-900/50 to-transparent"></div>
            </div>

            {/* --- Breadcrumb --- */}
            <div className="relative z-10 border-b border-white/10 backdrop-blur-md bg-black/50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center gap-3 text-sm tracking-wider">
                        <Link href="/" className="text-neutral-500 hover:text-red-500 transition-colors uppercase font-bold text-xs">Home</Link>
                        <span className="text-red-800">/</span>
                        <Link href="/shop" className="text-neutral-500 hover:text-red-500 transition-colors uppercase font-bold text-xs">Shop</Link>
                        <span className="text-red-800">/</span>
                        <span className="text-white uppercase font-bold text-xs truncate">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* --- Left Column: Images --- */}
                    <div className="space-y-6">
                        {/* Main Image Frame */}
                        <div className="relative group w-full  bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                            {/* Decorative Corner Borders */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-red-600/50 z-20"></div>
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-red-600/50 z-20"></div>

                            <img
                                src={allImages[selectedImage] || product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700"
                            />

                            {product.countInStock === 0 && (
                                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-30">
                                    <div className="border-2 border-red-600 px-8 py-4 bg-black transform -rotate-12 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                                        <h2 className="text-red-600 font-black text-3xl tracking-widest uppercase">SOLD OUT</h2>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {allImages.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all relative group ${selectedImage === idx
                                            ? 'border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)] scale-105'
                                            : 'border-neutral-800 hover:border-neutral-600 opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${idx}`}
                                            className="w-full h-full object-cover"
                                        />
                                        {selectedImage === idx && (
                                            <div className="absolute inset-0 bg-red-600/10"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* --- Right Column: Info --- */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-3 py-1 bg-neutral-900 border border-neutral-700 rounded text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase">
                                    {product.brand}
                                </span>
                                <span className="px-3 py-1 bg-red-900/20 border border-red-900/50 rounded text-[10px] font-black tracking-[0.2em] text-red-500 uppercase shadow-[0_0_10px_rgba(220,38,38,0.2)]">
                                    {product.category}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight uppercase">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-4 border-l-4 border-red-600 pl-4 bg-gradient-to-r from-neutral-900/50 to-transparent py-2">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`text-xl ${i < Math.round(product.rating) ? 'text-red-500' : 'text-neutral-800'}`}>
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <span className="text-neutral-500 font-medium text-sm">
                                    ({product.numReviews} confirmed reviews)
                                </span>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-8 relative overflow-hidden group">
                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div>
                                    <p className="text-neutral-500 text-xs font-bold tracking-widest mb-1">CURRENT PRICE</p>
                                    <div className="text-5xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                                        <span className="text-red-600 text-3xl align-top mr-1">$</span>
                                        {product.price.toFixed(2)}
                                    </div>
                                </div>

                                <div className={`${product.countInStock > 0 ? 'text-green-500' : 'text-red-500'} font-bold flex items-center gap-2`}>
                                    <span className={`w-2 h-2 rounded-full ${product.countInStock > 0 ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`}></span>
                                    {product.countInStock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        {product.countInStock > 0 && (
                            <div className="space-y-6 pt-4 border-t border-neutral-800">
                                {/* Quantity */}
                                <div className="flex items-center gap-6">
                                    <label className="text-xs font-bold text-neutral-400 tracking-widest uppercase">Quantity</label>
                                    <div className="flex items-center bg-neutral-900 rounded-lg border border-neutral-800 p-1">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center text-white hover:bg-neutral-800 rounded transition-colors text-xl font-bold"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            readOnly
                                            className="w-12 bg-transparent text-center font-bold text-white focus:outline-none"
                                        />
                                        <button
                                            onClick={() => setQuantity(Math.min(product.countInStock, quantity + 1))}
                                            className="w-10 h-10 flex items-center justify-center text-white hover:bg-neutral-800 rounded transition-colors text-xl font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button className="w-full relative overflow-hidden group bg-red-600 hover:bg-red-700 text-white font-black text-lg py-5 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]">
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        ADD TO CART <span className="bg-white/20 px-2 py-0.5 rounded text-sm">{quantity}</span>
                                    </span>
                                    {/* Shine Effect */}
                                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-700 skew-x-12 ease-in-out"></div>
                                </button>
                            </div>
                        )}

                        {/* Styles Selector */}
                        {product.styles && product.styles.length > 0 && (
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-neutral-400 tracking-widest uppercase">Select Style</label>
                                <div className="flex flex-wrap gap-3">
                                    {product.styles.map((s, idx) => (
                                        <button
                                            key={idx}
                                            className={`px-6 py-2 rounded-full border text-sm font-bold transition-all uppercase ${s === product.style
                                                ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                                : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-500 hover:text-white'
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Specs & Description */}
                        <div className="bg-neutral-900/30 border border-neutral-800/50 backdrop-blur-sm rounded-xl p-6">
                            <h3 className="text-white font-bold mb-4 border-b border-neutral-800 pb-2">Description</h3>
                            <p className="text-neutral-400 leading-7 text-sm mb-6">
                                {product.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div className="p-3 bg-black/40 rounded border border-neutral-800">
                                    <span className="block text-neutral-500 mb-1">BRAND</span>
                                    <span className="text-white font-bold">{product.brand}</span>
                                </div>
                                <div className="p-3 bg-black/40 rounded border border-neutral-800">
                                    <span className="block text-neutral-500 mb-1">CATEGORY</span>
                                    <span className="text-white font-bold">{product.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Reviews Section --- */}
                <div className="mt-24 border-t border-neutral-800 pt-16">
                    <h2 className="text-3xl font-black text-white mb-10 flex items-center gap-3">
                        <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                        USER REVIEWS
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Review Form */}
                        <div className="lg:col-span-1">
                            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 sticky top-24">
                                <h3 className="text-xl font-bold text-white mb-6">Write a Review</h3>

                                {!userIsAuthenticated ? (
                                    <div className="text-center py-8 border-2 border-dashed border-neutral-800 rounded-xl">
                                        <p className="text-neutral-400 mb-4">Login to share your thoughts</p>
                                        <Link href="/login">
                                            <button className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-bold transition-colors">
                                                Login Now
                                            </button>
                                        </Link>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmitReview} className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Rating</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setReviewRating(star)}
                                                        className={`text-2xl transition-transform hover:scale-110 ${star <= reviewRating ? 'text-red-500' : 'text-neutral-800'}`}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Review</label>
                                            <textarea
                                                value={reviewComment}
                                                onChange={(e) => setReviewComment(e.target.value)}
                                                className="w-full bg-black border border-neutral-800 rounded-lg p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all resize-none h-32"
                                                placeholder="How was the product?"
                                            ></textarea>
                                        </div>

                                        {reviewError && (
                                            <div className="text-red-500 text-sm bg-red-950/30 p-3 rounded border border-red-900/50">
                                                {reviewError}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={submittingReview}
                                            className="w-full bg-white text-black hover:bg-neutral-200 font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                                        >
                                            {submittingReview ? 'Processing...' : 'Submit Review'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Reviews List */}
                        <div className="lg:col-span-2 space-y-4">
                            {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((review) => (
                                    <div key={review._id} className="bg-neutral-900/20 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-white text-lg">{review.name}</h4>
                                                <p className="text-xs text-neutral-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex text-red-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={i < review.rating ? 'opacity-100' : 'text-neutral-800'}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-neutral-300 leading-relaxed text-sm">
                                            {review.comment}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-neutral-900/20 rounded-xl border border-dashed border-neutral-800">
                                    <p className="text-neutral-500">No reviews yet. Be the first!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link href="/shop" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        <span className="font-bold uppercase tracking-widest text-xs">Return to Shop</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;