"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { FiSave, FiArrowLeft } from "react-icons/fi";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams(); // URL-dən ID-ni götürmək üçün
  const productId = params.id;

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    image: "",
    images: "", // Vergüllə ayrılmış string kimi qəbul edəcəyik
    brand: "",
    category: "",
    countInStock: 0,
    description: "",
    styles: "", // Vergüllə ayrılmış string
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5001/api/products/${productId}`);

        // Backend-dən gələn Array-ləri vergüllü stringə çeviririk ki, inputda görünsün
        setFormData({
          name: data.name,
          price: data.price,
          image: data.image,
          brand: data.brand,
          category: data.category,
          countInStock: data.countInStock,
          description: data.description,
          styles: data.styles ? data.styles.join(", ") : "",
          images: data.images ? data.images.join(", ") : "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Xəta:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // String-ləri yenidən Array-ə çeviririk
      const updatedProduct = {
        ...formData,
        styles: formData.styles.split(",").map((s) => s.trim()),
        images: formData.images.split(",").map((s) => s.trim()),
      };

      await axios.put(`http://localhost:127.0.0.1:5001/api/products/${productId}`, updatedProduct, config);

      alert("Məhsul uğurla yeniləndi!");
      router.push("/admin/dashboard"); // Və ya products səhifəsinə

    } catch (error: any) {
      alert(error.response?.data?.message || "Xəta baş verdi");
    }
  };

  if (loading) return <div className="text-white p-10">Yüklənir...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center">
      <div className="w-full max-w-2xl mb-6 flex justify-between items-center">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white">
          <FiArrowLeft /> Geri
        </button>
        <h1 className="text-3xl font-bold">Məhsulu Redaktə Et</h1>
      </div>

      <form onSubmit={submitHandler} className="w-full max-w-2xl space-y-4 border border-gray-800 p-8 rounded bg-gray-900/50">

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Ad</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              className="w-full bg-black p-3 rounded border border-gray-700 focus:border-red-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Qiymət</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange}
              className="w-full bg-black p-3 rounded border border-gray-700 focus:border-red-500 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Əsas Şəkil URL</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange}
            className="w-full bg-black p-3 rounded border border-gray-700 focus:border-red-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Əlavə Şəkillər (URL-ləri vergüllə ayır)</label>
          <input type="text" name="images" value={formData.images} onChange={handleChange} placeholder="img1.jpg, img2.jpg"
            className="w-full bg-black p-3 rounded border border-gray-700 focus:border-red-500 outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Brend</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange}
              className="w-full bg-black p-3 rounded border border-gray-700 focus:border-red-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Kateqoriya</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange}
              className="w-full bg-black p-3 rounded border border-gray-700 focus:border-red-500 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Stillər (Vergüllə ayır: 0.2v, 0.3v)</label>
          <input type="text" name="styles" value={formData.styles} onChange={handleChange} placeholder="Məs: Qırmızı, Göy"
            className="w-full bg-black p-3 rounded border border-gray-700 focus:border-red-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Stok Sayı</label>
          <input type="number" name="countInStock" value={formData.countInStock} onChange={handleChange}
            className="w-full bg-black p-3 rounded border border-gray-700 focus:border-red-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Təsvir</label>
          <textarea name="description" value={formData.description} onChange={handleChange}
            className="w-full bg-black p-3 rounded border border-gray-700 focus:border-red-500 outline-none h-32" />
        </div>

        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition flex items-center justify-center gap-2">
          <FiSave /> Yadda Saxla
        </button>

      </form>
    </div>
  );
}