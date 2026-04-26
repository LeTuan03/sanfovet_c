"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Phone, Mail, ChevronDown, ChevronRight, Menu, X, 
  Syringe, FlaskConical, TestTube, Pill, Droplets, Bug, ShieldCheck, Leaf, FlaskRound, Beaker,
  Search
} from 'lucide-react';
import { FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { NavMenu, Category, Setting, AnimalTag } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  const [menus, setMenus] = useState<NavMenu[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<Setting | null>(null);

  useEffect(() => {
    setIsHydrated(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    // Fetch dynamic data
    const fetchData = async () => {
      try {
        const [menusRes, settingsRes, categoriesRes] = await Promise.all([
          fetch('/api/data/menus'),
          fetch('/api/data/settings'),
          fetch('/api/data/categories')
        ]);
        const menusData = await menusRes.json();
        const settingsData = await settingsRes.json();
        const categoriesData = await categoriesRes.json();
        console.log(menusData);
        if (Array.isArray(menusData)) {
          setMenus(menusData.filter((m: any) => m.position === 'header' || m.position === 'both'));
        }
        
        setSettings(settingsData);
        
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Failed to fetch header data', error);
      }
    };
    fetchData();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full z-50 relative">
      {/* Top Bar - Disappears on scroll if we want, but let's keep it above Main Bar */}
      <div className="bg-gradient-to-r from-biotechvet-dark to-[#0d2b10] text-white text-[0.82rem] py-1.5 hidden md:block border-b border-white/5">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Hotline nổi bật - Tư vấn mua hàng */}
            <a
              href={`tel:${(settings?.hotline1 || '02466861629').replace(/\s/g, '')}`}
              className="flex items-center gap-2 group"
              title="Gọi tư vấn ngay"
              suppressHydrationWarning
            >
              <span className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-6 w-6 rounded-full bg-amber-400 opacity-40 animate-ping"></span>
                <span className="relative flex items-center justify-center w-6 h-6 bg-amber-400 rounded-full">
                  <Phone size={12} className="text-white" />
                </span>
              </span>
              <span className="flex flex-col leading-[1.2]">
                <span className="text-[0.6rem] font-black uppercase tracking-[2px] text-amber-400">Tư vấn mua hàng</span>
                <span className="text-[0.85rem] font-black text-white group-hover:text-amber-300 transition-colors tracking-wide" suppressHydrationWarning>
                  {settings?.hotline1 || '024 6686 1629'}
                  <span className="mx-1 text-white/40">-</span>
                  {settings?.hotline2 || '097 499 9204'}
                </span>
              </span>
            </a>
            <span className="flex items-center gap-1.5 opacity-80 font-medium border-l border-white/20 pl-4">
              <Mail size={13} className="shrink-0 text-amber-400" />
              <span className="text-white/90">{settings?.email || 'pkd.biotechvet@gmail.com'}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 mr-2">
              <Link href={settings?.social?.facebook || "https://facebook.com/biotechvet"} target="_blank" className="text-white/70 hover:text-amber-500 transition-all font-bold">
                <FacebookOutlined />
              </Link>
              <Link href={settings?.social?.youtube || "https://youtube.com/biotechvet"} target="_blank" className="text-white/70 hover:text-amber-500 transition-all font-bold">
                <YoutubeOutlined />
              </Link>
            </div>
            <div className="flex items-center gap-2 border-l border-white/20 pl-4">
              <button 
                onClick={() => setLanguage('vi')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[0.7rem] font-black border transition-all uppercase tracking-wider ${language === 'vi' ? 'bg-primary border-primary' : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'}`}
              >
                <img src="/images/VN.png" alt="VN" className="w-[16px] rounded-sm" /> VI
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[0.7rem] font-black border transition-all uppercase tracking-wider ${language === 'en' ? 'bg-primary border-primary' : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'}`}
              >
                <img src="/images/UK.png" alt="EN" className="w-[16px] rounded-sm" /> EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar - Sticky */}
      <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl py-2' : 'bg-white py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center gap-3">
              <img src="/images/logo.png" alt="BIOTECH-VET" className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12 md:h-[52px]'}`} />
              <div className="hidden lg:block">
                <div className="text-primary font-black text-xl leading-none tracking-tighter italic uppercase font-montserrat">BIOTECH-VET</div>
                <div className="text-[0.6rem] text-biotechvet-dark font-black tracking-widest uppercase mt-0.5">{t('intro_slogan')}</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {menus
                .filter(m => m.status && (m.parent === null || m.parent === undefined))
                .sort((a, b) => a.order - b.order)
                .map((menu) => {
                  const children = menus
                    .filter(m => String(m.parent) === String(menu.id) && m.status)
                    .sort((a, b) => a.order - b.order);
                  const hasChildren = children.length > 0;
                  
                  if (menu.hasMega) {
                    return (
                      <div key={menu.id} className="relative group p-0">
                        <Link href={menu.link} className="px-3 py-2 text-[0.82rem] font-black text-biotechvet-dark hover:text-primary uppercase tracking-tight flex items-center gap-1 group-hover:bg-biotechvet-alt rounded-lg transition-colors font-montserrat">
                          {t(menu.name)} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                        </Link>
                        {/* Mega Dropdown */}
                        <div className="absolute top-full left-0 w-[440px] bg-white shadow-2xl rounded-2xl py-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 border border-gray-100 z-50 overflow-hidden">
                          <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                            <div className="px-6 mb-4 border-b border-gray-50 pb-4">
                              <Link href="/san-pham" className="text-[0.7rem] font-black text-primary uppercase tracking-[2px] hover:text-primary-dark transition-colors flex items-center justify-between group/all">
                                 {t('all_products')} 
                                 <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover/all:translate-x-1 transition-transform">
                                    <ChevronRight size={12} />
                                 </div>
                              </Link>
                            </div>
                            <div className="px-2 space-y-0.5">
                              {categories.map((cat, idx) => {
                                const icons = [
                                  <Syringe key="s1" size={20} />, <FlaskConical key="s2" size={20} />, <FlaskRound key="s3" size={20} />, 
                                  <TestTube key="s4" size={20} />, <Beaker key="s5" size={20} />, <Pill key="s6" size={20} />, 
                                  <Droplets key="s7" size={20} />, <Bug key="s8" size={20} />, <ShieldCheck key="s9" size={20} />, <Leaf key="s10" size={20} />
                                ];
                                return (
                                  <DropdownItem 
                                    key={cat.id} 
                                    href={`/san-pham/danh-muc/${cat.slug}`} 
                                    icon={icons[idx % icons.length]} 
                                    label={cat.name} 
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (hasChildren) {
                    return (
                      <div key={menu.id} className="relative group p-0">
                        <Link href={menu.link} className="px-3 py-2 text-[0.82rem] font-black text-biotechvet-dark hover:text-primary uppercase tracking-tight flex items-center gap-1 group-hover:bg-biotechvet-alt rounded-lg transition-colors font-montserrat">
                          {t(menu.name)} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                        </Link>
                        {/* Standard Dropdown */}
                        <div className="absolute top-full left-0 w-[260px] bg-white shadow-2xl rounded-2xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 border border-gray-100 z-50 overflow-hidden">
                          <div className="px-2 space-y-0.5">
                            {children.map((child) => (
                              <Link 
                                key={child.id} 
                                href={child.link} 
                                className="flex items-center gap-3 px-4 py-3 hover:bg-biotechvet-alt rounded-xl transition-all group/subitem"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover/subitem:bg-primary group-hover/subitem:scale-150 transition-all"></div>
                                <span className="text-[0.82rem] font-bold text-gray-700 leading-snug group-hover/subitem:text-primary transition-colors">
                                  {t(child.name)}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (menu.isButton) {
                    return (
                      <Link 
                        key={menu.id}
                        href={menu.link} 
                        className="ml-4 px-6 py-2.5 bg-primary text-white text-[0.82rem] font-black rounded-full hover:bg-primary-dark transition-all uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 font-montserrat"
                      >
                        {t(menu.name)}
                      </Link>
                    );
                  }

                  return (
                    <Link 
                      key={menu.id}
                      href={menu.link} 
                      className="px-3 py-2 text-[0.82rem] font-black text-biotechvet-dark hover:text-primary uppercase tracking-tight font-montserrat"
                    >
                      {t(menu.name)}
                    </Link>
                  );
                })}

              {/* Search Box */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    router.push(`/san-pham?search=${encodeURIComponent(searchQuery)}`);
                  }
                }}
                className="relative flex items-center ml-4 group"
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-10 py-1.5 w-[160px] lg:w-[200px] text-[0.82rem] border border-primary rounded-full focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-400 font-montserrat"
                />
                <button type="submit" className="absolute right-3 text-primary hover:scale-110 transition-transform">
                  <Search size={18} />
                </button>
              </form>
            </nav>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-primary hover:bg-primary-light rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-[70px] bg-white z-50 overflow-y-auto border-t border-gray-100 pb-20"
          >
             <div className="p-6 flex flex-col gap-1">
                {menus
                  .filter(m => m.status && m.parent === null)
                  .sort((a, b) => a.order - b.order)
                  .map((menu) => {
                    const children = menus
                      .filter(m => m.parent === menu.id && m.status)
                      .sort((a, b) => a.order - b.order);

                    if (menu.isButton) {
                      return (
                        <Link 
                          key={menu.id}
                          href={menu.link} 
                          className="mt-8 py-4 bg-primary text-white text-center font-black rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 font-montserrat" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {t(menu.name)}
                        </Link>
                      );
                    }
                    return (
                      <MobileNavItem 
                        key={menu.id}
                        href={menu.link} 
                        label={t(menu.name)} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        childrenItems={children}
                        t={t}
                      />
                    );
                  })}
             </div>
          </motion.div>
        )}
        </AnimatePresence>
      </header>
    </div>
  );
}

function DropdownItem({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-4 px-4 py-3 hover:bg-biotechvet-alt rounded-xl transition-all group/item">
       <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white group-hover/item:scale-110 transition-all shrink-0">
          {icon}
       </div>
       <span className="text-[0.82rem] font-bold text-gray-700 leading-snug group-hover/item:text-primary transition-colors">{label}</span>
    </Link>
  );
}

function MobileNavItem({ href, label, onClick, childrenItems, t }: { href: string, label: string, onClick: () => void, childrenItems?: NavMenu[], t: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = childrenItems && childrenItems.length > 0;

  if (!hasChildren) {
    return (
      <Link href={href} className="py-4 text-base font-black text-biotechvet-dark border-b border-gray-50 flex justify-between items-center uppercase tracking-tight font-montserrat" onClick={onClick}>
        {label} <ChevronDown size={16} className="-rotate-90 text-gray-300" />
      </Link>
    );
  }

  return (
    <div className="border-b border-gray-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 text-base font-black text-biotechvet-dark flex justify-between items-center uppercase tracking-tight font-montserrat"
      >
        {label} <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : '-rotate-90 text-gray-300'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-gray-50/50 rounded-xl mb-4"
          >
            <div className="flex flex-col py-2">
              {childrenItems.map((child) => (
                <Link 
                  key={child.id} 
                  href={child.link}
                  className="px-6 py-3 text-sm font-bold text-gray-600 hover:text-primary transition-colors flex items-center gap-3"
                  onClick={onClick}
                >
                  <div className="w-1 h-1 rounded-full bg-primary/30"></div>
                  {t(child.name)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
