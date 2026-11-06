'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageSquare, X } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const { storeContent } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const cleanPhone = storeContent.contact.whatsappNumber.replace(/[^0-9]/g, '');
  const defaultMessage = encodeURIComponent(
    'Hello STYLR Team, I am browsing your online store and would like some assistance with fit and styling.'
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {isOpen && (
        <div className="mb-3 w-72 bg-[#29221D] text-[#FAF9F6] p-4 shadow-2xl border border-[#3E342D] animate-fade-in text-sm">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-serif text-base tracking-wide text-[#FAF9F6]">STYLR Concierge</p>
              <p className="text-xs text-[#A77B55]">Vesu, Surat • Online</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#FAF9F6]/60 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-[#FAF9F6]/80 mb-3 leading-relaxed">
            Need immediate help with sizing, fabric composition, or bespoke order requests?
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-2 px-3 bg-[#A77B55] hover:bg-[#C49B74] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-[#29221D] hover:bg-[#35251E] text-[#FAF9F6] border border-[#3E342D] px-3.5 py-2.5 shadow-lg transition-all duration-300 group"
        aria-label="WhatsApp Stylist"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <MessageSquare className="w-4 h-4 text-[#C49B74]" />
        <span className="text-xs uppercase tracking-widest font-medium hidden sm:inline-block">Stylist Chat</span>
      </button>
    </div>
  );
};
