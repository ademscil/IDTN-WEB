import React, { useState } from 'react';
import { translations, Language } from './translations';
import { LanguageContext } from './language-context-instance';

export type { Language };

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('idtn_lang');
    return (saved === 'en' || saved === 'id') ? saved : 'en'; // Default is English (EN)
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('idtn_lang', newLang);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
