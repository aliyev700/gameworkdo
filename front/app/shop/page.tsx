'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiCall } from '../utils/api';
// 👇 Added these imports to make the Card Button work
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../context/CartContsxt';

// --- Types ---
interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    brand: string;
    countInStock: number;
    rating: number;
    numReviews: number;
}

interface Filters {
    keyword: string;
    category: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
    inStock: string;
}

const ShopPage = () => {
    // --- State ---
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<Filters>({
        keyword: '',
        category: '',
        brand: '',
        minPrice: 0,
        maxPrice: 10000,
        inStock: '',
    });
    const [categories, setCategories] = useState<string[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [expandFilters, setExpandFilters] = useState(true);

    // --- Cart & Auth State (Added for the Card Button) ---
    const [addingId, setAddingId] = useState<string | null>(null);
    const { token: hookToken, isAuthenticated } = useAuth();
    const { updateCartCount } = useCart();
    const [localToken, setLocalToken] = useState<string | null>(null);

    // --- Auth Sync Logic ---
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                try {
                    const parsedUser = JSON.parse(userInfo);
                    if (parsedUser.token) setLocalToken(parsedUser.token);
                } catch (err) {
                    console.error("UserInfo parse error", err);
                }
            }
        }
    }, []);

    const activeToken = hookToken || localToken;
    const userIsAuthenticated = !!activeToken || isAuthenticated;

    // --- ADD TO CART HANDLER (Copied from LatestArrivals) ---
    const addToCartHandler = async (product: Product) => {
        if (!userIsAuthenticated) {
            alert("Səbətə məhsul atmaq üçün zəhmət olmasa giriş edin!");
            return;
        }

        try {
            setAddingId(product._id);
            const res = await fetch('http://localhost:5001/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${activeToken}`
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: 1
                })
            });

            if (res.ok) {
                alert(`✅ "${product.name}" səbətə əlavə olundu!`);
                updateCartCount();
                // Reload page on success as requested
                window.location.reload();
            } else {
                const data = await res.json();
                alert(data.message || "Xəta baş verdi");
            }
        } catch (error) {
            console.error("Cart Error:", error);
            alert("Serverlə əlaqə kəsildi");
        } finally {
            setAddingId(null);
        }
    };

    // --- Product Fetching Logic (UNCHANGED) ---
    const fetchProducts = async (filterParams: Filters) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (filterParams.keyword) queryParams.append('keyword', filterParams.keyword);
            if (filterParams.category) queryParams.append('category', filterParams.category);
            if (filterParams.brand) queryParams.append('brand', filterParams.brand);
            if (filterParams.minPrice > 0) queryParams.append('minPrice', String(filterParams.minPrice));
            if (filterParams.maxPrice < 10000) queryParams.append('maxPrice', String(filterParams.maxPrice));
            if (filterParams.inStock) queryParams.append('inStock', filterParams.inStock);

            const response = await apiCall(`/products?${queryParams.toString()}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFilterOptions = async () => {
        try {
            const response = await apiCall('/products');
            const data: Product[] = await response.json();

            const uniqueCategories = [...new Set(data.map((p: any) =>
                typeof p.category === 'object' ? p.category?.name : p.category
            ))].filter(Boolean);

            const uniqueBrands = [...new Set(data.map((p: any) =>
                typeof p.brand === 'object' ? p.brand?.name : p.brand
            ))].filter(Boolean);

            setCategories(uniqueCategories as string[]);
            setBrands(uniqueBrands as string[]);
        } catch (error) {
            console.error('Error fetching filter options:', error);
        }
    };

    useEffect(() => {
        fetchFilterOptions();
        fetchProducts(filters);
    }, []);
    // --- EXACT IMAGE LOGIC FROM DETAIL PAGE ---
    const getImageUrl = (url: any) => {
        if (!url) return '';
        if (typeof url === 'object') return '';
        if (url.startsWith('http')) return url;
        // This assumes your backend is on 5001 as per your detail page code
        return `http://localhost:5001${url}`;
    };
    const handleFilterChange = (key: keyof Filters, value: string | number) => {
        const updatedFilters = { ...filters, [key]: value };
        setFilters(updatedFilters);
        fetchProducts(updatedFilters);
    };

    const resetFilters = () => {
        const newFilters: Filters = {
            keyword: '',
            category: '',
            brand: '',
            minPrice: 0,
            maxPrice: 10000,
            inStock: '',
        };
        setFilters(newFilters);
        fetchProducts(newFilters);
    };

    // --- UI Components ---

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-purple-500/30">

            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12 max-w-390">

                <div className="mb-12 border-b border-neutral-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase">
                            Hardware <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Vault</span>
                        </h1>
                        <p className="text-neutral-500 mt-2 font-mono text-sm tracking-wide">
                            // HIGH_PERFORMANCE_GEAR
                        </p>
                    </div>
                    <div className="font-mono text-xs text-neutral-600">
                        SYSTEM_STATUS: ONLINE
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    <aside className={`w-full lg:w-72 flex-shrink-0`}>
                        <div className="sticky top-8 space-y-8">
                            <button
                                onClick={() => setExpandFilters(!expandFilters)}
                                className="lg:hidden w-full flex items-center justify-between bg-neutral-900 border border-neutral-800 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                            >
                                <span>Filter Configuration</span>
                                <span>{expandFilters ? '[-]' : '[+]'}</span>
                            </button>

                            {expandFilters && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="group relative">
                                        <input
                                            type="text"
                                            placeholder="SEARCH_DATABASE..."
                                            value={filters.keyword}
                                            onChange={(e) => handleFilterChange('keyword', e.target.value)}
                                            className="w-full bg-neutral-900/50 border-b-2 border-neutral-800 px-3 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors placeholder-neutral-600 font-mono text-white"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Class</h3>
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => handleFilterChange('category', '')}
                                                className={`block text-sm w-full text-left transition-all hover:translate-x-1 ${filters.category === '' ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
                                            >
                                                [ ALL_CLASSES ]
                                            </button>
                                            {categories.map((cat, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleFilterChange('category', cat)}
                                                    className={`block text-sm w-full text-left transition-all hover:translate-x-1 ${filters.category === cat ? 'text-purple-400 font-bold' : 'text-neutral-400 hover:text-white'}`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Manufacturer</h3>
                                            <select
                                                value={filters.brand}
                                                onChange={(e) => handleFilterChange('brand', e.target.value)}
                                                className="w-full bg-neutral-900 border border-neutral-800 text-sm p-2 rounded focus:outline-none focus:border-neutral-600 text-neutral-300"
                                            >
                                                <option value="">All Brands</option>
                                                {brands.map((brand, index) => <option key={index} value={brand}>{brand}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Availability</h3>
                                            <select
                                                value={filters.inStock}
                                                onChange={(e) => handleFilterChange('inStock', e.target.value)}
                                                className="w-full bg-neutral-900 border border-neutral-800 text-sm p-2 rounded focus:outline-none focus:border-neutral-600 text-neutral-300"
                                            >
                                                <option value="">Any Status</option>
                                                <option value="true">Available Now</option>
                                                <option value="false">Out of Stock</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Budget</h3>
                                            <span className="font-mono text-sm text-red-500">${filters.maxPrice}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="500"
                                            step="1"
                                            value={filters.maxPrice}
                                            onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-500"
                                        />
                                        <div className="flex justify-between mt-2 text-[10px] text-neutral-600 font-mono">
                                            <span>MIN</span>
                                            <span>MAX</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={resetFilters}
                                        className="w-full py-3 border border-neutral-800 hover:bg-white hover:text-black hover:border-white transition-all duration-200 text-xs font-bold tracking-widest uppercase rounded"
                                    >
                                        Reset Config
                                    </button>
                                </div>
                            )}
                        </div>
                    </aside>

                    <main className="flex-1">
                        <div className="mb-6 flex items-center justify-between text-sm">
                            <span className="text-neutral-500 font-mono">
                                FOUND: <span className="text-white">{products.length}</span> UNIT(S)
                            </span>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="aspect-[4/5] bg-neutral-900 rounded-lg"></div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="py-20 text-center border border-dashed border-neutral-800 rounded-xl">
                                <h2 className="text-2xl font-bold text-neutral-400 mb-2">NO SIGNALS DETECTED</h2>
                                <p className="text-neutral-600 mb-6">Modify filter parameters to locate items.</p>
                                <button onClick={resetFilters} className="text-red-500 hover:text-red-400 underline decoration-red-500/30 underline-offset-4">Clear Filters</button>
                            </div>
                        ) : (
                            // 👇 GRID WITH THE NEW CARD DESIGN
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                                {products.map((product) => (
                                    <div key={product._id} className="group relative bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]">

                                        {/* Corrected Image URL Logic */}
                                        <Link href={`/product/${product._id}`} className="block relative h-95 overflow-hidden bg-neutral-900">
                                            <img
                                                src={getImageUrl(product.image)}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image'; }}
                                            />
                                            {product.countInStock === 0 && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <span className="border-2 border-red-600 px-4 py-1 text-red-600 font-black rotate-12 uppercase">Sold Out</span>
                                                </div>
                                            )}
                                        </Link>

                                        <div className="p-5 space-y-4">
                                            <div>
                                                <h3 className="text-white font-black text-lg uppercase truncate">{product.name}</h3>
                                                <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-[10px] font-black text-neutral-400 uppercase">
                                                    {product.brand}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="text-2xl font-black text-white">
                                                    <span className="text-red-600 text-sm align-top mr-0.5">$</span>
                                                    {product.price.toFixed(2)}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => addToCartHandler(product)}
                                                disabled={addingId === product._id || product.countInStock === 0}
                                                className={`w-full relative overflow-hidden cursor-pointer group/btn bg-red-600 hover:bg-red-700 text-white font-black text-xs py-4 px-4 rounded-lg transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] ${(addingId === product._id || product.countInStock === 0) ? 'opacity-70 cursor-not-allowed' : ''
                                                    }`}
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-2 tracking-widest">
                                                    {addingId === product._id ? 'ADDING...' : 'ADD TO CART'}
                                                </span>
                                                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:left-full transition-all duration-700 skew-x-12 ease-in-out"></div>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;