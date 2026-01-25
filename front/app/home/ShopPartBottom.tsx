'use client';

import { useEffect, useState } from 'react';
import { apiCall } from '../utils/api';
import Link from 'next/link';

interface Game {
    _id: string;
    name: string;
    price: number;
    image: string;
    brand: string;
    category: string;
    rating: number;
    numReviews: number;
    countInStock: number;
}

const ShopPart = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const response = await apiCall('/products');

                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }

                const data = await response.json();
                setAllGames(data);
                setGames(data);

                // Extract unique categories
                const uniqueCategories = [...new Set(data.map((game: Game) => game.category))];
                setCategories(uniqueCategories as string[]);
                setError('');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching games');
                console.error('Error fetching games:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const handleCategoryFilter = (category: string) => {
        setSelectedCategory(category);
        if (category === '') {
            setGames(allGames);
        } else {
            setGames(allGames.filter((game) => game.category === category));
        }
    };

    if (loading) {
        return (
            <section className="bg-black py-20 min-h-[400px] flex items-center justify-center">
                <div className="text-neutral-500 animate-pulse">Loading experience...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-black py-20 text-center">
                <p className="text-red-500">System Error: {error}</p>
            </section>
        );
    }

    return (
        // SECTION BG-ni QARA ETDİM Kİ, KARTLARLA UYĞUNLAŞSIN
        <section className="bg-black py-16 md:py-24">
            <div className="max-w-390 mx-auto px-4 sm:px-6">

                {/* Başlıq və Filter hissəsi - Modernləşdirilib */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
                    <div>

                        <h1 className="text-4xl md:text-4xl font-bold text-white tracking-tighter">
                            Take a Look
                        </h1>
                    </div>

                    <Link href="/shop" className="text-purple-500 font-mono text-sm font-bold tracking-widest uppercase mb-2 block hover:text-purple-400 transition-colors">
                        Browse Full Catalog →
                    </Link>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {games.length > 0 ? (
                        // Changed to slice(-4) to show the LAST 4 games
                        games.slice(-4).map((game) => (

                            <Link href={`/product/${game._id}`} key={game._id} className="group relative block">

                                {/* Card Container */}
                                <div className="relative overflow-hidden bg-neutral-900 border border-neutral-800 rounded-lg transition-all duration-300">

                                    {/* Image Area - DƏYİŞİKLİK BURADA */}
                                    {/* h-140 sildik, aspect-[3/4] əlavə etdik ki, oyun qutusu kimi görünsün */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-neutral-950">
                                        <img
                                            src={game.image}
                                            alt={game.name}
                                            // object-cover şəkli tam oturdur. Əgər şəklin kənarları boş qalsın amma tam görünsün istəyirsənsə 'object-contain' yaz
                                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                        />

                                        {/* Status Badges */}
                                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                                            {game.countInStock === 0 && (
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
                                        {/* ... Burası olduğu kimi qalır ... */}
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-[12px] text-purple-400 font-bold uppercase tracking-widest">
                                                {game.brand}
                                            </p>
                                            <div className="flex flex-col items-end gap-1">
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className={`text-xs ${i < Math.round(game.rating)
                                                                ? 'text-yellow-400'
                                                                : 'text-neutral-700'
                                                                }`}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="text-[10px] font-mono text-neutral-500">
                                                    {game.rating.toFixed(1)} ({game.numReviews})
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-bold text-white leading-tight mb-4 group-hover:text-purple-300 transition-colors line-clamp-2">
                                            {game.name}
                                        </h3>

                                        <div className="flex items-center justify-between border-t border-neutral-800 pt-4 mt-2">
                                            <div className="font-mono text-xl text-white">
                                                ${game.price}
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

                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-neutral-600 font-mono">NO DATA_FOUND IN SECTOR {selectedCategory.toUpperCase()}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ShopPart;