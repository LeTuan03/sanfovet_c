import React from 'react';
import Link from 'next/link';
import { Eye, Filter } from 'lucide-react';
import { products, categories } from '@/lib/data';

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const currentCategory = params.category;
  
  const filteredProducts = currentCategory 
    ? products.filter(p => {
        const cat = categories.find(c => c.id === p.categoryId);
        return cat?.slug === currentCategory;
      })
    : products;

  const activeCategory = categories.find(c => c.slug === currentCategory);
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-black mb-4 uppercase tracking-wider italic">
            {activeCategory ? activeCategory.name : 'Sản Phẩm Thú Y'}
          </h1>
          <p className="text-primary-light font-medium">
            {activeCategory ? `Khám phá các dòng sản phẩm thuộc danh mục ${activeCategory.name}` : 'Danh mục đầy đủ các sản phẩm thuốc thú y chất lượng cao, công nghệ USA'}
          </p>
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
                  <Link href="/san-pham" className={`block py-3 px-4 rounded-xl transition-all font-bold ${!currentCategory ? 'bg-primary text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Tất cả sản phẩm
                  </Link>
              </li>
                {categories.map((c: any) => (
                  <li key={c.id}>
                    <Link 
                      href={`/san-pham?category=${c.slug}`} 
                      className={`block py-3 px-4 rounded-xl transition-all font-bold text-sm ${currentCategory === c.slug ? 'bg-primary text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
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
            <div className="text-gray-500 font-medium">
              Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm {activeCategory && `trong ${activeCategory.name}`}
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-500">Sắp xếp:</span>
              <select className="border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-primary-dark">
                <option>Sản phẩm mới nhất</option>
                <option>Tên A-Z</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p: any) => (
              <div key={p.id} className="bg-white rounded-[24px] shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 group flex flex-col h-full hover:-translate-y-1">
                <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center relative p-8 group-hover:bg-primary-light/30 transition-colors duration-500">
                   <img src={p.image} alt={p.name} className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-[0.65rem] font-black text-primary mb-3 uppercase tracking-widest bg-primary-light px-2.5 py-1 rounded-full w-fit">
                    {categories.find((c: any) => c.id === p.categoryId)?.name?.split(',')[0] || 'Danh mục'}
                  </div>
                  <h3 className="font-black text-sanfovet-dark mb-2 group-hover:text-primary transition-colors text-xl leading-tight h-14 overflow-hidden">{p.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-8 flex-1 font-medium">{p.tagline}</p>
                  <Link href={`/san-pham/${p.slug}`} className="mt-auto inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-black hover:shadow-xl px-6 py-4 rounded-full transition-all justify-center w-full uppercase tracking-widest text-xs active:scale-95">
                    <Eye size={18} /> Chi tiết
                  </Link>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                <Filter size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-widest">Không có sản phẩm trong danh mục này</p>
              </div>
            )}
          </div>

          <div className="mt-12 flex justify-center">
            {/* Simple Pagination Mock */}
            
          </div>
        </main>
      </div>
    </div>
  );
}
