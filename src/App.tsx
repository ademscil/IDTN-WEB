import React, { useState } from 'react';
import { SkipLink } from './components/common/SkipLink';
import { PagePreloader } from './components/common/PagePreloader';
import { PageTransitionVeil } from './components/common/PageTransitionVeil';
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
import { useScrollReveal } from './lib/useScrollReveal';

export const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Activate smooth scroll-reveal on viewport entry (inspired by t8.ru)
  useScrollReveal();

  const handleSmoothNavigate = (href: string) => {
    // 1. Trigger transition veil (fade-out current view)
    setIsTransitioning(true);

    setTimeout(() => {
      // 2. Perform smooth scroll to target
      if (href.startsWith('#')) {
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 70;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }

      // 3. Fade-in new view by removing veil
      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-sky-100 selection:text-sky-900">
      {/* 1. Initial Page Preloader (inspired by t8.ru preloader) */}
      <PagePreloader />

      {/* 2. Page Navigation Transition Veil (fade-in / fade-out curtain) */}
      <PageTransitionVeil isTransitioning={isTransitioning} />

      <SkipLink />
      
      <Header
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onNavigate={handleSmoothNavigate}
      />
      
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleSmoothNavigate}
      />

      <main id="main-content" className="flex-1">
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
      </main>

      <Footer />
    </div>
  );
};

export default App;
