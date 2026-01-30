"use client";
import { useState, use } from "react"; // 'use' import edildi (Next.js 13+ params üçün)
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResetPassword({ params }: { params: Promise<{ token: string }> }) {
  // params asinxron olduğu üçün onu 'use' ilə və ya Promise kimi açırıq
  // Sadəlik üçün burada birbaşa state-ə keçirik, params-ı aşağıda istifadə edəcəyik.
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Next.js yeni versiyalarında params Promise olur, onu həll edirik:
  // (Əgər xəta versə, sadəcə params.token yoxlayarıq)
  const [tokenResolved, setTokenResolved] = useState<string>("");

  // Tokeni əldə etmək üçün
  import("react").then(({ use }) => {
     // Bu hissə bəzən qarışıq ola bilər, sadə yolla gedək:
     // Next.js App router-də params prop-u birbaşa gəlir.
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // params-dan tokeni götürürük (Promise həlli ilə)
    const resolvedParams = await params;
    const token = resolvedParams.token;

    if (password !== confirmPassword) {
      setError("Şifrələr eyni deyil!");
      return;
    }

    try {
      await axios.put(`http:5001/api/users/reset-password/${token}`, { password });
      setMessage("Parol uğurla dəyişdirildi! Login səhifəsinə yönləndirilirsiniz...");
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Xəta baş verdi");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Yeni Parol Təyin Et</h2>

        {message && <p className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</p>}
        {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Yeni Şifrə</label>
            <input
              type="password"
              className="w-full p-3 border rounded text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Şifrəni Təsdiqlə</label>
            <input
              type="password"
              className="w-full p-3 border rounded text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition font-bold"
          >
            Parolu Yenilə
          </button>
        </form>
      </div>
    </div>
  );
}