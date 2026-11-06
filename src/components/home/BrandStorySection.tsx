'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Compass } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  const { storeContent } = useStore();
  const { brandStory } = storeContent;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E5DED4]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Brand Imagery */}
        <div className="lg:col-span-5 order-2 lg:order-1 relative aspect-[4/5] bg-[#EAE5D9] overflow-hidden border border-[#E5DED4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brandStory.image}
            alt="STYLR Surat Studio Craftsmanship"
            className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-103"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-[#FAF9F6]/90 backdrop-blur-xs p-3 text-[11px] text-[#77716B] border border-[#E5DED4]">
            {brandStory.locationNote}
          </div>
        </div>

        {/* Right: Narrative */}
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
          <div className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-[0.25em] text-[#A77B55]">
            <Compass className="w-3.5 h-3.5 text-[#A77B55]" />
            <span>Our Philosophy</span>
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-[#77716B] font-semibold block">
            {brandStory.tagline}
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#242321] leading-tight">
            {brandStory.title}
          </h2>

          <div className="space-y-4 text-sm text-[#77716B] font-normal leading-relaxed">
            <p>{brandStory.paragraph1}</p>
            <p>{brandStory.paragraph2}</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#242321] hover:text-[#A77B55] transition-colors group"
            >
              <span>Read The Full Story</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <span className="hidden sm:inline-block text-[#E5DED4]">•</span>

            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#77716B] hover:text-[#242321] transition-colors"
            >
              <span>Visit Vesu Flagship</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
