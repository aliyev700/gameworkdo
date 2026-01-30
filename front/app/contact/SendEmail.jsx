import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaRegUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbMessageCircleFilled } from "react-icons/tb";

const SERVICE_ID = 'service_gl96cg6';
const TEMPLATE_ID = 'template_2y7qdii';
const PUBLIC_KEY = '_i0W0jBjvRHh2NKqo';

export default function ContactForm() {
  const form = useRef(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatusMessage('');
    setIsLoading(true);

    if (form.current) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
        .then((result) => {
          console.log(result.text, 'Message Sent');
          setStatusMessage('✅ ' + 'Your message has been sent successfully!');
          if (form.current) form.current.reset();
        })
        .catch((error) => {
          console.error('Error:', error);
          // Даем более универсальное сообщение об ошибке
          setStatusMessage('❌ ' + (error?.text || error?.message || 'An unknown error occurred.'));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className=" py-20 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div className="max-w-7xl mx-auto">


        <div className="grid lg:grid-cols-2 gap-16 items-start">


          <div className="opacity-0 animate-fadeInUp animation-delay-400">
            <div className="bg-none w-130 relative">

              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="relative rounded-xl overflow-hidden">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="text-gray-500"><FaRegUser /></i>
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder={('name')}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                    required
                  />
                </div>

                <div className="relative rounded-xl overflow-hidden">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="text-gray-500"><MdEmail /></i>
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder={('email')}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                    required
                  />
                </div>

                <div className="relative rounded-xl overflow-hidden">
                  <div className="absolute top-4 left-3 pointer-events-none">
                    <i className="text-gray-500"><TbMessageCircleFilled /></i>
                  </div>
                  <textarea
                    rows="6"
                    name="message"
                    placeholder={('message')}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-950 rounded-xl cursor-pointer border-2 border-gray-800 overflow-hidden text-white font-normal py-3 px-6 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? ('contact.form.sending') : ('Submit')}
                </button>
              </form>
            </div>

            {statusMessage && (
              <div className={`mt-4 p-4 text-sm border ${statusMessage.startsWith('✅')
                ? 'bg-green-50 text-green-800 border-green-200'
                : 'bg-red-50 text-red-800 border-red-200'
                }`}>
                {statusMessage}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-300 { animation-delay: 0.3s; }
                .animation-delay-400 { animation-delay: 0.4s; }
            `}</style>
    </div>
  );
}
