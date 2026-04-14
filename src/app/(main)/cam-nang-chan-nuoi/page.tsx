import React from 'react';
import Link from 'next/link';
import { articles } from '@/lib/data';
import { Calendar, ChevronRight, Search } from 'lucide-react';

export default function HandbookPage() {
  const list = articles.filter(a => a.category === 'cam-nang');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-sanfovet-dark text-white py-16 relative overflow-hidden">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {list.map((a, i) => (
            <article key={a.id} className="group flex flex-col h-full bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
               <Link href={`/bai-viet/${a.slug}`} className="aspect-video relative overflow-hidden block">
                  <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">Kỹ thuật</div>
               </Link>
               <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-4 uppercase tracking-widest">
                     <Calendar size={14} className="text-primary" /> {a.publishDate}
                  </div>
                  <h2 className="text-xl font-bold text-sanfovet-dark mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                     {a.title}
                  </h2>
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

        {/* Empty State */}
        {list.length === 0 && (
          <div className="text-center py-20 bg-sanfovet-alt rounded-[40px] border-2 border-dashed border-gray-200">
             <div className="text-gray-400 font-bold mb-4 uppercase tracking-widest">Chưa có bài viết nào</div>
             <p className="text-gray-500 max-w-xs mx-auto">Chúng tôi đang cập nhật thêm kiến thức mới. Vui lòng quay lại sau.</p>
          </div>
        )}
      </div>
    </div>
  );
}
