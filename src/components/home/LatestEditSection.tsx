'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../ProductCard';
import { ArrowRight } from 'lucide-react';

export const LatestEditSection: React.FC = () => {
  const { products } = useStore();
  const latestProducts = products.filter((p) => p.isNewArrival).slice(0, 4);
  const displayProducts = latestProducts.length > 0 ? latestProducts : products.slice(0, 4);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E5DED4]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#E5DED4]">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-2">
            Seasonal Release
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#242321] tracking-tight">
            THE LATEST EDIT
          </h2>
          <p className="text-xs text-[#77716B] mt-1 font-normal">
            Fresh additions to your everyday wardrobe.
          </p>
        </div>

        <Link
          href="/shop?filter=new"
          className="mt-4 sm:mt-0 inline-flex items-center space-x-2 text-xs uppercase font-semibold tracking-widest text-[#242321] hover:text-[#A77B55] transition-colors group"
        >
          <span>View All New Arrivals</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 4-column desktop grid, 2-column mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
