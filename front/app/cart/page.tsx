"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface CartItem {
  _id?: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 🔧 FIX 1: Normalize the URL ---
  // If the .env variable has '/api' at the end, we remove it so we don't get double /api/api
  const RAW_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  const API_BASE = RAW_URL.replace(/\/api\/?$/, ""); // Removes trailing '/api' or '/api/'

  const getToken = () => {
    if (typeof window !== 'undefined') {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          return JSON.parse(userInfo).token;
        } catch (e) { return null; }
      }
    }
    return null;
  };

  const fetchCart = async () => {
    try {
      const token = getToken();
      if (!token) { setLoading(false); return; }

      // --- 🔧 FIX 2: Correct Fetch Path ---
      // Now it will always be localhost:5001 + /api/cart
      const res = await fetch(`${API_BASE}/api/cart`, {
        cache: 'no-store',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.status === 404) { setCartItems([]); return; }

      const data = await res.json();
      if (res.ok) {
        const validItems = Array.isArray(data) ? data.filter((item: any) => item.product) : [];
        setCartItems(validItems);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, newQty: number) => {
    if (newQty < 1) return;

    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/api/cart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity: newQty })
      });

      if (res.ok) {
        fetchCart();
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!window.confirm("Bu məhsulu səbətdən silmək istədiyinizə əminsiniz?")) return;

    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/api/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setCartItems(prev => prev.filter(item => item.product._id !== productId));
        window.dispatchEvent(new Event("cartUpdated"));
        alert("Məhsul silindi!");
      } else {
        alert("Xəta baş verdi, silinmədi.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // --- 🔧 FIX 3: Image URL Logic ---
  const resolveImage = (img: string) => {
    if (!img) return '/placeholder.png';
    if (img.startsWith('http')) return img;
    // Images usually live at root (localhost:5001/uploads), NOT inside /api
    return `${API_BASE}${img.startsWith('/') ? '' : '/'}${img}`;
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = item.product?.price || 0;
      return acc + (price * item.quantity);
    }, 0).toFixed(2);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="animate-pulse text-red-600 font-bold">YÜKLƏNİR...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-10 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-black mb-10 text-center uppercase tracking-tighter">
          <span className="text-red-600">Sizin</span> Səbətiniz
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/30 rounded-2xl border border-neutral-800 border-dashed">
            <p className="text-2xl font-bold text-neutral-400 mb-2">Səbətiniz boşdur 😕</p>
            <Link href="/shop" className="inline-block mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all">
              ALIŞ-VERİŞƏ BAŞLA
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {cartItems.map((item, index) => (
              item.product ? (
                <div key={item._id || index} className="relative group flex flex-col sm:flex-row items-center justify-between bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl transition-all hover:border-neutral-600">

                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition-colors p-2"
                    title="Sil"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-6 mb-4 sm:mb-0 w-full sm:w-auto">
                    <div className="w-24 h-24 bg-black rounded-lg overflow-hidden border border-neutral-700 flex-shrink-0 relative">
                      {item.product.images && item.product.images.length > 0 ? (
                        <img
                          src={resolveImage(item.product.images[0])}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">No Img</div>
                      )}
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-white uppercase pr-8">{item.product.name}</h2>
                      <p className="text-neutral-500 font-mono text-sm mt-1">
                        ${item.product.price ? item.product.price.toFixed(2) : '0.00'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 sm:mt-0">
                    <div className="flex items-center bg-black border border-neutral-800 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="px-3 py-2 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="px-3 py-2 text-white font-mono min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="px-3 py-2 text-white hover:bg-green-600 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-red-500 font-black text-xl min-w-[100px] text-right">
                      ${((item.product.price || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : null
            ))}

            <div className="mt-10 border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-end items-center gap-6">
              <div className="text-right">
                <p className="text-neutral-400 text-sm font-bold tracking-widest uppercase mb-1">Total Amount</p>
                <p className="text-4xl font-black text-white">
                  ${calculateTotal()}
                </p>
              </div>
              <button className="bg-white text-black hover:bg-neutral-200 px-10 py-4 rounded-xl font-black text-lg uppercase transition-colors">
                Sifarişi Təsdiqlə
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;