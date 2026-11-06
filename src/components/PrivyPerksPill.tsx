'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, X, Check, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PrivyPerksPill: React.FC = () => {
  const { applyCoupon, showToast } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('stylr_perk_dismissed')) {
        setIsDismissed(true);
      }
    } catch {}
  }, []);

  const handleCopyAndApply = () => {
    applyCoupon('STYLR10');
    navigator.clipboard?.writeText('STYLR10');
    setCopied(true);
    showToast('Promo code STYLR10 applied to your bag!', 'success');
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1500);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    try {
      sessionStorage.setItem('stylr_perk_dismissed', 'true');
    } catch {}
  };

  if (isDismissed) return null;

  return (
    <>
      {/* Floating Pill on bottom-left for desktop & mobile */}
      <div className="fixed bottom-20 lg:bottom-6 left-4 z-30 animate-fade-in">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2.5 px-3.5 py-2 bg-[#29221D] text-[#FAF9F6] border border-[#A77B55]/50 shadow-xl hover:bg-[#35251E] transition-all transform hover:-translate-y-0.5 group rounded-full"
          title="Open STYLR Privé Member Perks"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C49B74] group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-semibold tracking-wide">
            Get 10% Off <span className="text-[#C49B74] font-bold">STYLR10</span>
          </span>
          <span
            onClick={handleDismiss}
            className="text-stone-400 hover:text-white p-0.5 ml-1 transition-colors"
            title="Dismiss"
          >
            <X className="w-3 h-3" />
          </span>
        </button>
      </div>

      {/* Privé Perks Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FAF9F6] border border-[#E5DED4] w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#77716B] hover:text-[#242321] p-1 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 mb-2">
              <Gift className="w-5 h-5 text-[#A77B55]" />
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#A77B55]">
                STYLR Privé Perks
              </span>
            </div>

            <h3 className="font-serif text-2xl text-[#242321] mb-2">
              Unlock Your Welcome Privilege
            </h3>
            <p className="text-xs text-[#77716B] leading-relaxed mb-5">
              Enjoy handcrafted French linen and tailored silhouettes with complimentary pan-India shipping and direct atelier perks.
            </p>

            {/* Code Box */}
            <div className="bg-[#F5F1E9] border border-[#E5DED4] p-4 flex items-center justify-between mb-5">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#77716B] block">
                  First Order Promo Code
                </span>
                <span className="font-mono text-base font-bold text-[#242321] tracking-wider">
                  STYLR10
                </span>
                <span className="text-[11px] text-[#A77B55] block font-medium">10% Instant Off</span>
              </div>
              <button
                onClick={handleCopyAndApply}
                className="px-4 py-2 bg-[#29221D] hover:bg-[#35251E] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center space-x-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Applied!</span>
                  </>
                ) : (
                  <span>Apply Code</span>
                )}
              </button>
            </div>

            {/* Perk items */}
            <div className="space-y-2.5 text-xs text-[#242321] border-t border-[#E5DED4] pt-4 mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A77B55]" />
                <span>Complimentary Express Shipping on orders above ₹2,499</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A77B55]" />
                <span>7-Day Effortless Returns &amp; Size Exchanges</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A77B55]" />
                <span>Personal styling &amp; fabric advisory via WhatsApp Concierge</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 text-center text-xs text-[#77716B] hover:text-[#242321] uppercase tracking-wider font-semibold transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </>
  );
};
