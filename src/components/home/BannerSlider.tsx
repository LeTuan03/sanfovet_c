"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BannerSliderProps {
  readonly banners: Array<{ id: string | number; image: string; title?: string; order?: number }>;
}

export default function BannerSlider({ banners }: BannerSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  if (!banners || banners.length === 0) {
    return (
      <section className="w-full min-h-[300px] md:min-h-[400px] bg-biotechvet-dark flex items-center justify-center text-white font-bold uppercase tracking-widest italic opacity-50 animate-pulse">
        BIOTECH-VET Loading...
      </section>
    );
  }

  return (
    <section className="relative w-full bg-biotechvet-dark overflow-hidden">
      <div className="grid grid-cols-1 w-full aspect-[16/9]">
        <AnimatePresence initial={false}>
          {banners.map((slide, index) => {
            if (index !== currentSlide) return null;

            return (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="col-start-1 row-start-1 relative z-10 w-full h-full"
              >
                <img
                  src={slide.image}
                  alt={slide.title || 'Banner'}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                  className="w-full h-full object-cover block"
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
        {banners.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/40'
            }`}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}