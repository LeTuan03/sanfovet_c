import React from 'react';
import Link from 'next/link';
import { readData } from '@/lib/storage';
import { Article, AnimalTag } from '@/types';
// import { articles, animalTags } from '@/lib/data'; // Removed static imports
import { Calendar, ChevronRight, Search } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cẩm Nang Chăn Nuôi - Kiến Thức & Kỹ Thuật - biotechvet',
  description: 'Chia sẻ kiến thức, kỹ thuật và kinh nghiệm chăn nuôi hiệu quả từ các chuyên gia hàng đầu. Hướng dẫn chi tiết cho gia súc, gia cầm.',
  keywords: ['cẩm nang chăn nuôi', 'kỹ thuật chăn nuôi', 'kiến thức gia súc', 'gia cầm', 'biotechvet', 'hướng dẫn nuôi cấp'],
  robots: 'index, follow',
  openGraph: {
    title: 'Cẩm Nang Chăn Nuôi - biotechvet',
    description: 'Chia sẻ kiến thức, kỹ thuật và kinh nghiệm chăn nuôi hiệu quả từ các chuyên gia hàng đầu.',
    url: 'https://biotechvet.com.vn/cam-nang-chan-nuoi',
    images: [
      {
        url: '/images/about.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function HandbookPage() {
  const articles = await readData<Article[]>('articles');
  const animalTags = await readData<AnimalTag[]>('animal-tags');
  const allHandbook = Array.isArray(articles) ? articles.filter((a: Article) => a.category === 'cam-nang') : [];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-biotechvet-dark text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/farm.png')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                 <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter italic">Cẩm Nang Chăn Nuôi</h1>
                 <p className="text-primary-light max-w-xl font-medium">Chia sẻ kiến thức, kỹ thuật và kinh nghiệm chăn nuôi hiệu quả từ các chuyên gia hàng đầu.</p>
              </div>
              <div className="relative w-full md:w-80">
                 <input type="text" placeholder="Tìm kiếm bài viết..." className="w-full bg-white/10 border border-white/20 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-primary transition-all pr-12" />
                 <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
              </div>
           </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Grouped by Animal - Each tag gets its own section */}
        {animalTags.map((tag: AnimalTag) => {
          const tagArticles = allHandbook.filter((a: Article) => a.animalTag === tag.slug);
          if (tagArticles.length === 0) return null;

          return (
            <section key={tag.id} className="mb-20">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  {/* <span className="text-4xl">{tag.icon}</span> */}
                  <div>
                    <h2 className="text-2xl font-black text-biotechvet-dark uppercase tracking-tight">{tag.name}</h2>
                    <p className="text-sm text-gray-400 font-medium">{tag.description}</p>
                  </div>
                </div>
                <Link 
                  href={`/cam-nang-chan-nuoi/${tag.slug}`} 
                  className="hidden md:inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:gap-4 transition-all bg-primary-light px-5 py-3 rounded-full"
                >
                  Xem tất cả <ChevronRight size={16} />
                </Link>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tagArticles.slice(0, 3).map((a: Article) => (
                  <article key={a.id} className="group flex flex-col h-full bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <Link href={`/bai-viet/${a.slug}`} className="aspect-video relative overflow-hidden block">
                      <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                        {a.category === 'cam-nang' ? 'Kỹ thuật' : 'Bệnh & Điều trị'}
                      </div>
                    </Link>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-4 uppercase tracking-widest">
                        <Calendar size={14} className="text-primary" /> {a.publishDate}
                      </div>
                      <h3 className="text-xl font-bold text-biotechvet-dark mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {a.title}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium line-clamp-3 mb-6 flex-1">
                        {a.excerpt}
                      </p>
                      <Link href={`/bai-viet/${a.slug}`} className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[2px] hover:gap-4 transition-all">
                        Xem chi tiết <ChevronRight size={18} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Mobile "Xem tất cả" */}
              <div className="mt-6 md:hidden text-center">
                <Link 
                  href={`/cam-nang-chan-nuoi/${tag.slug}`} 
                  className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest bg-primary-light px-5 py-3 rounded-full"
                >
                  Xem tất cả {tag.name} <ChevronRight size={16} />
                </Link>
              </div>
            </section>
          );
        })}

        {/* Empty State */}
        {allHandbook.length === 0 && (
          <div className="text-center py-20 bg-biotechvet-alt rounded-[40px] border-2 border-dashed border-gray-200">
             <div className="text-gray-400 font-bold mb-4 uppercase tracking-widest">Chưa có bài viết nào</div>
             <p className="text-gray-500 max-w-xs mx-auto">Chúng tôi đang cập nhật thêm kiến thức mới. Vui lòng quay lại sau.</p>
          </div>
        )}
      </div>
    </div>
  );
}
