'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight, Tag } from 'lucide-react';

const POPULAR_SEARCHES = [
  'French Linen',
  'Double-Pleated Trouser',
  'Waffle Co-ord Set',
  'Japanese Selvedge',
  'Supima Boxy Tee',
  'Smart Casuals'
];

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Cmd/Ctrl + K & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.categoryName.toLowerCase().includes(trimmed) ||
          p.description.toLowerCase().includes(trimmed) ||
          p.fabric.toLowerCase().includes(trimmed)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] border border-[#E5DED4] w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-[#E5DED4] bg-white">
          <Search className="w-5 h-5 text-[#77716B] mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shirts, trousers, co-ords, fabrics..."
            className="w-full bg-transparent border-0 text-[#242321] placeholder-[#77716B]/60 text-base focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#77716B] hover:text-[#242321] p-1 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs uppercase tracking-widest text-[#77716B] hover:text-[#242321] font-medium border border-[#E5DED4] px-2.5 py-1"
          >
            ESC
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#77716B] mb-3">
                Trending Searches
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="flex items-center space-x-1.5 text-xs text-[#242321] bg-[#F5F1E9] hover:bg-[#E5DED4] px-3 py-1.5 transition-colors font-medium"
                  >
                    <Tag className="w-3 h-3 text-[#A77B55]" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-[#77716B] mb-3">
                Featured Categories
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { name: 'Camp Linen Shirts', path: '/category/shirts' },
                  { name: 'Architectural Trousers', path: '/category/trousers' },
                  { name: 'Resort Co-ords', path: '/category/coords' },
                  { name: 'Supima Boxy Tees', path: '/category/t-shirts' },
                  { name: 'Japanese Selvedge', path: '/category/jeans' },
                  { name: 'Smart Casual Blazers', path: '/category/smart-casuals' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsSearchOpen(false)}
                    className="p-3 bg-[#F5F1E9]/80 hover:bg-[#F5F1E9] text-xs font-medium text-[#242321] flex justify-between items-center group transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#A77B55] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#77716B]">
                  Found {results.length} result{results.length > 1 ? 's' : ''}
                </p>
                <Link
                  href={`/shop?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="text-xs text-[#A77B55] hover:underline uppercase tracking-wider font-medium"
                >
                  View All in Shop &rarr;
                </Link>
              </div>

              <div className="divide-y divide-[#E5DED4]">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center py-3 hover:bg-[#F5F1E9]/50 transition-colors px-2 -mx-2 group"
                  >
                    <div className="w-14 h-18 bg-[#E5DED4] flex-shrink-0 overflow-hidden mr-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#A77B55] font-medium block">
                        {product.categoryName}
                      </span>
                      <p className="text-sm font-medium text-[#242321] group-hover:text-[#A77B55] transition-colors truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-[#77716B] truncate mt-0.5">{product.fabric}</p>
                    </div>
                    <div className="text-right ml-4">
                      <span className="text-sm font-semibold text-[#242321]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="block text-[11px] text-[#77716B] line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="font-serif text-xl text-[#242321] mb-2">No matching pieces found</p>
              <p className="text-xs text-[#77716B] max-w-sm mx-auto mb-6">
                We couldn&apos;t find any garments matching &quot;{query}&quot;. Try exploring our core collections or checking for spelling.
              </p>
              <Link
                href="/shop"
                onClick={() => setIsSearchOpen(false)}
                className="inline-block px-5 py-2.5 bg-[#29221D] text-[#FAF9F6] text-xs font-semibold uppercase tracking-widest hover:bg-[#35251E] transition-colors"
              >
                Browse All Clothing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
