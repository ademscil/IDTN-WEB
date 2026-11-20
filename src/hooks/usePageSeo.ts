import { useEffect } from 'react';
import { useCmsData } from '../context/CmsDataContext';
import { useLanguage } from '../context/useLanguage';

export const usePageSeo = (pageKey: 'home' | 'about' | 'product' | 'client' | 'contact') => {
  const { pages } = useCmsData();
  const { lang } = useLanguage();

  useEffect(() => {
    const pageData = pages[pageKey];
    if (!pageData || !pageData.seo) return;

    const langKey = lang === 'en' ? 'en' : 'id';
    const seo = pageData.seo[langKey];
    if (!seo) return;

    // 1. Update Title
    if (seo.title) {
      document.title = seo.title;
    }

    // 2. Helper to set or create meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrVal);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 3. Update Meta Description & Keywords
    if (seo.description) {
      setMetaTag('name', 'description', seo.description);
      setMetaTag('property', 'og:description', seo.description);
      setMetaTag('name', 'twitter:description', seo.description);
    }

    if (seo.keywords) {
      setMetaTag('name', 'keywords', seo.keywords);
    }

    if (seo.title) {
      setMetaTag('property', 'og:title', seo.title);
      setMetaTag('name', 'twitter:title', seo.title);
    }
  }, [pageKey, pages, lang]);
};
