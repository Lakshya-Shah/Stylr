'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, MapPin, Sparkles, Compass } from 'lucide-react';

export default function AboutPage() {
  const { storeContent } = useStore();
  const { brandStory } = storeContent;

  return (
    <div className="w-full flex-1 bg-[#F5F1E9]">
      {/* Editorial Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E5DED4]">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block">
            {brandStory.tagline}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#242321] leading-tight">
            THE STYLR PHILOSOPHY
          </h1>
          <p className="text-sm sm:text-base text-[#77716B] leading-relaxed font-light">
            Rooted in Surat&apos;s celebrated textile heritage, STYLR was founded to offer Indian men an elevated alternative to generic fast fashion: considered tailoring, relaxed luxury, and breathable natural textiles.
          </p>
        </div>
      </section>

      {/* Narrative Section with Large Photo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 aspect-[4/5] bg-[#EAE5D9] overflow-hidden border border-[#E5DED4]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brandStory.image}
              alt="STYLR Craftsmanship in Surat"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55]">
              Vesu, Surat Flagship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#242321] leading-tight">
              {brandStory.title}
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#77716B] leading-relaxed">
              <p>{brandStory.paragraph1}</p>
              <p>{brandStory.paragraph2}</p>
              <p>
                From pure 100% French flax linen sourced for tropical resilience to architectural double-pleated trousers and effortless resort co-ords, each garment is tested for enduring drape and comfort.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="px-8 py-3.5 bg-[#29221D] hover:bg-[#35251E] text-white text-xs uppercase font-semibold tracking-widest text-center"
              >
                Explore The Collection
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 border border-[#242321] hover:bg-[#242321] hover:text-white text-[#242321] text-xs uppercase font-semibold tracking-widest text-center transition-colors"
              >
                Visit Surat Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Tenets Grid */}
      <section className="bg-[#FAF9F6] border-y border-[#E5DED4] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl text-center text-[#242321] mb-12">
            Our Guiding Standards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white border border-[#E5DED4] space-y-3">
              <Compass className="w-5 h-5 text-[#A77B55]" />
              <h4 className="font-serif text-lg text-[#242321]">Intentional Proportions</h4>
              <p className="text-xs text-[#77716B] leading-relaxed">
                Silhouettes cut with generous chest drape, relaxed shoulders, and flattering clean breaks tailored for contemporary life.
              </p>
            </div>
            <div className="p-6 bg-white border border-[#E5DED4] space-y-3">
              <Sparkles className="w-5 h-5 text-[#A77B55]" />
              <h4 className="font-serif text-lg text-[#242321]">Tactile Natural Textiles</h4>
              <p className="text-xs text-[#77716B] leading-relaxed">
                We prioritize breathable natural fibers: garment-washed French linen, Supima 280 GSM cotton, and textured waffle knits.
              </p>
            </div>
            <div className="p-6 bg-white border border-[#E5DED4] space-y-3">
              <MapPin className="w-5 h-5 text-[#A77B55]" />
              <h4 className="font-serif text-lg text-[#242321]">Surat Studio Excellence</h4>
              <p className="text-xs text-[#77716B] leading-relaxed">
                Designed, curated, and quality-inspected at our Vesu flagship studio, with seamless express delivery spanning all Indian PIN codes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
