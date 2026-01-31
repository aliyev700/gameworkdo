"use client";

import React, { useEffect, useState, use } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = use(params);
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const userStr = localStorage.getItem("userInfo");

        if (!userStr) {
          setError("Giriş edilməyib (User tapılmadı). Zəhmət olmasa Login olun.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userStr);
        setUserInfo(user);

        const config = { headers: { Authorization: `Bearer ${user.token}` } };

        const { data } = await axios.get(`http://localhost:5001/api/orders/${id}`, config);
        setOrder(data);

      } catch (err: any) {
        console.error(err);

        setError(err.response?.data?.message || err.message || "Sifariş tapılmadı");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const deliverHandler = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`http://localhost:5001/api/orders/${order._id}/deliver`, {}, config);
      alert("Status: Çatdırıldı!");
      window.location.reload();
    } catch (err) { alert("Xəta baş verdi"); }
  };

  const payHandler = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`http://localhost:5001/api/orders/${order._id}/pay`, {}, config);
      alert("Status: Ödənildi!");
      window.location.reload();
    } catch (err) { alert("Xəta baş verdi"); }
  };

  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-2xl animate-pulse">Sifariş Yüklənir...</h1>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-black text-red-500 flex flex-col items-center justify-center gap-4 p-10 text-center">
      <h1 className="text-3xl font-bold">XƏTA BAŞ VERDİ</h1>
      <p className="text-xl text-white">{error}</p>
      <Link href="/" className="bg-gray-800 text-white px-6 py-3 rounded mt-4">
        Ana Səhifəyə Qayıt
      </Link>
    </div>
  );

  if (!order) return <div className="text-white p-20 text-center">Məlumat yoxdur</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 md:px-20 font-sans pb-10">

      { }
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-red-600">ORDER: {order._id}</h1>
          <p className="text-gray-500 text-sm">Tarix: {order.createdAt?.substring(0, 10)}</p>
        </div>
        <Link href="/profile" className="bg-gray-800 px-4 py-2 rounded text-sm hover:bg-gray-700">
          Profilimə Qayıt
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        { }
        <div className="md:col-span-2 space-y-6">

          { }
          <div className="border border-gray-800 p-6 rounded bg-[#111]">
            <h2 className="text-xl font-bold mb-3 border-b border-gray-800 pb-2">Çatdırılma</h2>
            <p><strong className="text-gray-400">Ad:</strong> {order.user?.name}</p>
            <p><strong className="text-gray-400">Email:</strong> {order.user?.email}</p>
            <p className="mt-2">
              <strong className="text-gray-400">Ünvan:</strong><br />
              {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.country}
            </p>


          </div>

          { }
          <div className="border border-gray-800 p-6 rounded bg-[#111]">
            <h2 className="text-xl font-bold mb-3 border-b border-gray-800 pb-2">Ödəniş</h2>
            <p><strong className="text-gray-400">Metod:</strong> {order.paymentMethod}</p>

            {order.isPaid ? (
              <div className="mt-4 bg-green-900/30 text-green-500 p-3 rounded text-center border border-green-900">Ödənilib</div>
            ) : (
              <div className="mt-4 bg-red-900/30 text-red-500 p-3 rounded text-center border border-red-900">Ödənilməyib</div>
            )}
          </div>

          { }
          <div className="border border-gray-800 p-6 rounded bg-[#111]">
            <h2 className="text-xl font-bold mb-3 border-b border-gray-800 pb-2">Məhsullar</h2>
            {order.orderItems?.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-800 py-4 last:border-0">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image?.startsWith("http") ? item.image : `http://localhost:5001${item.image}`}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded border border-gray-700"
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="text-gray-400">{item.qty} x ${item.price} = <span className="text-white font-bold">${(item.qty * item.price).toFixed(2)}</span></span>
              </div>
            ))}
          </div>
        </div>

        { }
        <div className="md:col-span-1 space-y-6">
          <div className="border border-gray-800 p-6 rounded bg-[#111] sticky top-24">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">Yekun</h2>
            <div className="flex justify-between mb-2 text-gray-400"><span>Məhsullar</span><span>${order.itemsPrice}</span></div>
            <div className="flex justify-between mb-2 text-gray-400"><span>Çatdırılma</span><span>${order.shippingPrice}</span></div>
            <div className="flex justify-between mb-2 text-gray-400"><span>Vergi</span><span>${order.taxPrice}</span></div>
            <div className="flex justify-between font-bold text-xl mt-4 border-t border-gray-800 pt-4">
              <span>Cəmi</span>
              <span className="text-red-500">${order.totalPrice}</span>
            </div>

            { }
            {userInfo && userInfo.isAdmin && (
              <div className="mt-8 pt-6 border-t border-gray-700 space-y-3">
                {!order.isPaid && (
                  <button onClick={payHandler} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded">Mark As Paid</button>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}