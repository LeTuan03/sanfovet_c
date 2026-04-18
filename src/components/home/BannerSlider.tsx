"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, ArrowRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/data/banners');
        const data = await res.json();
        if (Array.isArray(data)) {
          setBanners(data.filter((b: any) => b.status));
        }
      } catch (error) {
        console.error('Failed to fetch banners', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();

    const timer = setInterval(() => {
      setBanners((prev) => {
        if (prev.length > 0) {
          setCurrentSlide((curr) => (curr + 1) % prev.length);
        }
        return prev;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (loading || banners.length === 0) {
    return <section className="w-full h-[360px] md:h-[580px] lg:h-[780px] bg-sanfovet-dark flex items-center justify-center text-white font-bold uppercase tracking-widest italic opacity-50 animate-pulse">SANFOVET Loading...</section>;
  }

  return (
    <section className="relative w-full h-[360px] md:h-[580px] lg:h-[780px] bg-sanfovet-dark overflow-hidden">
      <AnimatePresence initial={false}>
        {banners.map((slide, index) => {
          if (index !== currentSlide) return null;
          return (
            <motion.div 
              key={slide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-10"
            >
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sanfovet-dark/75 to-sanfovet-dark/30 flex items-center">
                <div className="container mx-auto px-4">
                   <div className="max-w-2xl text-white">
                      <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-2xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight whitespace-pre-line drop-shadow-lg"
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-sm md:text-lg lg:text-xl mb-6 md:mb-10 opacity-90 leading-relaxed drop-shadow-md"
                      >
                        {slide.desc || "Công nghệ USA – Chất lượng quốc tế – Giải pháp toàn diện cho chăn nuôi Việt Nam"}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                      >
                        <Link 
                          href={slide.link || "/san-pham"}
                          className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-bold transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-sm md:text-base"
                        >
                          <Eye size={16} /> Xem ngay
                        </Link>
                      </motion.div>
                   </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {banners.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/40'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
