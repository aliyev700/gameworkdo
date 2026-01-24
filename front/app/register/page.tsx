"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  
  // Form məlumatları üçün state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Input dəyişəndə state-i yenilə
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Qeydiyyat funksiyası
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        "http://localhost:5001/api/users", 
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
        },
        config
      );

      alert("Qeydiyyat uğurludur!");
      router.push("/login");
      
    } catch (err: any) {
      setError(err.response?.data?.message || "Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-20 pb-10 px-4 font-sans relative">
      
      {/* --- DÜZƏLİŞ EDİLƏN HİSSƏ --- */}
      {/* top-10 yerinə top-32 yazdım ki, Navbarın altında qalsın */}
      <Link 
        href="/" 
        className="absolute top-32 left-4 md:left-10 flex items-center gap-2 text-sm font-medium hover:text-gray-300 transition-colors"
      >
        <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center">
             <FiArrowLeft />
        </div>
        Back to home
      </Link>
      {/* --------------------------- */}

      {/* Başlıq */}
      <h1 className="text-4xl font-bold mb-10 mt-16 md:mt-10">Create account</h1>

      {/* Form Konteyneri */}
      <div className="w-full max-w-3xl border border-gray-800 rounded-sm">
        <form onSubmit={submitHandler}>
            
          {/* Section 1: Personal Details */}
          <div className="p-8 border-b border-gray-800">
            <h2 className="text-xl font-medium mb-6">Your Personal Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm mb-2">
                  First Name<span className="text-red-500">*</span>:
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  Last Name<span className="text-red-500">*</span>:
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-500"
                />
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-sm mb-2">
                E-mail<span className="text-red-500">*</span>:
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black border border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-500"
              />
            </div>
          </div>

          {/* Section 2: Password */}
          <div className="p-8 border-b border-gray-800">
            <h2 className="text-xl font-medium mb-6">Your Password</h2>
            <div>
              <label className="block text-sm mb-2">
                Password<span className="text-red-500">*</span>:
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-black border border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-500"
              />
            </div>
          </div>

          {/* Xəta Mesajı */}
          {error && (
            <div className="px-8 py-4 text-red-500 text-sm">
                {error}
            </div>
          )}

          {/* Footer: Create Button */}
          <div className="p-8 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#D23F3F] hover:bg-[#b83232] text-white px-8 py-3 rounded flex items-center gap-2 font-medium transition-all"
            >
              {loading ? "Creating..." : "Create"}
              {!loading && <FiArrowRight />}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}