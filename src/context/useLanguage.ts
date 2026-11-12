import { useContext } from 'react';
import { LanguageContext } from './language-context-instance';

export const useLanguage = () => useContext(LanguageContext);
