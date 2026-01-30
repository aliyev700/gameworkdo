'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiCall } from '../utils/api';

interface UserData {
    id: string;
    name: string;
    email: string;
    message: string;
}

export default function Profile() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        fetchUserData();
    }, [router]);

    const fetchUserData = async () => {
        try {
            const response = await apiCall('/users/me');

            if (!response.ok) {
                if (response.status === 401) {
                    // Token expired
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    router.push('/login');
                    return;
                }
                throw new Error('Məlumat alınamadı');
            }

            const data = await response.json();
            setUser(data);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Bir xəta baş verdi');
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    <p className="mt-4 text-gray-600">Yüklənir...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Ana səhifəyə qayıt
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Profil</h2>

                {user && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-600 text-sm font-semibold mb-2">Ad</label>
                            <p className="text-gray-800 text-lg font-semibold">{user.name}</p>
                        </div>

                        <div>
                            <label className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
                            <p className="text-gray-800 text-lg font-semibold">{user.email}</p>
                        </div>

                        {user.message && (
                            <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                                {user.message}
                            </div>
                        )}

                        <button
                            onClick={handleLogout}
                            className="w-full py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition"
                        >
                            Çıxış
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
