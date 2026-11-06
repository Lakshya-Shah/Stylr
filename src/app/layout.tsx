import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '../context/StoreContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { SearchModal } from '../components/SearchModal';
import { QuickAddModal } from '../components/QuickAddModal';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { WhatsAppFloating } from '../components/WhatsAppFloating';
import { ToastContainer } from '../components/ToastContainer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PrivyPerksPill } from '../components/PrivyPerksPill';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'STYLR | Premium Men\'s Fashion & Clothing | Vesu, Surat',
  description:
    'STYLR is a premium men\'s fashion destination based in Vesu, Surat, Gujarat. Discover French linen shirts, double-pleated trousers, resort co-ord sets, and modern essentials with Pan-India express delivery.',
  keywords: [
    'STYLR',
    'Men\'s clothing store Surat',
    'Men\'s fashion Surat',
    'Premium men\'s wear Surat',
    'Vesu clothing store',
    'Men\'s linen shirts India',
    'Men\'s co-ord sets',
    'Double pleated trousers India',
    'Contemporary menswear India'
  ],
  authors: [{ name: 'STYLR Men\'s Clothing' }],
  openGraph: {
    title: 'STYLR — Everyday Style. Elevated.',
    description: 'Contemporary menswear designed with architectural tailoring and breathable natural textiles. Shipping across India from Vesu, Surat.',
    url: 'https://stylr.in',
    siteName: 'STYLR',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STYLR | Premium Men\'s Fashion',
    description: 'Contemporary menswear from Surat, Gujarat. Pan-India shipping.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#F5F1E9] text-[#242321] selection:bg-[#A77B55] selection:text-white">
        <StoreProvider>
          <Header />
          <div className="flex-1 flex flex-col pb-16 lg:pb-0">{children}</div>
          <Footer />
          <CartDrawer />
          <SearchModal />
          <QuickAddModal />
          <SizeGuideModal />
          <WhatsAppFloating />
          <PrivyPerksPill />
          <Suspense fallback={null}>
            <MobileBottomNav />
          </Suspense>
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
