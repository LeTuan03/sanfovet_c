export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Eye, ArrowRight, Calendar, Microscope, ShieldCheck, Users, Truck, Gem, ChevronRight, Award, CheckCircle2 } from 'lucide-react';
import { productService, articleService } from '@/services';
import { Product, Article } from '@/types';
import BannerSlider from '@/components/home/BannerSlider';
import HomeGallery from '@/components/home/HomeGallery';
import FadeUp from '@/components/shared/FadeUp';

export default async function HomePage() {
  const products = await productService.getAll();
  const articles = await articleService.getAll();

  const featuredProducts = Array.isArray(products) ? products.filter((p: Product) => p.featured).slice(0, 8) : [];
  const diseaseArticles = Array.isArray(articles) ? articles.filter((a: Article) => a.category === 'benh-dieu-tri').slice(0, 4) : [];
  const latestNews = Array.isArray(articles) ? articles.slice(0, 3) : [];

  const features = [
    { icon: <Microscope size={32} />, title: 'Công nghệ USA', desc: 'Ứng dụng công nghệ tiên tiến từ Hoa Kỳ trong sản xuất thuốc thú y' },
    { icon: <ShieldCheck size={32} />, title: 'Đạt chuẩn GMP', desc: 'Nhà máy đạt chuẩn chất lượng GMP-WHO về sản xuất dược phẩm' },
    { icon: <Users size={32} />, title: '200+ Sản phẩm', desc: 'Chất lượng ứng dụng trong chăn nuôi thú y.BTV đã tạo trở thành người bạn đồng hành tin cậy của nhà nông' },
    { icon: <Truck size={32} />, title: '20+ Năm', desc: 'Năm 2005, BTV thành lập bằng nhiệt huyết, trí tuệ và bằng cả cái tâm của đội ngũ các nhà khoa học đầu ngành Việt Nam trong lĩnh vực chăn nuôi thú y.' },
    { icon: <Gem size={32} />, title: '200+ Khách hàng', desc: 'Đại lý cấp 1, cấp 2 ở gần 30 tỉnh thành trải dài khắp miền Bắc, miền Trung, miền Nam và miền Tây.' },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Banner Section */}
      <BannerSlider />

      {/* About Section */}
      <section className="py-24 lg:py-32 bg-white overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 origin-top"></div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeUp y={40}>
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              <div className="w-full lg:w-5/12 relative">
                <div className="relative z-10 rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
                  <img src="/images/about.jpg" alt="Trụ sở BIOTECH-VET" className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-10">
                    <div className="text-white">
                      <div className="font-black text-6xl mb-2 text-primary-light drop-shadow-lg">20+</div>
                      <div className="text-sm font-bold uppercase tracking-widest opacity-90 drop-shadow">Năm Phát Triển Khẳng Định Vị Thế</div>
                    </div>
                  </div>
                </div>
                {/* Background decorative blob */}
                <div className="absolute -inset-6 bg-primary/5 rounded-[48px] -z-10 transform -rotate-3"></div>
              </div>
              <div className="w-full lg:w-7/12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6">
                  <ShieldCheck size={16} /> Về chúng tôi
                </div>
                <h3 className="text-4xl lg:text-5xl font-black mb-8 text-biotechvet-dark leading-tight uppercase tracking-tight">
                  Công ty Cổ phần<br />
                  <span className="text-secondary tracking-tighter">Công Nghệ Sinh Học Thú Y</span>
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg font-medium">
                  BIOTECH-VET tự hào là đơn vị tiên phong trong lĩnh vực sản xuất và phân phối thuốc thú y tại Việt Nam.
                  Ứng dụng tiêu chuẩn công nghệ tiên tiến từ Hoa Kỳ, chúng tôi cam kết mang đến những giải pháp bảo vệ sức khỏe vật nuôi toàn diện.
                </p>
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 mb-10 pb-10 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-[16px] bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform hover:scale-110">
                      <CheckCircle2 size={28} />
                    </div>
                    <div>
                      <h4 className="font-black text-biotechvet-dark text-lg mb-1">Chất lượng GMP-WHO</h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">Quy trình sản xuất đáp ứng tiêu chuẩn quốc tế khắt khe nhất.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-[16px] bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform hover:scale-110">
                      <Users size={28} />
                    </div>
                    <div>
                      <h4 className="font-black text-biotechvet-dark text-lg mb-1">Hỗ trợ kỹ thuật 24/7</h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">Đội ngũ hơn 50 chuyên gia giàu kinh nghiệm túc trực.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-5 items-center">
                  <Link href="/gioi-thieu" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-biotechvet-dark hover:to-biotechvet-dark text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                    Hành trình của chúng tôi <ArrowRight size={16} />
                  </Link>
                  <Link href="/catalogue" className="inline-flex items-center justify-center gap-2 bg-secondary/5 hover:bg-secondary/10 text-secondary border-2 border-secondary/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-sm">
                    Xem Catalogue 2026
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 lg:py-32 bg-gray-50 relative border-t border-gray-100">
        <div className="container mx-auto px-4">
          <FadeUp className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-500 font-bold text-xs uppercase tracking-widest mb-4 shadow-sm">
                <Gem size={16} className="text-primary" /> Sản phẩm chất lượng
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-biotechvet-dark uppercase tracking-tight">
                Sản Phẩm <span className="text-primary-dark">Nổi Bật</span>
              </h2>
              <p className="text-gray-500 mt-4 text-lg font-medium">Các dòng dược phẩm thú y bán chạy nhất và được tin dùng rộng rãi trên thị trường</p>
            </div>
            <Link href="/san-pham" className="shrink-0 inline-flex items-center gap-2 bg-white text-biotechvet-dark px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition shadow-sm border border-gray-200 group hover:border-primary hover:text-primary">
              Tất cả sản phẩm <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((p: Product, index: number) => (
              <FadeUp key={p.id} delay={index * 0.1}>
                <Link href={`/san-pham/${p.slug}`} className="bg-white rounded-[32px] shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 group flex flex-col h-full hover:-translate-y-1">
                  <div className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md font-black text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    <Eye size={18} />
                  </div>
                  <div className="aspect-square flex items-center justify-center relative group-hover:bg-primary-light/30 transition-colors duration-500 overflow-hidden">
                    <img src={p.image} alt={p.name} className="h-full w-auto object-contain transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-3 md:p-4 flex-1 flex flex-col">
                    <h3 className="font-black text-biotechvet-dark group-hover:text-primary transition-colors text-sm leading-tight overflow-hidden text-center">{p.name}</h3>
                    <span className="text-small font-small text-gray-500 leading-[0.8] whitespace-pre-wrap line-clamp-3">{p?.description?.substring(0, 100)}</span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Disease & Treatment */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[100px] pointer-events-none -mr-[20rem] -mt-[10rem]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeUp className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-black text-biotechvet-dark uppercase tracking-tight">Kỹ Thuật <span className="text-secondary">Chăn Nuôi</span></h2>
              <p className="text-gray-500 mt-4 text-lg font-medium">Kiến thức chuyên sâu về các bệnh thường gặp, cách phòng chống và phác đồ điều trị an toàn</p>
            </div>
            <Link href="/benh-va-dieu-tri-benh" className="shrink-0 inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[11px] hover:text-biotechvet-dark group transition-colors">
              Khám phá <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {diseaseArticles.map((a: Article, i: number) => (
              <FadeUp key={a.id} delay={i * 0.1}>
                <article className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col group hover:-translate-y-2 h-full">
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                    <img src={`/images/news-${(i % 3) + 1}.png`} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-black py-1.5 px-3 rounded-full uppercase tracking-widest shadow-sm">
                      Cẩm nang
                    </div>
                  </div>
                  <div className="p-6 lg:p-8 flex flex-col flex-1">
                    <h3 className="font-black text-lg text-biotechvet-dark mb-4 leading-snug group-hover:text-primary transition-colors flex-1">
                      <Link href={`/bai-viet/${a.slug}`} className="line-clamp-2">{a.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-8 font-medium leading-relaxed">{a.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{a.publishDate || '01/01/2026'}</span>
                      <Link href={`/bai-viet/${a.slug}`} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 lg:py-32 bg-biotechvet-dark text-white relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute inset-0 bg-[url('/images/farm.png')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-biotechvet-dark via-biotechvet-dark/95 to-[#021016]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <FadeUp className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-primary-light font-bold text-[10px] uppercase tracking-widest mb-6">
              <Award size={14} /> Giá trị cốt lõi
            </div>
            <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tighter shadow-sm">Tại Sao Chọn <br></br> <span className="text-primary-dark">BIOTECH-VET</span>?</h2>
            <p className="text-xl text-gray-300 font-medium leading-relaxed">Sứ mệnh của chúng tôi là cung cấp những giải pháp y tế tối ưu, giúp bảo vệ và nâng cao năng suất đàn vật nuôi tại Việt Nam.</p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            {features.map((f, i: number) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center p-8 lg:p-10 bg-white/5 backdrop-blur-md rounded-[40px] border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 group shadow-2xl h-full">
                  <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-primary/80 to-primary-dark flex items-center justify-center mb-8 text-white shadow-[0_10px_30px_rgba(26,140,63,0.3)] group-hover:scale-110 transition-transform duration-500 transform rotate-3 group-hover:rotate-0">
                    {f.icon}
                  </div>
                  <h3 className="font-black text-lg lg:text-xl mb-4 text-white tracking-wide">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-medium">{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 lg:py-32 bg-gray-50 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <FadeUp className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center justify-center w-16 h-1.5 bg-secondary rounded-full mb-8 relative">
              <div className="absolute w-4 h-4 bg-secondary rounded-full animate-ping opacity-40"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-biotechvet-dark uppercase tracking-tight">Tin Tức <span className="text-secondary">Nổi Bật</span></h2>
            <p className="text-gray-500 text-lg font-medium">Bản tin thị trường chăn nuôi, hoạt động nổi bật của công ty và những cập nhật mới nhất</p>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {latestNews.map((a: Article, i: number) => (
              <FadeUp key={a.id} delay={i * 0.1}>
                <article className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col hover:-translate-y-2 h-full">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img src={`/images/news-${(i % 3) + 1}.png`} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="bg-biotechvet-dark/80 backdrop-blur-md rounded-3xl p-5 border border-white/10 shadow-lg">
                        <div className="text-[10px] font-bold text-primary-light mb-2 uppercase tracking-widest flex items-center gap-1.5">
                          <Calendar size={12} /> {a.publishDate || '01/01/2026'}
                        </div>
                        <h3 className="font-black text-lg lg:text-xl leading-snug line-clamp-2">
                          <Link href={`/bai-viet/${a.slug}`} className="hover:text-primary-light transition-colors">{a.title}</Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col flex-1">
                    <p className="text-[15px] text-gray-500 line-clamp-3 mb-8 leading-relaxed font-medium flex-1">{a.excerpt}</p>
                    <Link href={`/bai-viet/${a.slug}`} className="inline-flex items-center gap-2 text-biotechvet-dark hover:text-primary font-black text-[11px] uppercase tracking-widest group-hover:gap-4 transition-all w-fit rounded-full bg-gray-50 px-6 py-3 border border-gray-100 hover:border-primary/30">
                      Đọc bản tin <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <HomeGallery />
    </div>
  );
}



