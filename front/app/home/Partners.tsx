"use client";

import { FiTrendingUp } from "react-icons/fi";

const PartnersSection = () => {


    return (
        <section className=" py-16 px-4 lg:px-8 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-80 h-50 bg-[#E60023] rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-50 bg-blue-600 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-390 mx-auto relative z-10">

                {/* Header */}
                <div className="mb-12">

                    <h2 className="text-white text-4xl lg:text-4xl font-bold">
                        We are big family of partners
                    </h2>
                    <p className="text-gray-400 mt-3 text-lg">
                        Collaborating with the biggest names in gaming
                    </p>
                </div>

                {/* Partners Grid */}


                {/* Stats Bar */}
                <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 text-center hover:border-[#E60023] transition-all duration-300">
                        <div className="text-[#E60023] text-4xl font-bold mb-2">50+</div>
                        <div className="text-gray-400 text-sm">Gaming Partners</div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 text-center hover:border-[#E60023] transition-all duration-300">
                        <div className="text-[#E60023] text-4xl font-bold mb-2">1M+</div>
                        <div className="text-gray-400 text-sm">Happy Gamers</div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 text-center hover:border-[#E60023] transition-all duration-300">
                        <div className="text-[#E60023] text-4xl font-bold mb-2">500+</div>
                        <div className="text-gray-400 text-sm">Games Available</div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 text-center hover:border-[#E60023] transition-all duration-300">
                        <div className="text-[#E60023] text-4xl font-bold mb-2">24/7</div>
                        <div className="text-gray-400 text-sm">Support Available</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;