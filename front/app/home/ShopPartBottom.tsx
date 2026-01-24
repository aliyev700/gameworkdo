import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

const ShopPart = () => {
    return (
        <section className="max-w-390 justify-center mx-auto my-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Don't Miss</h1>
                <Link href="/shop" className="bg-[#E60023] text-white font-bold py-4 px-8 rounded-2xl flex items-center gap-3 hover:bg-[#c50020] transition-all duration-300 hover:scale-105 shadow-lg">
                    Show more products
                    <FiArrowRight className="text-xl" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-800 rounded-xl p-4">
                    <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
                    <h2 className="text-white text-xl font-bold mb-2">Game Title</h2>
                    <p className="text-gray-400 text-sm">Description of the game</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                    <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
                    <h2 className="text-white text-xl font-bold mb-2">Game Title</h2>
                    <p className="text-gray-400 text-sm">Description of the game</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4">
                    <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
                    <h2 className="text-white text-xl font-bold mb-2">Game Title</h2>
                    <p className="text-gray-400 text-sm">Description of the game</p>
                </div>
            </div>

        </section>
    )
}

export default ShopPart