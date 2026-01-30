"use client";

import { useState, useEffect } from "react";
import { FiHeart, FiZap, FiEye, FiShoppingCart, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const HeroSection = () => {
    // Countdown Timer State
    const [timeLeft, setTimeLeft] = useState({
        days: 68,
        hours: 4,
        minutes: 45,
        seconds: 21
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        } else {
                            hours = 23;
                            if (days > 0) {
                                days--;
                            }
                        }
                    }
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className=" py-15 px-4 lg:px-8">
            <div className="max-w-390 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr_450px] gap-5">

                    {/* Left Card - Warhammer 40,000 Darktide */}
                    <div className="relative overflow-hidden rounded-3xl group h-[700px]">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src="https://ew.com/thmb/4lmLC5Ark8X7GwPpaATjk738Xao=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/god-of-war-2018-2000-408387a68b78478aaa52d04b8a99c0a0.jpg"
                                alt="God of War Review (2018)"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
                            <button className="w-12 h-12 bg-white rounded-xl text-black flex items-center justify-center hover:bg-[#E60023] hover:text-white transition-all duration-300">
                                <FiHeart className="text-xl" />
                            </button>
                            <button className="w-12 h-12 bg-white rounded-xl text-black flex items-center justify-center hover:bg-[#E60023] hover:text-white transition-all duration-300">
                                <FiZap className="text-xl" />
                            </button>
                            <button className="w-12 h-12 bg-white rounded-xl text-black flex items-center justify-center hover:bg-[#E60023] hover:text-white transition-all duration-300">
                                <FiEye className="text-xl" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                            {/* Countdown Timer */}
                            <div className="mb-6 bg-[#E60023] rounded-2xl p-4 flex items-center justify-center gap-2 w-full">
                                <FiZap className="text-white text-xl" />
                                <div className="flex items-center gap-1 text-white font-bold text-xl">
                                    <span>{String(timeLeft.days).padStart(2, '0')}</span>
                                    <span>:</span>
                                    <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                                    <span>:</span>
                                    <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                                    <span>:</span>
                                    <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                                </div>
                            </div>

                            {/* Category */}
                            <p className="text-white text-sm font-medium mb-2">God of War Deluxe</p>

                            {/* Title */}
                            <h2 className="text-white text-3xl font-bold mb-3">
                                Pre-Order
                            </h2>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3].map((star) => (
                                    <svg key={star} className="w-5 h-5 fill-[#E60023]" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                                {[4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 fill-gray-600" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Price */}
                            <div className="mb-5">
                                <span className="text-white text-3xl font-bold">$70.00</span>
                                <span className="text-red-500 text-xl line-through ml-2">$76.00</span>
                            </div>

                            {/* Size Selector */}
                            <div className="mb-5">
                                <label className="text-white text-sm font-medium mb-2 block">Size:</label>
                                <select className="w-full bg-black/60 border border-gray-700 text-white rounded-xl px-4 py-3.5 outline-none">
                                    <option>0.2 MB</option>
                                    <option>0.5 MB</option>
                                    <option>1.0 MB</option>
                                    <option>2.0 MB</option>
                                </select>
                            </div>

                            {/* Add to Cart Button */}
                            <button className="w-full bg-[#E60023] cursor-wait text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#c50020] transition-all duration-300">
                                Preorder Now
                                <FiShoppingCart className="text-xl" />
                            </button>
                        </div>
                    </div>

                    {/* Middle Card - Best Offer */}
                    <div className="relative overflow-hidden rounded-3xl group ">
                        <div className="absolute inset-0">
                            <img
                                src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/02a13a101175739.5f18bc1264a3b.png"
                                alt="Best Offer"
                                className=" object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        </div>

                        <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                            <h2 className="text-white text-5xl font-bold mb-6">
                                Best Offer
                            </h2>
                            <Link href="/shop" className="bg-[#E60023] text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#c50020] transition-all duration-300 w-fit">
                                Show more
                                <FiArrowRight className="text-xl" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Two Cards */}
                    <div className="flex flex-col gap-5">

                        {/* Top Card - Snacks in Pocket */}
                        <div className="relative overflow-hidden rounded-3xl group h-[337.5px]">
                            <div className="absolute inset-0">
                                <img
                                    src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"
                                    alt="Get all snacks in your Pocket"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                            </div>

                            <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                                <span className="bg-[#E60023] text-white text-sm font-bold py-2 px-4 rounded-lg w-fit mb-4">
                                    20% off
                                </span>
                                <h3 className="text-white text-2xl font-bold mb-4 leading-tight">
                                    Get all snacks in your Pocket
                                </h3>
                                <Link href="/blog" className="bg-[#E60023] text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#c50020] transition-all duration-300 w-fit">
                                    Show more
                                    <FiArrowRight className="text-lg" />
                                </Link>
                            </div>
                        </div>

                        {/* Bottom Card - Earning Back */}
                        <div className="relative overflow-hidden rounded-3xl group h-[337.5px]">
                            <div className="absolute inset-0">
                                <img
                                    src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80"
                                    alt="Get your earning back shop your needed"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/30 to-transparent"></div>
                            </div>

                            <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                                <span className="bg-[#E60023] text-white text-sm font-bold py-2 px-4 rounded-lg w-fit mb-4">
                                    Get Cash back 5%
                                </span>
                                <h3 className="text-white text-2xl font-bold mb-4 leading-tight">
                                    Get your earning back shop your needed
                                </h3>
                                <Link href="/blog" className="bg-[#E60023] text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#c50020] transition-all duration-300 w-fit">
                                    Show more
                                    <FiArrowRight className="text-lg" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;