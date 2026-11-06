'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../../components/ProductCard';
import { ProductCategory, ProductSize } from '../../types';
import { Filter, X, SlidersHorizontal, ArrowUpDown, ChevronDown } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const { products } = useStore();

  const initialFilter = searchParams.get('filter');
  const initialCategory = searchParams.get('category');
  const initialCollection = searchParams.get('collection');
  const initialSearchQuery = searchParams.get('q');

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(7000);
  const [sortBy, setSortBy] = useState<string>(
    initialFilter === 'new' ? 'newest' : initialFilter === 'bestsellers' ? 'bestselling' : 'recommended'
  );
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // Available unique colors from products
  const allAvailableColors = useMemo(() => {
    const colorMap = new Map<string, string>();
    products.forEach((p) => {
      p.colors.forEach((c) => {
        if (!colorMap.has(c.name)) colorMap.set(c.name, c.hex);
      });
    });
    return Array.from(colorMap.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  // Sizes
  const allSizes: ProductSize[] = ['S', 'M', 'L', 'XL', 'XXL'];

  // Categories
  const categories = [
    { id: 'all', name: 'All Garments' },
    { id: 'shirts', name: 'Shirts' },
    { id: 't-shirts', name: 'T-Shirts' },
    { id: 'trousers', name: 'Trousers' },
    { id: 'coords', name: 'Co-ords' },
    { id: 'jeans', name: 'Jeans & Denim' },
    { id: 'smart-casuals', name: 'Smart Casuals' },
    { id: 'casual-wear', name: 'Casual Wear' }
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Special Filter Param (New arrivals, bestsellers)
      if (initialFilter === 'new' && !product.isNewArrival) return false;
      if (initialFilter === 'bestsellers' && !product.isBestSeller) return false;

      // Collection
      if (initialCollection && product.collectionSlug !== initialCollection) {
        return false;
      }

      // Search Query
      if (initialSearchQuery) {
        const q = initialSearchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.categoryName.toLowerCase().includes(q);
        const matchesFabric = product.fabric.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesFabric) return false;
      }

      // Size Filter
      if (selectedSizes.length > 0) {
        const hasMatchingSize = product.sizes.some(
          (s) => selectedSizes.includes(s.size) && s.inStock
        );
        if (!hasMatchingSize) return false;
      }

      // Color Filter
      if (selectedColors.length > 0) {
        const hasMatchingColor = product.colors.some((c) => selectedColors.includes(c.name));
        if (!hasMatchingColor) return false;
      }

      // Price filter
      if (product.price > priceRange) return false;

      // In-stock only
      if (inStockOnly) {
        const hasStock = product.sizes.some((s) => s.inStock);
        if (!hasStock) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'bestselling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0; // recommended
    });
  }, [
    products,
    selectedCategory,
    initialFilter,
    initialCollection,
    initialSearchQuery,
    selectedSizes,
    selectedColors,
    priceRange,
    inStockOnly,
    sortBy
  ]);

  const toggleSize = (size: ProductSize) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange(7000);
    setInStockOnly(false);
    setSortBy('recommended');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    priceRange < 7000 ||
    inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      {/* Page Header */}
      <div className="pb-8 border-b border-[#E5DED4] mb-8">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-2">
          The Full Wardrobe
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#242321] tracking-tight">
              {initialCollection
                ? initialCollection.replace('-', ' ').toUpperCase()
                : initialFilter === 'new'
                ? 'NEW ARRIVALS'
                : initialFilter === 'bestsellers'
                ? 'BEST SELLERS'
                : 'CONTEMPORARY MENSWEAR'}
            </h1>
            <p className="text-xs text-[#77716B] mt-2 max-w-xl">
              Impeccably tailored linen shirts, double-pleated trousers, tactile knit polos, and versatile resort co-ords.
            </p>
          </div>
          <span className="text-xs text-[#77716B] font-medium">
            Showing <strong>{filteredProducts.length}</strong> styles
          </span>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none border-b border-[#E5DED4]/60">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-[#29221D] text-[#FAF9F6]'
                : 'bg-[#FAF9F6] text-[#77716B] hover:text-[#242321] border border-[#E5DED4]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Controls Bar: Filter Toggle & Sorting */}
      <div className="flex justify-between items-center pb-6 mb-6 border-b border-[#E5DED4]">
        <button
          onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
          className="flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#242321] border border-[#E5DED4] px-4 py-2.5 bg-white hover:bg-[#FAF9F6] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#A77B55]" />
          <span>Filters {hasActiveFilters && `(${selectedSizes.length + selectedColors.length + (selectedCategory !== 'all' ? 1 : 0)})`}</span>
        </button>

        {/* Sorting Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#77716B] uppercase tracking-wider hidden sm:inline-block">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold uppercase tracking-wider border border-[#E5DED4] bg-white px-3 py-2 text-[#242321] focus:outline-hidden"
          >
            <option value="recommended">Recommended</option>
            <option value="newest">Newest Additions</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="bestselling">Best Selling</option>
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-8 p-3 bg-white border border-[#E5DED4]">
          <span className="text-xs uppercase font-bold tracking-wider text-[#77716B] mr-1">
            Active:
          </span>

          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center text-xs bg-[#F5F1E9] border border-[#E5DED4] px-2.5 py-1 text-[#242321]">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('all')} className="ml-1.5 text-[#77716B] hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedSizes.map((s) => (
            <span key={s} className="inline-flex items-center text-xs bg-[#F5F1E9] border border-[#E5DED4] px-2.5 py-1 text-[#242321]">
              Size: {s}
              <button onClick={() => toggleSize(s)} className="ml-1.5 text-[#77716B] hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {selectedColors.map((c) => (
            <span key={c} className="inline-flex items-center text-xs bg-[#F5F1E9] border border-[#E5DED4] px-2.5 py-1 text-[#242321]">
              Colour: {c}
              <button onClick={() => toggleColor(c)} className="ml-1.5 text-[#77716B] hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {priceRange < 7000 && (
            <span className="inline-flex items-center text-xs bg-[#F5F1E9] border border-[#E5DED4] px-2.5 py-1 text-[#242321]">
              Under ₹{priceRange.toLocaleString('en-IN')}
              <button onClick={() => setPriceRange(7000)} className="ml-1.5 text-[#77716B] hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-xs text-[#A77B55] hover:underline uppercase tracking-wider font-semibold ml-auto"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Filters Drawer + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filter Drawer / Sidebar */}
        {isFilterDrawerOpen && (
          <aside className="lg:col-span-3 bg-white p-6 border border-[#E5DED4] space-y-6 h-fit animate-fade-in">
            <div className="flex justify-between items-center pb-3 border-b border-[#E5DED4]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#242321]">
                Refine Selection
              </span>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="text-[#77716B] hover:text-[#242321] lg:hidden"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sizes */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#242321] mb-3">Sizes</p>
              <div className="grid grid-cols-5 gap-1.5">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`py-2 text-xs font-semibold uppercase tracking-wider border transition-colors ${
                      selectedSizes.includes(size)
                        ? 'bg-[#29221D] text-white border-[#29221D]'
                        : 'bg-[#FAF9F6] text-[#242321] border-[#E5DED4] hover:border-[#242321]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colours */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#242321] mb-3">Colours</p>
              <div className="flex flex-wrap gap-2">
                {allAvailableColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => toggleColor(color.name)}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 text-xs border transition-colors ${
                      selectedColors.includes(color.name)
                        ? 'border-[#242321] bg-[#F5F1E9]'
                        : 'border-[#E5DED4] hover:border-[#242321]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/15"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[#242321] text-[11px] font-medium">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Max Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#242321] mb-2">
                <span>Max Price</span>
                <span className="text-[#A77B55]">₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="7000"
                step="250"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#A77B55]"
              />
              <div className="flex justify-between text-[10px] text-[#77716B] mt-1">
                <span>₹1,000</span>
                <span>₹7,000+</span>
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-2 border-t border-[#E5DED4]">
              <label className="flex items-center space-x-2 text-xs font-medium text-[#242321] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded-none border-[#E5DED4] text-[#29221D] focus:ring-0"
                />
                <span>In-Stock Items Only</span>
              </label>
            </div>
          </aside>
        )}

        {/* Product Grid */}
        <div className={isFilterDrawerOpen ? 'lg:col-span-9' : 'lg:col-span-12'}>
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white border border-[#E5DED4] p-8">
              <p className="font-serif text-2xl text-[#242321] mb-2">No Matching Silhouettes Found</p>
              <p className="text-xs text-[#77716B] max-w-sm mx-auto mb-6">
                Try loosening your filter parameters or exploring all categories.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-[#29221D] text-[#FAF9F6] text-xs font-semibold uppercase tracking-widest hover:bg-[#35251E] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={`grid grid-cols-2 ${isFilterDrawerOpen ? 'md:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-4'} gap-4 sm:gap-6 lg:gap-8`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs uppercase tracking-widest">Loading Wardrobe Edit...</div>}>
      <ShopContent />
    </Suspense>
  );
}
