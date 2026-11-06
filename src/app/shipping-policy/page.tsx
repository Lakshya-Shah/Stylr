import React from 'react';
import Link from 'next/link';

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full flex-1">
      <div className="pb-6 border-b border-[#E5DED4] mb-8">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-2">
          Pan-India Logistics
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#242321]">
          SHIPPING POLICY
        </h1>
      </div>

      <div className="bg-white border border-[#E5DED4] p-8 sm:p-12 space-y-6 text-xs text-[#77716B] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">1. Pan-India Delivery Network</h2>
          <p>
            STYLR fulfills orders across all serviceable PIN codes throughout India. Every order is inspected, hand-folded, and packaged at our flagship studio warehouse located in Vesu, Surat, Gujarat.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">2. Shipping Rates &amp; Free Delivery</h2>
          <p>
            • <strong>Complimentary Express Shipping:</strong> Available on all orders with an order total of ₹2,499 or higher across India.
          </p>
          <p>
            • <strong>Standard Shipping:</strong> A flat delivery fee of ₹150 applies to orders below ₹2,499 to cover insured courier handling.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">3. Dispatch Timelines</h2>
          <p>
            Orders placed before 2:00 PM IST on business days are dispatched within 24 to 48 hours. Orders placed on Sundays or gazetted public holidays are processed on the subsequent working day.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">4. Transit Times</h2>
          <p>• <strong>Gujarat, Mumbai &amp; Western India:</strong> 2 to 3 business days.</p>
          <p>• <strong>Delhi NCR, Bengaluru, Hyderabad, Chennai:</strong> 3 to 4 business days.</p>
          <p>• <strong>Rest of India &amp; North East:</strong> 4 to 6 business days.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">5. Tracking &amp; Notifications</h2>
          <p>
            Upon courier dispatch, a live tracking link with airway bill (AWB) number is automatically delivered via SMS, Email, and WhatsApp. You can also monitor real-time order status directly from your STYLR Client Account.
          </p>
        </section>
      </div>
    </div>
  );
}
