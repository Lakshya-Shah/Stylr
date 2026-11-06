'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, setQuickAddProduct } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const isSaved = isInWishlist(product.id);

  const primaryImage = product.images[0];
  const hoverImage = product.images[1] || product.images[0];

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with editorial aspect ratio */}
      <div className="relative aspect-[3/4] w-full bg-[#EFECE6] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          {/* Base image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={primaryImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
              isHovered && hoverImage !== primaryImage ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
          />
          {/* Hover crossfade secondary image */}
          {hoverImage !== primaryImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={hoverImage}
              alt={`${product.name} alternate view`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-[1.02]' : 'opacity-0'
              }`}
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 pointer-events-none z-10">
          {product.isNewArrival && (
            <span className="bg-[#FAF9F6]/95 text-[#242321] text-[10px] uppercase font-semibold tracking-widest px-2.5 py-1 backdrop-blur-xs shadow-xs">
              New Arrival
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="bg-[#29221D]/90 text-[#FAF9F6] text-[10px] uppercase font-semibold tracking-widest px-2.5 py-1 backdrop-blur-xs">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center transition-all duration-200 ${
            isSaved
              ? 'bg-white text-red-600 shadow-sm'
              : 'bg-white/80 text-[#242321] hover:bg-white hover:text-[#A77B55] opacity-90 md:opacity-0 md:group-hover:opacity-100'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add Overlay on Hover / Mobile persistent bar */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickAddProduct(product);
            }}
            className="w-full py-2.5 bg-[#FAF9F6] hover:bg-white text-[#242321] text-xs font-semibold uppercase tracking-widest shadow-md transition-all flex items-center justify-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex flex-col">
        {/* Color swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center space-x-1.5 mb-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.colors.length > 1 && (
              <span className="text-[10px] text-[#77716B] font-medium tracking-tight">
                {product.colors.length} shades
              </span>
            )}
          </div>
        )}

        {/* Product Title */}
        <Link
          href={`/product/${product.slug}`}
          className="text-sm font-medium text-[#242321] hover:text-[#A77B55] transition-colors leading-snug tracking-tight line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price in INR */}
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-sm font-semibold text-[#242321]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#77716B] line-through font-normal">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
