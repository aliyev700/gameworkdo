'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Gamepad2, HelpCircle, MessageCircle } from 'lucide-react';

// --- DATA: FAQ ITEMS ---
// You can translate these strings to Azerbaijani later
const faqData = [
    {
        id: 1,
        question: "How do I purchase a game?",
        answer: "Simply browse our catalog, click on the game you want, and hit 'Add to Cart'. Once you are ready, proceed to checkout. You will receive a digital key immediately after payment."
    },
    {
        id: 2,
        question: "Is my payment information safe?",
        answer: "Yes! We use Stripe and PayPal for processing, ensuring your data is encrypted and 100% secure. We do not store your credit card details."
    },
    {
        id: 3,
        question: "can I get a refund?",
        answer: "Refunds are available for keys that have not been redeemed within 14 days of purchase. If the key is invalid, we will provide a replacement instantly."
    },
    {
        id: 4,
        question: "How do I activate my key?",
        answer: "Most keys are for Steam, Xbox, or PlayStation. Go to the respective platform store, select 'Redeem Code', and paste the key we sent to your email."
    },
    {
        id: 5,
        question: "Do you support Azerbaijani cards?",
        answer: "Yes, we accept all major credit and debit cards issued in Azerbaijan (Visa/Mastercard), as well as local payment methods."
    },
    {
        id: 6,
        question: "I didn't receive my email!",
        answer: "Please check your Spam/Junk folder. If it's not there after 10 minutes, contact our support team via the form below with your Order ID."
    }
];

const FAQPage = () => {
    // State to track which question is open. Null means all are closed.
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">

            {/* --- HERO SECTION --- */}
            <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://cdn.esquireindia.co.in/editor-images/2025-09-25T13%3A00%3A46.626Z-Copy%20of%20Ghost_Of_Yotei_Keyart.jpg"
                        alt="Gaming Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
                            FAQ<span className="text-purple-500">.</span>
                        </h1>
                    </div>
                    <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
                        Have questions? We've got answers. <br className="hidden md:block" />
                        Everything you need to know about your orders, keys, and security.
                    </p>
                </div>
            </div>

            {/* --- FAQ GRID SECTION --- */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 -mt-20 relative z-20">

                <div className="mb-8 pl-2 border-l-4 border-purple-500">
                    <p className="text-neutral-500 font-mono text-sm">COMMON QUESTIONS</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {faqData.map((faq, index) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`
                group rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300
                ${openIndex === index ? 'border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]' : 'hover:border-neutral-700'}
              `}
                        >
                            {/* Question Header */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                            >
                                <span className={`font-semibold text-lg transition-colors ${openIndex === index ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                                    {faq.question}
                                </span>
                                <span className={`p-2 rounded-full border transition-all duration-300 ${openIndex === index ? 'bg-purple-500 border-purple-500 text-white rotate-180' : 'border-neutral-700 text-neutral-500 group-hover:border-neutral-500'}`}>
                                    {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                </span>
                            </button>

                            {/* Answer Content (Animated) */}
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-neutral-400 leading-relaxed border-t border-neutral-800/50 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* --- BOTTOM CTA --- */}
                <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-900 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-purple-500">
                            <MessageCircle />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Still have questions?</h3>
                            <p className="text-neutral-400">Can't find the answer you're looking for? Chat with us.</p>
                        </div>
                    </div>

                    <button className="relative z-10 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300">
                        <Link href="/contact" className="block">
                            Contact Support
                        </Link>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default FAQPage;