import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header"; // <-- Import et
import Footer from "./components/Footer"; // <-- Import et

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GameStore - Oyun Satış Saytı",
  description: "Ən yeni oyunları bizdən alın",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <body className={inter.className}>
        <Header />             {/* Hər səhifənin başında olacaq */}
        <main className="min-h-screen">
          {children}           {/* Səhifələrin məzmunu bura düşür */}
        </main>
        <Footer />             {/* Hər səhifənin sonunda olacaq */}
      </body>
    </html>
  );
}