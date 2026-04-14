"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, ArrowRight, Download } from 'lucide-react';

const bannerData = [
  {
    image: '/images/banner1.png',
    title: 'SANFOVET\nThuốc Thú Y Trang Trại',
    desc: 'Công nghệ USA – Chất lượng quốc tế – Giải pháp toàn diện cho chăn nuôi Việt Nam',
    btnText: 'Xem sản phẩm',
    btnLink: '/san-pham',
    btnIcon: <Eye size={16} />
  },
  {
    image: '/images/banner2.png',
    title: 'Đội Ngũ Chuyên Gia\nHàng Đầu',
    desc: 'Hơn 15 năm kinh nghiệm trong lĩnh vực thuốc thú y, đồng hành cùng người chăn nuôi Việt Nam',
    btnText: 'Tìm hiểu thêm',
    btnLink: '/gioi-thieu',
    btnIcon: <ArrowRight size={16} />
  },
  {
    image: '/images/banner3.png',
    title: 'Nhà Máy GMP\nCông Nghệ Hiện Đại',
    desc: 'Nhà máy đạt tiêu chuẩn GMP-WHO, trang thiết bị nhập khẩu từ Mỹ và Châu Âu',
    btnText: 'Xem Catalogue',
    btnLink: '/catalogue',
    btnIcon: <Download size={16} />
  }
];

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[360px] md:h-[580px] lg:h-[780px] bg-sanfovet-dark overflow-hidden">
      {bannerData.map((slide, index) => (
        <div 
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sanfovet-dark/75 to-sanfovet-dark/30 flex items-center">
            <div className="container mx-auto px-4">
               <div className="max-w-2xl text-white">
                  <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight whitespace-pre-line drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-lg lg:text-xl mb-6 md:mb-10 opacity-90 leading-relaxed drop-shadow-md">
                    {slide.desc}
                  </p>
                  <Link 
                    href={slide.btnLink}
                    className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-bold transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-sm md:text-base"
                  >
                    {slide.btnIcon} {slide.btnText}
                  </Link>
               </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {bannerData.map((slide, index) => (
          <button 
            key={slide.title}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/40'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
