"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  // --- URL Tənzimləmələri ---
  const RAW_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  const API_BASE = RAW_URL.replace(/\/api\/?$/, "");

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
      } 
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const resolveImage = (img: string) => {
    if (!img) return '/placeholder.png';
    if (img.startsWith('http')) return img;
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

  const handleCheckout = () => {
     if(cartItems.length === 0) return;
     router.push('/checkout'); 
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="animate-pulse text-red-600 font-bold">LOADING...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-10 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-black mb-10 text-center uppercase tracking-tighter">
          <span className="text-red-600">Your</span> Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/30 rounded-2xl border border-neutral-800 border-dashed">
            <p className="text-2xl font-bold text-neutral-400 mb-2">Your cart is empty 😕</p>
            <Link href="/shop" className="inline-block mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all">
              LET'S SHOP
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {cartItems.map((item, index) => (
              item.product ? (
                <div key={item._id || index} className="relative group flex flex-col sm:flex-row items-center justify-between bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl transition-all hover:border-neutral-600">
                  
                  {/* --- YENİLƏNMİŞ HİSSƏ: İçi dolu standart Zibil Qutusu --- */}
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="absolute top-4 right-4 text-neutral-500 hover:text-red-600 transition-colors p-2"
                    title="Sil"
                  >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                     <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.814 15 4.69v.172a49.22 49.22 0 01-6 0v-.172c0-.876.61-1.64 1.364-1.666zm6.914 13.156l-.666-8.662a.75.75 0 00-1.492.115l.666 8.662a.75.75 0 001.492-.115zm-3.25 0l-.135-8.662a.75.75 0 00-1.498.057l.135 8.662a.75.75 0 001.498-.057zm-3.25 0l.4-8.662a.75.75 0 00-1.498-.057l-.4 8.662a.75.75 0 001.498.057z" clipRule="evenodd" />
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
              
              <button 
                onClick={handleCheckout}
                className="bg-white text-black hover:bg-neutral-200 px-10 py-4 rounded-xl font-black text-lg uppercase transition-colors"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;