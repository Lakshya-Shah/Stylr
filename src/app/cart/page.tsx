'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const {
    cartItems,
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
  const [orderNote, setOrderNote] = useState('');

  const freeShippingThreshold = 2499;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
      {/* Page Title */}
      <div className="pb-6 border-b border-[#E5DED4] mb-8">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-2">
          Your Selection
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#242321] tracking-tight">
          SHOPPING BAG
        </h1>
        <p className="text-xs text-[#77716B] mt-1">
          Review your chosen pieces before secure Pan-India delivery.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-24 text-center bg-white border border-[#E5DED4] p-8 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-[#F5F1E9] border border-[#E5DED4] flex items-center justify-center mx-auto mb-4">
            <Tag className="w-6 h-6 text-[#A77B55]" />
          </div>
          <h2 className="font-serif text-3xl text-[#242321] mb-2">Your Bag Is Empty</h2>
          <p className="text-xs text-[#77716B] max-w-sm mx-auto mb-6 leading-relaxed">
            Discover our curated French linen shirts, double-pleated trousers, and resort co-ord sets.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3.5 bg-[#29221D] text-[#FAF9F6] text-xs font-semibold uppercase tracking-widest hover:bg-[#35251E] transition-colors"
          >
            Explore All Clothing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Items List */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free shipping banner */}
            <div className="bg-[#FAF9F6] p-4 border border-[#E5DED4]">
              <div className="flex justify-between items-center text-xs mb-2">
                {amountNeeded > 0 ? (
                  <span className="text-[#242321]">
                    Add <strong className="text-[#A77B55]">₹{amountNeeded.toLocaleString('en-IN')}</strong> more for Complimentary Pan-India Shipping
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold">
                    ✓ You have unlocked Complimentary Express Pan-India Shipping
                  </span>
                )}
                <span className="text-xs text-[#77716B] font-medium">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-[#E5DED4] h-1.5">
                <div
                  className="bg-[#A77B55] h-full transition-all duration-500 ease-out"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items Table */}
            <div className="bg-white border border-[#E5DED4] divide-y divide-[#E5DED4]">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-26 bg-[#E5DED4] flex-shrink-0 overflow-hidden border border-[#E5DED4]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-sm font-medium text-[#242321] hover:text-[#A77B55] transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center space-x-3 text-xs text-[#77716B] mt-1">
                        <span>Size: <strong className="text-[#242321]">{item.size}</strong></span>
                        <span>•</span>
                        <span>Colour: <strong className="text-[#242321]">{item.color}</strong></span>
                      </div>
                      <div className="text-sm font-semibold text-[#242321] mt-1 sm:hidden">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Price Controls */}
                  {(() => {
                    const maxStock = getProductStock(item.productId, item.size);
                    const isMaxReached = item.quantity >= maxStock;
                    return (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:space-x-8 pt-2 sm:pt-0 border-t sm:border-0 border-[#E5DED4] gap-2">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center border border-[#E5DED4] bg-white w-fit">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-[#77716B] hover:text-[#242321]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-semibold text-[#242321]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={isMaxReached}
                              className={`px-2.5 py-1 transition-colors ${
                                isMaxReached
                                  ? 'text-stone-300 cursor-not-allowed bg-stone-50'
                                  : 'text-[#77716B] hover:text-[#242321]'
                              }`}
                              aria-label="Increase quantity"
                              title={isMaxReached ? `Max stock (${maxStock}) reached` : 'Increase quantity'}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {isMaxReached && (
                            <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 border border-amber-200/50 w-fit">
                              Max stock reached ({maxStock})
                            </span>
                          )}
                        </div>

                        <div className="hidden sm:block text-right">
                          <span className="text-base font-semibold text-[#242321]">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          <span className="block text-[11px] text-[#77716B]">
                            (₹{item.price.toLocaleString('en-IN')} ea)
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#77716B]/60 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })()}
                </div>
              ))}
            </div>

            {/* Special Instructions */}
            <div className="bg-white p-6 border border-[#E5DED4]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#242321] mb-2">
                Order Notes / Special Requests
              </label>
              <textarea
                rows={2}
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Gift packaging note or delivery instructions for our Surat studio team..."
                className="w-full text-xs border border-[#E5DED4] p-3 focus:outline-hidden bg-[#FAF9F6]"
              />
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 text-xs uppercase font-semibold tracking-wider text-[#77716B] hover:text-[#242321] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 sm:p-8 border border-[#E5DED4] space-y-6 sticky top-24 shadow-sm">
              <h3 className="font-serif text-2xl text-[#242321] pb-4 border-b border-[#E5DED4]">
                Order Summary
              </h3>

              {/* Promo code */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#242321]">
                  Promotional Voucher
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="E.g. STYLR10 or BUY2GET1"
                    className="flex-1 border border-[#E5DED4] px-3 py-2 text-xs uppercase focus:outline-hidden bg-[#FAF9F6]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#29221D] hover:bg-[#35251E] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-xs text-red-600 font-medium">{couponError}</p>}
                {activeCoupon && (
                  <div className="flex justify-between items-center bg-[#F5F1E9] p-2 text-xs border border-[#E5DED4]">
                    <span className="font-semibold text-[#242321]">{activeCoupon.code} applied</span>
                    <button onClick={removeCoupon} className="text-[#77716B] hover:text-red-600 text-xs underline">
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs text-[#77716B] pt-4 border-t border-[#E5DED4]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#242321]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#A77B55] font-semibold">
                    <span>Campaign Discount</span>
                    <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Pan-India Courier</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-emerald-700 uppercase tracking-wider text-[11px]">Free</strong>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-semibold text-[#242321] pt-4 border-t border-[#E5DED4]">
                  <span className="font-serif text-lg">Total Amount</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-[#77716B] text-right">Includes GST &amp; all local levies</p>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full py-4 bg-[#29221D] hover:bg-[#35251E] text-[#FAF9F6] text-xs font-semibold uppercase tracking-widest text-center flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-[#77716B]">
                <ShieldCheck className="w-4 h-4 text-[#A77B55]" />
                <span>Encrypted Razorpay &amp; UPI checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
