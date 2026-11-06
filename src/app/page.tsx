import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { LatestEditSection } from '../components/home/LatestEditSection';
import { EditorialCampaignSection } from '../components/home/EditorialCampaignSection';
import { ShopTheLookSection } from '../components/home/ShopTheLookSection';
import { BestSellersSection } from '../components/home/BestSellersSection';
import { PromotionalBannerSection } from '../components/home/PromotionalBannerSection';
import { BrandStorySection } from '../components/home/BrandStorySection';
import { InstagramSection } from '../components/home/InstagramSection';

export default function HomePage() {
  return (
    <main className="flex-1 w-full bg-[#F5F1E9]">
      <HeroSection />
      <CategoryGrid />
      <LatestEditSection />
      <EditorialCampaignSection />
      <ShopTheLookSection />
      <BestSellersSection />
      <PromotionalBannerSection />
      <BrandStorySection />
      <InstagramSection />
    </main>
  );
}
