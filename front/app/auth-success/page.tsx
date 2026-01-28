'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const AuthHandler = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // 1. URL-dən tokeni oxuyuruq
        const token = searchParams.get('token');

        if (token) {
            // 2. Token varsa, gedib User məlumatlarını gətiririk
            getUserData(token);
        } else {
            // Token yoxdursa, loginə qaytar
            router.push('/login');
        }
    }, [router, searchParams]);

    const getUserData = async (token: string) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Tokeni başlığa qoyuruq
                },
            };

            // DİQQƏT: Backend-də profil məlumatını verən yol (adətən belə olur)
            const { data } = await axios.get('http://localhost:5001/api/users/me', config);

            // 3. User məlumatını hazırlayırıq (Login-dəki kimi)
            const userInfo = {
                ...data,      // _id, name, email
                token: token  // tokeni də əlavə edirik
            };

            // 4. LocalStorage-ə yazırıq
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            // 5. Ana səhifəyə atırıq
            alert(`Xoş gəldin, ${data.name}!`);
            router.push('/');

        } catch (error) {
            console.error("User məlumatı alına bilmədi:", error);
            // Xəta olsa loginə qaytar
            router.push('/login');
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-bold">Giriş edilir...</h2>
            <p className="text-gray-400">Zəhmət olmasa gözləyin</p>
        </div>
    );
};

const AuthSuccessPage = () => {
    return (
        <Suspense fallback={<div className="text-white">Loading...</div>}>
            <AuthHandler />
        </Suspense>
    );
};

export default AuthSuccessPage;