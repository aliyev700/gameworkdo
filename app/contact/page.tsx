
"use client";
import { useState, ChangeEvent } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import SendEmail from './SendEmail';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        description: '',
        agreedToTerms: false
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // For checkbox inputs, the `checked` property exists on HTMLInputElement.
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!formData.agreedToTerms) {
            alert('Please agree to the Terms & Conditions');
            return;
        }
        console.log('Form submitted:', formData);
        // Handle form submission here
    };

    return (
        <><div className=" bg-gray-900">


            {/* Hero Section with Contact Info and Form */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 bg-[url('https://media.wired.com/photos/639bf35a24c352e627eccc43/3:2/w_2560%2Cc_limit/Ragnaro%25CC%2588k-culture-ar1qdh.jpg')] bg-cover bg-center opacity-30"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side - Contact Information */}
                    <div className="text-white space-y-8">
                        <div>
                            <h1 className="text-5xl font-bold mb-6">Contact</h1>
                            <p className="text-gray-300 leading-relaxed max-w-md">
                                With that in mind, we strive to deliver accurate, trustworthy, and
                                engaging content to our users. Our team of experts, researchers, and
                                writers work tirelessly to curate high-quality articles, guides, and
                                resources that cover various domains such as technology, science, health,
                                business, and more.
                            </p>
                        </div>

                        <div className="space-y-6 pt-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">CALL US</h3>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-red-500" />
                                    <p className="text-2xl font-semibold">+994 50 210 4115</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">EMAIL:</h3>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-red-500" />
                                    <p className="text-xl">shop@company.com</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">ADDRESS:</h3>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-red-500 mt-1" />
                                    <p className="text-lg">
                                        1093 Marigold Lane,<br />
                                        Coral Way, Miami,<br />
                                        Florida, 33169
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>





                    <SendEmail />

                </div>
            </div>
        </div>
            <div className="w-full h-96 bg-gray-200">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5953.747698680343!2d49.852306714987655!3d40.37728508098184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d079efb5163%3A0xc20aa51a5f0b5e01!2sCode%20Academy!5e0!3m2!1sru!2saz!4v1769719587529!5m2!1sru!2saz"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                ></iframe>

            </div></>

    );
}