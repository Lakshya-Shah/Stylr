import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full flex-1">
      <div className="pb-6 border-b border-[#E5DED4] mb-8">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-2">
          Legal Agreement
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#242321]">
          TERMS &amp; CONDITIONS
        </h1>
      </div>

      <div className="bg-white border border-[#E5DED4] p-8 sm:p-12 space-y-6 text-xs text-[#77716B] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">1. General Overview</h2>
          <p>
            This website is operated by STYLR Men&apos;s Clothing, situated in Vesu, Surat, Gujarat, India. By accessing or purchasing from our store, you engage in our service and agree to be bound by the following terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">2. Product Accuracy &amp; Colour Fidelity</h2>
          <p>
            We take extreme care in styling, photographing, and detailing each garment. Because natural textiles (such as French linen and raw selvedge cotton) have authentic texture and lighting nuances, subtle differences between screen display and physical garments may exist.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">3. Pricing &amp; Offers</h2>
          <p>
            All prices are stated in Indian Rupees (₹) inclusive of Goods and Services Tax (GST). Promotional offers (such as Buy 2 Get 1 Free and seasonal voucher codes) are governed by specific campaign conditions and subject to availability.
          </p>
        </section>
      </div>
    </div>
  );
}
