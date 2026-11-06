'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const EditorialCampaignSection: React.FC = () => {
  return (
    <section className="w-full bg-[#29221D] text-[#FAF9F6] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Column: Image with architectural warmth */}
        <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1400&q=85"
            alt="The Art of Everyday Style Campaign"
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Right Column: Editorial narrative */}
        <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#3E342D]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#C49B74] block mb-3">
              Editorial Vol. IV
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF9F6] leading-[1.15] mb-6">
              THE ART OF EVERYDAY STYLE
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#FAF9F6]/80 font-normal leading-relaxed">
              <p>
                True refinement does not announce itself; it is felt in the weight of an unhurried linen weave, the fluid fall of a double pleat, and the calm symmetry of an unbuttoned collar.
              </p>
              <p className="text-[#FAF9F6]/60">
                Crafted in limited runs with considered Indian manufacturing, each piece in this capsule is designed to coexist with what you already own, elevating your everyday presence.
              </p>
            </div>
          </div>

          <div className="pt-8 mt-6 border-t border-[#3E342D]">
            <Link
              href="/shop?collection=tailored-classics"
              className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C49B74] hover:text-[#FAF9F6] transition-colors group"
            >
              <span>Explore The Lookbook</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
