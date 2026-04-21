"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, X } from 'lucide-react';

export default function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const [query, setQuery] = useState(searchParams.get('search') || '');

  // Update local state when URL params change (e.g. browser back/forward)
  useEffect(() => {
    setQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams(query);
  };

  const updateSearchParams = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    // Reset to page 1 when search changes
    params.delete('page');
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery('');
    updateSearchParams('');
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-primary transition-all font-bold text-sm shadow-sm focus:shadow-xl focus:shadow-primary/5"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
          <Search size={20} />
        </div>
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-lg p-1.5 transition-colors"
            title="Xóa tìm kiếm"
          >
            <X size={14} />
          </button>
        )}
      </form>
    </div>
  );
}
