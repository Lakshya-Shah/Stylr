'use client';

import React, { use, Suspense } from 'react';
import Link from 'next/link';
import { useStore } from '../../../context/StoreContext';
import {
  CheckCircle2,
  PackageCheck,
  Truck,
  Download,
  MessageSquare,
  ArrowRight,
  MapPin,
  Clock
} from 'lucide-react';

function OrderConfirmationContent({ params }: { params: Promise<{ orderId: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.orderId;
  const { orders, storeContent } = useStore();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  const handlePrint = () => {
    window.print();
  };

  const cleanPhone = storeContent.contact.whatsappNumber.replace(/[^0-9]/g, '');
  const waMsg = encodeURIComponent(
    `Hello STYLR team, I have placed Order ${order.orderNumber}. Please keep me updated with tracking details.`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
      {/* Success Hero */}
      <div className="bg-white border border-[#E5DED4] p-8 sm:p-12 text-center mb-8 shadow-xs">
        <div className="w-16 h-16 bg-[#F5F1E9] border border-[#E5DED4] flex items-center justify-center mx-auto mb-4 text-[#A77B55]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-1">
          Payment &amp; Order Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#242321] mb-2">
          THANK YOU FOR CHOOSING STYLR
        </h1>
        <p className="text-xs text-[#77716B] max-w-md mx-auto mb-6">
          Your order <strong>{order.orderNumber}</strong> has been received by our Surat flagship studio and is being prepared for express dispatch.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-white border border-[#242321] hover:bg-[#FAF9F6] text-[#242321] text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Invoice / Print</span>
          </button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#A77B55] hover:bg-[#C49B74] text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Track on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Tracking Milestone Timeline */}
      <div className="bg-white border border-[#E5DED4] p-6 sm:p-8 mb-8">
        <h2 className="font-serif text-xl text-[#242321] mb-6 pb-2 border-b border-[#E5DED4]">
          Live Fulfillment Timeline
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {[
            { title: 'Order Confirmed', desc: 'Received & verified', status: 'done' },
            { title: 'Quality Check & Packing', desc: 'Vesu, Surat Studio', status: 'current' },
            { title: 'Dispatched', desc: order.trackingNumber || 'Express courier assigned', status: 'upcoming' },
            { title: 'Delivered', desc: 'Estimated 3-5 business days', status: 'upcoming' }
          ].map((step, idx) => (
            <div key={idx} className="flex sm:flex-col items-center sm:items-start space-x-3 sm:space-x-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2 flex-shrink-0 ${
                  step.status === 'done'
                    ? 'bg-[#29221D] text-white'
                    : step.status === 'current'
                    ? 'bg-[#A77B55] text-white ring-4 ring-[#A77B55]/20'
                    : 'bg-[#E5DED4] text-[#77716B]'
                }`}
              >
                {idx + 1}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#242321]">{step.title}</p>
                <p className="text-[11px] text-[#77716B] leading-tight">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details & Delivery Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Delivery Address */}
        <div className="bg-white border border-[#E5DED4] p-6">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#A77B55] mb-3">
            <MapPin className="w-4 h-4" />
            <span>Shipping Destination</span>
          </div>
          <p className="text-sm font-semibold text-[#242321] mb-1">{order.shippingAddress.fullName}</p>
          <p className="text-xs text-[#77716B] leading-relaxed">
            {order.shippingAddress.addressLine1}
            {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}
            <br />
            Mobile: +91 {order.shippingAddress.phone}
            <br />
            Email: {order.shippingAddress.email}
          </p>
        </div>

        {/* Payment Summary */}
        <div className="bg-white border border-[#E5DED4] p-6">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#A77B55] mb-3">
            <Clock className="w-4 h-4" />
            <span>Payment Summary</span>
          </div>
          <div className="space-y-1.5 text-xs text-[#77716B]">
            <div className="flex justify-between">
              <span>Payment Mode:</span>
              <span className="font-semibold text-[#242321]">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Status:</span>
              <span className="font-semibold text-emerald-700">{order.paymentStatus}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#A77B55]">
                <span>Discount:</span>
                <span>-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{order.shippingFee === 0 ? 'Complimentary' : `₹${order.shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-[#242321] pt-2 border-t border-[#E5DED4]">
              <span>Total Paid:</span>
              <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Purchased Items List */}
      <div className="bg-white border border-[#E5DED4] p-6 mb-8">
        <h3 className="font-serif text-lg text-[#242321] mb-4 pb-2 border-b border-[#E5DED4]">
          Items In This Order
        </h3>
        <div className="divide-y divide-[#E5DED4]">
          {order.items.map((item, i) => (
            <div key={i} className="py-3 first:pt-0 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-18 bg-[#E5DED4] overflow-hidden flex-shrink-0 border border-[#E5DED4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#242321]">{item.name}</p>
                  <p className="text-[11px] text-[#77716B]">
                    Size: {item.size} • Colour: {item.color} • Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#242321]">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Return to shop CTA */}
      <div className="text-center">
        <Link
          href="/shop"
          className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#29221D] hover:bg-[#35251E] text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm"
        >
          <span>Continue Browsing Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage({ params }: { params: Promise<{ orderId: string }> }) {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto p-12 text-center text-xs uppercase tracking-widest">Loading Order Receipt...</div>}>
      <OrderConfirmationContent params={params} />
    </Suspense>
  );
}
