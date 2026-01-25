'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiCall } from '../utils/api';

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

    // Fetch products with filters
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

    // Fetch all products to extract unique categories and brands
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

    // Handle filter changes
    const handleFilterChange = (key: keyof Filters, value: string | number) => {
        const updatedFilters = { ...filters, [key]: value };
        setFilters(updatedFilters);
        fetchProducts(updatedFilters);
    };

    const handlePriceRangeChange = (min: number, max: number) => {
        const updatedFilters = { ...filters, minPrice: min, maxPrice: max };
        setFilters(updatedFilters);
        fetchProducts(updatedFilters);
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Shop</h1>
                    <p className="text-blue-100">Browse our amazing collection of games</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-64 flex-shrink-0">
                        <div className="sticky top-8 bg-white rounded-lg shadow-md p-6 space-y-6">
                            <h3 className="text-xl font-bold text-gray-800">Filters</h3>

                            {/* Search */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search games..."
                                    value={filters.keyword}
                                    onChange={(e) => handleFilterChange('keyword', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Category
                                </label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Brand Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Brand
                                </label>
                                <select
                                    value={filters.brand}
                                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Brands</option>
                                    {brands.map((brand) => (
                                        <option key={brand} value={brand}>
                                            {brand}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Price Range
                                </label>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-gray-600 block mb-1">
                                            Min: ${filters.minPrice}
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="10000"
                                            value={filters.minPrice}
                                            onChange={(e) =>
                                                handlePriceRangeChange(Number(e.target.value), filters.maxPrice)
                                            }
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 block mb-1">
                                            Max: ${filters.maxPrice}
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="10000"
                                            value={filters.maxPrice}
                                            onChange={(e) =>
                                                handlePriceRangeChange(filters.minPrice, Number(e.target.value))
                                            }
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Stock Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Stock Status
                                </label>
                                <select
                                    value={filters.inStock}
                                    onChange={(e) => handleFilterChange('inStock', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Products</option>
                                    <option value="true">In Stock</option>
                                    <option value="false">Out of Stock</option>
                                </select>
                            </div>

                            {/* Reset Filters */}
                            <button
                                onClick={() => {
                                    const resetFilters: Filters = {
                                        keyword: '',
                                        category: '',
                                        brand: '',
                                        minPrice: 0,
                                        maxPrice: 10000,
                                        inStock: '',
                                    };
                                    setFilters(resetFilters);
                                    fetchProducts(resetFilters);
                                }}
                                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <main className="flex-1">
                        {loading ? (
                            <div className="flex justify-center items-center h-96">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                    <p className="text-gray-600">Loading games...</p>
                                </div>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="flex justify-center items-center h-96">
                                <div className="text-center">
                                    <p className="text-2xl font-semibold text-gray-800 mb-2">
                                        No games found
                                    </p>
                                    <p className="text-gray-600">Try adjusting your filters</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="mb-4 text-gray-600">
                                    Showing {products.length} game(s)
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <Link href={`/product/${product._id}`} key={product._id}>
                                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer group">
                                                {/* Image */}
                                                <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                    />
                                                    {product.countInStock === 0 && (
                                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                            <span className="text-white font-bold text-lg">
                                                                Out of Stock
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="p-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                                                        {product.name}
                                                    </h3>

                                                    <p className="text-sm text-gray-500 mb-2">
                                                        {product.brand} • {product.category}
                                                    </p>

                                                    {/* Rating */}
                                                    <div className="flex items-center gap-1 mb-3">
                                                        <span className="text-yellow-400">★</span>
                                                        <span className="text-sm text-gray-700">
                                                            {product.rating.toFixed(1)}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            ({product.numReviews})
                                                        </span>
                                                    </div>

                                                    {/* Price and Stock */}
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-2xl font-bold text-blue-600">
                                                            ${product.price.toFixed(2)}
                                                        </span>
                                                        <span
                                                            className={`text-sm font-semibold px-2 py-1 rounded ${product.countInStock > 0
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                                }`}
                                                        >
                                                            {product.countInStock > 0
                                                                ? `${product.countInStock} left`
                                                                : 'Out'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;