"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeGalleryProps {
  readonly images: Array<{ id: string | number; url: string; title?: string; status?: string }>;
  readonly videos: Array<{ id: string | number; url: string; title?: string; thumbnail?: string; status?: string }>;
}

export default function HomeGallery({ images, videos }: HomeGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const featuredVideo = videos?.[0];

  const getAspectClass = (index: number) => {
    if (index % 3 === 0) return 'aspect-[3/4]';
    if (index % 3 === 1) return 'aspect-square';
    return 'aspect-[4/3]';
  };

  const handleKeyPress = (event: React.KeyboardEvent, item: any) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedItem({ ...item, type: item.url?.includes('.mp4') ? 'video' : 'image' });
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-biotechvet-dark uppercase italic tracking-wider relative inline-block">
            Video & Hình Ảnh <span className="absolute -bottom-2 left-0 w-1/2 h-1.5 bg-secondary rounded-full"></span>
          </h2>
          <p className="text-gray-500 font-medium text-lg italic">Khám phá quy mô nhà máy và các hoạt động nổi bật của BIOTECH-VET</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Video Feature */}
          <div className="flex flex-col gap-6">
             <button
               type="button"
               className="group relative aspect-video rounded-[40px] overflow-hidden shadow-2xl border-8 border-white cursor-pointer"
               onClick={() => featuredVideo && setSelectedItem({ ...featuredVideo, type: 'video' })}
               disabled={!featuredVideo}
             >
                <Image
                  src={featuredVideo?.thumbnail || '/images/about.webp'}
                  alt="Video cover"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-biotechvet-dark/40 group-hover:bg-biotechvet-dark/20 transition-all flex items-center justify-center">
                   <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                      <PlayCircle size={64} fill="currentColor" className="text-white" />
                   </div>
                </div>
                <div className="absolute bottom-8 left-8">
                   <div className="bg-primary px-4 py-1.5 rounded-full text-[10px] text-white font-black uppercase tracking-[3px] mb-3 w-fit">Featured Video</div>
                   <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">{featuredVideo?.title || 'Phim giới thiệu BIOTECH-VET'}</h3>
                </div>
             </button>
             <div className="bg-biotechvet-alt p-8 rounded-[32px] border border-gray-100 flex items-center justify-between group">
                <div>
                   <h4 className="font-black text-biotechvet-dark text-lg uppercase mb-1">Kênh YouTube chính thức</h4>
                   <p className="text-gray-400 text-sm font-medium italic">Cập nhật kỹ thuật chăn nuôi hàng tuần</p>
                </div>
                <a href="https://youtube.com/biotechvet" target="_blank" className="bg-red-600 text-white p-4 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                   <PlayCircle size={24} />
                </a>
             </div>
          </div>

          {/* Masonry-style Grid */}
          <div className="columns-2 gap-6 space-y-6">
            {images.map((img, i) => (
              <div
                key={img.id}
                className={`relative group rounded-3xl overflow-hidden shadow-md cursor-pointer break-inside-avoid ${getAspectClass(i)}`}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedItem({ ...img, type: 'image' })}
                onKeyDown={(event) => handleKeyPress(event, img)}
              >
                <Image
                  src={img.url}
                  alt={img.title || ''}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-biotechvet-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                   <div className="bg-secondary/90 text-white p-2.5 rounded-xl w-fit mb-3 transform -translate-y-4 group-hover:translate-y-0 transition-transform">
                      <ZoomIn size={18} />
                   </div>
                   <p className="text-white font-bold text-sm leading-tight line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform delay-75">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox / Video Player */}
      <AnimatePresence>
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12"
        >
          <button
            type="button"
            className="absolute inset-0 bg-biotechvet-dark/95 cursor-pointer"
            onClick={() => setSelectedItem(null)}
            aria-label="Close media viewer"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 w-12 h-12 rounded-full flex items-center justify-center transition-all z-20 shadow-sm"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row h-full">
               <div className="flex-1 bg-black flex items-center justify-center min-h-[300px] md:min-h-[500px]">
                  {selectedItem.type === 'video' ? (
                    <video
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                    >
                      <source src={selectedItem.url} type="video/mp4" />
                      <track kind="captions" srcLang="vi" src="/empty-captions.vtt" label="Vietnamese captions" default />
                      Trình duyệt của bạn không hỗ trợ video.
                    </video>
                  ) : (
                    <img
                      src={selectedItem.url}
                      alt={selectedItem.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
               </div>
               <div className="w-full md:w-80 bg-white p-10 flex flex-col justify-center">
                  <div className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest leading-none w-fit mb-4">
                     {selectedItem.type === 'video' ? 'Video giới thiệu' : 'Hình ảnh thư viện'}
                  </div>
                  <h3 className="text-2xl font-black text-biotechvet-dark leading-tight uppercase italic mb-6">
                    {selectedItem.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-medium italic mb-10">
                    Nội dung trực thuộc thư viện truyền thông chính thức của BIOTECH-VET.
                  </p>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="mt-auto py-4 border-2 border-gray-100 rounded-2xl text-gray-400 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all"
                  >
                    Đóng cửa sổ
                  </button>
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}
