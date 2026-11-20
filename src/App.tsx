import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { SkipLink } from './components/common/SkipLink';
import { PagePreloader } from './components/common/PagePreloader';
import { Header } from './components/layout/Header';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { Footer } from './components/layout/Footer';
import { RouteTransition } from './components/layout/RouteTransition';
import { SEOUpdater } from './components/common/SEOUpdater';
import { LanguageProvider } from './context';
import { CmsDataProvider } from './context/CmsDataContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

// Public Multi-Page Views
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EquipmentPage } from './pages/EquipmentPage';
import { ClientsPage } from './pages/ClientsPage';
import { ContactPage } from './pages/ContactPage';

// Admin CMS Views
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminPagesSeoPage } from './pages/admin/AdminPagesSeoPage';
import { AdminFooterPage } from './pages/admin/AdminFooterPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminClientsPage } from './pages/admin/AdminClientsPage';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';
import { AdminMediaPage } from './pages/admin/AdminMediaPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';

// Layout Wrapper for Public Website Pages
const PublicLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-sky-100 selection:text-sky-900">
      <PagePreloader />
      <SkipLink />
      <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <main id="main-content" className="flex-1">
        <RouteTransition>
          <Outlet />
        </RouteTransition>
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <LanguageProvider>
      <CmsDataProvider>
        <AdminAuthProvider>
          <BrowserRouter basename={basename}>
            <SEOUpdater />
            <Routes>
              {/* Admin Portal Routes (No Public Header / Footer) */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="pages" element={<AdminPagesSeoPage />} />
                <Route path="footer" element={<AdminFooterPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="clients" element={<AdminClientsPage />} />
                <Route path="inquiries" element={<AdminInquiriesPage />} />
                <Route path="media" element={<AdminMediaPage />} />
                <Route path="users" element={<AdminUsersPage />} />
              </Route>

              {/* Public Website Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/equipment" element={<EquipmentPage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Fallback to Home */}
                <Route path="*" element={<HomePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </CmsDataProvider>
    </LanguageProvider>
  );
};

export default App;
