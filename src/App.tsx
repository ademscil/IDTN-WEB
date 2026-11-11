import React, { useState } from 'react';
import { SkipLink } from './components/common/SkipLink';
import { Header } from './components/layout/Header';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { TrustStripSection } from './components/sections/TrustStripSection';
import { AboutUsSection } from './components/sections/AboutUsSection';
import { SolutionsSection } from './components/sections/SolutionsSection';
import { DwdmExplorerSection } from './components/sections/DwdmExplorerSection';
import { EquipmentSection } from './components/sections/EquipmentSection';
import { ComplianceSection } from './components/sections/ComplianceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { GallerySection } from './components/sections/GallerySection';
import { ClientsSection } from './components/sections/ClientsSection';
import { InquiryFormSection } from './components/sections/InquiryFormSection';

export const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <SkipLink />
      
      <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main id="main-content" className="flex-1">
        <HeroSection />
        <TrustStripSection />
        <AboutUsSection />
        <SolutionsSection />
        <DwdmExplorerSection />
        <EquipmentSection />
        <ComplianceSection />
        <ProjectsSection />
        <GallerySection />
        <ClientsSection />
        <InquiryFormSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
