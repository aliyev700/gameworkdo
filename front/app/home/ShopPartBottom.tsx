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

const FeaturedGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [addingId, setAddingId] = useState<string | null>(null);

    const { token: hookToken, isAuthenticated } = useAuth();
    const { updateCartCount } = useCart();
    const [localToken, setLocalToken] = useState<string | null>(null);

    // Sync auth logic
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

    // --- EXACT IMAGE LOGIC FROM DETAIL PAGE ---
    const getImageUrl = (url: any) => {
        if (!url) return '';
        if (typeof url === 'object') return '';
        if (url.startsWith('http')) return url;
        // This assumes your backend is on 5001 as per your detail page code
        return `http://localhost:5001${url}`;
    };

    const addToCartHandler = async (game: Game) => {
        if (!userIsAuthenticated) {
            alert("Səbətə məhsul atmaq üçün zəhmət olmasa giriş edin!");
            return;
        }

        try {
            setAddingId(game._id);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

            const res = await fetch(`${apiUrl}/cart/add`, {
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

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const response = await apiCall('/products');
                if (!response.ok) throw new Error('Failed to fetch games');
                const data = await response.json();
                // ONLY SHOW 4 ITEMS
                setGames(data.slice(-10).reverse().slice(0, 4));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching games');
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    if (loading) return <div className="bg-black py-20 text-center text-red-600 font-bold animate-pulse">LOADING...</div>;

    return (
        <section className="bg-black py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {games.map((game) => (
                        <div key={game._id} className="group relative bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]">

                            {/* Corrected Image URL Logic */}
                            <Link href={`/product/${game._id}`} className="block relative h-95 overflow-hidden bg-neutral-900">
                                <img
                                    src={getImageUrl(game.image)}
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
                                        {game.brand}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-2xl font-black text-white">
                                        <span className="text-red-600 text-sm align-top mr-0.5">$</span>
                                        {game.price.toFixed(2)}
                                    </div>
                                </div>

                                <button
                                    onClick={() => addToCartHandler(game)}
                                    disabled={addingId === game._id || game.countInStock === 0}
                                    className={`w-full relative overflow-hidden cursor-pointer group/btn bg-red-600 hover:bg-red-700 text-white font-black text-xs py-4 px-4 rounded-lg transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] ${(addingId === game._id || game.countInStock === 0) ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 tracking-widest">
                                        {addingId === game._id ? 'ADDING...' : 'ADD TO CART'}
                                    </span>
                                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:left-full transition-all duration-700 skew-x-12 ease-in-out"></div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedGames;