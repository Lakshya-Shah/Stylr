'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Compass } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { storeContent } = useStore();
  const { hero } = storeContent;

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9F6] border-b border-[#E5DED4]">
      {/* Editorial Split Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[78vh] lg:min-h-[86vh]">
        {/* Left Column: Typography & Storytelling */}
        <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-12 lg:p-16 order-2 lg:order-1 border-r border-[#E5DED4]/60">
          {/* Subtle Tag */}
          <div className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-[0.25em] text-[#A77B55]">
            <Compass className="w-3.5 h-3.5 text-[#A77B55]" />
            <span>The Autumn/Summer Wardrobe Edit</span>
          </div>

          {/* Core Headline */}
          <div className="my-8 lg:my-auto space-y-5">
            <span className="text-xs uppercase tracking-[0.3em] text-[#77716B] font-semibold block">
              {hero.subheadline}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#242321] leading-[1.08] tracking-tight">
              {hero.headline}
            </h1>
            <p className="text-sm text-[#77716B] leading-relaxed max-w-md font-normal">
              {hero.description}
            </p>

            {/* CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link
                href={hero.primaryButtonLink}
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 bg-[#29221D] hover:bg-[#35251E] text-[#FAF9F6] text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-sm group"
              >
                <span>{hero.primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={hero.secondaryButtonLink}
                className="inline-flex items-center justify-center px-7 py-3.5 border border-[#242321] hover:bg-[#242321] hover:text-[#FAF9F6] text-[#242321] text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300"
              >
                <span>{hero.secondaryButtonText}</span>
              </Link>
            </div>
          </div>

          {/* Bottom Editorial Meta */}
          <div className="pt-6 border-t border-[#E5DED4] grid grid-cols-2 gap-4 text-xs text-[#77716B]">
            <div>
              <span className="font-serif text-base text-[#242321] block">Pure French Linen</span>
              <span className="text-[11px]">Naturally breathable textiles</span>
            </div>
            <div>
              <span className="font-serif text-base text-[#242321] block">Pan-India Express</span>
              <span className="text-[11px]">Free shipping above ₹2,499</span>
            </div>
          </div>
        </div>

        {/* Right Column: High Fashion Editorial Photography */}
        <div className="lg:col-span-7 relative order-1 lg:order-2 bg-[#EAE5D9] overflow-hidden min-h-[380px] sm:min-h-[460px] lg:min-h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero.bannerImage}
            alt="STYLR Contemporary Menswear Campaign"
            className="w-full h-full object-cover object-center scale-[1.01] hover:scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Floating Minimal Badge */}
          <div className="absolute bottom-6 right-6 bg-[#FAF9F6]/95 backdrop-blur-xs p-4 border border-[#E5DED4] hidden sm:block max-w-xs shadow-lg">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#A77B55] mb-1">
              Curated Look 01
            </p>
            <p className="font-serif text-base text-[#242321] leading-tight">
              Camp Linen &amp; Wide Pleats
            </p>
            <Link
              href="/shop?collection=summer-linen"
              className="text-[11px] uppercase tracking-wider text-[#77716B] hover:text-[#242321] font-semibold mt-2 inline-flex items-center space-x-1"
            >
              <span>View Fit</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
