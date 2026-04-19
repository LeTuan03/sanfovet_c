'use client';

import React, { useState, useRef, useEffect, forwardRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, X, Loader2, BookOpen } from 'lucide-react';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PageLayer = forwardRef(({ pageNumber, width, height }: any, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div
      ref={ref}
      style={{ width, height }}
      className="relative flex justify-center items-center overflow-hidden bg-white"
    >
      {/* Spine shadow (left edge) */}
      <div className="absolute inset-y-0 left-0 w-8 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.12), transparent)' }} />
      {/* Page curl shadow (right edge) */}
      <div className="absolute inset-y-0 right-0 w-6 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.06), transparent)' }} />

      <Page
        pageNumber={pageNumber}
        width={width}
        className="pdf-page-container"
        loading={
          <div className="flex items-center justify-center" style={{ width, height }}>
            <Loader2 className="animate-spin text-amber-400" size={28} />
          </div>
        }
      />

      {pageNumber && (
        <div className="absolute bottom-3 right-4 text-[10px] font-semibold tracking-widest text-gray-400 z-20 uppercase select-none">
          {pageNumber}
        </div>
      )}
    </div>
  );
});
PageLayer.displayName = 'PageLayer';

export default function PdfFlipbook({ url, onClose }: { url: string; onClose: () => void }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [containerWidth, setContainerWidth] = useState(1000);
  const [isLoaded, setIsLoaded] = useState(false);
  const bookRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setTimeout(() => setIsLoaded(true), 300);
  }

  const bookWidth = Math.min(containerWidth * 0.45, 460);
  const bookHeight = bookWidth * 1.414;

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) setContainerWidth(wrapperRef.current.clientWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data + 1);
  }, []);

  const progress = numPages ? ((currentPage - 1) / (numPages - 1)) * 100 : 0;

  return (
    <div
      className="w-full flex flex-col rounded-3xl overflow-hidden relative bg-sanfovet-dark"
      style={{
        boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Ambient top glow */}
      <div
        className="absolute inset-x-0 top-0 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(210,160,80,0.18) 0%, transparent 70%)' }}
      />

      {/* ── HEADER ── */}
      <div className="relative flex items-center justify-between px-8 py-5 border-b"
        style={{ borderColor: 'rgba(210,160,80,0.15)' }}>
        {/* Left: icon + title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(210,160,80,0.15)', border: '1px solid rgba(210,160,80,0.3)' }}>
            <BookOpen size={17} style={{ color: '#D2A050' }} />
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-medium mb-0.5"
              style={{ color: 'rgba(210,160,80,0.6)', fontFamily: "'Helvetica Neue', sans-serif" }}>
              Catalogue
            </p>
            <h3 className="text-white font-bold text-sm leading-none" style={{ fontFamily: "'Georgia', serif" }}>
              Sách Catalogue
            </h3>
          </div>
        </div>

        {/* Center: page indicator */}
        {numPages && (
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="text-sm tabular-nums" style={{ color: '#D2A050', fontFamily: "'Helvetica Neue', sans-serif" }}>
              {currentPage}
            </span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>／</span>
            <span className="text-sm tabular-nums" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Helvetica Neue', sans-serif" }}>
              {numPages}
            </span>
          </div>
        )}

        {/* Right: close */}
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.5)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(220,60,60,0.2)';
            (e.currentTarget as HTMLButtonElement).style.color = '#ff6b6b';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)';
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* ── BOOK STAGE ── */}
      <div ref={wrapperRef} className="relative flex justify-center items-center px-4 py-12">

        {/* Desk surface glow under the book */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: bookWidth * 2.4,
            height: 80,
            background: 'radial-gradient(ellipse, rgba(210,160,80,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Left arrow */}
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-11 h-11 rounded-full items-center justify-center transition-all duration-200 hover:-translate-x-0.5 hover:scale-105"
          style={{
            background: 'rgba(210,160,80,0.12)',
            border: '1px solid rgba(210,160,80,0.25)',
            color: '#D2A050',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipNext()}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-11 h-11 rounded-full items-center justify-center transition-all duration-200 hover:translate-x-0.5 hover:scale-105"
          style={{
            background: 'rgba(210,160,80,0.12)',
            border: '1px solid rgba(210,160,80,0.25)',
            color: '#D2A050',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <ChevronRight size={20} />
        </button>

        {/* Book container with drop shadow */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.7)) drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
          }}
        >
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div
                className="flex flex-col items-center justify-center"
                style={{ width: bookWidth * 2, height: bookHeight }}
              >
                <Loader2 size={36} className="animate-spin mb-4" style={{ color: '#D2A050' }} />
                <p className="text-sm tracking-widest uppercase font-medium"
                  style={{ color: 'rgba(210,160,80,0.6)', fontFamily: "'Helvetica Neue', sans-serif" }}>
                  Đang tải sách…
                </p>
              </div>
            }
            error={
              <p className="text-red-400 py-20 text-sm" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
                Không thể tải được PDF.
              </p>
            }
          >
            {numPages && (
              <HTMLFlipBook
                width={bookWidth}
                height={bookHeight}
                size="fixed"
                maxShadowOpacity={0.6}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={onFlip}
                ref={bookRef}
                className="flipbook-wrapper"
                style={{ margin: '0 auto' }}
              >
                <PageLayer pageNumber={1} width={bookWidth} height={bookHeight} />
                {Array.from(new Array(numPages - 1), (_, index) => (
                  <PageLayer
                    key={`page_${index + 2}`}
                    pageNumber={index + 2}
                    width={bookWidth}
                    height={bookHeight}
                  />
                ))}
              </HTMLFlipBook>
            )}
          </Document>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="px-8 pb-6 flex flex-col gap-3">
        {/* Progress bar */}
        <div className="w-full h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(to right, rgba(210,160,80,0.5), #D2A050)',
            }}
          />
        </div>

        {/* Hint */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs tracking-wider" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: "'Helvetica Neue', sans-serif" }}>
            Chạm góc trang hoặc kéo để lật
          </span>
        </div>
      </div>
    </div>
  );
}