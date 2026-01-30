"use client";

import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin, FiArrowRight, FiCreditCard } from "react-icons/fi";
import ChatBot from "./Chatbot";

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#E60023] rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff1744] rounded-full blur-3xl"></div>
            </div>

            {/* Red Accent Wave */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E60023] via-[#ff1744] to-[#E60023]"></div>

            <div className="relative max-w-[1600px] mx-auto px-4 lg:px-8">

                {/* Newsletter Section */}
                <div className="py-12 border-b border-gray-700">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                Subscribe to Our Newsletter
                            </h3>
                            <p className="text-gray-400">Get the latest updates, deals, and exclusive offers!</p>
                        </div>
                        <div className="w-full md:w-auto md:min-w-[400px]">
                            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20 focus-within:border-[#E60023] transition-all duration-300">
                                <FiMail className="text-xl text-gray-400 ml-4 mr-2" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-transparent flex-1 outline-none text-white placeholder-gray-400 px-2 py-2"
                                />
                                <button className="bg-gradient-to-r from-[#E60023] to-[#ff1744] text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                    Subscribe
                                    <FiArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* About Section */}
                    <div>
                        <img
                            src="https://game-workdo.myshopify.com/cdn/shop/files/Game.png?v=1675229751"
                            alt="Logo"
                            className="h-12 w-auto mb-6 brightness-0 invert"
                        />
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Your ultimate destination for premium gaming products. We deliver quality and excellence in every purchase.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#E60023] hover:to-[#ff1744] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50">
                                <FiFacebook className="text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#E60023] hover:to-[#ff1744] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50">
                                <FiTwitter className="text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#E60023] hover:to-[#ff1744] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50">
                                <FiInstagram className="text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#E60023] hover:to-[#ff1744] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50">
                                <FiYoutube className="text-lg" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#E60023] to-[#ff1744]"></span>
                        </h4>
                        <ul className="space-y-3">
                            {["About Us", "Shop", "Contact", "Blog", "Careers", "Press"].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 inline-flex items-center gap-2 transition-all duration-300 group">
                                        <span className="w-0 h-0.5 bg-gradient-to-r from-[#E60023] to-[#ff1744] group-hover:w-4 transition-all duration-300"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 relative inline-block">
                            Customer Service
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#E60023] to-[#ff1744]"></span>
                        </h4>
                        <ul className="space-y-3">
                            {["Shipping Info", "Returns", "Track Order", "FAQs", "Privacy Policy", "Terms & Conditions"].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 inline-flex items-center gap-2 transition-all duration-300 group">
                                        <span className="w-0 h-0.5 bg-gradient-to-r from-[#E60023] to-[#ff1744] group-hover:w-4 transition-all duration-300"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 relative inline-block">
                            Get In Touch
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#E60023] to-[#ff1744]"></span>
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 group">
                                <div className="w-10 h-10 rounded-lg bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#E60023] group-hover:to-[#ff1744] flex items-center justify-center flex-shrink-0 transition-all duration-300">
                                    <FiMapPin className="text-lg" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                        123 Gaming Street, Suite 100<br />
                                        New York, NY 10001
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 group">
                                <div className="w-10 h-10 rounded-lg bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#E60023] group-hover:to-[#ff1744] flex items-center justify-center flex-shrink-0 transition-all duration-300">
                                    <FiPhone className="text-lg" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white mb-1">Support 24/7</p>
                                    <a href="tel:+12002224111" className="text-[#E60023] hover:text-[#ff1744] font-bold transition-colors">
                                        +12 002-224-111
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 group">
                                <div className="w-10 h-10 rounded-lg bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#E60023] group-hover:to-[#ff1744] flex items-center justify-center flex-shrink-0 transition-all duration-300">
                                    <FiMail className="text-lg" />
                                </div>
                                <div>
                                    <a href="mailto:support@game.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                                        support@game.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-gray-400 text-sm">
                                © 2026 <span className="text-white font-semibold">Game Store</span>. All rights reserved.
                            </p>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-gray-400 text-sm">We Accept:</span>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-8 rounded bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                                    <FiCreditCard className="text-lg" />
                                </div>
                                <div className="w-12 h-8 rounded bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                                    <FiCreditCard className="text-lg" />
                                </div>
                                <div className="w-12 h-8 rounded bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                                    <FiCreditCard className="text-lg" />
                                </div>
                                <div className="w-12 h-8 rounded bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                                    <FiCreditCard className="text-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Gradient Line at Bottom */}
            <div className="h-1 bg-gradient-to-r from-[#E60023] via-[#ff1744] to-[#E60023] animate-gradient"></div>

            <style jsx>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
            `}</style>

            <ChatBot />

        </footer>
    );
};

export default Footer;