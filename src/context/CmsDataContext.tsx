import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { PageContentData, FooterSettingsData, CmsProduct, CmsClient } from '../types/cms';
import {
  defaultPages,
  defaultFooter,
  defaultProducts,
  defaultClients,
  mergePageWithDefaults
} from '../data/defaultCmsData';

interface CmsDataContextType {
  pages: Record<string, PageContentData>;
  footer: FooterSettingsData;
  products: CmsProduct[];
  clients: CmsClient[];
  isLoading: boolean;
  reloadContent: () => Promise<void>;
}

const CmsDataContext = createContext<CmsDataContextType | undefined>(undefined);

export const CmsDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<Record<string, PageContentData>>(defaultPages);
  const [footer, setFooter] = useState<FooterSettingsData>(defaultFooter);
  const [products, setProducts] = useState<CmsProduct[]>(defaultProducts);
  const [clients, setClients] = useState<CmsClient[]>(defaultClients);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContent = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/public/content.php');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          if (json.pages && Object.keys(json.pages).length > 0) {
            setPages((prev) => {
              const updated: Record<string, PageContentData> = { ...prev };
              for (const [key, pData] of Object.entries(json.pages as Record<string, Partial<PageContentData>>)) {
                updated[key] = mergePageWithDefaults(key, pData);
              }
              return updated;
            });
          }
          if (json.footer && json.footer.company_summary) {
            setFooter(json.footer);
          }
          if (json.products && json.products.length > 0) {
            setProducts(json.products);
          }
          if (json.clients && json.clients.length > 0) {
            setClients(json.clients);
          }
        }
      }
    } catch {
      // Offline fallback: keep default data seamlessly
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <CmsDataContext.Provider
      value={{
        pages,
        footer,
        products,
        clients,
        isLoading,
        reloadContent: fetchContent
      }}
    >
      {children}
    </CmsDataContext.Provider>
  );
};

export const useCmsData = (): CmsDataContextType => {
  const context = useContext(CmsDataContext);
  if (!context) {
    throw new Error('useCmsData must be used within a CmsDataProvider');
  }
  return context;
};
