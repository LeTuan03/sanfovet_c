"use client";

import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  mainImage: string;
  images?: string[];
  alt: string;
}

export default function ProductGallery({ mainImage, images = [], alt }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(mainImage);
  const [isOpen, setIsOpen] = useState(false);

  const allImages = [mainImage, ...images.filter(Boolean)];

  return (
    <>
      {/* Main Image Display */}
      <div className="space-y-4">
        <div
          className="relative group cursor-pointer rounded-[24px] overflow-hidden"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={activeImage}
            alt={alt}
            className="max-h-[50vh] w-auto object-contain transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[24px]">
            <div className="bg-primary text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
              <ZoomIn size={24} />
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        {allImages.length > 1 && (
          <div className="flex gap-2 flex-wrap justify-center">
            {allImages.map((img, index) => (
              <button
                key={`thumb-${index}`}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`
                  w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 p-1 
                  transition-all duration-300 cursor-pointer
                  ${activeImage === img
                    ? 'border-primary shadow-lg shadow-primary/20 scale-105 ring-2 ring-primary/20'
                    : 'border-gray-200 hover:border-primary/50 hover:shadow-md opacity-70 hover:opacity-100'
                  }
                `}
              >
                <img
                  src={img}
                  alt={`${alt} - ảnh ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 animate-fade-in">
          <div
            className="absolute inset-0 bg-biotechvet-dark/90 backdrop-blur-sm cursor-zoom-out"
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
                src={activeImage}
                alt={alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {/* Lightbox Thumbnails */}
            {allImages.length > 1 && (
              <div className="w-full px-8 pb-4 flex gap-2 justify-center flex-wrap">
                {allImages.map((img, index) => (
                  <button
                    key={`lb-thumb-${index}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage(img);
                    }}
                    className={`
                      w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 p-0.5
                      transition-all duration-300 cursor-pointer
                      ${activeImage === img
                        ? 'border-primary shadow-md scale-105'
                        : 'border-gray-200 hover:border-primary/50 opacity-60 hover:opacity-100'
                      }
                    `}
                  >
                    <img
                      src={img}
                      alt={`${alt} - ảnh ${index + 1}`}
                      className="w-full h-full object-contain rounded"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="bg-biotechvet-alt w-full p-4 text-center font-bold text-biotechvet-dark border-t border-gray-100">
              {alt}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
