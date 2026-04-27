import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readData } from '@/lib/storage';
import { Job, Product, Article } from '@/types';
import { ChevronRight, ArrowLeft, MapPin, Calendar, Mail, Phone, Briefcase, CheckCircle, Gift, Send } from 'lucide-react';

export default async function JobDetailPage({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const jobs = await readData<Job[]>('jobs');
  const products = await readData<Product[]>('products');
  const articles = await readData<Article[]>('articles');
  
  const job = jobs.find((j: Job) => j.slug === slug);

  if (!job) {
    notFound();
  }

  const featuredProducts = products.filter((p: Product) => p.featured).slice(0, 5);
  const latestNews = articles.slice(0, 4);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-biotechvet-alt py-4">
        <div className="container mx-auto px-4 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Trang chủ</Link>
          <ChevronRight size={14} className="mx-2 text-gray-300" />
          <Link href="/tuyen-dung" className="hover:text-primary transition-colors font-medium">Tuyển dụng</Link>
          <ChevronRight size={14} className="mx-2 text-gray-300" />
          <span className="text-primary font-bold line-clamp-1">{job.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Link href="/tuyen-dung" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-8 font-bold transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Quay lại danh sách tuyển dụng
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Job Header */}
            <div className="bg-gradient-to-br from-biotechvet-dark to-[#0d2b10] rounded-[32px] p-8 md:p-12 text-white mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
                    <Briefcase size={14} /> Đang tuyển
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black mb-6 leading-tight">{job.title}</h1>
                <div className="flex flex-wrap gap-6 text-sm font-bold opacity-80">
                  <span className="flex items-center gap-2"><MapPin size={16} className="text-primary-light" /> {job.location}</span>
                  <span className="flex items-center gap-2"><Calendar size={16} className="text-primary-light" /> Ngày đăng: {job.date}</span>
                </div>
              </div>
            </div>

            {/* Job Content Sections */}
            <div className="space-y-10">
              {/* Company Intro */}
              <section className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
                <h2 className="text-xl font-black text-primary mb-6 flex items-center gap-3 border-l-[6px] border-primary pl-5 uppercase tracking-wider">
                  Giới thiệu công ty
                </h2>
                <div className="text-gray-600 leading-relaxed space-y-4 font-medium">
                  <p>
                    <strong>Công Ty CP Công Nghệ Sinh Học Thú Y (BIOTECH-VET)</strong> là doanh nghiệp hàng đầu trong lĩnh vực 
                    sản xuất và phân phối thuốc thú y trang trại tại Việt Nam. Với nhà máy đạt tiêu chuẩn GMP-WHO và công nghệ 
                    tiên tiến từ Hoa Kỳ, chúng tôi cam kết mang đến những sản phẩm chất lượng cao nhất cho ngành chăn nuôi.
                  </p>
                  <p>
                    Hiện tại, mạng lưới phân phối của biotechvet đã phủ khắp 63 tỉnh thành, với hơn 200 mã sản phẩm đa dạng 
                    phục vụ mọi nhu cầu điều trị và bổ sung dinh dưỡng cho gia súc, gia cầm.
                  </p>
                </div>
              </section>

              {/* Job Description */}
              <section className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
                <h2 className="text-xl font-black text-primary mb-6 flex items-center gap-3 border-l-[6px] border-primary pl-5 uppercase tracking-wider">
                  Mô tả công việc
                </h2>
                <ul className="space-y-4 text-gray-600 font-medium">
                  <li className="flex gap-3 items-start"><CheckCircle size={18} className="text-primary shrink-0 mt-0.5" /> Tìm kiếm và phát triển khách hàng mới (đại lý, cửa hàng, trang trại) tại khu vực được phân công.</li>
                  <li className="flex gap-3 items-start"><CheckCircle size={18} className="text-primary shrink-0 mt-0.5" /> Giới thiệu và tư vấn sản phẩm thuốc thú y biotechvet cho khách hàng.</li>
                  <li className="flex gap-3 items-start"><CheckCircle size={18} className="text-primary shrink-0 mt-0.5" /> Duy trì và phát triển mối quan hệ với khách hàng hiện tại, đảm bảo doanh số theo chỉ tiêu.</li>
                  <li className="flex gap-3 items-start"><CheckCircle size={18} className="text-primary shrink-0 mt-0.5" /> Thu thập thông tin thị trường, phản hồi khách hàng và báo cáo định kỳ.</li>
                  <li className="flex gap-3 items-start"><CheckCircle size={18} className="text-primary shrink-0 mt-0.5" /> Hỗ trợ kỹ thuật cơ bản cho khách hàng về cách sử dụng sản phẩm.</li>
                </ul>
              </section>

              {/* Requirements */}
              <section className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
                <h2 className="text-xl font-black text-orange-600 mb-6 flex items-center gap-3 border-l-[6px] border-orange-600 pl-5 uppercase tracking-wider">
                  Yêu cầu ứng viên
                </h2>
                <ul className="space-y-4 text-gray-600 font-medium">
                  <li className="flex gap-3 items-start"><CheckCircle size={18} className="text-orange-500 shrink-0 mt-0.5" /> Tốt nghiệp Đại học/Cao đẳng ngành Thú y, Chăn nuôi hoặc các ngành liên quan.</li>
                  <li className="flex gap-3 items-start"><CheckCircle size={18} className="text-orange-500 shrink-0 mt-0.5" /> Có kinh nghiệm kinh doanh thuốc thú y từ 1 năm trở lên (ưu tiên).</li>
                  <li className="flex gap-3 items-start"><CheckCircle size={18} className="text-orange-500 shrink-0 mt-0.5" /> Am hiểu thị trường chăn nuôi khu vực {job.location}.</li>
                  <li className="flex gap-3 items-start"><CheckCircle size={18} className="text-orange-500 shrink-0 mt-0.5" /> Có phương tiện di chuyển cá nhân, có thể đi công tác thường xuyên.</li>
                  <li className="flex gap-3 items-start"><CheckCircle size={18} className="text-orange-500 shrink-0 mt-0.5" /> Kỹ năng giao tiếp tốt, trung thực, chịu được áp lực công việc.</li>
                </ul>
              </section>

              {/* Benefits */}
              <section className="bg-primary-light/30 rounded-[24px] border border-primary/10 p-8">
                <h2 className="text-xl font-black text-primary-dark mb-6 flex items-center gap-3 uppercase tracking-wider">
                  <Gift size={24} className="text-primary" /> Quyền lợi được hưởng
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-biotechvet-dark mb-2">💰 Thu nhập hấp dẫn</h4>
                    <p className="text-sm text-gray-500 font-medium">Lương cơ bản + thưởng doanh số không giới hạn. Thu nhập từ 12-25 triệu/tháng.</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-biotechvet-dark mb-2">🏥 Bảo hiểm đầy đủ</h4>
                    <p className="text-sm text-gray-500 font-medium">BHXH, BHYT, BHTN theo quy định. Bảo hiểm sức khỏe bổ sung cho nhân viên.</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-biotechvet-dark mb-2">📚 Đào tạo chuyên sâu</h4>
                    <p className="text-sm text-gray-500 font-medium">Được đào tạo bài bản về sản phẩm, kỹ năng bán hàng và kiến thức thú y chuyên sâu.</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-biotechvet-dark mb-2">✈️ Du lịch hàng năm</h4>
                    <p className="text-sm text-gray-500 font-medium">Du lịch trong và ngoài nước. Team building, sự kiện nội bộ phong phú.</p>
                  </div>
                </div>
              </section>

              {/* How to Apply */}
              <section className="bg-biotechvet-dark rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-black mb-6 uppercase tracking-wider flex items-center gap-3">
                    <Send size={24} /> Cách nộp hồ sơ
                  </h2>
                  <p className="text-white/80 mb-8 font-medium leading-relaxed">
                    Ứng viên quan tâm vui lòng gửi CV và thư ứng tuyển về một trong các kênh liên hệ dưới đây. 
                    Hồ sơ bao gồm: CV, bằng cấp liên quan, ảnh chân dung 4x6.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="mailto:pkd.biotechvet@gmail.com" className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition-all group">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Mail size={22} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Email ứng tuyển</div>
                        <div className="font-black">pkd.biotechvet@gmail.com</div>
                      </div>
                    </a>
                    <a href="tel:0974999204" className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition-all group">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Phone size={22} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Hotline tuyển dụng</div>
                        <div className="font-black">097 499 9204</div>
                      </div>
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-10">
              {/* Featured Products */}
              <div className="bg-biotechvet-alt p-6 rounded-[24px] border border-gray-100">
                <h3 className="font-black text-lg text-biotechvet-dark mb-6 border-b border-gray-200 pb-3 uppercase tracking-wider">Sản phẩm nổi bật</h3>
                <div className="space-y-5">
                  {featuredProducts.map((p: Product) => (
                    <Link href={`/san-pham/${p.slug}`} key={p.id} className="flex gap-4 group">
                      <div className="w-16 h-16 bg-white rounded-xl border border-gray-100 p-1.5 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:shadow-md transition-all">
                        <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-biotechvet-dark group-hover:text-primary transition-colors line-clamp-2 text-sm leading-snug">{p.name}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Latest News */}
              <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                <h3 className="font-black text-lg text-biotechvet-dark mb-6 border-b border-gray-200 pb-3 uppercase tracking-wider">Tin tức mới</h3>
                <div className="space-y-5">
                  {latestNews.map((a: Article) => (
                    <Link href={`/bai-viet/${a.slug}`} key={a.id} className="flex gap-4 group">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                        <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-biotechvet-dark group-hover:text-primary transition-colors line-clamp-2 text-sm leading-snug">{a.title}</h4>
                        <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">{a.publishDate}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
