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
      const res = await fetch("http://localhost:5002/api/upload", { method: "POST", body: data });
      const result = await res.json();
      if (result.success) setFormData((prev) => ({ ...prev, image: result.url }));
    } catch (error) { console.error("Xəta:", error); } 
    finally { setUploading(false); }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("http://localhost:5001/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    router.push("/");
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