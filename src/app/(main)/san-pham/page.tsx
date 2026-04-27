export const dynamic = 'force-dynamic';

import { readData } from '@/lib/storage';

import { Category, Product } from '@/types';
import Pagination from '@/components/shared/Pagination';
import FadeUp from '@/components/shared/FadeUp';
import ProductSearch from '@/components/shared/ProductSearch';
import { Metadata } from 'next';
import { Eye, SearchX } from 'lucide-react';
import ProductSort from '@/components/shared/ProductSort';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Danh mục Sản phẩm - biotechvet',
  description: 'Danh mục các loại thuốc thú y, thuốc bổ trợ, kháng sinh chất lượng cao từ biotechvet. Sản phẩm đạt chuẩn GMP-WHO với công nghệ tiên tiến từ USA.',
  keywords: ['thuốc thú y', 'thuốc bổ trợ', 'kháng sinh', 'biotechvet', 'sản phẩm chăn nuôi'],
  robots: 'index, follow',
  openGraph: {
    title: 'Danh mục Sản phẩm - biotechvet',
    description: 'Danh mục các loại thuốc thú y, thuốc bổ trợ, kháng sinh chất lượng cao từ biotechvet.',
    url: 'https://biotechvet.com.vn/san-pham',
    images: [
      {
        url: '/images/banner1.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

const ITEMS_PER_PAGE = 6;

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string; page?: string; search?: string; sort?: string }> }) {
  const params = await searchParams;
  const currentCategory = params.category;
  const currentPage = Number.parseInt(params.page || '1', 10);
  const searchTerm = params.search?.toLowerCase() || '';
  const sort = params.sort || 'newest';

  const products = await readData<Product[]>('products');
  const categories = await readData<Category[]>('categories');

  // Filter products
  let filteredProducts = products;

  // Filter by category
  if (currentCategory) {
    filteredProducts = filteredProducts.filter((p: Product) => {
      const cat = categories.find((c: Category) => c.id.toString() === p.categoryId.toString());
      return cat?.slug === currentCategory;
    });
  }

  // Filter by search term
  if (searchTerm) {
    filteredProducts = filteredProducts.filter((p: Product) => 
      p.name.toLowerCase().includes(searchTerm)
    );
  }

  // Apply sorting
  if (sort === 'name-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'name-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
  } else {
    // Newest (by ID desc)
    filteredProducts = [...filteredProducts].sort((a, b) => b.id - a.id);
  }

  const activeCategory = categories.find((c: Category) => c.slug === currentCategory);
  
  // Pagination logic
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Construct baseUrl for pagination
  const urlParams = new URLSearchParams();
  if (currentCategory) urlParams.set('category', currentCategory);
  if (searchTerm) urlParams.set('search', searchTerm);
  if (sort !== 'newest') urlParams.set('sort', sort);
  const baseUrl = urlParams.toString() ? `/san-pham?${urlParams.toString()}` : '/san-pham';

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
          <div className="sticky top-24 space-y-6">
            {/* Search Bar */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
               <h2 className="font-black text-biotechvet-dark mb-4 flex items-center gap-2 uppercase tracking-tight text-sm">
                Tìm kiếm
              </h2>
              <ProductSearch />
            </div>

            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
              <h2 className="font-black text-biotechvet-dark mb-4 flex items-center gap-2 uppercase tracking-tight text-sm">
                 Danh mục sản phẩm
              </h2>
              <ul className="space-y-2">
                <li>
                    <Link href="/san-pham" className={`block py-3 px-4 rounded-xl transition-all font-bold text-sm ${!currentCategory ? 'bg-primary text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}>
                      Tất cả sản phẩm
                    </Link>
                </li>
                  {categories.map((c: Category) => (
                    <li key={c.id}>
                      <Link 
                        href={`/san-pham/danh-muc/${c.slug}`} 
                        className={`block py-3 px-4 rounded-xl transition-all font-bold text-sm ${currentCategory === c.slug ? 'bg-primary text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="w-full md:w-3/4">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 gap-4">
            <div className="text-gray-500 font-medium text-sm">
              {searchTerm ? (
                <span>Kết quả tìm kiếm cho: <strong className="text-primary">"{searchTerm}"</strong> - </span>
              ) : null}
              Hiển thị <strong>{paginatedProducts.length}</strong> trên <strong>{totalItems}</strong> sản phẩm {activeCategory && `trong ${activeCategory.name}`}
            </div>
            <ProductSort />
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProducts.map((p: Product, index: number) => (
                <FadeUp key={p.id} delay={index * 0.05}>
                <div className="bg-white rounded-[32px] shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 group flex flex-col h-full hover:-translate-y-1">
                  <div className="bg-gray-50 aspect-square flex items-center justify-center relative group-hover:bg-primary-light/30 transition-colors duration-500 overflow-hidden">
                     <img src={p.image} alt={p.name} className="max-h-[80%] w-auto object-contain transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h3 className="font-black text-biotechvet-dark mb-2 group-hover:text-primary transition-colors text-lg leading-tight h-14 overflow-hidden text-center text-ellipsis">{p.name}</h3>
                    <Link href={`/san-pham/${p.slug}`} className="mt-auto inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-black hover:shadow-xl px-6 py-4 rounded-2xl transition-all justify-center w-full uppercase tracking-widest text-xs active:scale-95">
                      <Eye size={18} /> Chi tiết
                    </Link>
                  </div>
                </div>
                </FadeUp>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-[48px] border border-dashed border-gray-200">
              <SearchX size={64} className="mx-auto text-gray-200 mb-6" />
              <p className="text-gray-400 font-black uppercase tracking-[4px] text-sm">Không tìm thấy sản phẩm nào</p>
              {searchTerm && (
                <Link href="/san-pham" className="mt-6 inline-block text-primary font-bold hover:underline">
                  Xem tất cả sản phẩm
                </Link>
              )}
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl={baseUrl}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
