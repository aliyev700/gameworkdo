"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/app/admin/adminsidebar";
import { FiEdit2, FiTrash2, FiPlus, FiLayers } from "react-icons/fi";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
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
      const { data } = await axios.get("http://localhost:5001/api/products");
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const deleteHandler = async (id: string) => {
    if (window.confirm("Bu məhsulu silməyə əminsiniz?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await axios.delete(`http://localhost:5001/api/products/${id}`, config);
        setProducts(products.filter((p) => p._id !== id));
      } catch (error) {
        alert("Silmək mümkün olmadı.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex text-black">
      <AdminSidebar />
      <main className="ml-64 w-full p-8">

        {loading ? (
          <div className="text-center py-10 font-medium text-gray-600">Məlumatlar yüklənir...</div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Məhsullar</h1>
                <p className="text-gray-500 text-sm">Cəmi {products.length} məhsul var</p>
              </div>

              <button
                onClick={() => router.push("/admin/create-product")}
                className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <FiPlus /> Məhsul Yarat
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                    <th className="p-4">Məhsul</th>
                    <th className="p-4">Qiymət</th>
                    <th className="p-4">Kateqoriya</th>
                    <th className="p-4">Versiyalar</th>
                    <th className="p-4">Stok</th>
                    <th className="p-4 text-right">Əməliyyatlar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden border border-gray-200">
                            <img 
                                src={product.image ? `http://localhost:5001${product.image}` : "https://via.placeholder.com/50"} 
                                alt={product.name} 
                                className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500 font-medium">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-gray-800">${product.price}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium border border-gray-200">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4">
                        {product.styles && product.styles.length > 0 ? (
                            <span className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100 w-fit">
                                <FiLayers /> {product.styles.length} Versiya
                            </span>
                        ) : (
                            <span className="text-xs text-gray-400">Yoxdur</span>
                        )}
                      </td>
                      <td className="p-4">
                         <span className={`text-sm font-medium ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {product.countInStock > 0 ? `${product.countInStock} ədəd` : 'Bitib'}
                         </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => router.push(`/admin/product/${product._id}/edit`)}
                            className="p-2 text-blue-500 hover:text-white hover:bg-blue-600 rounded-lg transition-colors shadow-sm border border-gray-200 hover:border-blue-600"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => deleteHandler(product._id)}
                            className="p-2 text-red-500 hover:text-white hover:bg-red-600 rounded-lg transition-colors shadow-sm border border-gray-200 hover:border-red-600"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && (
                  <div className="text-center p-10 text-gray-500">Hələ heç bir məhsul yoxdur.</div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}