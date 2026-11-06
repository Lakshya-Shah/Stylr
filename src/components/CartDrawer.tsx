'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getProductStock,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTotal,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    couponError
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const freeShippingThreshold = 2499;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-md bg-[#FAF9F6] h-full flex flex-col shadow-2xl border-l border-[#E5DED4] relative animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E5DED4] flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-xl tracking-wide text-[#242321]">Shopping Bag</span>
            <span className="text-xs text-[#77716B] font-medium">({cartItems.length} items)</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-[#77716B] hover:text-[#242321] p-1.5 transition-colors"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F5F1E9] px-5 py-3 border-b border-[#E5DED4]">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            {amountNeededForFreeShipping > 0 ? (
              <span className="text-[#242321]">
                Add <strong className="text-[#A77B55]">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> for Complimentary Pan-India Shipping
              </span>
            ) : (
              <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                <span>✓</span>
                <span>You unlocked Complimentary Express Pan-India Shipping!</span>
              </span>
            )}
            <span className="text-[11px] text-[#77716B]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-[#E5DED4] h-1.5 overflow-hidden">
            <div
              className="bg-[#A77B55] h-full transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#E5DED4]/60">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 bg-[#F5F1E9] border border-[#E5DED4] flex items-center justify-center mb-4">
                <Tag className="w-6 h-6 text-[#A77B55]" />
              </div>
              <p className="font-serif text-2xl text-[#242321] mb-2">Your Bag is Empty</p>
              <p className="text-xs text-[#77716B] max-w-xs mb-6 leading-relaxed">
                Explore our curated linen shirts, architectural trousers, and resort co-ords.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-3 bg-[#29221D] text-[#FAF9F6] text-xs font-semibold uppercase tracking-widest hover:bg-[#35251E] transition-colors"
              >
                Discover Collections
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex space-x-4">
                <div className="w-20 h-26 bg-[#E5DED4] flex-shrink-0 overflow-hidden border border-[#E5DED4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="text-sm font-medium text-[#242321] hover:text-[#A77B55] transition-colors line-clamp-1 pr-2"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#77716B]/60 hover:text-red-600 transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-[#77716B] mt-1">
                      <span>Size: <strong className="text-[#242321] font-semibold">{item.size}</strong></span>
                      <span>•</span>
                      <span>Colour: <strong className="text-[#242321] font-medium">{item.color}</strong></span>
                    </div>

                    <div className="mt-1 flex items-center space-x-2">
                      <span className="text-sm font-semibold text-[#242321]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-[#77716B] line-through">
                          ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper & Stock Limit */}
                  {(() => {
                    const maxStock = getProductStock(item.productId, item.size);
                    const isMaxReached = item.quantity >= maxStock;
                    return (
                      <div className="flex flex-col space-y-1.5 mt-3 pt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-[#E5DED4] bg-white">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-[#77716B] hover:text-[#242321] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold text-[#242321]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={isMaxReached}
                              className={`px-2 py-1 transition-colors ${
                                isMaxReached
                                  ? 'text-stone-300 cursor-not-allowed bg-stone-50'
                                  : 'text-[#77716B] hover:text-[#242321]'
                              }`}
                              aria-label="Increase quantity"
                              title={isMaxReached ? `Maximum available stock (${maxStock}) reached` : 'Increase quantity'}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-[11px] text-[#77716B]">
                            ₹{item.price.toLocaleString('en-IN')} each
                          </span>
                        </div>

                        {/* Stock status indicator */}
                        {isMaxReached && (
                          <div className="flex items-center space-x-1 text-[10px] text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 w-fit">
                            <span>Max stock reached ({maxStock} available)</span>
                          </div>
                        )}
                        {!isMaxReached && maxStock <= 5 && (
                          <span className="text-[10px] text-amber-600 font-medium">
                            Only {maxStock} left in stock
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#E5DED4] bg-white space-y-3">
            {/* Promo coupon input */}
            <form onSubmit={handleApplyCoupon} className="flex space-x-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="PROMO CODE (e.g. STYLR10)"
                className="flex-1 border border-[#E5DED4] px-3 py-2 text-xs uppercase placeholder:normal-case focus:border-[#242321] focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#29221D] hover:bg-[#35251E] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Apply
              </button>
            </form>

            {couponError && (
              <p className="text-[11px] text-red-600 font-medium">{couponError}</p>
            )}

            {activeCoupon && (
              <div className="flex justify-between items-center bg-[#F5F1E9] p-2 text-xs border border-[#E5DED4]">
                <div className="flex items-center space-x-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#A77B55]" />
                  <span className="font-semibold text-[#242321]">{activeCoupon.code}</span>
                  <span className="text-[#77716B]">applied</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-[#77716B] hover:text-red-600 text-xs underline font-medium"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs pt-1 border-t border-[#E5DED4]/60">
              <div className="flex justify-between text-[#77716B]">
                <span>Subtotal</span>
                <span className="font-medium text-[#242321]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#A77B55] font-medium">
                  <span>Special Promotion Discount</span>
                  <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-[#77716B]">
                <span>Pan-India Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[11px]">Free</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-semibold text-[#242321] pt-2 border-t border-[#E5DED4]">
                <span className="font-serif">Estimated Total</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-2">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 bg-[#29221D] hover:bg-[#35251E] text-[#FAF9F6] text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2.5 border border-[#E5DED4] hover:border-[#242321] hover:bg-[#F5F1E9] text-[#242321] text-xs font-semibold uppercase tracking-widest text-center block transition-colors"
              >
                View Full Bag Details
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-[#77716B] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A77B55]" />
              <span>Secure encrypted Indian checkout • Pan-India delivery</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
