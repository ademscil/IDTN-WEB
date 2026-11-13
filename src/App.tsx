import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SkipLink } from './components/common/SkipLink';
import { PagePreloader } from './components/common/PagePreloader';
import { Header } from './components/layout/Header';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { Footer } from './components/layout/Footer';
import { RouteTransition } from './components/layout/RouteTransition';
import { SEOUpdater } from './components/common/SEOUpdater';
import { LanguageProvider } from './context';

// Dedicated Multi-Page Views
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EquipmentPage } from './pages/EquipmentPage';
import { ClientsPage } from './pages/ClientsPage';
import { ContactPage } from './pages/ContactPage';

export const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <LanguageProvider>
      <BrowserRouter basename={basename}>
        <SEOUpdater />
        <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-sky-100 selection:text-sky-900">
          {/* Initial First-Load Preloader (t8.ru style) */}
          <PagePreloader />

          <SkipLink />
          
          <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
          
          <MobileDrawer
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />

          {/* Multi-Page Route Transitions (Barba.js / T8 style fade transitions) */}
          <main id="main-content" className="flex-1">
            <RouteTransition>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/equipment" element={<EquipmentPage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Fallback to Home */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </RouteTransition>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
