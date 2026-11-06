'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Shield,
  MapPin
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    storeContent,
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsSearchOpen
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClothingMegaOpen, setIsClothingMegaOpen] = useState(false);
  const [isCollectionsMegaOpen, setIsCollectionsMegaOpen] = useState(false);

  // Scroll listener for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const clothingCategories = [
    { name: 'All Clothing', href: '/shop', desc: 'Browse the complete wardrobe catalogue' },
    { name: 'Camp & Poplin Shirts', href: '/category/shirts', desc: 'Garment-washed French linen and crisp poplin' },
    { name: 'Supima T-Shirts', href: '/category/t-shirts', desc: 'Heavyweight 280 GSM boxy cuts and ribbed tees' },
    { name: 'Double-Pleated Trousers', href: '/category/trousers', desc: 'Architectural cuts in wool-cotton blends' },
    { name: 'Resort Co-ord Sets', href: '/category/coords', desc: 'Matching sets for effortless monochrome style' },
    { name: 'Japanese Selvedge Denim', href: '/category/jeans', desc: '13.5 oz shuttle loom denim in raw indigo' },
    { name: 'Smart Casual Blazers', href: '/category/smart-casuals', desc: 'Unstructured tailoring and chore jackets' }
  ];

  const collections = [
    { name: 'The Linen Series', href: '/shop?collection=summer-linen', desc: 'Breathable 100% French flax cuts' },
    { name: 'Tailored Classics', href: '/shop?collection=tailored-classics', desc: 'Architectural pleats and chore silhouettes' },
    { name: 'The Resort Series', href: '/shop?collection=resort-coords', desc: 'Waffle and textured leisure co-ords' },
    { name: 'Modern Essentials', href: '/shop?collection=essentials', desc: 'Supima boxy basics & shuttle loom denim' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Announcement Bar */}
      {storeContent.announcementBar.enabled && (
        <div className="bg-[#29221D] text-[#FAF9F6] text-[11px] uppercase tracking-widest py-2 px-4 border-b border-[#3E342D]/60 flex items-center justify-between font-medium">
          <div className="flex-1 text-center truncate">
            {storeContent.announcementBar.linkUrl ? (
              <Link
                href={storeContent.announcementBar.linkUrl}
                className="hover:text-[#C49B74] transition-colors inline-flex items-center space-x-2"
              >
                <span>{storeContent.announcementBar.text}</span>
              </Link>
            ) : (
              <span>{storeContent.announcementBar.text}</span>
            )}
          </div>
          <div className="hidden lg:flex items-center space-x-4 text-[10px] text-[#A77B55]">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>Vesu, Surat</span>
            </span>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md shadow-xs border-b border-[#E5DED4] py-3.5'
            : 'bg-[#FAF9F6] border-b border-[#E5DED4] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-[#242321] p-1.5 -ml-1.5 hover:text-[#A77B55] transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-[#242321] p-1.5 ml-2 hover:text-[#A77B55] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Left: Brand Wordmark */}
          <div className="flex items-center">
            <Link href="/" className="group flex flex-col items-center sm:items-start">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-medium text-[#242321] group-hover:text-[#A77B55] transition-colors">
                STYLR
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#77716B] -mt-1 group-hover:text-[#242321] transition-colors font-sans">
                Vesu • Surat
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links with Mega-Menus */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#242321]">
            <Link
              href="/"
              className="hover:text-[#A77B55] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#A77B55] hover:after:w-full after:transition-all"
            >
              Home
            </Link>

            <Link
              href="/shop?filter=new"
              className="hover:text-[#A77B55] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#A77B55] hover:after:w-full after:transition-all"
            >
              New Arrivals
            </Link>

            {/* Clothing Mega Menu Dropdown */}
            <div
              className="relative py-1 group"
              onMouseEnter={() => setIsClothingMegaOpen(true)}
              onMouseLeave={() => setIsClothingMegaOpen(false)}
            >
              <Link
                href="/shop"
                className="flex items-center space-x-1 hover:text-[#A77B55] transition-colors"
              >
                <span>Clothing</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </Link>

              {/* Mega Menu Dropdown */}
              {isClothingMegaOpen && (
                <div className="absolute top-full -left-20 w-[620px] bg-[#FAF9F6] border border-[#E5DED4] shadow-2xl p-6 mt-2 grid grid-cols-5 gap-6 animate-fade-in z-50">
                  <div className="col-span-3 space-y-3">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#A77B55] pb-2 border-b border-[#E5DED4]">
                      Categories
                    </p>
                    <div className="space-y-2">
                      {clothingCategories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          onClick={() => setIsClothingMegaOpen(false)}
                          className="block group/item py-1"
                        >
                          <div className="text-xs font-semibold text-[#242321] group-hover/item:text-[#A77B55] transition-colors">
                            {cat.name}
                          </div>
                          <p className="text-[11px] text-[#77716B] font-normal normal-case line-clamp-1">
                            {cat.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2 bg-[#F5F1E9] p-4 flex flex-col justify-between border border-[#E5DED4]">
                    <div>
                      <span className="text-[9px] uppercase font-bold tracking-widest bg-[#29221D] text-white px-2 py-0.5 inline-block mb-2">
                        Campaign Edit
                      </span>
                      <h4 className="font-serif text-lg text-[#242321] leading-snug">
                        The Linen Series
                      </h4>
                      <p className="text-xs text-[#77716B] normal-case mt-1 font-normal leading-relaxed">
                        Pure 100% French flax cuts garment-washed for tropical ease.
                      </p>
                    </div>
                    <Link
                      href="/shop?collection=summer-linen"
                      onClick={() => setIsClothingMegaOpen(false)}
                      className="text-[11px] font-semibold uppercase tracking-wider text-[#A77B55] hover:text-[#242321] flex items-center space-x-1 pt-4 group/btn"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/category/coords"
              className="hover:text-[#A77B55] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#A77B55] hover:after:w-full after:transition-all"
            >
              Co-ords
            </Link>

            <Link
              href="/shop?filter=bestsellers"
              className="hover:text-[#A77B55] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#A77B55] hover:after:w-full after:transition-all"
            >
              Best Sellers
            </Link>

            {/* Collections dropdown */}
            <div
              className="relative py-1 group"
              onMouseEnter={() => setIsCollectionsMegaOpen(true)}
              onMouseLeave={() => setIsCollectionsMegaOpen(false)}
            >
              <Link
                href="/shop"
                className="flex items-center space-x-1 hover:text-[#A77B55] transition-colors"
              >
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </Link>

              {isCollectionsMegaOpen && (
                <div className="absolute top-full -left-12 w-64 bg-[#FAF9F6] border border-[#E5DED4] shadow-2xl p-4 mt-2 space-y-2 animate-fade-in z-50">
                  {collections.map((col) => (
                    <Link
                      key={col.name}
                      href={col.href}
                      onClick={() => setIsCollectionsMegaOpen(false)}
                      className="block p-2 hover:bg-[#F5F1E9] transition-colors group/col"
                    >
                      <p className="text-xs font-semibold text-[#242321] group-hover/col:text-[#A77B55]">
                        {col.name}
                      </p>
                      <p className="text-[11px] text-[#77716B] normal-case font-normal mt-0.5">
                        {col.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="hover:text-[#A77B55] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#A77B55] hover:after:w-full after:transition-all"
            >
              Our Story
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4 sm:space-x-5 text-[#242321]">
            {/* Desktop Search trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center space-x-1.5 text-xs text-[#77716B] hover:text-[#242321] transition-colors border border-[#E5DED4] px-2.5 py-1.5 rounded-none bg-white/60"
              aria-label="Search items"
            >
              <Search className="w-3.5 h-3.5 text-[#242321]" />
              <span className="font-medium">Search</span>
              <kbd className="text-[9px] bg-[#F5F1E9] px-1.5 py-0.5 border border-[#E5DED4] text-[#77716B]">
                ⌘K
              </kbd>
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="hover:text-[#A77B55] transition-colors p-1"
              aria-label="Customer Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hover:text-[#A77B55] transition-colors p-1 relative"
              aria-label="View Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#A77B55] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="hover:text-[#A77B55] transition-colors p-1 relative"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#29221D] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin shortcut badge */}
            <Link
              href="/admin"
              className="hidden sm:flex items-center space-x-1 text-[10px] font-semibold uppercase tracking-wider text-[#77716B] hover:text-[#242321] border border-[#E5DED4] px-2 py-1 bg-white hover:bg-[#F5F1E9] transition-colors"
              title="Store Owner Portal"
            >
              <Shield className="w-3 h-3 text-[#A77B55]" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-4/5 max-w-sm bg-[#FAF9F6] h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-5 border-b border-[#E5DED4]">
                <div>
                  <span className="font-serif text-2xl tracking-[0.2em] font-medium text-[#242321]">
                    STYLR
                  </span>
                  <p className="text-[9px] uppercase tracking-widest text-[#77716B]">Vesu, Surat</p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#77716B] hover:text-[#242321] p-1"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="py-6 space-y-4 text-sm font-semibold uppercase tracking-wider text-[#242321]">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#A77B55] transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/shop?filter=new"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#A77B55] transition-colors"
                >
                  New Arrivals
                </Link>

                <div className="pt-2 pb-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#A77B55] mb-2">
                    Clothing Categories
                  </p>
                  <div className="pl-3 space-y-2.5 text-xs font-medium capitalize">
                    {clothingCategories.map((c) => (
                      <Link
                        key={c.name}
                        href={c.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-[#242321] hover:text-[#A77B55]"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/category/coords"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#A77B55] transition-colors"
                >
                  Co-ords
                </Link>
                <Link
                  href="/shop?filter=bestsellers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#A77B55] transition-colors"
                >
                  Best Sellers
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#A77B55] transition-colors"
                >
                  Our Story
                </Link>
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#A77B55] transition-colors"
                >
                  My Account
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 text-[#A77B55] hover:text-[#242321] transition-colors flex items-center space-x-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Store Management</span>
                </Link>
              </div>
            </div>

            {/* Mobile Footer Info */}
            <div className="pt-6 border-t border-[#E5DED4] text-xs text-[#77716B] space-y-2">
              <p className="font-semibold text-[#242321]">STYLR Flagship Store</p>
              <p className="leading-relaxed">Shop 14-16, Royal Arc, VIP Road, Vesu, Surat, Gujarat</p>
              <p>Instagram: @stylrmensclothing</p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center mt-3 py-2 bg-[#29221D] text-[#FAF9F6] uppercase tracking-wider text-[11px] font-semibold"
              >
                WhatsApp Direct Support
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
