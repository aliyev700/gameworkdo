"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
// --- YENİ: Context-i import edirik ---
import { CartProvider } from "./context/CartContsxt";
// -------------------------------------

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <html lang="az">
      <body className={inter.className}>
        {/* Bütün saytı CartProvider ilə qucaqlayırıq */}
        <CartProvider>
          {!isAdminPage && <Header />}
          <main className="min-h-screen">
            {children}
          </main>
          {!isAdminPage && <Footer />}
        </CartProvider>
        {/* ------------------------------------------- */}
      </body>
    </html>
  );
}