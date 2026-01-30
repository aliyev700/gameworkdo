import React from 'react'
import { FiZap, FiGift, FiHeadphones } from 'react-icons/fi'

const About = () => {
  return (
    <div className='bg-black mx-auto text-white pb-1'>

      {/* Hero Section */}
      <div className='relative w-full border-b border-gray-800 h-96 overflow-hidden'>
        <img
          className='w-full h-full object-cover brightness-30'
          src="https://images.squarespace-cdn.com/content/v1/5bb24b7ebfba3e46d18e7c5a/1553280656948-M4R826WI1V7SWWDSF7AL/spiderman.jpg?format=1500w"
          alt=""
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent'></div>

        <div className='absolute inset-0 flex items-center justify-start px-8 md:px-20'>
          <div className='flex flex-col gap-4 max-w-3xl'>
            <div className="w-12 h-1 bg-gradient-to-r from-[#E60023] to-transparent rounded-full mb-2"></div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white'>About Us</h1>
            <p className='text-base md:text-lg text-gray-300 leading-relaxed'>
              At AboutUs, we are a dynamic and innovative company committed to
              providing comprehensive information and valuable insights on a wide
              range of topics.
            </p>
          </div>
        </div>
      </div>


      {/* Mission Section */}
      <div className="px-8 md:px-20 py-16">
        <p className='text-3xl md:text-4xl lg:text-5xl font-bold mb-12'>
          Crafting Unforgettable Experiences
        </p>

        <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
          <div className='flex-1 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-[#E60023] transition-all duration-500'>
            <p className='text-sm md:text-base leading-relaxed text-gray-300'>
              At Gameverse, we believe that gaming is not just a pastime—it's a way of life. We are
              driven by a shared passion for gaming and a deep appreciation for the immersive worlds,
              thrilling challenges, and unforgettable experiences that games offer. Our mission is to
              create a vibrant and inclusive community where gamers of all backgrounds can come
              together to celebrate their love for games.
            </p>
          </div>

          <div className='flex-1 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-[#E60023] transition-all duration-500'>
            <p className='text-sm md:text-base leading-relaxed text-gray-300'>
              Our platform offers a vast selection of games across various genres, platforms, and
              styles. From action-packed adventures and immersive role-playing games to mind-
              bending puzzles and competitive multiplayer battles, we strive to cater to diverse gaming
              interests and preferences. With our carefully curated collection of games, you can
              discover new titles, revisit classics, and embark on endless gaming adventures.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className='bg-black text-white py-16'>
        <div className='px-8 md:px-20 max-w-7xl mx-auto'>

          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16'>
            Creating Gaming Magic The Ultimate Destination for Gamers
          </h1>

          {/* First Content Block */}
          <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 mb-20'>
            <div className='flex-1'>
              <h2 className='text-2xl md:text-3xl font-bold mb-6'>
                Gaming Potential with Our Expertise
              </h2>
              <div className='space-y-4 text-sm md:text-base leading-relaxed text-gray-300'>
                <p>
                  We understand the importance of staying up-to-date with the latest trends and
                  technological advancements in the gaming industry. That's why we constantly update our
                  library to ensure that you have access to the hottest releases and cutting-edge games.
                  Our team of passionate gamers scours the gaming landscape to bring you the most
                  exciting and innovative titles, ensuring that you're always at the forefront of the gaming
                  world. But Gameverse is more than just a platform for games. It's a community where
                  gamers can connect, share experiences, and forge lasting friendships. We provide
                  forums, chat rooms, and social features that enable you to interact with fellow gamers,
                  exchange tips and strategies, and participate in exciting gaming events and
                  competitions.
                </p>
                <p>
                  Whether you're seeking a friendly multiplayer match or seeking advice from seasoned
                  gamers, Gameverse is the place to be. At Gameverse, we value your gaming journey and
                  strive to enhance it through exceptional customer service.
                </p>
              </div>
            </div>

            <div className='flex-1'>
              <div className='relative overflow-hidden rounded-2xl border border-gray-800 group'>
                <img
                  className='w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700'
                  src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800"
                  alt="Gaming Setup"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Second Content Block */}
          <div className='flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 mb-20'>
            <div className='flex-1'>
              <h2 className='text-2xl md:text-3xl font-bold mb-6'>
                Your Gaming Journey with Us
              </h2>
              <div className='space-y-4 text-sm md:text-base leading-relaxed text-gray-300'>
                <p>
                  Our knowledgeable support team is always ready to assist you, whether you have
                  questions about games, technical issues, or recommendations for your next gaming
                  adventure. We are committed to providing a seamless and enjoyable gaming experience,
                  ensuring that you can focus on what matters most gaming to your heart's content. Join us
                  at Gameverse and embark on an extraordinary gaming journey. Immerse yourself in
                  captivating worlds, conquer epic challenges.
                </p>
                <p>
                  With our state-of-the-art gaming setups, cutting-edge technology, and a diverse
                  collection of games, we offer an unparalleled gaming experience. From classic titles that
                  bring back nostalgic memories to the latest releases that push the boundaries of
                  innovation, our gaming hub caters to a wide range of gaming interests and preferences.
                </p>
              </div>
            </div>

            <div className='flex-1'>
              <div className='relative overflow-hidden rounded-2xl border border-gray-800 group'>
                <img
                  className='w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700'
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"
                  alt="Gaming Setup Desk"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              About Our Services
            </h2>
            <p className='text-sm md:text-base max-w-3xl mx-auto text-gray-300'>
              Our mission is to empower individuals with knowledge and facilitate meaningful connections
              through our platform. We understand the importance of reliable and up-to-date
              information in today's fast-paced world.
            </p>
          </div>

          {/* Service Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

            <div className='bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-[#E60023] hover:shadow-xl hover:shadow-[#E60023]/20 transition-all duration-500 group'>
              <div className='flex items-start justify-between mb-4'>
                <h3 className='text-xl font-bold group-hover:text-[#E60023] transition-colors'>Fast Delivery</h3>
                <div className='w-12 h-12 bg-[#E60023]/10 rounded-xl flex items-center justify-center group-hover:bg-[#E60023] transition-all'>
                  <FiZap className='text-2xl text-[#E60023] group-hover:text-white transition-colors' />
                </div>
              </div>
              <p className='text-sm leading-relaxed text-gray-400'>
                The specific delivery time will vary depending on the shipping address and the selected delivery option.
                Customers can track their order online to see the...
              </p>
            </div>

            <div className='bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-[#E60023] hover:shadow-xl hover:shadow-[#E60023]/20 transition-all duration-500 group'>
              <div className='flex items-start justify-between mb-4'>
                <h3 className='text-xl font-bold group-hover:text-[#E60023] transition-colors'>Many Offers</h3>
                <div className='w-12 h-12 bg-[#E60023]/10 rounded-xl flex items-center justify-center group-hover:bg-[#E60023] transition-all'>
                  <FiGift className='text-2xl text-[#E60023] group-hover:text-white transition-colors' />
                </div>
              </div>
              <p className='text-sm leading-relaxed text-gray-400'>
                CMS also offers a variety of training and technical assistance to help providers and state agencies meet
                their responsibilities under Medicare, Medicaid, and...
              </p>
            </div>

            <div className='bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-[#E60023] hover:shadow-xl hover:shadow-[#E60023]/20 transition-all duration-500 group'>
              <div className='flex items-start justify-between mb-4'>
                <h3 className='text-xl font-bold group-hover:text-[#E60023] transition-colors'>24/7 Support</h3>
                <div className='w-12 h-12 bg-[#E60023]/10 rounded-xl flex items-center justify-center group-hover:bg-[#E60023] transition-all'>
                  <FiHeadphones className='text-2xl text-[#E60023] group-hover:text-white transition-colors' />
                </div>
              </div>
              <p className='text-sm leading-relaxed text-gray-400'>
                CMS Service support is available 24 hours a day, 7 days a week. You can reach them by phone, email, or
                chat. Here are the contact information for CMS...
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default About