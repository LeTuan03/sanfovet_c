import React from 'react';
import Link from 'next/link';
import { readData } from '@/lib/storage';
import { Article } from '@/types';
// import { articles } from '@/lib/data'; // Removed static import
import { Calendar, ChevronRight, Users } from 'lucide-react';

export default async function InternalNewsPage() {
  const articles = await readData<Article[]>('articles');
  const list = Array.isArray(articles) ? articles.filter((a: Article) => a.category === 'tin-noi-bo') : [];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/farm.png')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
           {/* Breadcrumb */}
           <div className="flex items-center gap-2 text-sm text-white/60 font-bold mb-6 uppercase tracking-widest">
             <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
             <ChevronRight size={14} />
             <Link href="/tin-tuc" className="hover:text-white transition-colors">Tin tức</Link>
             <ChevronRight size={14} />
             <span className="text-white">Tin tức nội bộ</span>
           </div>
           <h1 className="text-4xl font-black mb-4 uppercase italic">Tin tức nội bộ</h1>
           <p className="text-blue-100 max-w-xl font-medium">Hoạt động, sự kiện và văn hóa doanh nghiệp tại biotechvet.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((a: Article) => (
            <article key={a.id} className="group bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
               <Link href={`/bai-viet/${a.slug}`} className="aspect-video relative overflow-hidden block">
                  <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               </Link>
               <div className="p-8">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-4 uppercase tracking-widest">
                     <Calendar size={14} className="text-blue-600" /> {a.publishDate}
                  </div>
                  <h2 className="text-xl font-bold text-biotechvet-dark mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                     {a.title}
                  </h2>
                  <p className="text-gray-500 text-sm font-medium line-clamp-3 mb-6">
                     {a.excerpt}
                  </p>
                  <Link href={`/bai-viet/${a.slug}`} className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all">
                     Đọc thêm <ChevronRight size={18} />
                  </Link>
               </div>
            </article>
          ))}
        </div>
        {list.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-[40px]">
             <Users size={48} className="mx-auto text-gray-300 mb-4" />
             <p className="text-gray-500 font-bold uppercase tracking-widest">Đang cập nhật sự kiện mới...</p>
          </div>
        )}
      </div>
    </div>
  );
}
