"use client";

import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const BlogArticlesSection = () => {
    const articles = [
        {
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
            category: "Arcade",
            title: "Exposition Arcade Game...",
            excerpt: "Many arcade games have short levels, simple and intuitive control schemes, and rapidly increasing difficulty. The...",
            author: "WorkDo",
            date: "January 30, 2023"
        },
        {
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
            category: "Game",
            title: "Playing Through the Game",
            excerpt: "Arising alongside video game development in the 1980s, the term gameplay was used solely within the...",
            author: "WorkDo",
            date: "January 30, 2023"
        },
        {
            image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
            category: "Retro",
            title: "The Game Boy Zone",
            excerpt: "The Game Boy was designed by Nintendo's chief engineer Gunpei Yokoi and its Nintendo R&D1 team....",
            author: "WorkDo",
            date: "January 30, 2023"
        },
        {
            image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
            category: "Collection",
            title: "Gumballs and Games Ret...",
            excerpt: "The right side of the device offers a port that allows a user to connect to another Game Boy system via a link....",
            author: "WorkDo",
            date: "January 30, 2023"
        }
    ];

    return (
        <section className="bg-black py-16 px-4 lg:px-8">
            <div className="max-w-390 mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-white text-4xl lg:text-5xl font-bold mb-6">
                        Blog & Articles
                    </h2>
                    <p className="text-gray-400 text-base lg:text-lg max-w-4xl mx-auto leading-relaxed">
                        There is a quality market for groceries. These are folks looking for more than just junk food.
                        They don't shop in the middle of the grocery store. They focus on fresh products on the
                        outside of the store like the meat and produce areas. These folks are interesting in coming
                        to the store 2 or even 3 times each week to get their food.
                    </p>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {articles.map((article, index) => (
                        <div
                            key={index}
                            className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl overflow-hidden hover:border-[#E60023] hover:shadow-2xl hover:shadow-[#E60023]/20 transition-all duration-500 cursor-pointer"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden h-64">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-[#E60023] text-white text-sm font-bold px-4 py-2 rounded-full">
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Title */}
                                <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#E60023] transition-colors duration-300">
                                    {article.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    {article.excerpt}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                                    {/* Read More Button */}
                                    <Link href="blog" className="bg-[#E60023] text-white font-bold py-2.5 px-5 rounded-full flex items-center gap-2 hover:bg-[#c50020] transition-all duration-300 group-hover:scale-105">
                                        Read more
                                        <FiArrowRight className="text-sm" />
                                    </Link>

                                    {/* Author & Date */}
                                    <div className="text-right">
                                        <p className="text-white font-bold text-sm">
                                            {article.author}
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            {article.date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogArticlesSection;