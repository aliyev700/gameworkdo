"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const faqData = [
    {
      question: "How to setup a page with custom fields?"
    },
    {
      question: "How to setup a page with custom fields?"
    },
    {
      question: "How to setup a page with custom fields?"
    },
    {
      question: "How to setup a page with custom fields?"
    },
    {
      question: "How to setup a page with custom fields?"
    },
    {
      question: "How to setup a page with custom fields?"
    },
    {
      question: "How to setup a page with custom fields?"
    },
    {
      question: "How to setup a page with custom fields?"
    },
    {
      question: "How to setup a page with custom fields?"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
       <div className='relative w-full border-b border-gray-800 h-96  overflow-hidden'>
        <img
          className='w-full  h-full object-cover brightness-30 '
          src="https://assets.xboxservices.com/assets/29/4e/294e0a5e-334f-4bfd-a242-b8cefddbdf6b.jpg?n=Red-Dead-Redemption-II_Sneaky-Slider-1084_Stand-Alone_1600x675.jpg"
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

      {/* FAQ Section */}
      <div className="px-8 md:px-16 lg:px-32 py-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">About Shop</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqData.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-700 transition-all duration-300 hover:border-gray-500"
            >
              <div className="w-full px-6 py-5 flex items-center justify-between">
                <span className="font-medium text-base pr-4">{faq.question}</span>
                <ChevronDown className="w-5 h-5 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}