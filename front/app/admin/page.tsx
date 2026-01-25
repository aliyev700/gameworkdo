"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Router-i çağırırıq
import AdminSidebar from "@/app/admin/adminsidebar"; 
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

// ... (Product interface eyni qalır)

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // ... (Login yoxlaması eyni qalır)
     if (typeof window !== "undefined") {
      const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")!)
        : null;

      if (!userInfo || !userInfo.isAdmin) {
        router.push("/login");
      } else {
        fetchProducts();
      }
    }
  }, [router]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:127.0.0.1:5001/api/products");
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const deleteHandler = async (id: string) => {
     // ... (Silmək kodu eyni qalır)
     if (window.confirm("Bu məhsulu silməyə əminsiniz?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await axios.delete(`http://localhost:127.0.0.1:5001/api/products/${id}`, config);
        fetchProducts(); 
      } catch (error) {
        alert("Silmək mümkün olmadı.");
      }
    }
  };

  // 🔴 KÖHNƏNİ SİL: createProductHandler lazım deyil, çünki birbaşa form səhifəsinə gedəcəyik.

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="ml-64 w-full p-8">
        
        {loading ? (
           <div className="text-center py-10">Yüklənir...</div>
        ) : (
           <>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Məhsullar</h1>
                    <p className="text-gray-500">Məhsulların idarə edilməsi</p>
                </div>
                
                {/* --- DÜYMƏNİ BURADA DƏYİŞDİK --- */}
                <button
                    onClick={() => router.push("/admin/create-product")} 
                    className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-lg"
                >
                    <FiPlus /> Məhsul Yarat
                </button>
                {/* ---------------------------------- */}
                
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                    <th className="p-4">Məhsul</th>
                    <th className="p-4">Qiymət</th>
                    <th className="p-4">Kateqoriya</th>
                    <th className="p-4">Stok</th>
                    <th className="p-4 text-right">Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden">
                                {/* Şəkil yoxdursa default bir şey göstərsin */}
                                <img src={product.image || "https://via.placeholder.com/50"} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{product.name}</p>
                                <p className="text-xs text-gray-500">{product.brand}</p>
                            </div>
                        </div>
                        </td>
                        <td className="p-4 font-medium">${product.price}</td>
                        <td className="p-4">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                            {product.category}
                        </span>
                        </td>
                        <td className="p-4 text-sm">{product.countInStock}</td>
                        <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                            {/* EDIT düyməsi - Düzəliş səhifəsinə aparır */}
                            <button
                                onClick={() => router.push(`/admin/product/${product._id}/edit`)}
                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                                <FiEdit2 />
                            </button>
                            
                            <button
                                onClick={() => deleteHandler(product._id)}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
           </>
        )}
      </main>
    </div>
  );
}