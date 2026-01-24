import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-blue-900 text-white py-32 text-center px-4">
        <h1 className="text-5xl font-extrabold mb-6">Oyun Dünyasına Xoş Gəlmisiniz</h1>
        <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
          Ən son çıxan oyunları, ən sərfəli qiymətə əldə edin. Rəqəmsal lisenziyalar və fiziki disklər bir arada.
        </p>
        <Link href="/shop" className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition">
          Alış-verişə Başla
        </Link>
      </section>

      {/* Kateqoriyalar (Statik nümunə) */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Populyar Janrlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow text-center border hover:shadow-lg transition">
            <h3 className="text-xl font-bold">Action & Adventure</h3>
          </div>
          <div className="bg-white p-8 rounded-xl shadow text-center border hover:shadow-lg transition">
            <h3 className="text-xl font-bold">Sports & Racing</h3>
          </div>
          <div className="bg-white p-8 rounded-xl shadow text-center border hover:shadow-lg transition">
            <h3 className="text-xl font-bold">RPG & Strategy</h3>
          </div>
        </div>
      </section>
    </div>
  );
}