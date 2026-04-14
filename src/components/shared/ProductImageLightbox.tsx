"use client";

import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ProductImageLightboxProps {
  src: string;
  alt: string;
}

export default function ProductImageLightbox({ src, alt }: ProductImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="relative group cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <img 
          src={src} 
          alt={alt} 
          className="max-h-[400px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[24px]">
          <div className="bg-primary text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
            <ZoomIn size={24} />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 animate-fade-in">
          <div 
            className="absolute inset-0 bg-sanfovet-dark/90 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="relative z-10 w-full max-w-5xl max-h-full flex flex-col items-center justify-center bg-white rounded-3xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors z-20"
              title="Đóng"
            >
              <X size={20} />
            </button>
            <div className="p-8 w-full h-[70vh] flex items-center justify-center">
              <img 
                src={src} 
                alt={alt} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="bg-sanfovet-alt w-full p-4 text-center font-bold text-sanfovet-dark border-t border-gray-100">
              {alt}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
