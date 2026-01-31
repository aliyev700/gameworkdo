"use client";
import { useState, use } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResetPassword({ params }: { params: Promise<{ token: string }> }) {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [tokenResolved, setTokenResolved] = useState<string>("");

  import("react").then(({ use }) => {

  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resolvedParams = await params;
    const token = resolvedParams.token;

    if (password !== confirmPassword) {
      setError("Passwords are not the same!");
      return;
    }

    try {
      await axios.put(`http:5001/api/users/reset-password/${token}`, { password });
      setMessage("Parol uğurla dəyişdirildi! Login səhifəsinə yönləndirilirsiniz...");
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Set New Password</h2>

        {message && <p className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</p>}
        {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
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
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
}