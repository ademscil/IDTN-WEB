import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { TrustStripSection } from '../components/sections/TrustStripSection';
import { AboutUsSection } from '../components/sections/AboutUsSection';
import { EquipmentSection } from '../components/sections/EquipmentSection';
import { ClientsSection } from '../components/sections/ClientsSection';
import { InquiryFormSection } from '../components/sections/InquiryFormSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 md:space-y-24">
      <HeroSection />
      <TrustStripSection />
      <AboutUsSection />
      <EquipmentSection />
      <ClientsSection />
      <InquiryFormSection />
    </div>
  );
};
