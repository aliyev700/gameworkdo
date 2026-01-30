export default function PlayStationTicker() {
  return (
    <div className="bg-black py-0">
      <div className="w-full bg-gradient-to-r from-blue-900 to-blue-600 py-3 overflow-hidden shadow-lg shadow-blue-500/50">
        <div className="flex animate-scroll">
          {/* Дублируем контент для бесшовной анимации */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0">
              {[...Array(10)].map((_, j) => (
                <div key={j} className="flex items-center px-8">
                  <img
                    className="w-12 h-30 object-contain"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/1280px-PlayStation_logo.svg.png"
                    alt="PlayStation"
                  />
                  <span className="text-white text-4xl font-black mx-4 tracking-tight">
                    PlayStation
                  </span>
                  <img
                    className="w-12 h-12 object-contain"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/1280px-PlayStation_logo.svg.png"
                    alt="PlayStation"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </div>
  );
}