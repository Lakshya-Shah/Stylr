'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistIds, products, toggleWishlist, setQuickAddProduct } = useStore();

  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
      {/* Header */}
      <div className="pb-6 border-b border-[#E5DED4] mb-8 flex justify-between items-end">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-2">
            Private Curation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#242321] tracking-tight">
            MY WISHLIST
          </h1>
          <p className="text-xs text-[#77716B] mt-1">
            Pieces saved for your future seasonal wardrobe additions.
          </p>
        </div>
        <span className="text-xs text-[#77716B] font-medium hidden sm:inline-block">
          {savedProducts.length} items saved
        </span>
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-24 text-center bg-white border border-[#E5DED4] p-8 max-w-xl mx-auto">
          <div className="w-16 h-16 bg-[#F5F1E9] border border-[#E5DED4] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-[#A77B55]" />
          </div>
          <h2 className="font-serif text-2xl text-[#242321] mb-2">Your Wishlist is Empty</h2>
          <p className="text-xs text-[#77716B] max-w-xs mx-auto mb-6 leading-relaxed">
            Save your favorite linen shirts, pleat trousers, and co-ord sets while browsing to revisit anytime.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3.5 bg-[#29221D] text-[#FAF9F6] text-xs font-semibold uppercase tracking-widest hover:bg-[#35251E] transition-colors"
          >
            Discover Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {savedProducts.map((product) => (
            <div key={product.id} className="group relative flex flex-col bg-white border border-[#E5DED4]">
              {/* Product Image */}
              <div className="relative aspect-[3/4] bg-[#EAE5D9] overflow-hidden">
                <Link href={`/product/${product.slug}`} className="block w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                </Link>

                {/* Remove button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-[#77716B] hover:text-red-600 transition-colors shadow-sm"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Information */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A77B55] block mb-1">
                    {product.categoryName}
                  </span>
                  <Link
                    href={`/product/${product.slug}`}
                    className="text-sm font-medium text-[#242321] hover:text-[#A77B55] transition-colors line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <div className="flex items-center space-x-2 mt-1 mb-4">
                    <span className="text-sm font-semibold text-[#242321]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#77716B] line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Move to bag button */}
                <button
                  onClick={() => setQuickAddProduct(product)}
                  className="w-full py-2.5 bg-[#29221D] hover:bg-[#35251E] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
