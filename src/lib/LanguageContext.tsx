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
    'Trang chủ': 'Trang chủ',
    'Giới thiệu': 'Giới thiệu',
    'Sản phẩm': 'Sản phẩm',
    'Cẩm nang': 'Cẩm nang',
    'Tin tức': 'Tin tức',
    'Catalogue': 'Catalogue',
    'Tuyển dụng': 'Tuyển dụng',
    'Liên hệ': 'Liên hệ',
    'call_us': 'Gọi chúng tôi',
    'email_us': 'Gửi email',
    'latest_news': 'Tin tức mới nhất',
    'featured_products': 'Sản phẩm nổi bật',
    'why_choose_us': 'Tại sao chọn chúng tôi',
    'tech_usa': 'Công nghệ USA',
    'all_products': 'Tất cả sản phẩm',
    'tech_support': 'Hỗ trợ kỹ thuật',
    'free_catalogue': 'Đăng ký nhận bản in',
    'intro_slogan': 'Công nghệ USA - Chất lượng vượt trội'
  },
  en: {
    'Trang chủ': 'Home',
    'Giới thiệu': 'About Us',
    'Sản phẩm': 'Products',
    'Cẩm nang': 'Handbook',
    'Tin tức': 'News',
    'Catalogue': 'Catalogue',
    'Tuyển dụng': 'Recruitment',
    'Liên hệ': 'Contact',
    'call_us': 'Call Us',
    'email_us': 'Email Us',
    'latest_news': 'Latest News',
    'featured_products': 'Featured Products',
    'why_choose_us': 'Why Choose Us',
    'tech_usa': 'USA Technology',
    'all_products': 'All Products',
    'tech_support': 'Technical Support',
    'free_catalogue': 'Request Printed Copy',
    'intro_slogan': 'USA Technology - Superior Quality'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('biotechvet_lang') as Language;
    if (savedLang && (savedLang === 'vi' || savedLang === 'en')) {
      // Use requestAnimationFrame to avoid synchronous state update in effect
      requestAnimationFrame(() => {
        setLanguage(savedLang);
      });
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('biotechvet_lang', lang);
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
