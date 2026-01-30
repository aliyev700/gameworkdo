"use client";

import React from 'react';
import { FaCircleArrowRight } from 'react-icons/fa6';
import PlayStationTicker from './playstation';

const AboutPage = () => {
  const goToPage = (url: string) => {
    window.location.href = url;
  };

  const cards = [
    {
      img: "https://substackcdn.com/image/fetch/$s_!fcDA!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fec73ddd9-ca39-4187-9e78-9dd34af68813_1080x1350.webp",
      title: "Exposition ARCANE Gamer...",
      text: "Many arcade games have short levels, simple and intuitive control schemes, and rapidly increasing...",
      link: "/blog/arcade"
    },
    {
      img: "https://image.api.playstation.com/vulcan/ap/rnd/202304/1709/d7cdecd137b89048c25f8a08c9a537792be5d3afec03002a.png",
      title: "Playing Through the UFC...",
      text: "Arising alongside video game development in the 1980s, the term gameplay was used solely within...",
      link: "/blog/through-the-game"
    },
    {
      img: "https://i.ytimg.com/vi/FU3c3JvRKWQ/maxresdefault.jpg",
      title: "The FIFA Zone...",
      text: "The Game Boy was designed by Nintendo's chief engineer Gunpei Yokoi and its Nintendo R&D1 team...",
      link: "/blog/fifagame"
    },
    {
      img: "https://images.steamusercontent.com/ugc/2057627333613047058/F6FB29270FDA6A8E4661E4ADC85FA9165EE57A34/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      title: "Mortal Combat and Games...",
      text: "The right side of the device offers a port that allows a user to connect to system via a link...",
      link: "/blog/mortalcombat"
    }
  ];

  React.useEffect(() => {
    document.body.style.backgroundColor = 'black';
    document.documentElement.style.backgroundColor = 'black';

    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className='bg-black'>
      <div className='bg-black py-24 px-10 text-white'>
        <div className='max-w-380 mx-auto'>
          <h1 className='text-[50px] font-black mb-8'>News</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5'>
            {cards.map((card, index) => (
              <div
                key={index}
                className='bg-gradient-to-br from-gray-900 to-black border border-gray-800 text-white rounded-2xl shadow-lg overflow-hidden hover:border-[#E60023] hover:shadow-2xl hover:shadow-[#E60023]/20 transition-all duration-500 cursor-pointer group'
              >
                <div className='relative overflow-hidden'>
                  <img
                    className='rounded-t-2xl w-full h-75 object-cover group-hover:scale-110 transition-transform duration-700'
                    src={card.img}
                    alt={card.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className='p-5'>
                  <h1 className='mt-2 text-lg font-bold group-hover:text-[#E60023] transition-colors'>{card.title}</h1>
                  <p className='mt-2 text-sm text-gray-400 leading-relaxed'>{card.text}</p>
                  <button
                    onClick={() => goToPage(card.link)}
                    className='hover:scale-105 transition-transform flex items-center gap-2 mt-4 rounded-xl bg-gradient-to-r from-[#E60023] to-[#ff1744] text-[14px] text-white py-2 px-4 font-semibold shadow-lg hover:shadow-[#E60023]/50'
                  >
                    Read More <FaCircleArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PlayStationTicker />
    </div>
  );
};

export default AboutPage;