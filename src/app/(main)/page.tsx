import React from 'react';
import Link from 'next/link';
import { Eye, ArrowRight, Download, Calendar, Microscope, ShieldCheck, Users, Truck, Gem, ChevronRight } from 'lucide-react';
import { products, articles, categories } from '@/lib/data';
import BannerSlider from '@/components/home/BannerSlider';

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 8);
  const diseaseArticles = articles.filter(a => a.category === 'benh-dieu-tri').slice(0, 4);
  const latestNews = articles.slice(0, 3);

  const features = [
    { icon: <Microscope size={28} />, title: 'Công nghệ USA', desc: 'Ứng dụng công nghệ tiên tiến từ Hoa Kỳ trong sản xuất thuốc thú y' },
    { icon: <ShieldCheck size={28} />, title: 'Tiêu chuẩn GMP', desc: 'Nhà máy đạt tiêu chuẩn GMP-WHO về sản xuất dược phẩm thú y' },
    { icon: <Users size={28} />, title: 'Chuyên gia hàng đầu', desc: 'Đội ngũ BSTY giàu kinh nghiệm hỗ trợ kỹ thuật 24/7' },
    { icon: <Truck size={28} />, title: 'Phân phối toàn quốc', desc: 'Mạng lưới phân phối rộng khắp 63 tỉnh thành' },
    { icon: <Gem size={28} />, title: 'Chất lượng cao', desc: 'Sản phẩm được kiểm nghiệm nghiêm ngặt, đạt tiêu chuẩn quốc tế' },
  ];

  return (
    <div className="w-full">
      {/* Hero Banner Section */}
      <BannerSlider />

      {/* About Section */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
           <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="w-full lg:w-1/2 relative group">
                <div className="relative z-10 rounded-[20px] overflow-hidden shadow-2xl border-4 border-white">
                  <img src="/images/about.png" alt="Trụ sở SANFOVET" className="w-full h-auto object-cover" />
                </div>
                <div className="absolute -inset-4 border-2 border-primary/20 rounded-[24px] pointer-events-none transition-all group-hover:-inset-2"></div>
              </div>
              <div className="w-full lg:w-1/2">
                <h2 className="text-primary font-bold uppercase tracking-[2px] text-xs mb-3 flex items-center gap-2">
                  <span className="w-8 h-px bg-primary"></span> Về chúng tôi
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary-dark leading-tight">Công ty CP Đầu tư Liên doanh Việt Anh</h3>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  SANFOVET tự hào là đơn vị tiên phong trong lĩnh vực sản xuất và phân phối thuốc thú y trang trại tại Việt Nam. 
                  Với công nghệ tiên tiến từ Hoa Kỳ, chúng tôi cam kết mang đến những sản phẩm chất lượng cao nhất.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Đội ngũ hơn 50 bác sĩ thú y và kỹ thuật viên giàu kinh nghiệm luôn sẵn sàng hỗ trợ kỹ thuật cho bà con chăn nuôi trên toàn quốc.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  <div className="text-center p-5 bg-primary-light rounded-[12px] group hover:bg-primary transition-all duration-300">
                    <div className="text-2xl font-black text-primary group-hover:text-white">15+</div>
                    <div className="text-[0.65rem] text-gray-500 group-hover:text-white/80 uppercase mt-1 font-bold tracking-wider">Năm kinh nghiệm</div>
                  </div>
                  <div className="text-center p-5 bg-primary-light rounded-[12px] group hover:bg-primary transition-all duration-300">
                    <div className="text-2xl font-black text-primary group-hover:text-white">200+</div>
                    <div className="text-[0.65rem] text-gray-500 group-hover:text-white/80 uppercase mt-1 font-bold tracking-wider">Sản phẩm</div>
                  </div>
                  <div className="text-center p-5 bg-primary-light rounded-[12px] group hover:bg-primary transition-all duration-300">
                    <div className="text-2xl font-black text-primary group-hover:text-white">50+</div>
                    <div className="text-[0.65rem] text-gray-500 group-hover:text-white/80 uppercase mt-1 font-bold tracking-wider">Chuyên gia</div>
                  </div>
                  <div className="text-center p-5 bg-primary-light rounded-[12px] group hover:bg-primary transition-all duration-300">
                    <div className="text-2xl font-black text-primary group-hover:text-white">63</div>
                    <div className="text-[0.65rem] text-gray-500 group-hover:text-white/80 uppercase mt-1 font-bold tracking-wider">Tỉnh thành</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/gioi-thieu" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3 rounded-full font-bold transition shadow-lg hover:-translate-y-1">
                    Tìm hiểu thêm <ArrowRight size={18} />
                  </Link>
                  <Link href="/catalogue" className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-7 py-3 rounded-full font-bold transition shadow-sm hover:-translate-y-1">
                    <Download size={18} /> Xem Catalogue
                  </Link>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28 bg-sanfovet-alt relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 relative inline-block">
              Sản Phẩm Nổi Bật
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-accent rounded"></span>
            </h2>
            <p className="text-gray-500 mt-6 font-medium">Các sản phẩm thuốc thú y chất lượng cao được tin dùng trên toàn quốc</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((p) => (
              <article key={p.id} className="bg-white rounded-[16px] shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 group relative">
                <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
                   <img src={p.image} alt={p.name} className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <div className="text-[0.7rem] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full w-fit mb-3 uppercase tracking-wider">
                    {categories.find((c: any) => c.id === p.categoryId)?.name?.split(' ').slice(0, 3).join(' ') || 'Danh mục'}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 leading-snug h-12 overflow-hidden group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-[0.8rem] text-gray-500 line-clamp-2 mb-6 min-h-[40px]">{p.tagline}</p>
                  <Link 
                    href={`/san-pham/${p.slug}`} 
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl text-sm font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  >
                    <Eye size={16} /> Xem chi tiết
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link href="/san-pham" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold transition shadow-xl hover:-translate-y-1">
               Xem tất cả sản phẩm <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Disease & Treatment */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div className="text-left max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 border-l-[6px] border-primary pl-5">Bệnh Và Điều Trị Bệnh</h2>
              <p className="text-gray-500 font-medium">Kiến thức chuyên sâu về các bệnh thường gặp và phác đồ điều trị</p>
            </div>
            <Link href="/benh-va-dieu-tri-benh" className="hidden md:flex items-center gap-1.5 text-primary font-bold hover:gap-3 transition-all duration-300">
               Tất cả bài viết <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diseaseArticles.map((a, i) => (
              <article key={a.id} className="bg-white rounded-[16px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col group">
                 <div className="aspect-video relative overflow-hidden bg-gray-100">
                    <img src={`/images/news-${(i % 3) + 1}.png`} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[0.65rem] font-black py-1 px-2.5 rounded uppercase tracking-[1px]">Kỹ thuật</div>
                 </div>
                 <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[0.75rem] text-gray-400 mb-3">
                      <Calendar size={14} /> {a.publishDate || '01/01/2026'}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 leading-relaxed min-h-[56px] group-hover:text-primary transition-colors">
                      <Link href={`/bai-viet/${a.slug}`}>{a.title}</Link>
                    </h3>
                    <p className="text-[0.85rem] text-gray-500 line-clamp-3 mb-6 leading-relaxed flex-1">{a.excerpt}</p>
                    <Link href={`/bai-viet/${a.slug}`} className="inline-flex items-center gap-1.5 text-primary font-bold text-[0.8rem] group-hover:gap-2.5 transition-all">
                       Đọc tiếp <ArrowRight size={14} />
                    </Link>
                 </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-sanfovet-dark via-sanfovet-dark to-[#0d2b10] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Tại Sao Nên Chọn SANFOVET?</h2>
            <p className="text-primary-light font-medium opacity-80">Chúng tôi cam kết mang đến giải pháp chất lượng nhất cho ngành chăn nuôi</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
             {features.map((f, i) => (
               <div key={i} className="flex flex-col items-center text-center p-8 bg-white/5 rounded-[20px] border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
                 <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-8 text-white shadow-[0_4px_20px_rgba(26,140,63,0.3)]">
                   {f.icon}
                 </div>
                 <h3 className="font-bold text-[1.05rem] mb-3 text-white">{f.title}</h3>
                 <p className="text-[0.85rem] text-white/60 leading-relaxed font-medium">{f.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 md:py-28 bg-sanfovet-alt overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 border-b-4 border-accent pb-3 inline-block">Tin Nổi Bật</h2>
            <p className="text-gray-500 mt-5 font-medium">Cập nhật tin tức mới nhất từ SANFOVET và ngành chăn nuôi thú y</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((a, i) => (
              <article key={a.id} className="bg-white rounded-[20px] shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col">
                 <div className="aspect-video relative overflow-hidden">
                    <img src={`/images/news-${(i % 3) + 1}.png`} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 </div>
                 <div className="p-8 flex flex-col flex-1">
                    <div className="text-[0.75rem] font-bold text-gray-400 mb-4 inline-flex items-center gap-2">
                      <span className="w-6 h-px bg-gray-300"></span> {a.publishDate || '01/01/2026'}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-4 leading-snug group-hover:text-primary transition-colors h-14 overflow-hidden">
                      <Link href={`/bai-viet/${a.slug}`}>{a.title}</Link>
                    </h3>
                    <p className="text-[0.9rem] text-gray-500 line-clamp-3 mb-8 leading-relaxed flex-1">{a.excerpt}</p>
                    <Link href={`/bai-viet/${a.slug}`} className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                       Tìm hiểu thêm <ChevronRight size={18} />
                    </Link>
                 </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Video & Gallery Section */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 border-b-4 border-accent pb-3 inline-block">Video & Hình Ảnh</h2>
            <p className="text-gray-500 mt-5 font-medium">Khám phá nhà máy sản xuất và các hoạt động nổi bật của SANFOVET</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video */}
            <div className="rounded-[24px] overflow-hidden shadow-2xl border-4 border-white relative group">
              <video 
                className="w-full aspect-video object-cover bg-black"
                poster="/images/about.png"
                controls
                preload="none"
              >
                <source src="/videos/sanfovet-intro.mp4" type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video.
              </video>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest pointer-events-none">
                🎬 Giới thiệu SANFOVET
              </div>
            </div>

            {/* Image Gallery Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[20px] overflow-hidden shadow-lg group">
                <img src="/images/about.png" alt="Nhà máy GMP" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="rounded-[20px] overflow-hidden shadow-lg group">
                <img src="/images/farm.png" alt="Trang trại" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="rounded-[20px] overflow-hidden shadow-lg group">
                <img src="/images/banner1.png" alt="Sản phẩm Sanfovet" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="rounded-[20px] overflow-hidden shadow-lg group">
                <img src="/images/banner2.png" alt="Hội nghị" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


