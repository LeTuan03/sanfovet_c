'use client';

import React, { useState, useRef, useEffect, forwardRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, X, Loader2 } from 'lucide-react';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Create a wrapped Page component for react-pageflip to use as a ref
const PageLayer = forwardRef(({ pageNumber, scale, width, height }: any, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className="bg-white relative flex justify-center items-center h-full w-full border border-gray-200 overflow-hidden shadow-inner">
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_rgba(0,0,0,0.1)_-10px_0px_20px]" />
      <Page 
        pageNumber={pageNumber} 
        scale={scale || 1} 
        width={width}
        // renderTextLayer={false} 
        // renderAnnotationLayer={false} 
        className="pdf-page-container mx-auto"
        loading={<div className="flex items-center justify-center h-full text-gray-400"><Loader2 className="animate-spin" /></div>}
      />
      {pageNumber && (
         <div className="absolute bottom-4 right-4 text-xs font-medium text-gray-500 z-20">
           {pageNumber}
         </div>
      )}
    </div>
  );
});
PageLayer.displayName = 'PageLayer';

export default function PdfFlipbook({ url, onClose }: { url: string, onClose: () => void }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(1000);
  const bookRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // Calculate book dimensions
  const bookWidth = Math.min(containerWidth, 1000) / 2;
  const bookHeight = bookWidth * 1.414; // A4 aspect ratio approximation

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        setContainerWidth(wrapperRef.current.clientWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onFlip = useCallback((e: any) => {
    setPageNumber(e.data + 1); // e.data is the current 0-indexed page in flipbook
  }, []);

  return (
    <div className="w-full flex justify-center items-center flex-col bg-gray-50/50 rounded-[48px] p-6 border border-gray-100 relative shadow-inner animate-in fade-in duration-500">
      <div className="w-full flex justify-between items-center mb-6 px-4">
        <div className="flex items-center gap-4">
          <h3 className="font-black text-sanfovet-dark text-xl">Sách Catalogue</h3>
          {numPages && (
            <span className="bg-white px-4 py-1.5 rounded-full text-xs font-bold text-gray-500 border border-gray-200">
              Trang {pageNumber} / {numPages}
            </span>
          )}
        </div>
        <button 
          onClick={onClose}
          className="bg-white text-gray-500 hover:text-red-500 hover:bg-red-50 w-10 h-10 rounded-full flex items-center justify-center transition-all border border-gray-200 shadow-sm"
        >
          <X size={20} />
        </button>
      </div>

      <div ref={wrapperRef} className="w-full max-w-5xl flex justify-center items-center py-10 relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-4 z-10 hidden md:block">
           <button 
             onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
             className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-lg border border-gray-100 hover:bg-primary-50 transition-all hover:-translate-x-1"
             title="Trang trước"
           >
             <ChevronLeft size={24} />
           </button>
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 -mr-4 z-10 hidden md:block">
           <button 
             onClick={() => bookRef.current?.pageFlip()?.flipNext()}
             className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-lg border border-gray-100 hover:bg-primary-50 transition-all hover:translate-x-1"
             title="Trang sau"
           >
             <ChevronRight size={24} />
           </button>
        </div>

        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center py-20 text-primary">
              <Loader2 size={40} className="animate-spin mb-4" />
              <p className="font-bold">Đang tải sách...</p>
            </div>
          }
          error={<p className="text-red-500 py-20">Không thể tải được PDF.</p>}
        >
          {numPages && (
            <HTMLFlipBook
              width={bookWidth}
              height={bookHeight}
              size="stretch"
              minWidth={300}
              maxWidth={1000}
              minHeight={400}
              maxHeight={1400}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={onFlip}
              ref={bookRef}
              className="flipbook-wrapper shadow-2xl mx-auto"
              style={{ margin: "0 auto" }}
            >
              <PageLayer pageNumber={1} width={bookWidth} height={bookHeight} />
              
              {/* Generate inside pages. Starts at 1 to numPages. 
                  react-pageflip requires matching pairs to look like a book */}
              {Array.from(new Array(numPages - 1), (el, index) => (
                <PageLayer key={`page_${index + 2}`} pageNumber={index + 2} width={bookWidth} height={bookHeight} />
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>

      <div className="mt-8 flex justify-center items-center gap-4 text-sm text-gray-500">
         <p>💡 Chạm vào góc sách hoặc kéo thả để lật trang</p>
      </div>
    </div>
  );
}
