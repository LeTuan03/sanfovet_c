"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
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
          setBanners(data.filter((b: any) => b.status).sort((a: any, b: any) => a.order - b.order));
        }
      } catch (error) {
        console.error('Failed to fetch banners', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);
  console.log(banners)
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  if (loading || banners.length === 0) {
    return (
      <section className="w-full min-h-[300px] md:min-h-[400px] bg-biotechvet-dark flex items-center justify-center text-white font-bold uppercase tracking-widest italic opacity-50 animate-pulse">
        BIOTECH-VET Loading...
      </section>
    );
  }

  return (
    <section className="relative w-full bg-biotechvet-dark overflow-hidden">
      <div className="grid grid-cols-1">
        <AnimatePresence initial={false}>
          {banners.map((slide, index) => {
            if (index !== currentSlide) return null;

            return (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="col-start-1 row-start-1 relative z-10 w-full"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-auto block"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 🔥 Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/10 hover:bg-black/50 backdrop-blur-sm transition"
      >
        <ChevronLeft className="text-white" />
      </button>

      {/* 🔥 Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/10 hover:bg-black/50 backdrop-blur-sm transition"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}