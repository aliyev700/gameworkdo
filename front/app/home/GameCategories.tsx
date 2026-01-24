"use client";

import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const BestsellersCategories = () => {
    const categories = [
        {
            title: "Racing",
            image: "https://images.hdqwalls.com/wallpapers/bthumb/ferrari-599-forza-horizon-4-4k-cw.jpg"
        },
        {
            title: "Stealth",
            image: "https://images.hdqwalls.com/wallpapers/bthumb/metal-gear-solid-3-4k-ad.jpg"
        },
        {
            title: "Action",
            image: "https://images.hdqwalls.com/wallpapers/bthumb/viper-ning-in-naraka-bladepoint-4y.jpg"
        },
        {
            title: "Adventure",
            image: "https://images.hdqwalls.com/wallpapers/bthumb/horizon-zero-dawn-ps5-4k-bd.jpg"
        },
        {
            title: "Football",
            image: "https://images.hdqwalls.com/wallpapers/bthumb/efootball-2024-1t.jpg"
        },
        {
            title: "Fighting",
            image: "https://images.hdqwalls.com/wallpapers/bthumb/scorpion-mk1-e1.jpg"
        },
        {
            title: "Shooters (FPS/TPS)",
            image: "https://images.hdqwalls.com/wallpapers/bthumb/call-of-duty-modern-warfare-3-game-1w.jpg"
        },
        {
            title: "Horror",
            image: "https://images.hdqwalls.com/wallpapers/bthumb/resident-evil-4-10k-he.jpg"
        }
    ];

    return (
        <section className=" py-12 px-4 lg:px-8">
            <div className="max-w-390 mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-4xl font-bold">
                        Bestsellers Categories
                    </h2>
                    <Link href="/shop" className="bg-[#E60023] text-white font-bold py-4 px-8 rounded-2xl flex items-center gap-3 hover:bg-[#c50020] transition-all duration-300 hover:scale-105 shadow-lg">
                        Show more products
                        <FiArrowRight className="text-xl" />
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-3xl group h-[300px] "
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                                <h3 className="text-white text-2xl font-bold mb-4">
                                    {category.title}
                                </h3>
                                <Link href="/shop" className="bg-[#E60023] text-white cursor-pointer font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#660011] transition-all duration-300 w-fit group-hover:scale-105">
                                    Show more
                                    <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestsellersCategories;