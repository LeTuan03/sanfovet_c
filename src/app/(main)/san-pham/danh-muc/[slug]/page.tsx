import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Eye, ChevronRight, Home, LayoutGrid, SearchX } from 'lucide-react';
import { readData } from '@/lib/storage';
import { Product, Category } from '@/types';
import Pagination from '@/components/shared/Pagination';
import ProductSearch from '@/components/shared/ProductSearch';
import ProductSort from '@/components/shared/ProductSort';
import FadeUp from '@/components/shared/FadeUp';

const ITEMS_PER_PAGE = 6;

export default async function CategoryPage({ params, searchParams }: { 
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; search?: string; sort?: string }>;
}) {
  const { slug } = await params;
  const { page, search, sort } = await searchParams;
  const searchTerm = search?.toLowerCase() || '';
  const currentSort = sort || 'newest';
  
  const products = await readData<Product[]>('products');
  const categories = await readData<Category[]>('categories');

  const currentCategory = Array.isArray(categories) ? categories.find((c: Category) => c.slug === slug) : undefined;
  
  if (!currentCategory) {
    notFound();
  }

  const currentPage = parseInt(page || '1', 10);
  
  // Filter by category
  let filteredProducts = products.filter((p: Product) => p.categoryId.toString() === currentCategory.id.toString());
  
  // Filter by search term
  if (searchTerm) {
    filteredProducts = filteredProducts.filter((p: Product) => 
      p.name.toLowerCase().includes(searchTerm) || 
      (p.tagline && p.tagline.toLowerCase().includes(searchTerm))
    );
  }

  // Apply sorting
  if (currentSort === 'name-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  } else if (currentSort === 'name-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
  } else {
    // Newest (by ID desc)
    filteredProducts = [...filteredProducts].sort((a, b) => b.id - a.id);
  }
  
  // Pagination logic
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const urlParams = new URLSearchParams();
  if (searchTerm) urlParams.set('search', searchTerm);
  if (currentSort !== 'newest') urlParams.set('sort', currentSort);
  const baseUrl = urlParams.toString() ? `/san-pham/danh-muc/${slug}?${urlParams.toString()}` : `/san-pham/danh-muc/${slug}`;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Dynamic Header */}
      <section className="bg-sanfovet-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/farm.png')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
           <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-primary-light text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
              <LayoutGrid size={14} /> Danh mục sản phẩm
           </div>
           <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-wider italic">{currentCategory.name}</h1>
           <div className="flex items-center justify-center gap-2 text-sm font-medium text-white/60">
              <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
              <ChevronRight size={14} />
              <Link href="/san-pham" className="hover:text-primary transition-colors">Sản phẩm</Link>
              <ChevronRight size={14} />
              <span className="text-white">Thành phẩm</span>
           </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-24 space-y-6">
              {/* Search Bar */}
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-sanfovet-dark mb-6 uppercase tracking-tight italic border-b border-gray-50 pb-4">Tìm kiếm</h3>
                <ProductSearch />
              </div>

              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-sanfovet-dark mb-6 uppercase tracking-tight italic border-b border-gray-50 pb-4">Phân loại khác</h3>
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
                      className={`block py-3.5 px-5 rounded-2xl transition-all font-bold text-[0.85rem] ${c.slug === slug ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-sanfovet-alt hover:text-primary'}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <Link href="/san-pham" className="mt-8 flex items-center justify-center gap-2 py-4 bg-gray-50 text-gray-400 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">
                <Home size={14} /> Xem tất cả
              </Link>
            </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="w-full lg:w-3/4">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm gap-4">
               <div className="text-sm font-medium text-gray-400">
                 {searchTerm ? (
                   <span>Kết quả tìm kiếm cho: <strong className="text-primary">"{searchTerm}"</strong> - </span>
                 ) : null}
                 Hiển thị <strong>{paginatedProducts.length}</strong> trên <strong>{totalItems}</strong> sản phẩm
               </div>
               <ProductSort />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {paginatedProducts.map((p: Product, index: number) => (
                <FadeUp key={p.id} delay={index * 0.05}>
                <article className="bg-white rounded-[32px] shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 group flex flex-col h-full hover:-translate-y-1">
                  <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center relative p-10 group-hover:bg-primary-light/30 transition-colors duration-500">
                     <img src={p.image} alt={p.name} className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="font-black text-sanfovet-dark mb-3 group-hover:text-primary transition-colors text-xl leading-tight h-14 overflow-hidden">{p.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-8 flex-1 font-medium italic">{p.tagline}</p>
                    <Link href={`/san-pham/${p.slug}`} className="mt-auto inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-black hover:shadow-xl px-6 py-4 rounded-full transition-all justify-center w-full uppercase tracking-widest text-[0.65rem] active:scale-95">
                      <Eye size={16} /> Xem chi tiết
                    </Link>
                  </div>
                </article>
                </FadeUp>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-24 text-center bg-white rounded-[48px] border-2 border-dashed border-gray-100">
                {searchTerm ? (
                  <>
                    <SearchX size={48} className="mx-auto text-gray-200 mb-6" />
                    <h3 className="text-xl font-black text-gray-300 uppercase italic tracking-widest">Không tìm thấy sản phẩm</h3>
                    <p className="text-gray-400 mt-2 font-medium">Không tìm thấy sản phẩm nào khớp với từ khóa của bạn trong danh mục này.</p>
                  </>
                ) : (
                  <>
                    <LayoutGrid size={48} className="mx-auto text-gray-200 mb-6" />
                    <h3 className="text-xl font-black text-gray-300 uppercase italic tracking-widest">Chưa có sản phẩm</h3>
                    <p className="text-gray-400 mt-2 font-medium">Danh mục này hiện chưa có sản phẩm nào. Vui lòng quay lại sau.</p>
                  </>
                )}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  baseUrl={baseUrl}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
