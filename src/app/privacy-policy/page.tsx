import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full flex-1">
      <div className="pb-6 border-b border-[#E5DED4] mb-8">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-2">
          Data Governance
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#242321]">
          PRIVACY POLICY
        </h1>
      </div>

      <div className="bg-white border border-[#E5DED4] p-8 sm:p-12 space-y-6 text-xs text-[#77716B] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">1. Commitment to Privacy</h2>
          <p>
            STYLR Men&apos;s Clothing (Vesu, Surat, Gujarat) respects your privacy. We collect only necessary details (name, contact number, shipping destination, email) to process orders, generate invoices, and communicate tracking milestones.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">2. Payment Security</h2>
          <p>
            We do not store credit card or debit card numbers on our servers. All digital transactions are securely tokenized and handled through PCI-DSS certified payment gateways (Razorpay, UPI NPCI rails).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#242321]">3. Third-Party Sharing</h2>
          <p>
            Customer details are shared strictly with certified Indian courier partners (e.g. BlueDart, DTDC, Delhivery) solely for delivery execution. Your data is never sold or rented to third-party marketing brokers.
          </p>
        </section>
      </div>
    </div>
  );
}
