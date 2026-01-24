"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi"; 

export default function CreateProductPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    image: "",
    images: "", // Vergüllə ayrılmış string kimi qəbul edirik
    brand: "",
    category: "",
    countInStock: 0,
    description: "",
    styles: "", // Vergüllə ayrılmış string
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      
      const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // Məlumatları Backend-in istədiyi formata salırıq
      const dataToSend = {
          ...formData,
          // Rəqəm olması vacib olanları çeviririk
          price: Number(formData.price),
          countInStock: Number(formData.countInStock),
          // Stringləri massivə çeviririk (vergülə görə ayıraraq)
          styles: formData.styles ? formData.styles.split(",").map(s => s.trim()) : [],
          images: formData.images ? formData.images.split(",").map(s => s.trim()) : [],
      };

      await axios.post("http://localhost:5001/api/products", dataToSend, config);
      
      alert("Məhsul uğurla yaradıldı!");
      
      // ✅ DÜZƏLİŞ: Sizi birbaşa məhsullar siyahısına yönləndirir
      router.push("/admin"); 

    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black p-10 flex flex-col items-center">
      
      <div className="w-full max-w-lg mb-4">
        {/* Geri düyməsi birbaşa /admin səhifəsinə qaytarır */}
        <button onClick={() => router.push("/admin")} className="flex items-center gap-2 text-gray-600 hover:text-black transition">
             <FiArrowLeft /> Geri Qayıt
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Yeni Məhsul Yarat</h1>
      
      <form onSubmit={submitHandler} className="w-full max-w-lg space-y-5 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Məhsulun adı</label>
            <input type="text" name="name" required onChange={handleChange} 
               className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Qiymət ($)</label>
                <input type="number" name="price" required onChange={handleChange} 
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" />
            </div>
             <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Stok Sayı</label>
                <input type="number" name="countInStock" required onChange={handleChange} 
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" />
            </div>
        </div>

        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Əsas Şəkil URL</label>
            <input type="text" name="image" required onChange={handleChange} 
               className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" />
        </div>

        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Əlavə Şəkillər (Vergüllə ayır)</label>
            <input type="text" name="images" placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" onChange={handleChange} 
               className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                 <label className="block text-sm font-semibold text-gray-700 mb-1">Brend</label>
                 <input type="text" name="brand" required onChange={handleChange} 
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" />
            </div>
            <div>
                 <label className="block text-sm font-semibold text-gray-700 mb-1">Kateqoriya</label>
                 <input type="text" name="category" required onChange={handleChange} 
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" />
            </div>
        </div>

        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Stillər (Vergüllə ayır)</label>
            <input type="text" name="styles" placeholder="0.2v, 0.3v" onChange={handleChange} 
               className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" />
        </div>

        <div>
             <label className="block text-sm font-semibold text-gray-700 mb-1">Təsvir</label>
             <textarea name="description" required onChange={handleChange} 
               className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition h-32" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-all shadow-md active:scale-95 disabled:opacity-70">
            {loading ? "Yaradılır..." : "Məhsulu Yarat"}
        </button>

      </form>
    </div>
  );
}