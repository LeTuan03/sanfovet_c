import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readData } from '@/lib/storage';
import { Article, Product } from '@/types';
// import { articles, products } from '@/lib/data'; // Removed static imports
import { Calendar, User, ChevronRight, ArrowLeft, Share2, Printer, Tag, List } from 'lucide-react';

function processContentWithHeadings(html: string): { processedHtml: string, headings: { id: string; text: string }[] } {
  const headings: { id: string; text: string }[] = [];
  let processedHtml = html;
  
  if (processedHtml) {
    processedHtml = processedHtml.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, innerHtml) => {
      const text = innerHtml.replace(/<[^>]*>/g, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9\u00C0-\u024F]+/gi, '-').replace(/^-|-$/g, '');
      headings.push({ id, text });
      
      if (!attrs.includes('id=')) {
        return `<h2${attrs} id="${id}">${innerHtml}</h2>`;
      }
      return match;
    });
  }
  
  return { processedHtml, headings };
}

function getCategoryLabel(category: string): string {
  switch (category) {
    case 'benh-dieu-tri': return 'Bệnh & Điều Trị';
    case 'cam-nang': return 'Cẩm Nang Chăn Nuôi';
    case 'tin-noi-bo': return 'Tin Nội Bộ';
    case 'tin-nganh': return 'Tin Ngành';
    default: return 'Bài Viết';
  }
}
export default async function ArticleDetailPage({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const articles = await readData<Article[]>('articles');
  const products = await readData<Product[]>('products');
  const article = articles.find((a: Article) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Get related articles
  const relatedArticles = articles
    .filter((a: Article) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  // Get suggested products
  const suggestedProducts = products.slice(0, 3);

  // Process content to extract headings and inject IDs
  const { processedHtml, headings } = processContentWithHeadings(article.content || "");

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-sanfovet-alt py-4">
        <div className="container mx-auto px-4 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Trang chủ</Link>
          <ChevronRight size={14} className="mx-2 text-gray-300" />
          <Link href="/tin-tuc" className="hover:text-primary transition-colors font-medium">Tin tức & Bài viết</Link>
          <ChevronRight size={14} className="mx-2 text-gray-300" />
          <span className="text-primary font-bold line-clamp-1">{article.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
             <Link href="/tin-tuc" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-8 font-bold transition-all group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Quay lại danh sách
             </Link>

             <article className="prose prose-lg max-w-none prose-headings:text-sanfovet-dark prose-headings:font-black prose-p:text-gray-600 prose-p:leading-relaxed">
                <header className="mb-10 not-prose">
                   <div className="flex items-center gap-4 text-sm text-gray-400 font-bold mb-4 uppercase tracking-widest">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-[10px]">
                        {getCategoryLabel(article.category)}
                      </span>
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.publishDate}</span>
                      <span className="flex items-center gap-1.5"><User size={14} /> Sanfovet Editor</span>
                   </div>
                   <h1 className="text-3xl md:text-5xl font-black text-sanfovet-dark leading-tight mb-8">
                     {article.title}
                   </h1>
                   <div className="flex items-center justify-between py-4 border-y border-gray-100">
                      <div className="flex items-center gap-2">
                         <span className="text-xs font-bold text-gray-400 uppercase">Chia sẻ:</span>
                         <div className="flex gap-2">
                            <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all"><Share2 size={14} /></button>
                            <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white transition-all"><Printer size={14} /></button>
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <span className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1"><Tag size={14} /> Tags:</span>
                         <span className="text-xs font-bold text-primary hover:underline cursor-pointer">#thuoc-thu-y</span>
                         <span className="text-xs font-bold text-primary hover:underline cursor-pointer">#chan-nuoi</span>
                      </div>
                   </div>
                </header>

                <div className="article-content prose-h2:scroll-mt-32" dangerouslySetInnerHTML={{ __html: processedHtml }} />

                <footer className="mt-16 pt-10 border-t border-gray-100 not-prose">
                   <div className="bg-sanfovet-alt p-8 rounded-[32px] border border-primary/10 flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-24 h-24 rounded-full bg-white border-4 border-primary/20 flex items-center justify-center shrink-0 overflow-hidden">
                         <img src="/images/logo.png" className="w-16 h-auto opacity-50 grayscale" alt="Sanfovet" />
                      </div>
                      <div>
                         <h4 className="font-black text-xl text-sanfovet-dark mb-2">Đội ngũ Kỹ thuật BIOTECH-VET</h4>
                         <p className="text-gray-500 font-medium leading-relaxed mb-4">
                            Bài viết được tham vấn chuyên môn bởi các bác sĩ thú y giàu kinh nghiệm của Hội đồng Kỹ thuật Sanfovet. Chúng tôi cam kết mang đến những kiến thức chính xác và giải pháp tối ưu cho người chăn nuôi.
                         </p>
                         <Link href="/lien-he" className="text-primary font-black text-sm uppercase tracking-wider hover:gap-3 transition-all flex items-center gap-2">Tư vấn kỹ thuật ngay <ChevronRight size={18} /></Link>
                      </div>
                   </div>
                </footer>
             </article>

             {/* Suggested Products Section (Inter-linked) */}
             <section className="mt-20">
                <h3 className="text-2xl font-black text-sanfovet-dark mb-8 flex items-center gap-3">
                   <span className="w-2 h-8 bg-primary rounded-full"></span>
                   Sản phẩm Sanfovet khuyên dùng
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {suggestedProducts.map((p: Product) => (
                      <Link href={`/san-pham/${p.slug}`} key={p.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                         <div className="aspect-square mb-4 bg-sanfovet-alt rounded-xl p-4 flex items-center justify-center group-hover:bg-primary-light transition-colors">
                            <img src={p.image} alt={p.name} className="max-h-full w-auto" />
                         </div>
                         <h4 className="font-bold text-sanfovet-dark group-hover:text-primary transition-colors line-clamp-1 mb-2">{p.name}</h4>
                         <p className="text-xs text-gray-400 line-clamp-2">{p.tagline}</p>
                      </Link>
                   ))}
                </div>
             </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
             <div className="sticky top-24 space-y-12">
                 {/* Table of Contents */}
                 {headings.length > 0 && (
                   <div className="bg-sanfovet-alt p-6 rounded-[24px] border border-gray-100">
                     <h3 className="font-black text-lg text-sanfovet-dark mb-4 flex items-center gap-2 uppercase tracking-wider">
                       <List size={18} className="text-primary" /> Mục lục
                     </h3>
                     <ol className="space-y-2">
                       {headings.map((h, i) => (
                         <li key={h.id}>
                           <a href={`#${h.id}`} className="text-sm font-medium text-gray-600 hover:text-primary transition-colors flex items-start gap-2">
                             {h.text}
                           </a>
                         </li>
                       ))}
                     </ol>
                   </div>
                 )}

                {/* Related Articles */}
                <div>
                   <h3 className="font-black text-lg text-sanfovet-dark mb-6 border-b border-gray-100 pb-4 uppercase tracking-wider">Bài viết liên quan</h3>
                   <div className="space-y-6">
                      {relatedArticles.map((a: Article) => (
                         <Link href={`/bai-viet/${a.slug}`} key={a.id} className="flex gap-4 group">
                            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                               <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="flex flex-col justify-center">
                               <h4 className="font-bold text-sanfovet-dark group-hover:text-primary transition-colors line-clamp-2 text-sm leading-snug">{a.title}</h4>
                               <span className="text-[10px] font-bold text-gray-400 mt-1.5 uppercase tracking-wider">{a.publishDate}</span>
                            </div>
                         </Link>
                      ))}
                   </div>
                </div>

                {/* Newsletter Box */}
                <div className="bg-sanfovet-dark rounded-[32px] p-8 text-white relative overflow-hidden group">
                   <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                   <h3 className="text-xl font-black mb-4 relative z-10">Nhận bản tin kỹ thuật</h3>
                   <p className="text-xs text-primary-light mb-6 opacity-80 leading-relaxed relative z-10">Đăng ký để nhận những kiến thức chăn nuôi mới nhất từ đội ngũ chuyên gia.</p>
                   <input type="email" placeholder="Email của bạn" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:border-primary transition-colors" />
                   <button className="w-full bg-primary hover:bg-primary-dark text-white font-black py-3 rounded-xl text-sm transition-all shadow-lg active:scale-95 uppercase tracking-wider">Gửi đăng ký</button>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
