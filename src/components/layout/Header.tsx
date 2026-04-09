"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, ChevronDown, Menu, X } from 'lucide-react';
import { FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-sanfovet-dark to-[#0d2b10] text-white text-[0.82rem] py-1.5 hidden md:block border-white/10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 opacity-90">
              <Phone size={14} className="shrink-0" /> 024 66861629 | 097 499 9204
            </span>
            <span className="flex items-center gap-1.5 opacity-90">
              <Mail size={14} className="shrink-0" /> pkd.sanfovet@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 mr-2 opacity-70">
              <Link href="https://facebook.com/sanfovet" target="_blank" className="hover:text-amber-500 hover:opacity-100 transition-all font-bold text-white">
                <FacebookOutlined />
              </Link>
              <Link href="https://youtube.com/sanfovet" target="_blank" className="hover:text-amber-500 hover:opacity-100 transition-all font-bold text-white">
                <YoutubeOutlined />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-2.5 py-1 bg-primary rounded text-[0.78rem] font-medium border border-primary transition-all">
                <img src="/images/VN.png" alt="VN" className="w-[18px] rounded-sm" /> VI
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded text-[0.78rem] font-medium border border-white/20 transition-all">
                <img src="/images/UK.png" alt="EN" className="w-[18px] rounded-sm" /> EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <img src="/images/logo.png" alt="SANFOVET" className="h-10 md:h-[52px] w-auto transition-transform hover:scale-105" />
            <div className="hidden lg:block">
              <div className="text-primary font-black text-xl leading-none tracking-tighter italic uppercase">SANFOVET</div>
              <div className="text-[0.62rem] text-sanfovet-dark font-black tracking-widest uppercase">Công nghệ USA - Chất lượng vượt trội</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight">Trang chủ</Link>
            <Link href="/gioi-thieu" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight">Giới thiệu</Link>
            
            <div className="relative group p-0">
              <Link href="/san-pham" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight flex items-center gap-1">
                Sản phẩm <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 border border-gray-100 z-50">
                <Link href="/san-pham" className="block px-6 py-2.5 text-xs font-bold text-gray-700 hover:bg-sanfovet-alt hover:text-primary transition-colors uppercase tracking-wider">Tất cả sản phẩm</Link>
                <div className="h-px bg-gray-50 my-1 mx-6"></div>
                <Link href="/san-pham?category=thuoc-tiem" className="block px-6 py-2.5 text-xs font-bold text-gray-700 hover:bg-sanfovet-alt hover:text-primary transition-colors uppercase tracking-wider">Thuốc tiêm</Link>
                <Link href="/san-pham?category=thuoc-bot" className="block px-6 py-2.5 text-xs font-bold text-gray-700 hover:bg-sanfovet-alt hover:text-primary transition-colors uppercase tracking-wider">Thuốc bột trộn</Link>
                <Link href="/san-pham?category=dinh-duong" className="block px-6 py-2.5 text-xs font-bold text-gray-700 hover:bg-sanfovet-alt hover:text-primary transition-colors uppercase tracking-wider">Dinh dưỡng bổ trợ</Link>
              </div>
            </div>

            <Link href="/cam-nang-chan-nuoi" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight">Cẩm nang</Link>
            <Link href="/benh-va-dieu-tri-benh" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight">Bệnh & Điều trị</Link>
            <Link href="/tin-tuc" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight">Tin tức</Link>
            <Link href="/catalogue" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight">Catalogue</Link>
            <Link href="/tuyen-dung" className="px-3 py-2 text-[0.82rem] font-black text-sanfovet-dark hover:text-primary uppercase tracking-tight">Tuyển dụng</Link>
            <Link href="/lien-he" className="ml-4 px-6 py-2.5 bg-primary text-white text-[0.82rem] font-black rounded-full hover:bg-primary-dark transition-all uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95">Liên hệ</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] bg-white z-50 overflow-y-auto animate-fade-in border-t border-gray-100">
           <div className="p-6 flex flex-col gap-1">
              <Link href="/" className="py-4 text-base font-black text-sanfovet-dark border-b border-gray-50 flex justify-between items-center uppercase tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>Trang chủ <ChevronDown size={16} className="-rotate-90" /></Link>
              <Link href="/gioi-thieu" className="py-4 text-base font-black text-sanfovet-dark border-b border-gray-50 flex justify-between items-center uppercase tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>Giới thiệu <ChevronDown size={16} className="-rotate-90" /></Link>
              <Link href="/san-pham" className="py-4 text-base font-black text-sanfovet-dark border-b border-gray-50 flex justify-between items-center uppercase tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>Sản phẩm <ChevronDown size={16} className="-rotate-90" /></Link>
              <Link href="/cam-nang-chan-nuoi" className="py-4 text-base font-black text-sanfovet-dark border-b border-gray-50 flex justify-between items-center uppercase tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>Cẩm nang <ChevronDown size={16} className="-rotate-90" /></Link>
              <Link href="/benh-va-dieu-tri-benh" className="py-4 text-base font-black text-sanfovet-dark border-b border-gray-50 flex justify-between items-center uppercase tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>Bệnh & Điều trị <ChevronDown size={16} className="-rotate-90" /></Link>
              <Link href="/tin-tuc" className="py-4 text-base font-black text-sanfovet-dark border-b border-gray-50 flex justify-between items-center uppercase tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>Tin tức <ChevronDown size={16} className="-rotate-90" /></Link>
              <Link href="/tuyen-dung" className="py-4 text-base font-black text-sanfovet-dark border-b border-gray-50 flex justify-between items-center uppercase tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>Tuyển dụng <ChevronDown size={16} className="-rotate-90" /></Link>
              <Link href="/lien-he" className="mt-8 py-4 bg-primary text-white text-center font-black rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95" onClick={() => setIsMobileMenuOpen(false)}>Liên hệ ngay</Link>
           </div>
        </div>
      )}
    </header>
  );
}
