"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/translations/en.json';
import ar from '@/translations/ar.json';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: typeof en;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  // تحميل اللغة من localStorage أو استخدام لغة المتصفح
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage);
    } else {
      // تحديد اللغة حسب لغة المتصفح
      const browserLanguage = navigator.language.startsWith('ar') ? 'ar' : 'en';
      setLanguageState(browserLanguage);
    }
    setIsLoaded(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // إعادة توجيه للصفحة المناسبة للغة
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${lang}`);
      if (newPath !== currentPath) {
        window.location.href = newPath;
      }
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
  };

  const translations = language === 'en' ? en : ar;

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      translations, 
      toggleLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
