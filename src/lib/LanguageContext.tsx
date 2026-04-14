"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  vi: {
    'home': 'Trang chủ',
    'about': 'Giới thiệu',
    'products': 'Sản phẩm',
    'news': 'Tin tức',
    'contact': 'Liên hệ',
    'recruitment': 'Tuyển dụng',
    'catalogue': 'Catalogue',
    'call_us': 'Gọi chúng tôi',
    'email_us': 'Gửi email',
    'latest_news': 'Tin tức mới nhất',
    'featured_products': 'Sản phẩm nổi bật',
    'why_choose_us': 'Tại sao chọn chúng tôi',
    'tech_usa': 'Công nghệ USA',
  },
  en: {
    'home': 'Home',
    'about': 'About Us',
    'products': 'Products',
    'news': 'News',
    'contact': 'Contact',
    'recruitment': 'Recruitment',
    'catalogue': 'Catalogue',
    'call_us': 'Call Us',
    'email_us': 'Email Us',
    'latest_news': 'Latest News',
    'featured_products': 'Featured Products',
    'why_choose_us': 'Why Choose Us',
    'tech_usa': 'USA Technology',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('sanfovet_lang') as Language;
    if (savedLang && (savedLang === 'vi' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('sanfovet_lang', lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
