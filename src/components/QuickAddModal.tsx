'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductSize } from '../types';
import { X, Check, ShoppingBag, Eye } from 'lucide-react';
import Link from 'next/link';

export const QuickAddModal: React.FC = () => {
  const { quickAddProduct, setQuickAddProduct, addToCart, setIsSizeGuideOpen, getProductStock, cartItems } = useStore();
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const availableStock = (quickAddProduct && selectedSize) ? getProductStock(quickAddProduct.id, selectedSize) : 0;
  const inCart = (quickAddProduct && selectedSize) ? (cartItems.find(it => it.productId === quickAddProduct.id && it.size === selectedSize && it.color === selectedColor)?.quantity || 0) : 0;
  const canAddMore = availableStock > inCart;

  useEffect(() => {
    if (quickAddProduct) {
      setSelectedColor(quickAddProduct.colors[0]?.name || '');
      const firstInStock = quickAddProduct.sizes.find((s) => s.inStock && getProductStock(quickAddProduct.id, s.size) > 0);
      setSelectedSize(firstInStock ? firstInStock.size : null);
      setQuantity(1);
    }
  }, [quickAddProduct]);

  if (!quickAddProduct) return null;

  const handleAdd = () => {
    if (!selectedSize || !canAddMore) return;
    addToCart(quickAddProduct, selectedSize, selectedColor, quantity);
    setQuickAddProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] border border-[#E5DED4] w-full max-w-lg overflow-hidden shadow-2xl relative">
        <div className="flex justify-between items-center p-5 border-b border-[#E5DED4]">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#A77B55]">Quick Selection</span>
          <button
            onClick={() => setQuickAddProduct(null)}
            className="text-[#77716B] hover:text-[#242321] p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-5 mb-6">
            <div className="w-24 h-32 bg-[#F5F1E9] flex-shrink-0 overflow-hidden border border-[#E5DED4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={quickAddProduct.images[0]}
                alt={quickAddProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-[#77716B] mb-1">{quickAddProduct.categoryName}</p>
              <h3 className="font-serif text-xl text-[#242321] leading-tight mb-2">{quickAddProduct.name}</h3>
              <div className="flex items-center space-x-3 mb-2">
                <span className="font-medium text-[#242321] text-base">₹{quickAddProduct.price.toLocaleString('en-IN')}</span>
                {quickAddProduct.originalPrice && (
                  <span className="text-xs text-[#77716B] line-through">₹{quickAddProduct.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>
              <p className="text-xs text-[#77716B] line-clamp-2">{quickAddProduct.description}</p>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-5">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold uppercase tracking-wider text-[#242321]">
                Colour: <span className="font-normal text-[#77716B]">{selectedColor}</span>
              </span>
            </div>
            <div className="flex space-x-2">
              {quickAddProduct.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-7 h-7 rounded-full border p-0.5 transition-all flex items-center justify-center ${
                    selectedColor === color.name ? 'border-[#242321] ring-1 ring-[#242321]' : 'border-[#E5DED4]'
                  }`}
                  title={color.name}
                >
                  <span
                    className="w-full h-full rounded-full block border border-black/10"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold uppercase tracking-wider text-[#242321]">Select Size</span>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[#A77B55] hover:underline uppercase tracking-wider font-medium"
              >
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {quickAddProduct.sizes.map((s) => (
                <button
                  key={s.size}
                  disabled={!s.inStock}
                  onClick={() => setSelectedSize(s.size)}
                  className={`py-2 text-xs font-medium uppercase tracking-wider border transition-all ${
                    !s.inStock
                      ? 'border-[#E5DED4] text-[#77716B]/40 bg-[#F5F1E9] cursor-not-allowed line-through'
                      : selectedSize === s.size
                      ? 'border-[#29221D] bg-[#29221D] text-[#FAF9F6]'
                      : 'border-[#E5DED4] text-[#242321] hover:border-[#242321] bg-white'
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-xs text-red-500 mt-2 font-medium">Please select a size to proceed</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={!selectedSize || !canAddMore}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-xs font-semibold uppercase tracking-widest transition-colors ${
                selectedSize && canAddMore
                  ? 'bg-[#29221D] hover:bg-[#35251E] text-[#FAF9F6]'
                  : 'bg-[#E5DED4] text-[#77716B] cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {!selectedSize
                  ? 'Select Size'
                  : !canAddMore && inCart > 0
                  ? `Max in Bag (${availableStock})`
                  : availableStock === 0
                  ? 'Out of Stock'
                  : 'Add to Bag'}
              </span>
            </button>
            <Link
              href={`/product/${quickAddProduct.slug}`}
              onClick={() => setQuickAddProduct(null)}
              className="py-3 px-4 border border-[#E5DED4] text-[#242321] hover:border-[#242321] hover:bg-[#F5F1E9] text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-1 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
