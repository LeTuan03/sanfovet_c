import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readData } from '@/lib/storage';
import { Article, AnimalTag } from '@/types';
// import { articles, animalTags } from '@/lib/data'; // Removed static imports
import { Calendar, ChevronRight } from 'lucide-react';

export default async function AnimalTagPage({ params }: Readonly<{ params: Promise<{ tag: string }> }>) {
  const { tag } = await params;
  const articles = await readData<Article[]>('articles');
  const animalTags = await readData<AnimalTag[]>('animal-tags');
  const animalTag = Array.isArray(animalTags) ? animalTags.find((t: AnimalTag) => t.slug === tag) : undefined;

  if (!animalTag) {
    notFound();
  }

  const tagArticles = articles.filter((a: Article) => a.animalTag === tag && a.category === 'cam-nang');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-biotechvet-dark text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/farm.png')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-sm text-white/60 font-bold mb-4 uppercase tracking-widest">
            <Link href="/" className="hover:text-primary-light transition-colors">Trang chủ</Link>
            <ChevronRight size={14} />
            <Link href="/cam-nang-chan-nuoi" className="hover:text-primary-light transition-colors">Cẩm nang chăn nuôi</Link>
            <ChevronRight size={14} />
            <span className="text-primary-light">{animalTag.name}</span>
          </div>
          <div className="flex items-center gap-6">
            {/* <span className="text-6xl">{animalTag.icon}</span> */}
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter italic">{animalTag.name}</h1>
              <p className="text-primary-light font-medium mt-2">{animalTag.description}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {tagArticles.map((a: Article) => (
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
                <h2 className="text-xl font-bold text-biotechvet-dark mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
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

        {tagArticles.length === 0 && (
          <div className="text-center py-20 bg-biotechvet-alt rounded-[40px] border-2 border-dashed border-gray-200">
            <span className="text-5xl block mb-4">{animalTag.icon}</span>
            <div className="text-gray-400 font-bold mb-2 uppercase tracking-widest">Chưa có bài viết nào về {animalTag.name}</div>
            <p className="text-gray-500 max-w-xs mx-auto text-sm">Chúng tôi đang cập nhật bài viết mới. Vui lòng quay lại sau.</p>
          </div>
        )}
      </div>
    </div>
  );
}
