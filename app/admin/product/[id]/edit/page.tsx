"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import AdminSidebar from "@/app/admin/adminsidebar"; // Sidebar-ı əlavə etdik
import { FiSave, FiArrowLeft, FiTrash2, FiPlus, FiImage, FiXCircle } from "react-icons/fi";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    image: "",
    images: [] as string[],
    brand: "",
    category: "",
    countInStock: 0,
    description: "",
    styles: [] as { name: string; image: string }[],
  });

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5001/api/products/${productId}`);

        // Köhnə data formatı (string array) ilə yeni format (object array) uyğunlaşdırılması
        let formattedStyles = [];
        if (data.styles && data.styles.length > 0) {
          if (typeof data.styles[0] === 'string') {
            formattedStyles = data.styles.map((s: string) => ({ name: s, image: "" }));
          } else {
            formattedStyles = data.styles;
          }
        }

        setFormData({
          name: data.name || "",
          price: data.price || 0,
          image: data.image || "",
          brand: data.brand || "",
          category: data.category || "",
          countInStock: data.countInStock || 0,
          description: data.description || "",
          images: data.images || [],
          styles: formattedStyles,
        });
        setLoading(false);
      } catch (error) {
        console.error("Xəta:", error);
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- API: Şəkil Yükləmə ---
  const uploadFileToServer = async (file: File) => {
    const formDataFile = new FormData();
    formDataFile.append("image", file);

    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")!)
      : {};

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("http://localhost:5001/api/upload", formDataFile, config);
    return data;
  };

  const handleMainImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const path = await uploadFileToServer(file);
      setFormData((prev) => ({ ...prev, image: path }));
    } catch (error) {
      alert("Şəkil yüklənmədi");
    } finally {
      setUploading(false);
    }
  };

  const handleAdditionalImagesUpload = async (e: any) => {
    const files = Array.from(e.target.files) as File[];
    if (files.length === 0) return;
    setUploading(true);
    try {
      const promises = files.map((file) => uploadFileToServer(file));
      const paths = await Promise.all(promises);
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...paths] }));
    } catch (error) {
      alert("Qalereya yüklənmədi");
    } finally {
      setUploading(false);
    }
  };

  const removeAdditionalImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  // --- VERSİYALAR (STYLES) ---
  const addStyleRow = () => {
    setFormData({ ...formData, styles: [...formData.styles, { name: "", image: "" }] });
  };

  const removeStyleRow = (index: number) => {
    const newStyles = formData.styles.filter((_, i) => i !== index);
    setFormData({ ...formData, styles: newStyles });
  };

  const handleStyleNameChange = (index: number, value: string) => {
    const newStyles = [...formData.styles];
    newStyles[index].name = value;
    setFormData({ ...formData, styles: newStyles });
  };

  const handleStyleImageUpload = async (index: number, e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const path = await uploadFileToServer(file);
      const newStyles = [...formData.styles];
      newStyles[index].image = path;
      setFormData({ ...formData, styles: newStyles });
    } catch (error) {
      alert("Stil şəkli yüklənmədi");
    } finally {
      setUploading(false);
    }
  };

  // --- SUBMIT ---
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

      await axios.put(`http://localhost:5001/api/products/${productId}`, formData, config);
      alert("Məhsul uğurla yeniləndi!");
      router.push("/admin");

    } catch (error: any) {
      alert(error.response?.data?.message || "Xəta baş verdi");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Yüklənir...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8 text-black">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-black transition">
              <FiArrowLeft /> Geri Qayıt
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Məhsulu Redaktə Et</h1>
          </div>

          <form onSubmit={submitHandler} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">

            {/* ƏSAS MƏLUMATLAR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Məhsulun Adı</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qiymət ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
                />
              </div>
            </div>

            {/* --- 1. ƏSAS ŞƏKİL --- */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
              <label className="block text-sm font-medium text-gray-700 mb-3">Əsas Şəkil</label>
              <div className="flex items-center gap-6">
                {formData.image ? (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-sm border border-gray-200 group">
                    <img src={`http://localhost:5001${formData.image}`} alt="Main" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    <FiImage size={24} />
                  </div>
                )}
                <input type="file" onChange={handleMainImageUpload} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer" />
              </div>
            </div>

            {/* --- 2. QALEREYA --- */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Qalereya (Əlavə şəkillər)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                    <img src={`http://localhost:5001${img}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiXCircle size={18} />
                    </button>
                  </div>
                ))}
                <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition aspect-square">
                  <FiPlus className="text-gray-400 text-2xl" />
                  <span className="text-xs text-gray-500 mt-1">Yüklə</span>
                  <input type="file" multiple onChange={handleAdditionalImagesUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* --- 3. STİLLƏR (VERSIYALAR) --- */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">Məhsul Versiyaları / Stillər</label>
                <button type="button" onClick={addStyleRow} className="flex items-center gap-1 text-sm bg-black text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition">
                  <FiPlus /> Yeni Versiya
                </button>
              </div>

              <div className="space-y-3">
                {formData.styles.map((style, index) => (
                  <div key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    {/* Ad Inputu - XƏTA HƏLL EDİLDİ (value={style.name || ""}) */}
                    <div className="w-1/3">
                      <input
                        type="text"
                        placeholder="Versiya adı (məs: 0.2v)"
                        value={style.name || ""}
                        onChange={(e) => handleStyleNameChange(index, e.target.value)}
                        className="w-full p-2 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                      />
                    </div>

                    {/* Şəkil */}
                    <div className="flex-1 flex items-center gap-3">
                      {style.image ? (
                        <img src={`http://localhost:5001${style.image}`} className="w-10 h-10 object-cover rounded border border-gray-300" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded border border-gray-300 flex items-center justify-center text-gray-400"><FiImage /></div>
                      )}
                      <input type="file" onChange={(e) => handleStyleImageUpload(index, e)} className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer" />
                    </div>

                    {/* Sil */}
                    <button type="button" onClick={() => removeStyleRow(index)} className="text-gray-400 hover:text-red-500 p-2 transition">
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
                {formData.styles.length === 0 && <p className="text-sm text-gray-500 italic">Heç bir versiya əlavə edilməyib.</p>}
              </div>
            </div>

            {/* DİGƏR SAHƏLƏR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brend</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kateqoriya</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stok Sayı</label>
              <input type="number" name="countInStock" value={formData.countInStock} onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Təsvir</label>
              <textarea name="description" value={formData.description} onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black h-32 resize-none" />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <FiSave size={20} /> {uploading ? "Yüklənir..." : "Yadda Saxla"}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}