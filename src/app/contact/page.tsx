'use client';

import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Check } from 'lucide-react';
import { InstagramIcon } from '../../components/icons/InstagramIcon';

export default function ContactPage() {
  const { storeContent, showToast } = useStore();
  const { contact } = storeContent;

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName && formEmail && formMessage) {
      setIsSent(true);
      showToast('Enquiry received! Our Vesu studio team will connect within 24 hours.');
      setFormName('');
      setFormEmail('');
      setFormSubject('');
      setFormMessage('');
    }
  };

  const cleanPhone = contact.whatsappNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello STYLR Vesu Team, I have an enquiry regarding visiting the store or placing an order.'
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
      {/* Page Header */}
      <div className="pb-6 border-b border-[#E5DED4] mb-10">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-2">
          Surat Flagship &amp; Client Services
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#242321] tracking-tight">
          CONNECT WITH STYLR
        </h1>
        <p className="text-xs text-[#77716B] mt-2 max-w-xl">
          Visit our flagship menswear studio in Vesu, Surat or reach out to our concierge for personal styling assistance and bespoke sizing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Store Details & Studio Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 border border-[#E5DED4] space-y-6">
            <h3 className="font-serif text-2xl text-[#242321] pb-3 border-b border-[#E5DED4]">
              Vesu Flagship Studio
            </h3>

            <div className="space-y-4 text-xs text-[#77716B]">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#A77B55] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#242321] block font-semibold">{contact.storeName}</strong>
                  <p className="mt-0.5 leading-relaxed">
                    {contact.address}, {contact.locality}, {contact.city}, {contact.state} — {contact.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[#A77B55] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#242321] block font-semibold">Studio Opening Hours</strong>
                  <p className="mt-0.5 leading-relaxed">{contact.hours}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#A77B55] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#242321] block font-semibold">Direct Telephone</strong>
                  <p className="mt-0.5">{contact.displayPhone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#A77B55] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#242321] block font-semibold">Email Concierge</strong>
                  <p className="mt-0.5">{contact.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <InstagramIcon className="w-4 h-4 text-[#A77B55] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#242321] block font-semibold">Official Instagram</strong>
                  <a
                    href="https://www.instagram.com/stylrmensclothing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A77B55] hover:underline"
                  >
                    {contact.instagramHandle}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="pt-4 border-t border-[#E5DED4]">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#29221D] hover:bg-[#35251E] text-white text-xs uppercase font-semibold tracking-wider flex items-center justify-center space-x-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat with Vesu Stylist on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 border border-[#E5DED4]">
            <h3 className="font-serif text-2xl text-[#242321] mb-2">
              Send An Inquiry
            </h3>
            <p className="text-xs text-[#77716B] mb-6">
              Whether you need fitting guidance, order assistance, or wholesale inquiries.
            </p>

            {isSent ? (
              <div className="p-6 bg-[#FAF9F6] border border-[#E5DED4] text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-[#242321]">Message Received</h4>
                <p className="text-xs text-[#77716B] max-w-sm mx-auto">
                  Thank you for contacting STYLR. Our styling team in Surat will review your note and respond promptly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-3 text-xs uppercase font-semibold text-[#A77B55] hover:underline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase font-semibold text-[#242321] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Priyesh Patel"
                      className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden focus:border-[#242321]"
                    />
                  </div>
                  <div>
                    <label className="block uppercase font-semibold text-[#242321] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. priyesh@example.com"
                      className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden focus:border-[#242321]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#242321] mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    placeholder="Sizing advice, Order tracking, or Studio appointment"
                    className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden focus:border-[#242321]"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#242321] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Describe how our stylists can assist you..."
                    className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden focus:border-[#242321]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#29221D] hover:bg-[#35251E] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
