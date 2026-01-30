"use client";
import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // Backend-ə sorğu göndəririk (Port 5001)
      const res = await axios.post("http://127.0.0.1:5001/api/users/forgot-password", { email });
      setMessage("Email uğurla göndərildi! Zəhmət olmasa poçt qutunuzu yoxlayın.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Xəta baş verdi");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Parolu Unutmusan?</h2>
        
        {message && <p className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</p>}
        {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Adresiniz</label>
            <input
              type="email"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="email@numune.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition font-bold"
          >
            Linki Göndər
          </button>
        </form>
      </div>
    </div>
  );
}