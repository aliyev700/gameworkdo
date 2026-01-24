import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">GAMESTORE</h3>
                    <p className="text-gray-400 text-sm">Azərbaycanın ən böyük oyun və texnologiya mağazası.</p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Linklər</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="/shop" className="hover:text-white">Oyunlar</Link></li>
                        <li><Link href="/blog" className="hover:text-white">Xəbərlər</Link></li>
                        <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Kömək</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="/contact" className="hover:text-white">Bizimlə Əlaqə</Link></li>
                        <li><Link href="/about" className="hover:text-white">Haqqımızda</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Ünvan</h4>
                    <p className="text-gray-400 text-sm">Bakı şəhəri, Nizami küçəsi 14.</p>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
                © 2024 GameStore. Bütün hüquqlar qorunur.
            </div>
        </footer>
    );
};

export default Footer;