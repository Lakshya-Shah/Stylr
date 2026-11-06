'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight, Check, MapPin, Phone, Mail } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';

export const Footer: React.FC = () => {
  const { storeContent, showToast, setIsSizeGuideOpen } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setIsSubscribed(true);
      showToast('Thank you for subscribing to The STYLR Edit.');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#29221D] text-[#FAF9F6] border-t border-[#3E342D] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand Statement & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#3E342D]">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-3xl sm:text-4xl tracking-[0.25em] font-medium block">
              STYLR
            </span>
            <p className="text-xs uppercase tracking-[0.3em] text-[#A77B55]">
              {storeContent.brandStory.tagline}
            </p>
            <p className="text-xs text-[#FAF9F6]/75 max-w-md leading-relaxed">
              Curated contemporary menswear rooted in textile excellence. Designed for timeless ease, natural textures, and effortless day-to-evening versatility.
            </p>
            <div className="flex items-center space-x-3 text-xs text-[#FAF9F6]/80 pt-2">
              <MapPin className="w-4 h-4 text-[#C49B74] flex-shrink-0" />
              <span>Flagship: {storeContent.contact.locality}, {storeContent.contact.city}, {storeContent.contact.state}</span>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-10 flex flex-col justify-center">
            <h4 className="font-serif text-2xl text-[#FAF9F6] mb-2">Join The STYLR Edit</h4>
            <p className="text-xs text-[#FAF9F6]/70 mb-5 max-w-lg leading-relaxed">
              Receive private invitations to seasonal drops, editorial lookbooks, and exclusive limited-edition releases.
            </p>

            {isSubscribed ? (
              <div className="flex items-center space-x-2 text-xs text-[#C49B74] font-medium p-3 bg-[#35251E] border border-[#3E342D] max-w-md">
                <Check className="w-4 h-4" />
                <span>You are on the list. Look out for our next editorial drop.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="bg-[#35251E] border border-[#3E342D] px-4 py-3 text-xs text-[#FAF9F6] placeholder-[#FAF9F6]/40 focus:outline-hidden focus:border-[#C49B74] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#A77B55] hover:bg-[#C49B74] text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Subscribe</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-[#FAF9F6]/50 mt-2">
              By subscribing, you agree to receive email updates. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs border-b border-[#3E342D]">
          {/* Shop */}
          <div className="space-y-3">
            <p className="font-semibold uppercase tracking-widest text-[#C49B74] text-[11px]">Shop</p>
            <ul className="space-y-2 text-[#FAF9F6]/80">
              <li>
                <Link href="/shop?filter=new" className="hover:text-[#FAF9F6] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#FAF9F6] transition-colors">
                  All Clothing
                </Link>
              </li>
              <li>
                <Link href="/category/shirts" className="hover:text-[#FAF9F6] transition-colors">
                  French Linen Shirts
                </Link>
              </li>
              <li>
                <Link href="/category/t-shirts" className="hover:text-[#FAF9F6] transition-colors">
                  Supima T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/category/trousers" className="hover:text-[#FAF9F6] transition-colors">
                  Double-Pleated Trousers
                </Link>
              </li>
              <li>
                <Link href="/category/coords" className="hover:text-[#FAF9F6] transition-colors">
                  Resort Co-ords
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=bestsellers" className="hover:text-[#FAF9F6] transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <p className="font-semibold uppercase tracking-widest text-[#C49B74] text-[11px]">Customer Care</p>
            <ul className="space-y-2 text-[#FAF9F6]/80">
              <li>
                <Link href="/contact" className="hover:text-[#FAF9F6] transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-[#FAF9F6] transition-colors">
                  Pan-India Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns-and-exchanges" className="hover:text-[#FAF9F6] transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-[#FAF9F6] transition-colors text-left"
                >
                  Size & Fit Guide
                </button>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#FAF9F6] transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Studio */}
          <div className="space-y-3">
            <p className="font-semibold uppercase tracking-widest text-[#C49B74] text-[11px]">The Studio</p>
            <ul className="space-y-2 text-[#FAF9F6]/80">
              <li>
                <Link href="/about" className="hover:text-[#FAF9F6] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/stylrmensclothing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FAF9F6] transition-colors flex items-center space-x-1"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#C49B74]" />
                  <span>@stylrmensclothing</span>
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FAF9F6] transition-colors">
                  Surat Flagship Store
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#FAF9F6] transition-colors text-[#C49B74]">
                  Store Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <p className="font-semibold uppercase tracking-widest text-[#C49B74] text-[11px]">Legal & Trust</p>
            <ul className="space-y-2 text-[#FAF9F6]/80">
              <li>
                <Link href="/privacy-policy" className="hover:text-[#FAF9F6] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#FAF9F6] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/returns-and-exchanges" className="hover:text-[#FAF9F6] transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-[#FAF9F6] transition-colors">
                  Pan-India Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Verified Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#FAF9F6]/60">
          <div>
            © 2026 STYLR Men&apos;s Clothing. Vesu, Surat, Gujarat. All rights reserved.
          </div>

          <div className="flex items-center space-x-3 text-[10px] tracking-wider uppercase">
            <span className="px-2 py-1 bg-[#35251E] border border-[#3E342D] text-[#FAF9F6]/80 font-mono">
              UPI Verified
            </span>
            <span className="px-2 py-1 bg-[#35251E] border border-[#3E342D] text-[#FAF9F6]/80 font-mono">
              Razorpay Secured
            </span>
            <span className="px-2 py-1 bg-[#35251E] border border-[#3E342D] text-[#FAF9F6]/80 font-mono">
              RuPay / Cards
            </span>
            <span className="px-2 py-1 bg-[#35251E] border border-[#3E342D] text-[#FAF9F6]/80 font-mono">
              NetBanking
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
