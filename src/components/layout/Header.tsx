"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Phone, Mail, ChevronDown, ChevronRight, Menu, X, 
  Syringe, FlaskConical, TestTube, Pill, Droplets, Bug, ShieldCheck, Leaf, FlaskRound, Beaker 
} from 'lucide-react';
import { FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';
import { useLanguage } from '@/lib/LanguageContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full z-50 relative">
      {/* Top Bar - Disappears on scroll if we want, but let's keep it above Main Bar */}
      <div className="bg-gradient-to-r from-sanfovet-dark to-[#0d2b10] text-white text-[0.82rem] py-1.5 hidden md:block border-b border-white/5">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 opacity-90 font-medium">
              <Phone size={14} className="shrink-0 text-amber-500" /> 024 66861629 | 097 499 9204
            </span>
            <span className="flex items-center gap-1.5 opacity-90 font-medium border-l border-white/20 pl-4">
              <Mail size={14} className="shrink-0 text-amber-500" /> pkd.sanfovet@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 mr-2">
              <Link href="https://facebook.com/sanfovet" target="_blank" className="text-white/70 hover:text-amber-500 transition-all font-bold">
                <FacebookOutlined />
              </Link>
              <Link href="https://youtube.com/sanfovet" target="_blank" className="text-white/70 hover:text-amber-500 transition-all font-bold">
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
              <img src="/images/logo.png" alt="SANFOVET" className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12 md:h-[52px]'}`} />
              <div className="hidden lg:block">
                <div className="text-primary font-black text-xl leading-none tracking-tighter italic uppercase font-montserrat">SANFOVET</div>
                <div className="text-[0.6rem] text-sanfovet-dark font-black tracking-widest uppercase mt-0.5">{t('intro_slogan')}</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight font-montserrat">{t('home')}</Link>
              <Link href="/gioi-thieu" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight font-montserrat">{t('about')}</Link>
              
              <div className="relative group p-0">
                <Link href="/san-pham" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight flex items-center gap-1 group-hover:bg-sanfovet-alt rounded-lg transition-colors font-montserrat">
                  {t('products')} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
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
                      <DropdownItem href="/san-pham?category=thuoc-bo-tro-tiem-dang-dung-dich-hon-dich" icon={<Syringe size={20} />} label="Thuốc bổ trợ tiêm dạng dung dịch, hỗn dịch" />
                      <DropdownItem href="/san-pham?category=thuoc-khang-sinh-tiem-dang-dung-dich-hon-dich" icon={<FlaskConical size={20} />} label="Thuốc kháng sinh tiêm dạng dung dịch, hỗn dịch" />
                      <DropdownItem href="/san-pham?category=thuoc-khang-sinh-dang-dung-dich-uong-dang-xit" icon={<FlaskRound size={20} />} label="Thuốc kháng sinh dạng dung dịch uống, dạng xịt" />
                      <DropdownItem href="/san-pham?category=thuoc-khang-sinh-dang-premix-sieu-bam-dinh" icon={<TestTube size={20} />} label="Thuốc kháng sinh dạng Premix siêu bám dính" />
                      <DropdownItem href="/san-pham?category=thuoc-khang-sinh-dang-bot-dang-hat-hoa-tan" icon={<Beaker size={20} />} label="Thuốc kháng sinh dạng bột, dạng hạt hòa tan" />
                      <DropdownItem href="/san-pham?category=thuoc-bo-tro-dang-com-dang-bot-hoa-tan" icon={<Pill size={20} />} label="Thuốc bổ trợ dạng cốm, dạng bột hòa tan" />
                      <DropdownItem href="/san-pham?category=thuoc-bo-tro-dang-dung-dich" icon={<Droplets size={20} />} label="Thuốc bổ trợ dạng dung dịch" />
                      <DropdownItem href="/san-pham?category=thuoc-tri-cau-trung-ki-sinh-trung-dang-bot-dang-dung-dich" icon={<Bug size={20} />} label="Thuốc trị cầu trùng, kí sinh trùng" />
                      <DropdownItem href="/san-pham?category=thuoc-sat-trung-diet-con-trung" icon={<ShieldCheck size={20} />} label="Thuốc sát trùng, diệt côn trùng" />
                      <DropdownItem href="/san-pham?category=thuoc-tri-nam-tri-giun-san" icon={<Leaf size={20} />} label="Thuốc trị nấm, trị giun sán" />
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/cam-nang-chan-nuoi" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight font-montserrat">{t('knowledge')}</Link>
              <Link href="/tin-tuc" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight font-montserrat">{t('news')}</Link>
              <Link href="/catalogue" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight font-montserrat">{t('catalogue')}</Link>
              <Link href="/tuyen-dung" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight font-montserrat">{t('recruitment')}</Link>
              <Link href="/lien-he" className="ml-4 px-6 py-2.5 bg-primary text-white text-[0.82rem] font-black rounded-full hover:bg-primary-dark transition-all uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 font-montserrat">{t('contact')}</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-primary hover:bg-primary-light rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[70px] bg-white z-50 overflow-y-auto animate-fade-in border-t border-gray-100 pb-20">
             <div className="p-6 flex flex-col gap-1">
                <MobileNavItem href="/" label={t('home')} onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem href="/gioi-thieu" label={t('about')} onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem href="/san-pham" label={t('products')} onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem href="/cam-nang-chan-nuoi" label={t('knowledge')} onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem href="/benh-va-dieu-tri-benh" label="Bệnh & Điều trị" onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem href="/tin-tuc" label={t('news')} onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem href="/tuyen-dung" label={t('recruitment')} onClick={() => setIsMobileMenuOpen(false)} />
                <Link href="/lien-he" className="mt-8 py-4 bg-primary text-white text-center font-black rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 font-montserrat" onClick={() => setIsMobileMenuOpen(false)}>{t('contact')}</Link>
             </div>
          </div>
        )}
      </header>
    </div>
  );
}

function DropdownItem({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-4 px-4 py-3 hover:bg-sanfovet-alt rounded-xl transition-all group/item">
       <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white group-hover/item:scale-110 transition-all shrink-0">
          {icon}
       </div>
       <span className="text-[0.82rem] font-bold text-gray-700 leading-snug group-hover/item:text-primary transition-colors">{label}</span>
    </Link>
  );
}

function MobileNavItem({ href, label, onClick }: { href: string, label: string, onClick: () => void }) {
  return (
    <Link href={href} className="py-4 text-base font-black text-sanfovet-dark border-b border-gray-50 flex justify-between items-center uppercase tracking-tight font-montserrat" onClick={onClick}>
      {label} <ChevronDown size={16} className="-rotate-90 text-gray-300" />
    </Link>
  );
}
