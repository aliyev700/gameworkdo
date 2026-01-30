"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowAltCircleLeft, FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { FaCircleArrowRight, FaShareFromSquare } from 'react-icons/fa6'
import QuoteBox from './box';

const cards = [
  {
    img: "https://game-workdo.myshopify.com/cdn/shop/articles/4.png?v=1675061251",
    title: "Exposition Arcade Gamer...",
    text: "Many arcade games have short levels, simple and intuitive control schemes, and rapidly increasing...",
    link: "/blog/arcade"
  },
];

const ArcadePage = () => {
  const router = useRouter();

  const goToPage = (url: string) => {
    router.push(url);
  };

  return (
    <div className='bg-black text-white pb-20'>
      {/* Hero Section */}
      <div className='relative w-full border-b border-white h-80 overflow-hidden'>
        <img 
          className='w-full h-full object-cover brightness-30' 
          src="https://img.redbull.com/images/c_crop,w_2400,h_1200,x_180,y_0/c_auto,w_1200,h_600/f_auto,q_auto/redbullcom/2024/9/23/urujs4li4sy8swxes3rz/red-bull-arcane-quiz-header" 
          alt="" 
        />
        
        {/* Overlay Content */}
        <div className='absolute inset-0 flex items-center justify-start px-8 md:px-20'>
          <div className='flex flex-col gap-4 md:gap-8'>
            <button 
              onClick={() => goToPage('/about')} 
              className='text-base md:text-xl border border-gray-900 p-2 hover:border-white shadow-2xl rounded-2xl items-center font-bold text-white flex gap-2 w-fit'
            >
              <FaRegArrowAltCircleLeft />Back to Home
            </button>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white'>
              Exposition Arcade Gamer Tailors
            </h1>

            <div className='flex flex-wrap gap-4 text-white text-xs md:text-sm font-bold'>
              <p>News</p>
              <p>Category:</p>
              <p>Date: January 30, 2023</p>
            </div>
          </div>
        </div>
      </div>
     
      {/* Meta Information */}
      <div className="px-8 md:px-20">
        <ul className='flex flex-wrap gap-4 md:gap-6 mt-10 text-xs md:text-sm font-bold'>
          <li>WorkDo</li>
          <li>Category: news</li>
          <li>Date: January 30, 2023</li>
          <li className='flex items-center gap-2'> 
            <FaShareFromSquare /> Share
          </li>
        </ul>
        
        <p className='mt-12 text-2xl md:text-3xl lg:text-4xl font-bold'>
          Exposition Arcade Gamer Tailors
        </p>
      </div>

      {/* Image and Card Section */}
      <div className='mt-10 px-8 md:px-20'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Main Image */}
          <div className='flex-1'>
            <img 
              className='w-full h-auto border border-amber-800 rounded-lg' 
              src="https://m.media-amazon.com/images/S/pv-target-images/af5111c370669ce3f1d6fc3fc2d693794bc1c1a3d100fae22aad9b9c5249598f.jpg" 
              alt="" 
            />
          </div>
          
          {/* Card */}
          <div className='lg:w-80'>
            {cards.map((card, index) => (
              <div 
                key={index} 
                className='w-full h-auto border border-white bg-white text-black text-left rounded-lg shadow-md overflow-hidden'
              >
                <img className='w-full rounded-t-lg' src={card.img} alt={card.title} />
                <div className='p-4'>
                  <h1 className='mt-2 text-lg font-bold'>{card.title}</h1>
                  <p className='mt-1 text-sm'>{card.text}</p>
                  <button
                    onClick={() => goToPage(card.link)}
                    className='hover:scale-105 transition-transform flex items-center gap-2 mt-3 rounded-xl bg-red-500 text-sm text-white py-1 px-3'
                  >
                    Read More <FaCircleArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="px-8 md:px-20">
        <h1 className='text-lg md:text-xl font-bold mt-8 leading-relaxed'>
          Many arcade games have short levels, simple and intuitive control schemes, and rapidly increasing 
          difficulty. The classic formula for a successful arcade video game is "easy to learn, difficult to master" 
          along with a "multiple life, progressively difficult level" paradigm.
        </h1>
        
        <p className='mt-8 text-sm md:text-base leading-relaxed'>
          At Exposition Arcade Gamer Tailors, we believe that gaming is more than just a hobby—it's a form of self-expression and 
          an avenue for unforgettable adventures. Our arcade is a haven for gamers of all levels, from casual players to 
          competitive enthusiasts, offering an unparalleled gaming experience tailored to your preferences. Immerse yourself in a 
          world of state-of-the-art gaming equipment, meticulously curated game selections, and a vibrant atmosphere that 
          buzzes with excitement. Our arcade is carefully designed to create an immersive environment that transports you to the 
          heart of the gaming action.
        </p>
        
        <QuoteBox />
      </div>
    </div>
  )
}

export default ArcadePage