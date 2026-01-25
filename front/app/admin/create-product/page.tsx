"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", category: "Clothing", image: "",
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    
    const data = new FormData();
    data.append("file", file);

    try {
      // DÜZƏLİŞ 1: localhost -> 127.0.0.1 və port 5001
      // Qeyd: Serverində /api/upload marşrutu olmalıdır
      const res = await fetch("http://127.0.0.1:5001/api/upload", { 
        method: "POST", 
        body: data 
      });
      
      const result = await res.json();
      if (result.success) {
          setFormData((prev) => ({ ...prev, image: result.url }));
      } else {
          console.error("Şəkil yüklənmədi:", result);
      }
    } catch (error) { 
        console.error("Upload Xətası:", error); 
    } finally { 
        setUploading(false); 
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    // Login tokenini götürürük (əgər serverin qorunursa lazımdır)
    const token = localStorage.getItem('token'); 

    try {
        // DÜZƏLİŞ 2: localhost -> 127.0.0.1
        const res = await fetch("http://127.0.0.1:5001/api/products", {
          method: "POST",
          headers: { 
              "Content-Type": "application/json",
              // Tokeni göndəririk ki, server bilsin kimdir (lazım deyilsə silə bilərsən)
              "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
            router.push("/"); // Uğurludursa ana səhifəyə at
        } else {
            console.error("Məhsul yaradılmadı");
        }
    } catch (error) {
        console.error("Fetch xətası:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Yeni Məhsul Yarat</h2>
        
        <label className="block text-sm font-bold mb-1">Adı</label>
        <input name="name" onChange={handleChange} className="w-full border p-2 mb-4" required />
        
        <label className="block text-sm font-bold mb-1">Qiyməti</label>
        <input name="price" type="number" onChange={handleChange} className="w-full border p-2 mb-4" required />
        
        <label className="block text-sm font-bold mb-1">Təsvir</label>
        <textarea name="description" onChange={handleChange} className="w-full border p-2 mb-4" />
        
        <label className="block text-sm font-bold mb-1">Şəkil</label>
        <input type="file" onChange={handleFileChange} className="w-full border p-2 mb-4" />
        
        {formData.image && <img src={formData.image} alt="Preview" className="h-20 mb-4 object-cover" />}
        
        <button type="submit" disabled={uploading} className="w-full bg-black text-white p-3 rounded">
          {uploading ? "Şəkil Yüklənir..." : "Məhsulu Yarat"}
        </button>
      </form>
    </div>
  );
}