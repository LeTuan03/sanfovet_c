"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  queryParam?: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl, queryParam = 'page' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    const separator = baseUrl.includes('?') ? '&' : '?';
    return page === 1 ? baseUrl : `${baseUrl}${separator}${queryParam}=${page}`;
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (currentPage < totalPages - 2) pages.push('...');
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Phân trang">
      {/* First page */}
      {currentPage > 2 && (
        <Link
          href={getPageUrl(1)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all border border-gray-100 shadow-sm"
          title="Trang đầu"
        >
          <ChevronsLeft size={16} />
        </Link>
      )}

      {/* Previous */}
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all border border-gray-100 shadow-sm"
          title="Trang trước"
        >
          <ChevronLeft size={16} />
        </Link>
      )}

      {/* Page numbers */}
      {pages.map((page, i) => {
        if (page === '...') {
          return (
            <span key={`dots-${i}`} className="w-10 h-10 flex items-center justify-center text-gray-300 font-bold">
              ···
            </span>
          );
        }
        
        const pageNum = page as number;
        const isActive = pageNum === currentPage;
        
        return (
          <Link
            key={pageNum}
            href={getPageUrl(pageNum)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
              isActive
                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
                : 'text-gray-500 hover:bg-primary-light hover:text-primary border border-gray-100 shadow-sm'
            }`}
          >
            {pageNum}
          </Link>
        );
      })}

      {/* Next */}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all border border-gray-100 shadow-sm"
          title="Trang sau"
        >
          <ChevronRight size={16} />
        </Link>
      )}

      {/* Last page */}
      {currentPage < totalPages - 1 && (
        <Link
          href={getPageUrl(totalPages)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all border border-gray-100 shadow-sm"
          title="Trang cuối"
        >
          <ChevronsRight size={16} />
        </Link>
      )}
    </nav>
  );
}
