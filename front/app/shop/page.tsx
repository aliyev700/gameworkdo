'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiCall } from '../utils/api';

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

    // --- Logic ---
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
            const uniqueCategories = [...new Set(data.map((p) => p.category))].filter(Boolean);
            const uniqueBrands = [...new Set(data.map((p) => p.brand))].filter(Boolean);
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

            {/* Background Grid Mesh (Subtle Gaming Texture) */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12 max-w-390">

                {/* Page Title */}
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

                    {/* --- Sidebar Filters (The HUD) --- */}
                    <aside className={`w-full lg:w-72 flex-shrink-0`}>
                        <div className="sticky top-24 space-y-8">

                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setExpandFilters(!expandFilters)}
                                className="lg:hidden w-full flex items-center justify-between bg-neutral-900 border border-neutral-800 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                            >
                                <span>Filter Configuration</span>
                                <span>{expandFilters ? '[-]' : '[+]'}</span>
                            </button>

                            {expandFilters && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">

                                    {/* Search Input */}
                                    <div className="group relative">
                                        <input
                                            type="text"
                                            placeholder="SEARCH_DATABASE..."
                                            value={filters.keyword}
                                            onChange={(e) => handleFilterChange('keyword', e.target.value)}
                                            className="w-full bg-neutral-900/50 border-b-2 border-neutral-800 px-3 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors placeholder-neutral-600 font-mono text-white"
                                        />

                                    </div>

                                    {/* Categories */}
                                    <div>
                                        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Class</h3>
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => handleFilterChange('category', '')}
                                                className={`block text-sm w-full text-left transition-all hover:translate-x-1 ${filters.category === '' ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
                                            >
                                                [ ALL_CLASSES ]
                                            </button>
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => handleFilterChange('category', cat)}
                                                    className={`block text-sm w-full text-left transition-all hover:translate-x-1 ${filters.category === cat ? 'text-purple-400 font-bold' : 'text-neutral-400 hover:text-white'}`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Brand & Stock (Selects) */}
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Manufacturer</h3>
                                            <select
                                                value={filters.brand}
                                                onChange={(e) => handleFilterChange('brand', e.target.value)}
                                                className="w-full bg-neutral-900 border border-neutral-800 text-sm p-2 rounded focus:outline-none focus:border-neutral-600 text-neutral-300"
                                            >
                                                <option value="">All Brands</option>
                                                {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
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

                                    {/* Price Slider */}
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Budget</h3>
                                            <span className="font-mono text-sm text-red-500">${filters.maxPrice}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="500"
                                            step="100"
                                            value={filters.maxPrice}
                                            onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-500"
                                        />
                                        <div className="flex justify-between mt-2 text-[10px] text-neutral-600 font-mono">
                                            <span>MIN</span>
                                            <span>MAX</span>
                                        </div>
                                    </div>

                                    {/* Reset Button */}
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

                    {/* --- Product Grid --- */}
                    <main className="flex-1">
                        {/* Results Bar */}
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                                {products.map((product) => (
                                    <Link href={`/product/${product._id}`} key={product._id} className="group relative block">

                                        {/* Card Container */}
                                        <div className="relative overflow-hidden bg-neutral-900 border border-neutral-800 rounded-lg transition-all duration-300">

                                            {/* Image Area */}
                                            <div className="relative  h-140 overflow-hidden bg-neutral-950">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                                />

                                                {/* Status Badges */}
                                                <div className="absolute top-3 left-3 flex flex-col gap-2">
                                                    {product.countInStock === 0 && (
                                                        <span className="px-2 py-1 bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                                                            Offline
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>

                                            {/* Info Area */}
                                            <div className="p-5">
                                                <div className="flex justify-between items-start mb-2">
                                                    <p className="text-[12px] text-purple-400 font-bold uppercase tracking-widest">
                                                        {product.brand}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-yellow-500/80">
                                                        <span className="text-sm">★</span>
                                                        <span className="text-sm font-mono text-neutral-400">{product.rating}</span>
                                                    </div>
                                                </div>

                                                <h3 className="text-lg font-bold text-white leading-tight mb-4 group-hover:text-purple-300 transition-colors line-clamp-2">
                                                    {product.name}
                                                </h3>

                                                <div className="flex items-center justify-between border-t border-neutral-800 pt-4 mt-2">
                                                    <div className="font-mono text-xl text-white">
                                                        ${product.price}
                                                    </div>

                                                    {/* Fake "Add" Button Visual */}
                                                    <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black hover:border-white hover:rotate-z-180 duration-500 transition-all">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Link>
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