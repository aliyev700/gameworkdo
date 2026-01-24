"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// İkonları import edirik (Həm Fi, həm də Fa seriyasından)
import { FiSearch, FiUser, FiShoppingCart, FiChevronDown, FiGrid, FiLayers, FiMail, FiLogOut } from "react-icons/fi";
import { FaChessKnight, FaDice, FaGamepad, FaPuzzlePiece, FaCar } from "react-icons/fa";

interface User {
    id: string;
    name: string;
    email: string;
}

const Header = () => {
    const [user, setUser] = useState<User | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse user:', error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setShowDropdown(false);
        router.push('/');
    };
    return (
        <header className="w-full">

            {/* ----------------- 1. ÜST HİSSƏ (AĞ) ----------------- */}
            <div className="bg-white py-5 border-b border-gray-200">
                <div className="max-w-[1600px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <img src="https://game-workdo.myshopify.com/cdn/shop/files/Game.png?v=1675229751" alt="" />
                    </Link>

                    {/* Axtarış (Search) */}
                    <div className="flex-1 max-w-2xl mx-8 hidden lg:block">
                        <div className="flex items-center bg-gray-200 rounded-full p-1 pl-5">
                            <FiSearch className="text-xl text-gray-500 mr-3" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-500"
                            />
                            <button className="bg-[#E60023] text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-red-700 transition whitespace-nowrap">
                                All Collections
                                <FiChevronDown />
                            </button>
                        </div>
                    </div>

                    {/* Məlumat və Profillər */}
                    <div className="flex items-center gap-6 text-sm">

                        {/* İş Saatları */}
                        <div className="hidden xl:flex flex-col text-right">
                            <span className="font-bold text-gray-900 text-sm">Monday - Friday:</span>
                            <span className="text-gray-600">8:00 AM - 9:00 PM</span>
                        </div>

                        {/* Dəstək */}
                        <div className="hidden xl:flex flex-col text-right">
                            <span className="text-gray-600">Support 24/7:</span>
                            <span className="font-bold text-[#E60023] text-base">+12 002-224-111</span>
                        </div>

                        {/* Dil və Valyuta */}
                        <div className="hidden md:flex items-center gap-3">
                            <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-sm font-bold text-gray-700">
                                USD <FiChevronDown />
                            </button>
                            <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-sm font-bold text-gray-700">
                                English <FiChevronDown />
                            </button>
                        </div>

                        {/* User və Səbət */}
                        <div className="flex items-center gap-5 ml-2">
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                                    >
                                        <FiUser className="text-lg" />
                                        <span className="text-sm font-bold hidden sm:inline">{user.name}</span>
                                        <FiChevronDown className="text-sm" />
                                    </button>
                                    {showDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                            <div className="p-3 border-b">
                                                <p className="text-sm font-bold">{user.name}</p>
                                                <p className="text-xs text-gray-600">{user.email}</p>
                                            </div>
                                            <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                Profil
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                                            >
                                                <FiLogOut />
                                                Çıxış
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href="/login" className="text-3xl text-gray-600 hover:text-black">
                                    <FiUser />
                                </Link>
                            )}

                            <Link href="/cart" className="flex items-center gap-3 group">
                                <div className="relative text-3xl text-gray-600 group-hover:text-black">
                                    <FiShoppingCart />

                                </div>
                                <div className="hidden sm:block text-right leading-tight">
                                    <span className="block text-xs text-gray-500 font-bold">My Cart:</span>
                                    <span className="block text-sm font-black text-gray-900">$12,000.00</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------------- 2. ALT HİSSƏ (QIRMIZI NAVBAR) ----------------- */}
            <div className="bg-[#E60023] text-white">
                <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">

                    {/* Sol Tərəf: Naviqasiya Linkləri */}
                    <nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">

                        <Link href="/blog" className="flex items-center gap-2 hover:text-black/80 transition">
                            <FiGrid className="text-xl" />
                            Blog
                            <FiChevronDown />
                        </Link>

                        <Link href="/shop" className="flex items-center gap-2 hover:text-black/80 transition">
                            <FaPuzzlePiece className="text-lg" />
                            Shop All
                            <FiChevronDown />
                        </Link>

                        <Link href="/about" className="flex items-center gap-2 hover:text-black/80 transition">
                            <FaCar className="text-lg" />
                            About Us
                            <FiChevronDown />
                        </Link>

                        <Link href="/contact" className="flex items-center gap-2 hover:text-black/80 transition">
                            <FaChessKnight className="text-lg" />
                            Contact
                            <FiChevronDown />
                        </Link>

                        <Link href="/faq" className="flex items-center gap-2 hover:text-black/80 transition">
                            <FaDice className="text-lg" />
                            FAQ
                            <FiChevronDown />
                        </Link>



                    </nav>

                    {/* Sağ Tərəf: Email */}
                    <div className="flex items-center gap-2 font-semibold">
                        <span className="opacity-90">Send Email:</span>
                        <a href="mailto:contact@shop.com" className="flex items-center gap-2 text-white hover:underline text-lg font-bold">
                            contact@shop.com
                        </a>
                    </div>

                </div>
            </div>

        </header>
    );
};

export default Header;