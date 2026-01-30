'use client';

import { useEffect, useState } from 'react';
import { apiCall } from '../utils/api';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../context/CartContsxt';

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

const LatestArrivals = () => {
    // --- STATE ---
    const [games, setGames] = useState<Game[]>([]);
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    // Cart State
    const [addingId, setAddingId] = useState<string | null>(null);
    const { token: hookToken, isAuthenticated } = useAuth();
    const { updateCartCount } = useCart();
    const [localToken, setLocalToken] = useState<string | null>(null);

    // --- AUTH LOGIC ---
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

    // --- CART HANDLER (UPDATED WITH RELOAD) ---
    const addToCartHandler = async (game: Game) => {
        if (!userIsAuthenticated) {
            alert("Səbətə məhsul atmaq üçün zəhmət olmasa giriş edin!");
            return;
        }

        try {
            setAddingId(game._id);
            // Using hardcoded URL here to match your setup
            const res = await fetch('http://localhost:5001/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${activeToken}`
                },
                body: JSON.stringify({
                    productId: game._id,
                    quantity: 1
                })
            });

            if (res.ok) {
                alert(`✅ "${game.name}" səbətə əlavə olundu!`);
                updateCartCount();

                // 👇 THIS RELOADS THE PAGE 👇
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

    // --- FETCH DATA ---
    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const response = await apiCall('/products');

                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setAllGames(data);
                    setGames(data);
                    const uniqueCategories = [...new Set(data.map((game: Game) => game.category))];
                    setCategories(uniqueCategories as string[]);
                }
                setError('');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching games');
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    // --- FILTER LOGIC ---
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
        <section className="bg-black py-16 md:py-24">
            <div className="max-w-390 mx-auto px-4 sm:px-6">

                {/* --- HEADER & FILTERS --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
                    <div>
                        <span className="text-purple-500 font-mono text-sm font-bold tracking-widest uppercase mb-2 block">
                            Discover
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                            Latest Arrivals
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleCategoryFilter('')}
                            className={`px-5 py-2 rounded text-sm font-bold transition-all border ${selectedCategory === ''
                                ? 'bg-white text-black border-white'
                                : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                                }`}
                        >
                            ALL
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryFilter(category)}
                                className={`px-5 py-2 rounded text-sm font-bold transition-all border ${selectedCategory === category
                                    ? 'bg-red-600 text-white border-red-600 shadow-[0_0_15px_rgba(147,51,234,0.5)]'
                                    : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                                    }`}
                            >
                                {category.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- GRID & CARDS --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {games.length > 0 ? (
                        games.slice(0, 4).map((game) => (
                            <div key={game._id} className="group relative bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]">

                                <Link href={`/product/${game._id}`} className="block relative h-95 overflow-hidden bg-neutral-900">
                                    <img
                                        src={game.image.startsWith('http') ? game.image : `http://localhost:5001${game.image}`}
                                        alt={game.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image'; }}
                                    />
                                    {game.countInStock === 0 && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <span className="border-2 border-red-600 px-4 py-1 text-red-600 font-black rotate-12 uppercase">Sold Out</span>
                                        </div>
                                    )}
                                </Link>

                                <div className="p-5 space-y-4">
                                    <div>
                                        <h3 className="text-white font-black text-lg uppercase truncate">{game.name}</h3>
                                        <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-[10px] font-black text-neutral-400 uppercase">
                                            {typeof game.brand === 'object' ? (game.brand as any).name : game.brand}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-2xl font-black text-white">
                                            <span className="text-red-600 text-sm align-top mr-0.5">$</span>
                                            {game.price.toFixed(2)}
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCartHandler(game);
                                        }}
                                        disabled={addingId === game._id || game.countInStock === 0}
                                        className={`w-full relative overflow-hidden group/btn bg-red-600 hover:bg-red-700 text-white font-black text-xs cursor-pointer py-4 px-4 rounded-lg transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] ${(addingId === game._id || game.countInStock === 0) ? 'opacity-70 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2 tracking-widest">
                                            {addingId === game._id ? 'ADDING...' : 'ADD TO CART'}
                                        </span>
                                        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:left-full transition-all duration-700 skew-x-12 ease-in-out"></div>
                                    </button>
                                </div>
                            </div>
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

export default LatestArrivals;