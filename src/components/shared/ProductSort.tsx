"use client";

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function ProductSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const currentSort = searchParams.get('sort') || 'newest';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== 'newest') {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    
    // Maintain current page or reset to 1? 
    // Usually sorting items should reset to page 1 for a consistent view.
    params.delete('page');
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Sắp xếp:</span>
      <select 
        value={currentSort}
        onChange={handleSortChange}
        className="border border-gray-100 bg-gray-50 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:border-primary transition-all cursor-pointer"
      >
        <option value="newest">Sản phẩm mới nhất</option>
        <option value="name-asc">Tên A-Z</option>
        <option value="name-desc">Tên Z-A</option>
      </select>
    </div>
  );
}
