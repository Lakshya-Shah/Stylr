import React from 'react';
import Link from 'next/link';

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full flex-1">
      <div className="pb-6 border-b border-[#E5DED4] mb-8">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-2">
          Customer Satisfaction
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#242321]">
          RETURNS &amp; EXCHANGES
        </h1>
      </div>

      <div className="bg-white border border-[#E5DED4] p-8 sm:p-12 space-y-6 text-xs text-[#77716B] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">1. 7-Day Hassle-Free Returns</h2>
          <p>
            At STYLR, we strive for you to feel completely confident in your garments. If you are not satisfied with the fit, silhouette, or drape, you may initiate an exchange or return within 7 calendar days of delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">2. Eligibility Conditions</h2>
          <p>• Items must be unwashed, unworn, and unaltered.</p>
          <p>• All original brand tags and garment labels must remain attached.</p>
          <p>• The item must be returned in its original protective packaging.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">3. Size Exchanges</h2>
          <p>
            Complimentary doorstep reverse pickup is arranged for size exchanges. If the replacement size is unavailable, a full store credit or refund will be issued immediately upon quality inspection.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">4. Refund Process</h2>
          <p>
            • <strong>Prepaid Orders (UPI/Razorpay/Cards):</strong> Refunds are processed back to the original source account within 3-5 business days of item inspection.
          </p>
          <p>
            • <strong>COD Orders:</strong> Refunds are transferred via direct UPI transfer or bank NEFT upon receiving bank details.
          </p>
        </section>

        <div className="pt-4 border-t border-[#E5DED4]">
          <p>
            Need assistance initiating a return? Contact our Vesu studio directly at <Link href="/contact" className="text-[#A77B55] underline">concierge@stylr.in</Link> or on WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
