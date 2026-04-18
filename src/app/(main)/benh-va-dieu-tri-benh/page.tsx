import React from 'react';
import Link from 'next/link';
import { readData } from '@/lib/storage';
import { Article } from '@/types';
// import { articles } from '@/lib/data'; // Removed static import
import { ChevronRight, Activity, ShieldAlert } from 'lucide-react';
import Sidebar from '@/components/shared/Sidebar';

export default async function DiseasesPage() {
  const articles = await readData<Article[]>('articles');
  const list = Array.isArray(articles) ? articles.filter((a: Article) => a.category === 'benh-dieu-tri') : [];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-red-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/farm.png')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
           {/* Breadcrumb */}
           <div className="flex items-center gap-2 text-sm text-white/60 font-bold mb-6 uppercase tracking-widest">
             <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
             <ChevronRight size={14} />
             <span className="text-white">Bệnh và điều trị bệnh</span>
           </div>
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex-1">
                 <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    <ShieldAlert size={14} className="text-red-400" /> Cảnh báo dịch bệnh
                 </div>
                 <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic">Bệnh & Điều Trị</h1>
                 <p className="text-red-100 max-w-xl font-medium">Cẩm nang tra cứu triệu chứng, chẩn đoán bài bản và phác đồ điều trị dứt điểm các bệnh thường gặp trên vật nuôi.</p>
              </div>
              <div className="shrink-0">
                 <div className="bg-white/10 backdrop-blur-md p-6 rounded-[32px] border border-white/20">
                    <Activity className="text-red-400 mb-2" size={32} />
                    <div className="text-3xl font-black">200+</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Ca bệnh thực tế</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {list.map((a: Article) => (
                <article key={a.id} className="group grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white transition-all duration-300">
                   <div className="lg:col-span-2">
                     <Link href={`/bai-viet/${a.slug}`} className="aspect-[4/3] relative overflow-hidden block rounded-[32px] ring-1 ring-gray-100 shadow-md">
                        <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     </Link>
                   </div>
                   <div className="lg:col-span-3 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-red-600 text-[10px] font-black mb-3 uppercase tracking-[2px]">
                         <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> {a.publishDate}
                      </div>
                      <h2 className="text-2xl font-black text-sanfovet-dark mb-4 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
                         {a.title}
                      </h2>
                      <p className="text-gray-500 text-sm font-medium line-clamp-3 mb-6">
                         {a.excerpt}
                      </p>
                      <Link href={`/bai-viet/${a.slug}`} className="inline-flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-[2px] hover:gap-4 transition-all group-hover:underline">
                         Xem phác đồ điều trị <ChevronRight size={18} />
                      </Link>
                   </div>
                </article>
              ))}
            </div>

            {/* Support Banner */}
            <div className="mt-24 bg-sanfovet-alt rounded-[48px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-primary/10">
               <div className="shrink-0">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/30">
                     <ShieldAlert size={48} />
                  </div>
               </div>
               <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black text-sanfovet-dark mb-4 uppercase italic">Cần hỗ trợ chẩn đoán ngay?</h3>
                  <p className="text-gray-600 font-medium max-w-2xl">Đội ngũ Bác sĩ Thú y của Sanfovet luôn sẵn sàng lắng nghe và tư vấn miễn phí cho bạn 24/7.</p>
               </div>
               <Link href="/lien-he" className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-10 rounded-full text-sm uppercase tracking-widest transition-all shadow-lg shadow-red-200 active:scale-95 shrink-0">
                  Gửi yêu cầu hỗ trợ
               </Link>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
