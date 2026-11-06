'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '../../context/StoreContext';
import { ShippingAddress } from '../../types';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cartItems,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTotal,
    activeCoupon,
    createOrder,
    showToast
  } = useStore();

  // Form State
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Gujarat',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Razorpay' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Simulated Razorpay Modal State
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [mockCardNumber, setMockCardNumber] = useState('4532 •••• •••• 8892');
  const [mockCardExpiry, setMockCardExpiry] = useState('08/29');
  const [mockCvv, setMockCvv] = useState('742');

  const indianStates = [
    'Gujarat',
    'Maharashtra',
    'Delhi NCR',
    'Karnataka',
    'Tamil Nadu',
    'Rajasthan',
    'Telangana',
    'West Bengal',
    'Uttar Pradesh',
    'Punjab',
    'Kerala',
    'Madhya Pradesh',
    'Haryana'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return 'Please enter your full name';
    if (!formData.phone.trim() || formData.phone.replace(/[^0-9]/g, '').length < 10)
      return 'Please enter a valid 10-digit Indian mobile number';
    if (!formData.email.trim() || !formData.email.includes('@'))
      return 'Please enter a valid email address';
    if (!formData.addressLine1.trim()) return 'Please provide your delivery street address';
    if (!formData.city.trim()) return 'Please enter your city';
    if (!formData.pincode.trim() || formData.pincode.length !== 6)
      return 'Please enter a valid 6-digit Indian PIN code';
    if (paymentMethod === 'UPI' && upiId && !upiId.includes('@')) {
      return 'Please enter a valid UPI VPA (e.g. username@okhdfcbank)';
    }
    return null;
  };

  const handleOrderSubmission = () => {
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }
    setErrorMessage('');

    if (paymentMethod === 'Razorpay') {
      setIsRazorpayModalOpen(true);
      return;
    }

    finalizeOrder('Paid');
  };

  const finalizeOrder = (paymentStatus: 'Paid' | 'Cash on Delivery') => {
    setIsProcessing(true);

    setTimeout(() => {
      // Fire celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      const newOrder = createOrder({
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          image: item.image
        })),
        shippingAddress: formData,
        subtotal: cartSubtotal,
        discount: cartDiscount,
        shippingFee,
        total: cartTotal,
        paymentMethod,
        paymentStatus,
        orderStatus: 'Confirmed',
        trackingNumber: `EXP-SRT-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedDelivery: '3 to 5 business days'
      });

      showToast('Order confirmed! Receipt generated.');
      setIsProcessing(false);
      setIsRazorpayModalOpen(false);
      router.push(`/order-confirmation/${newOrder.id}`);
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <h2 className="font-serif text-3xl text-[#242321] mb-3">Your Bag Is Empty</h2>
        <p className="text-xs text-[#77716B] mb-6">
          Add items to your bag before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-[#29221D] text-white text-xs uppercase font-semibold tracking-wider"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      {/* Checkout Header */}
      <div className="pb-6 border-b border-[#E5DED4] mb-8">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#A77B55] mb-1">
          <Lock className="w-3.5 h-3.5" />
          <span>Encrypted Indian Checkout</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#242321]">
          SHIPPING &amp; PAYMENT
        </h1>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Delivery Details & Payment Selection */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer & Address */}
          <div className="bg-white p-6 sm:p-8 border border-[#E5DED4]">
            <h2 className="font-serif text-xl text-[#242321] mb-4 pb-2 border-b border-[#E5DED4]">
              1. Delivery Address (Pan-India)
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-semibold text-[#242321] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Vikramaditya Singhania"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden focus:border-[#242321]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-semibold text-[#242321] mb-1">
                    Mobile Phone Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-[#E5DED4] bg-[#F5F1E9] text-[#77716B]">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      maxLength={10}
                      placeholder="98250 12345"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden focus:border-[#242321]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#242321] mb-1">
                    Email Address (For Invoicing) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="vikram@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden focus:border-[#242321]"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-semibold text-[#242321] mb-1">
                  Flat / House No. / Building &amp; Street *
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  placeholder="B-702, Florenza Residency, VIP Road"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden focus:border-[#242321]"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-[#242321] mb-1">
                  Landmark / Locality (Optional)
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="Near Vesu Canal Corridor"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden focus:border-[#242321]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase font-semibold text-[#242321] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Surat"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden focus:border-[#242321]"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#242321] mb-1">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden focus:border-[#242321]"
                  >
                    {indianStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#242321] mb-1">
                    PIN Code (6 Digits) *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    maxLength={6}
                    placeholder="395007"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden focus:border-[#242321]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="bg-white p-6 sm:p-8 border border-[#E5DED4]">
            <h2 className="font-serif text-xl text-[#242321] mb-4 pb-2 border-b border-[#E5DED4]">
              2. Payment Method
            </h2>

            <div className="space-y-3">
              {/* Option 1: Instant UPI */}
              <label
                className={`p-4 border flex items-start space-x-3 cursor-pointer transition-colors ${
                  paymentMethod === 'UPI' ? 'border-[#29221D] bg-[#FAF9F6]' : 'border-[#E5DED4]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                  className="mt-0.5 accent-[#29221D]"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#242321]">
                      Instant UPI (GPay, PhonePe, Paytm, BHIM)
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-[#77716B] mt-1 leading-relaxed">
                    Zero transaction fees. Instant server-side payment confirmation.
                  </p>
                  {paymentMethod === 'UPI' && (
                    <div className="mt-3 pt-3 border-t border-[#E5DED4] space-y-2">
                      <input
                        type="text"
                        placeholder="Enter your UPI ID (e.g. mobile@upi or name@okaxis)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full text-xs p-2.5 border border-[#E5DED4] bg-white focus:outline-hidden"
                      />
                      <p className="text-[11px] text-[#77716B]">
                        You can also scan a direct UPI QR code upon confirmation.
                      </p>
                    </div>
                  )}
                </div>
              </label>

              {/* Option 2: Razorpay */}
              <label
                className={`p-4 border flex items-start space-x-3 cursor-pointer transition-colors ${
                  paymentMethod === 'Razorpay' ? 'border-[#29221D] bg-[#FAF9F6]' : 'border-[#E5DED4]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Razorpay'}
                  onChange={() => setPaymentMethod('Razorpay')}
                  className="mt-0.5 accent-[#29221D]"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#242321]">
                      Razorpay Gateway (Cards, NetBanking, RuPay)
                    </span>
                    <CreditCard className="w-4 h-4 text-[#A77B55]" />
                  </div>
                  <p className="text-xs text-[#77716B] mt-1 leading-relaxed">
                    Visa, MasterCard, RuPay, Diners &amp; all Indian NetBanking portals.
                  </p>
                </div>
              </label>

              {/* Option 3: COD */}
              <label
                className={`p-4 border flex items-start space-x-3 cursor-pointer transition-colors ${
                  paymentMethod === 'COD' ? 'border-[#29221D] bg-[#FAF9F6]' : 'border-[#E5DED4]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-0.5 accent-[#29221D]"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#242321]">
                      Cash On Delivery (COD)
                    </span>
                    <Truck className="w-4 h-4 text-[#A77B55]" />
                  </div>
                  <p className="text-xs text-[#77716B] mt-1 leading-relaxed">
                    Pay via Cash or UPI to courier executive upon delivery to your doorstep.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 sm:p-8 border border-[#E5DED4] space-y-6 sticky top-24">
            <h3 className="font-serif text-2xl text-[#242321] pb-3 border-b border-[#E5DED4]">
              Order Summary ({cartItems.length})
            </h3>

            {/* Item Thumbnails */}
            <div className="max-h-64 overflow-y-auto divide-y divide-[#E5DED4]/70 pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="py-3 first:pt-0 flex items-center space-x-3">
                  <div className="w-14 h-18 bg-[#E5DED4] overflow-hidden flex-shrink-0 border border-[#E5DED4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#242321] truncate">{item.name}</p>
                    <p className="text-[11px] text-[#77716B]">
                      {item.size} • {item.color} • Qty {item.quantity}
                    </p>
                    <p className="text-xs font-semibold text-[#242321] mt-0.5">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Financials */}
            <div className="space-y-2 text-xs text-[#77716B] pt-4 border-t border-[#E5DED4]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#242321]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#A77B55] font-semibold">
                  <span>Voucher / Campaign Discount</span>
                  <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Pan-India Delivery</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-700 uppercase tracking-wider text-[11px]">Free</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-semibold text-[#242321] pt-3 border-t border-[#E5DED4]">
                <span className="font-serif text-lg">Total Payable</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              onClick={handleOrderSubmission}
              disabled={isProcessing}
              className={`w-full py-4 text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-md ${
                isProcessing
                  ? 'bg-[#E5DED4] text-[#77716B] cursor-wait'
                  : 'bg-[#29221D] hover:bg-[#35251E] text-[#FAF9F6]'
              }`}
            >
              {isProcessing ? (
                <span>Generating Order...</span>
              ) : (
                <>
                  <span>Place Order • ₹{cartTotal.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center text-[10px] text-[#77716B] leading-relaxed">
              By confirming, you agree to STYLR&apos;s Terms of Service and Pan-India Delivery Policy.
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Razorpay Checkout Dialog */}
      {isRazorpayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#E5DED4] w-full max-w-md shadow-2xl p-6 relative">
            <div className="flex justify-between items-center pb-4 border-b border-[#E5DED4] mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#A77B55]">
                  Razorpay Secured Gateway
                </span>
                <h4 className="font-serif text-xl text-[#242321]">STYLR Men&apos;s Clothing</h4>
              </div>
              <span className="font-serif text-lg font-bold text-[#242321]">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div>
                <label className="block text-[#77716B] mb-1">Card Number</label>
                <input
                  type="text"
                  value={mockCardNumber}
                  onChange={(e) => setMockCardNumber(e.target.value)}
                  className="w-full border border-[#E5DED4] p-2.5 bg-[#FAF9F6] font-mono text-xs focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#77716B] mb-1">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    value={mockCardExpiry}
                    onChange={(e) => setMockCardExpiry(e.target.value)}
                    className="w-full border border-[#E5DED4] p-2.5 bg-[#FAF9F6] font-mono text-xs focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[#77716B] mb-1">CVV</label>
                  <input
                    type="password"
                    maxLength={3}
                    value={mockCvv}
                    onChange={(e) => setMockCvv(e.target.value)}
                    className="w-full border border-[#E5DED4] p-2.5 bg-[#FAF9F6] font-mono text-xs focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => finalizeOrder('Paid')}
                className="flex-1 py-3 bg-[#A77B55] hover:bg-[#C49B74] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Simulate Payment &amp; Authorize
              </button>
              <button
                onClick={() => setIsRazorpayModalOpen(false)}
                className="py-3 px-4 border border-[#E5DED4] text-xs uppercase font-semibold text-[#77716B]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
