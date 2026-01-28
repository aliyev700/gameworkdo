"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

      const { data } = await axios.post(
        "http://localhost:5001/api/users/login", // Backend Login API
        {
          email: formData.email,
          password: formData.password,
        },
        config
      );

      // Uğurlu girişdən sonra tokeni yadda saxla
      localStorage.setItem("userInfo", JSON.stringify(data));
      
      alert("Xoş gəldiniz!");
      router.push("/"); // Ana səhifəyə yönləndir
      
    } catch (err: any) {
      setError(err.response?.data?.message || "Email və ya şifrə yanlışdır");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-10 px-4 font-sans relative">
      
      {/* Back to Home Link */}
      <Link 
        href="/" 
        className="absolute top-32 left-4 md:left-10 flex items-center gap-2 text-sm font-medium hover:text-gray-300 transition-colors"
      >
        <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center">
             <FiArrowLeft />
        </div>
        Back to Home
      </Link>

      {/* Əsas Başlıq */}
      <h1 className="text-4xl font-bold mb-10 mt-28 md:mt-20">Already Registered?</h1>

      {/* Form Konteyneri */}
      <div className="w-full max-w-3xl border border-gray-800 rounded-sm">
        <form onSubmit={submitHandler}>
            
          {/* Section 1: Header & Inputs */}
          <div className="p-8 border-b border-gray-800">
            <h2 className="text-xl font-medium mb-6">Already Registered?</h2>
            
            <p className="text-gray-400 mb-6 text-sm">I am a returning customer</p>
            
            {/* Email və Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
              <div>
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
          </div>

          {/* Section 2: Login Button & Forgot Password */}
          <div className="p-8 border-b border-gray-800 flex flex-col md:flex-row items-center justify-end gap-6">
            
             {/* Xəta varsa göstər */}
            {error && <p className="text-red-500 text-sm mr-auto">{error}</p>}

            <Link href="/forgot-password" className="text-red-500 text-sm hover:underline">
                Forgot Password?
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#D23F3F] hover:bg-[#b83232] text-white px-8 py-3 rounded flex items-center gap-2 font-medium transition-all"
            >
              {loading ? "Loading..." : "Login"}
              {!loading && <FiArrowRight />}
            </button>
          </div>

          {/* --- YENİ HİSSƏ: GITHUB LOGIN --- */}
          <div className="p-8 border-b border-gray-800">
            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black px-2 text-gray-500 font-mono">Or continue with</span>
                </div>
            </div>

            <button
                type="button"
                onClick={() => window.location.href = 'http://localhost:5001/api/auth/github'}
                className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white py-3 rounded flex items-center justify-center gap-3 font-medium transition-all border border-gray-700"
            >
                {/* GitHub Icon SVG */}
                <svg height="22" width="22" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Login with GitHub
            </button>
          </div>
          {/* -------------------------------- */}

          {/* Section 3: Register Link (Footer) */}
          <div className="p-8 flex flex-col md:flex-row items-center justify-center gap-4">
             <span className="text-gray-300">If you dont have account</span>
             <Link 
                href="/register"
                className="bg-[#D23F3F] hover:bg-[#b83232] text-white px-8 py-3 rounded flex items-center gap-2 font-medium transition-all"
             >
                Register <FiArrowRight />
             </Link>
          </div>

        </form>
      </div>
    </div>
  );
}