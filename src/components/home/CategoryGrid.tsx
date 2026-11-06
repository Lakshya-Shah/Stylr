'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES_LIST } from '../../data/initialData';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5DED4]">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-2">
            Curated Categories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#242321] tracking-tight">
            Explore By Wardrobe Chapter
          </h2>
        </div>
        <p className="text-xs text-[#77716B] max-w-xs mt-3 md:mt-0 font-normal leading-relaxed">
          Each silhouette is designed with intentional proportions, relaxed tailoring, and tactile fabrics.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES_LIST.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="group relative aspect-[4/5] bg-[#EAE5D9] overflow-hidden flex flex-col justify-end p-6 border border-[#E5DED4]"
          >
            {/* Background Image with Zoom */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/85 transition-all duration-300" />

            {/* Category Text Content */}
            <div className="relative z-10 text-white space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C49B74]">
                  {category.itemCount} Designs
                </span>
                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#A77B55] transition-colors">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
              <h3 className="font-serif text-2xl text-white tracking-wide">
                {category.name}
              </h3>
              <p className="text-xs text-white/80 line-clamp-1 font-light leading-relaxed">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
