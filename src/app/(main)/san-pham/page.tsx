import React from 'react';
import Link from 'next/link';
import { Eye, Filter } from 'lucide-react';
import { products, categories } from '@/lib/data';

export default function ProductsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Sản Phẩm Thú Y</h1>
          <p className="text-primary-light">Danh mục đầy đủ các sản phẩm thuốc thú y chất lượng cao, công nghệ USA</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Filter size={18} /> Danh mục sản phẩm
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/san-pham" className="text-primary font-semibold block py-2 border-b">
                  Tất cả sản phẩm
                </Link>
              </li>
              {categories.map((c: any) => (
                <li key={c.id}>
                  <Link href={`/san-pham?category=${c.slug}`} className="text-gray-600 hover:text-primary block py-2 border-b transition">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="w-full md:w-3/4">
          <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-gray-600">
              Hiển thị <strong>{products.length}</strong> sản phẩm
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-500">Sắp xếp:</span>
              <select className="border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-primary-dark">
                <option>Sản phẩm mới nhất</option>
                <option>Tên A-Z</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p: any) => (
              <div key={p.id} className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition group flex flex-col h-full">
                <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center relative p-6 group-hover:bg-primary-light transition-colors duration-500">
                   <img src={p.image} alt={p.name} className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">
                    {categories.find((c: any) => c.id === p.categoryId)?.name?.split(' ').slice(0, 3).join(' ') || 'Danh mục'}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition text-lg">{p.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{p.tagline}</p>
                  <Link href={`/san-pham/${p.slug}`} className="mt-auto inline-flex items-center gap-1 bg-primary-light text-primary font-medium hover:bg-primary hover:text-white px-4 py-2 rounded transition justify-center w-full">
                    <Eye size={16} /> Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            {/* Simple Pagination Mock */}
            
          </div>
        </main>
      </div>
    </div>
  );
}
