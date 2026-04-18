import React from 'react';
import Link from 'next/link';
import { readData } from '@/lib/storage';
import { Article } from '@/types';
// import { articles } from '@/lib/data'; // Removed static import
import FadeUp from '@/components/shared/FadeUp';
import { Calendar, ChevronRight, Newspaper, Users, Globe } from 'lucide-react';

export default async function NewsPage() {
  const articles = await readData<Article[]>('articles');
  const newsInternal = articles.filter((a: Article) => a.category === 'tin-noi-bo');
  const newsIndustry = articles.filter((a: Article) => a.category === 'tin-nganh');
  const allNews = [...newsInternal, ...newsIndustry].sort((a: Article, b: Article) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-sanfovet-alt py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
           <h1 className="text-4xl md:text-6xl font-black text-sanfovet-dark mb-6 uppercase tracking-tighter italic">Tin Tức Sanfovet</h1>
           <p className="text-gray-500 max-w-2xl mx-auto font-medium">Cập nhật tin tức mới nhất về các hoạt động của Sanfovet, sự kiện ngành thú y và xu hướng chuyển đổi số trong chăn nuôi hiện đại.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-12">
             {allNews.map((a: Article, index: number) => (
               <FadeUp key={a.id} delay={index * 0.1}>
               <article className="group flex flex-col md:flex-row gap-8 bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                  <Link href={`/bai-viet/${a.slug}`} className="w-full md:w-2/5 aspect-[4/3] relative overflow-hidden rounded-[32px] shrink-0">
                     <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${a.category === 'tin-noi-bo' ? 'bg-blue-600' : 'bg-primary'}`}>
                           {a.category === 'tin-noi-bo' ? 'Nội bộ' : 'Ngành chăn nuôi'}
                        </span>
                     </div>
                  </Link>
                  <div className="flex flex-col justify-center py-2 flex-1">
                     <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-4 uppercase tracking-[2px]">
                        <Calendar size={14} className="text-primary" /> {a.publishDate}
                     </div>
                     <h2 className="text-2xl font-black text-sanfovet-dark mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {a.title}
                     </h2>
                     <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-6">
                        {a.excerpt}
                     </p>
                     <Link href={`/bai-viet/${a.slug}`} className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:gap-4 transition-all">
                        Đọc tiếp <ChevronRight size={18} />
                     </Link>
                  </div>
               </article>
               </FadeUp>
             ))}
          </div>

          {/* Side Panels */}
          <aside className="lg:col-span-1 space-y-12">
             {/* Category Stats */}
             <div className="bg-sanfovet-dark p-10 rounded-[48px] text-white">
                <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-4 uppercase tracking-wider">Chuyên mục</h3>
                <div className="space-y-6">
                   <Link href="/tin-tuc-noi-bo" className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all"><Users size={20} /></div>
                         <span className="font-bold">Tin nội bộ</span>
                      </div>
                      <span className="text-xs opacity-50 font-black">{newsInternal.length}</span>
                   </Link>
                   <Link href="/tin-tuc-nganh-chan-nuoi-thu-y" className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary-light group-hover:bg-primary group-hover:text-white transition-all"><Globe size={20} /></div>
                         <span className="font-bold">Tin ngành</span>
                      </div>
                      <span className="text-xs opacity-50 font-black">{newsIndustry.length}</span>
                   </Link>
                   <Link href="/benh-va-dieu-tri-benh" className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all"><Newspaper size={20} /></div>
                         <span className="font-bold">Bệnh & Điều trị</span>
                      </div>
                      <span className="text-xs opacity-50 font-black">{articles.filter((a: Article) => a.category === 'benh-dieu-tri').length}</span>
                   </Link>
                </div>
             </div>

             {/* Featured Box */}
             <div className="bg-sanfovet-alt p-8 rounded-[40px] border border-primary/10">
                <h3 className="text-lg font-black text-sanfovet-dark mb-6 uppercase tracking-wider">Hỗ trợ truyền thông</h3>
                <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed italic">"Chúng tôi luôn lắng nghe và sẵn sàng chia sẻ thông tin về ngành chăn nuôi cũng như các hoạt động hợp tác quốc tế của Sanfovet."</p>
                <div className="space-y-4">
                   <div className="p-4 bg-white rounded-2xl flex items-center gap-4 border border-gray-100">
                      <div className="text-primary font-black uppercase text-[10px]">Hotline</div>
                      <div className="text-sanfovet-dark font-black">097 499 9204</div>
                   </div>
                   <div className="p-4 bg-white rounded-2xl flex items-center gap-4 border border-gray-100">
                      <div className="text-primary font-black uppercase text-[10px]">Email</div>
                      <div className="text-sanfovet-dark font-black text-xs">pkd.sanfovet@gmail.com</div>
                   </div>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
