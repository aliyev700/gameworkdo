"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// UPDATED: Imported relevant icons for the pages
import {
    FiSearch, FiUser, FiShoppingCart, FiChevronDown, FiLogOut, FiMenu, FiX,
    FiBookOpen, // For Blog
    FiShoppingBag, // For Shop
    FiInfo, // For About
    FiMail, // For Contact
    FiHelpCircle // For FAQ
} from "react-icons/fi";

interface User {
    id: string;
    name: string;
    email: string;
    isAdmin?: boolean;
}

const Header = () => {
    const [user, setUser] = useState<User | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem('userInfo');
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    console.error('Failed to parse user:', error);
                    localStorage.removeItem('userInfo');
                }
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        setUser(null);
        setShowDropdown(false);
        router.push('/login');
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    return (
        <header className="w-full relative z-50">

            {/* Custom Styles for Animation (No config needed) */}
            <style jsx global>{`
                @keyframes slideIn {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-slide-in {
                    animation: slideIn 0.3s ease-out forwards;
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>

            {/* ----------------- 1. TOP SECTION (WHITE) ----------------- */}
            <div className="bg-white py-5 border-b border-gray-200">
                <div className="max-w-[1600px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">

                    {/* Left Side: Mobile Menu & Logo */}
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden text-2xl text-gray-700 hover:text-[#E60023] transition"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <FiMenu />
                        </button>

                        <Link href="/" className="flex-shrink-0">
                            <img
                                src="https://game-workdo.myshopify.com/cdn/shop/files/Game.png?v=1675229751"
                                alt="GameWork Logo"
                                className="max-w-[120px] sm:max-w-none"
                            />
                        </Link>
                    </div>

                    {/* Search Bar - Desktop */}
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

                    {/* User & Info */}
                    <div className="flex items-center gap-2 sm:gap-6 text-sm">
                        <div className="hidden xl:flex flex-col text-right">
                            <span className="font-bold text-gray-900 text-sm">Monday - Friday:</span>
                            <span className="text-gray-600">8:00 AM - 9:00 PM</span>
                        </div>

                        <div className="hidden xl:flex flex-col text-right">
                            <span className="text-gray-600">Support 24/7:</span>
                            <span className="font-bold text-[#E60023] text-base">+12 002-224-111</span>
                        </div>

                        <div className="hidden md:flex items-center gap-3">
                            <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-sm font-bold text-gray-700">
                                USD <FiChevronDown />
                            </button>
                            <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-sm font-bold text-gray-700">
                                English <FiChevronDown />
                            </button>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-5 ml-2">
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                                    >
                                        <FiUser className="text-lg text-[#E60023]" />
                                        <span className="text-sm font-bold hidden sm:inline text-gray-800">
                                            {user.name}
                                        </span>
                                        <FiChevronDown className="text-sm text-black hidden sm:block" />
                                    </button>

                                    {showDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                                            <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                                                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            {user.isAdmin && (
                                                <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#E60023]">
                                                    Admin Panel
                                                </Link>
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-b-lg"
                                            >
                                                <FiLogOut />
                                                Çıxış
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href="/login" className="text-2xl sm:text-3xl text-gray-600 hover:text-[#E60023] transition" title="Daxil ol">
                                    <FiUser />
                                </Link>
                            )}

                            <Link href="/cart" className="flex items-center gap-3 group">
                                <div className="relative text-2xl sm:text-3xl text-gray-600 group-hover:text-black">
                                    <FiShoppingCart />
                                    <span className="absolute -top-2 -right-2 bg-[#E60023] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                        0
                                    </span>
                                </div>
                                <div className="hidden sm:block text-right leading-tight">
                                    <span className="block text-xs text-gray-500 font-bold">My Cart:</span>
                                    <span className="block text-sm font-black text-gray-900">$0.00</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------------- 2. BOTTOM SECTION (RED NAVBAR) ----------------- */}
            <div className="bg-[#E60023] text-white">
                <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">
                    {/* Desktop Menu - UPDATED ICONS */}
                    <nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
                        <Link href="/blog" className="flex items-center gap-2 hover:text-black/80 transition">
                            <FiBookOpen className="text-xl" /> Blog <FiChevronDown />
                        </Link>
                        <Link href="/shop" className="flex items-center gap-2 hover:text-black/80 transition">
                            <FiShoppingBag className="text-lg" /> Shop All <FiChevronDown />
                        </Link>
                        <Link href="/about" className="flex items-center gap-2 hover:text-black/80 transition">
                            <FiInfo className="text-lg" /> About Us <FiChevronDown />
                        </Link>
                        <Link href="/contact" className="flex items-center gap-2 hover:text-black/80 transition">
                            <FiMail className="text-lg" /> Contact <FiChevronDown />
                        </Link>
                        <Link href="/faq" className="flex items-center gap-2 hover:text-black/80 transition">
                            <FiHelpCircle className="text-lg" /> FAQ <FiChevronDown />
                        </Link>
                    </nav>

                    <div className="flex items-center gap-2 font-semibold text-xs sm:text-base mx-auto lg:mx-0">
                        <span className="opacity-90 hidden sm:inline">Send Email:</span>
                        <a href="mailto:contact@shop.com" className="flex items-center gap-2 text-white hover:underline text-sm sm:text-lg font-bold">
                            contact@shop.com
                        </a>
                    </div>
                </div>
            </div>

            {/* ----------------- MOBILE MENU OVERLAY ----------------- */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop with Fade In */}
                    <div
                        className="fixed inset-0 bg-black/50 animate-fade-in"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Menu Content with Slide In Animation */}
                    <div className="fixed top-0 left-0 w-[80%] max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col gap-6 overflow-y-auto animate-slide-in">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-black text-lg">Menu</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-2xl text-gray-500 hover:text-red-500 transition">
                                <FiX />
                            </button>
                        </div>

                        {/* Mobile Search */}
                        <div className="bg-gray-100 rounded-lg p-3 flex items-center">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="bg-transparent w-full outline-none text-gray-700"
                            />
                            <FiSearch className="text-gray-500" />
                        </div>

                        {/* Mobile Nav Links - UPDATED ICONS */}
                        <nav className="flex flex-col gap-4 text-gray-800 font-bold">
                            <Link href="/blog" className="flex items-center gap-3 py-2 border-b border-gray-100 hover:text-[#E60023] transition" onClick={() => setIsMobileMenuOpen(false)}>
                                <FiBookOpen className="text-[#E60023]" /> Blog
                            </Link>
                            <Link href="/shop" className="flex items-center gap-3 py-2 border-b border-gray-100 hover:text-[#E60023] transition" onClick={() => setIsMobileMenuOpen(false)}>
                                <FiShoppingBag className="text-[#E60023]" /> Shop All
                            </Link>
                            <Link href="/about" className="flex items-center gap-3 py-2 border-b border-gray-100 hover:text-[#E60023] transition" onClick={() => setIsMobileMenuOpen(false)}>
                                <FiInfo className="text-[#E60023]" /> About Us
                            </Link>
                            <Link href="/contact" className="flex items-center gap-3 py-2 border-b border-gray-100 hover:text-[#E60023] transition" onClick={() => setIsMobileMenuOpen(false)}>
                                <FiMail className="text-[#E60023]" /> Contact
                            </Link>
                            <Link href="/faq" className="flex items-center gap-3 py-2 border-b border-gray-100 hover:text-[#E60023] transition" onClick={() => setIsMobileMenuOpen(false)}>
                                <FiHelpCircle className="text-[#E60023]" /> FAQ
                            </Link>
                        </nav>

                        {/* Mobile Extra Info */}
                        <div className="mt-auto space-y-4">
                            <div className="flex gap-2">
                                <button className="flex-1 border border-gray-300 rounded px-2 py-2 text-xs font-bold hover:bg-gray-50">USD</button>
                                <button className="flex-1 border border-gray-300 rounded px-2 py-2 text-xs font-bold hover:bg-gray-50">English</button>
                            </div>
                            <div className="text-sm text-gray-600">
                                <p>Support: <span className="text-[#E60023] font-bold">+12 002-224-111</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;