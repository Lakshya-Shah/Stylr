'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { OUTFIT_LOOKS } from '../../data/initialData';
import { useStore } from '../../context/StoreContext';
import { OutfitLook } from '../../types';
import { ShoppingBag, Eye, X, Check, ArrowRight } from 'lucide-react';

export const ShopTheLookSection: React.FC = () => {
  const { products, setQuickAddProduct } = useStore();
  const [activeLook, setActiveLook] = useState<OutfitLook>(OUTFIT_LOOKS[0]);
  const [selectedOutfitModal, setSelectedOutfitModal] = useState<OutfitLook | null>(null);

  const lookProducts = products.filter((p) => activeLook.productIds.includes(p.id));

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5DED4]">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-2">
            Curated Ensembles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#242321] tracking-tight">
            SHOP THE LOOK
          </h2>
          <p className="text-xs text-[#77716B] mt-1 font-normal">
            Complete outfits composed by our in-house stylists in Surat.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex space-x-2 mt-4 md:mt-0 overflow-x-auto pb-1 md:pb-0">
          {OUTFIT_LOOKS.map((look) => (
            <button
              key={look.id}
              onClick={() => setActiveLook(look)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
                activeLook.id === look.id
                  ? 'bg-[#29221D] text-[#FAF9F6]'
                  : 'bg-[#F5F1E9] text-[#77716B] hover:text-[#242321] hover:bg-[#E5DED4]'
              }`}
            >
              {look.title.replace('The ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Outfit Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF9F6] border border-[#E5DED4] p-6 sm:p-8 lg:p-10">
        {/* Left: Main Editorial Outfit Photography */}
        <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden bg-[#EAE5D9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeLook.image}
            alt={activeLook.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-102"
          />

          {/* Minimal Hotspot Overlay */}
          <div className="absolute top-6 left-6 bg-[#29221D]/90 backdrop-blur-xs text-[#FAF9F6] p-4 max-w-xs shadow-xl border border-[#3E342D]">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C49B74] block mb-1">
              {activeLook.subtitle}
            </span>
            <h4 className="font-serif text-xl leading-snug">{activeLook.title}</h4>
            <p className="text-xs text-[#FAF9F6]/80 mt-1 line-clamp-2 leading-relaxed">
              {activeLook.description}
            </p>
          </div>
        </div>

        {/* Right: The Breakdown of Individual Pieces */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-2">
              Pieces in This Fit ({lookProducts.length})
            </span>
            <p className="text-xs text-[#77716B] mb-6">
              Select any piece to inspect fit details or add directly to your bag.
            </p>

            {/* List of items */}
            <div className="space-y-4">
              {lookProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center p-3 bg-white border border-[#E5DED4] hover:border-[#242321] transition-all group"
                >
                  <div className="w-16 h-20 bg-[#F5F1E9] flex-shrink-0 overflow-hidden mr-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#A77B55] font-semibold block">
                      {prod.categoryName}
                    </span>
                    <Link
                      href={`/product/${prod.slug}`}
                      className="text-sm font-medium text-[#242321] hover:text-[#A77B55] transition-colors truncate block"
                    >
                      {prod.name}
                    </Link>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs font-semibold text-[#242321]">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-[10px] text-[#77716B] line-through">
                          ₹{prod.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setQuickAddProduct(prod)}
                    className="p-2.5 bg-[#F5F1E9] hover:bg-[#29221D] hover:text-white text-[#242321] transition-colors ml-2"
                    title="Quick Add to Bag"
                    aria-label={`Quick add ${prod.name}`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Outfit total & Quick actions */}
          <div className="pt-6 border-t border-[#E5DED4] bg-white p-4 border">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-[#77716B] font-medium">Combined Fit Total</span>
              <span className="font-serif text-xl font-medium text-[#242321]">
                ₹{lookProducts.reduce((sum, p) => sum + p.price, 0).toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-[#A77B55] mb-4">
              ✨ Eligible for Complimentary Express Pan-India Shipping &amp; STYLR10 discount
            </p>
            <div className="flex gap-2">
              <Link
                href="/shop"
                className="w-full py-3 bg-[#29221D] hover:bg-[#35251E] text-[#FAF9F6] text-xs font-semibold uppercase tracking-widest text-center flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Shop All In Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
