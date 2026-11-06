'use client';

import React, { useState, use, Suspense } from 'react';
import Link from 'next/link';
import { useStore } from '../../../context/StoreContext';
import { CATEGORIES_LIST } from '../../../data/initialData';
import { ProductCard } from '../../../components/ProductCard';
import { ProductSize } from '../../../types';

function CategoryDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { products } = useStore();

  const categoryMeta = CATEGORIES_LIST.find((c) => c.slug === slug);
  const categoryProducts = products.filter((p) => p.category === slug);

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [sortBy, setSortBy] = useState('recommended');

  const filteredProducts = categoryProducts
    .filter((p) => {
      if (selectedSize) {
        return p.sizes.some((s) => s.size === selectedSize && s.inStock);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center space-x-2 text-xs text-[#77716B]">
        <Link href="/" className="hover:text-[#242321] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#242321] transition-colors">Clothing</Link>
        <span>/</span>
        <span className="text-[#242321] font-semibold capitalize">{categoryMeta?.name || slug}</span>
      </div>

      {/* Category Hero Banner */}
      <div className="relative overflow-hidden bg-[#29221D] text-[#FAF9F6] p-8 sm:p-12 mb-10 border border-[#3E342D]">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C49B74] block">
            Category Edit
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white tracking-tight">
            {categoryMeta?.name || slug.toUpperCase()}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            {categoryMeta?.description || 'Curated contemporary menswear designed for effortless living.'}
          </p>
          <div className="pt-2 text-xs text-[#C49B74] font-medium">
            {filteredProducts.length} Silhouettes Available
          </div>
        </div>

        {categoryMeta && (
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-30 hidden md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={categoryMeta.image}
              alt={categoryMeta.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Filter / Sort bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 mb-8 border-b border-[#E5DED4]">
        {/* Size pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs uppercase font-semibold text-[#77716B] mr-2">Size:</span>
          {(['S', 'M', 'L', 'XL', 'XXL'] as ProductSize[]).map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
              className={`px-3 py-1 text-xs uppercase font-semibold border transition-colors ${
                selectedSize === sz
                  ? 'bg-[#29221D] text-white border-[#29221D]'
                  : 'bg-white text-[#242321] border-[#E5DED4] hover:border-[#242321]'
              }`}
            >
              {sz}
            </button>
          ))}
          {selectedSize && (
            <button
              onClick={() => setSelectedSize(null)}
              className="text-xs text-[#A77B55] hover:underline pl-2 font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#77716B] uppercase tracking-wider">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold uppercase tracking-wider border border-[#E5DED4] bg-white px-3 py-1.5 text-[#242321] focus:outline-hidden"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white border border-[#E5DED4] p-8">
          <p className="font-serif text-2xl text-[#242321] mb-2">No garments found in this size</p>
          <p className="text-xs text-[#77716B] mb-6">
            Clear your size filter to view all available designs in this category.
          </p>
          <button
            onClick={() => setSelectedSize(null)}
            className="px-6 py-2.5 bg-[#29221D] text-white text-xs uppercase font-semibold tracking-wider"
          >
            Show All Sizes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs uppercase tracking-widest">Loading Category Edit...</div>}>
      <CategoryDetailContent params={params} />
    </Suspense>
  );
}
