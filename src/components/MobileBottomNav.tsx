'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '../context/StoreContext';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, wishlistCount, setIsCartOpen } = useStore();

  const isHome = pathname === '/';
  const isShop = pathname.startsWith('/shop') || pathname.startsWith('/category');
  const isWishlist = pathname.startsWith('/wishlist');
  const isAccount = pathname.startsWith('/account');

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-t border-[#E5DED4] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
            isHome ? 'text-[#242321] font-semibold' : 'text-[#77716B] hover:text-[#242321]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
            isShop ? 'text-[#242321] font-semibold' : 'text-[#77716B] hover:text-[#242321]'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Explore</span>
        </Link>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors relative ${
            isWishlist ? 'text-[#242321] font-semibold' : 'text-[#77716B] hover:text-[#242321]'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-0.5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#A77B55] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Saved</span>
        </Link>

        {/* Bag */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center py-1 px-3 rounded-lg text-[#77716B] hover:text-[#242321] transition-colors relative"
          aria-label="Open Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#29221D] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Bag</span>
        </button>

        {/* Account */}
        <Link
          href="/account"
          className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
            isAccount ? 'text-[#242321] font-semibold' : 'text-[#77716B] hover:text-[#242321]'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Account</span>
        </Link>
      </div>
    </nav>
  );
};
