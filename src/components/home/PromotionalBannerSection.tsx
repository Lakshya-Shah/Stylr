'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const PromotionalBannerSection: React.FC = () => {
  const { storeContent } = useStore();
  const banner = storeContent.promotionalBanner;

  if (!banner.enabled) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#29221D] text-[#FAF9F6] border-y border-[#3E342D]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 min-h-[420px] items-center">
        {/* Left: Text & CTA */}
        <div className="md:col-span-7 p-8 sm:p-12 lg:p-16 space-y-4 z-10">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase font-bold tracking-[0.25em] text-[#C49B74] bg-[#35251E] px-3 py-1 border border-[#3E342D]">
            <Sparkles className="w-3.5 h-3.5 text-[#C49B74]" />
            <span>{banner.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF9F6] leading-[1.1] tracking-tight">
            {banner.title}
          </h2>

          <p className="text-sm text-[#FAF9F6]/80 max-w-lg leading-relaxed font-light">
            {banner.subtitle}
          </p>

          <div className="pt-4">
            <Link
              href={banner.ctaLink}
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#FAF9F6] text-[#242321] hover:bg-[#C49B74] hover:text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-md group"
            >
              <span>{banner.ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right: Mood photography */}
        <div className="md:col-span-5 relative h-72 md:h-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover object-center brightness-90 hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#29221D] via-transparent to-transparent hidden md:block" />
        </div>
      </div>
    </section>
  );
};
