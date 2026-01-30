"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null);

  // Form məlumatları
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  // --- Hesablamalar ---
  const itemsPrice = cartItems.reduce((acc, item) => {
    // Məhsulun qiyməti yoxdursa 0 götür
    const price = item.product?.price || 0; 
    return acc + price * item.quantity;
  }, 0);
  
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = itemsPrice * 0.15; // 15% vergi
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // --- Tokeni almaq ---
  const getToken = () => {
    if (typeof window !== 'undefined') {
      const u = localStorage.getItem('userInfo');
      // Token yoxdursa null qaytar
      return u ? JSON.parse(u).token : null;
    }
    return null;
  };

  // --- Şəkilləri düzəldən funksiya ---
  const resolveImage = (img: string) => {
    if (!img) return '/placeholder.png';
    if (img.startsWith('http')) return img;
    // Backend 5001-dədir, şəkillər oradan gəlir
    return `http://localhost:5001${img.startsWith('/') ? '' : '/'}${img}`;
  };

  // --- Səbəti Serverdən Gətirən Funksiya (DÜZƏLDİLDİ) ---
  const fetchCartFromServer = async () => {
    try {
      const token = getToken();
      
      if (!token) {
        // Token yoxdursa, deməli giriş edilməyib
        return; 
      }

      // Birbaşa 5001 portuna müraciət edirik
      const res = await fetch(`http://localhost:5001/api/cart`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        // Əgər səbət boşdursa və ya data gəlməyibsə
        if (!data || data.length === 0) {
           console.log("Səbət boşdur");
           return;
        }
        setCartItems(data);
      } else {
        console.error("Server xətası:", res.status);
        if (res.status === 401) {
            // Tokenin vaxtı bitibsə
            localStorage.removeItem("userInfo");
            router.push("/login");
        }
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 1. User yoxlanışı
    const userStr = localStorage.getItem("userInfo");
    if (!userStr) {
      router.push("/login");
      return;
    }
    setUserInfo(JSON.parse(userStr));

    // 2. Yaddaşda ünvan varsa gətir
    const savedAddress = JSON.parse(localStorage.getItem("shippingAddress") || "null");
    if (savedAddress) {
      setFormData((prev) => ({ ...prev, ...savedAddress }));
    }

    // 3. Səbəti Serverdən gətir
    fetchCartFromServer();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = getToken();
      
      // Ünvanı yaddaşa yazaq
      const addressData = {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      };
      localStorage.setItem("shippingAddress", JSON.stringify(addressData));

      const orderData = {
        orderItems: cartItems.map(item => ({
            product: item.product._id,
            name: item.product.name,
            qty: item.quantity,
            image: item.product.images?.[0] || "",
            price: item.product.price
        })),
        shippingAddress: addressData,
        paymentMethod: "Card",
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      };

      const res = await fetch(`http://localhost:5001/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Ödəniş uğurlu oldu! Sifarişiniz qəbul edildi. 🎉");
        router.push(`/order/${data._id}`); // Sifariş səhifəsinə yönləndir
      } else {
        alert(data.message || "Xəta baş verdi");
      }

    } catch (error: any) {
      console.error(error);
      alert("Server xətası, zəhmət olmasa yenidən yoxlayın.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Checkout...</div>;

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row pt-20">
      
      {/* SOL TƏRƏF - Formalar */}
      <div className="w-full md:w-[60%] lg:w-[55%] p-6 md:p-12 md:pl-20 border-r border-gray-800">
        
        <div className="mb-8">
           <h1 className="text-3xl font-black text-red-600 tracking-tighter uppercase">CHECKOUT</h1>
        </div>

        <form onSubmit={submitHandler} className="max-w-xl">
          
          {/* Contact Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <input
              type="email"
              value={userInfo?.email || ""}
              readOnly
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Delivery Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="country"
                placeholder="Country/Region"
                required
                value={formData.country}
                onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded focus:border-red-600 focus:outline-none transition-colors"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded focus:border-red-600 focus:outline-none"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-1/2 p-3 bg-black border border-gray-700 rounded focus:border-red-600 focus:outline-none"
                />
                 <input
                  type="text"
                  name="postalCode"
                  placeholder="ZIP code"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-1/2 p-3 bg-black border border-gray-700 rounded focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            
            <div className="border border-gray-700 rounded bg-gray-900/50 p-4">
               <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
                  <span className="font-bold">Credit card</span>
                  <div className="w-8 h-5 bg-orange-500 rounded"></div> 
               </div>
               
               <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card number"
                    maxLength={16}
                    required
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border border-gray-700 rounded focus:border-red-600 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Name on card"
                    required
                    value={formData.cardName}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border border-gray-700 rounded focus:border-red-600 focus:outline-none"
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="expDate"
                      placeholder="MM / YY"
                      required
                      value={formData.expDate}
                      onChange={handleChange}
                      className="w-1/2 p-3 bg-black border border-gray-700 rounded focus:border-red-600 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      maxLength={3}
                      required
                      value={formData.cvv}
                      onChange={handleChange}
                      className="w-1/2 p-3 bg-black border border-gray-700 rounded focus:border-red-600 focus:outline-none"
                    />
                  </div>
               </div>
            </div>
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#D23F3F] hover:bg-[#b83232] text-white py-4 rounded font-bold text-lg transition-all shadow-lg shadow-red-900/20 disabled:opacity-50"
          >
            {submitting ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
          </button>
        </form>
      </div>

      {/* SAĞ TƏRƏF - Order Summary */}
      <div className="w-full md:w-[40%] lg:w-[45%] bg-[#111] p-6 md:p-12 border-l border-gray-800">
        <div className="max-w-md sticky top-24">
            
            <h3 className="text-xl font-bold mb-6 text-gray-400 uppercase tracking-widest">Order Summary</h3>

            {/* Products List */}
            <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item, index) => (
                item.product ? (
                <div key={item._id || index} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 border border-gray-700 rounded overflow-hidden bg-gray-800">
                       <img 
                        src={resolveImage(item.product.images?.[0])} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover" 
                       />
                       <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border border-black">
                         {item.quantity}
                       </span>
                    </div>
                    <div>
                        <p className="font-bold text-sm text-gray-200 group-hover:text-red-500 transition-colors">{item.product.name}</p>
                        <p className="text-xs text-gray-500">
                            ${item.product.price} x {item.quantity}
                        </p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-300">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                ) : null
              ))}
            </div>

            <hr className="border-gray-800 mb-6" />

            {/* Calculations */}
            <div className="space-y-3 text-sm text-gray-400">
               <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">${itemsPrice.toFixed(2)}</span>
               </div>
               <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white font-bold">
                     {shippingPrice === 0 ? "Free" : `$${shippingPrice}`}
                  </span>
               </div>
               <div className="flex justify-between">
                  <span>Tax (15%)</span>
                  <span className="text-white font-bold">${taxPrice.toFixed(2)}</span>
               </div>
            </div>

            <hr className="border-gray-800 my-6" />

            {/* Total */}
            <div className="flex justify-between items-center">
               <span className="text-lg font-normal text-gray-300">Total</span>
               <div className="flex items-end gap-2">
                  <span className="text-xs text-gray-500 mb-1">USD</span>
                  <span className="text-3xl font-bold text-white">${totalPrice.toFixed(2)}</span>
               </div>
            </div>

        </div>
      </div>

    </div>
  );
}