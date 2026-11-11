import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { TrustStripSection } from '../components/sections/TrustStripSection';
import { AboutUsSection } from '../components/sections/AboutUsSection';
import { SolutionsSection } from '../components/sections/SolutionsSection';
import { DwdmExplorerSection } from '../components/sections/DwdmExplorerSection';
import { EquipmentSection } from '../components/sections/EquipmentSection';
import { ComplianceSection } from '../components/sections/ComplianceSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { GallerySection } from '../components/sections/GallerySection';
import { ClientsSection } from '../components/sections/ClientsSection';
import { InquiryFormSection } from '../components/sections/InquiryFormSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      
      <div className="reveal-on-scroll">
        <TrustStripSection />
      </div>

      <div className="reveal-on-scroll">
        <AboutUsSection />
      </div>

      <div className="reveal-on-scroll">
        <SolutionsSection />
      </div>

      <div className="reveal-on-scroll">
        <DwdmExplorerSection />
      </div>

      <div className="reveal-on-scroll">
        <EquipmentSection />
      </div>

      <div className="reveal-on-scroll">
        <ComplianceSection />
      </div>

      <div className="reveal-on-scroll">
        <ProjectsSection />
      </div>

      <div className="reveal-on-scroll">
        <GallerySection />
      </div>

      <div className="reveal-on-scroll">
        <ClientsSection />
      </div>

      <div className="reveal-on-scroll">
        <InquiryFormSection />
      </div>
    </div>
  );
};
