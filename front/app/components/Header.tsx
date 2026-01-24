import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-black text-blue-600">
                        GAME<span className="text-gray-900">STORE</span>
                    </Link>

                    {/* Menyu Linkləri */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Ana Səhifə</Link>
                        <Link href="/shop" className="text-gray-600 hover:text-blue-600 font-medium">Mağaza</Link>
                        <Link href="/blog" className="text-gray-600 hover:text-blue-600 font-medium">Blog</Link>
                        <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium">Haqqımızda</Link>
                        <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium">Əlaqə</Link>
                    </nav>

                    {/* Sağ tərəf (Səbət və ya Giriş) */}
                    <div className="flex items-center space-x-4">
                        <Link href="/shop" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700">
                            Alış-verişə Başla
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;