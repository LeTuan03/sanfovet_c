import React from 'react';
import { Microscope, ShieldCheck, Users, Target, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  const values = [
    { icon: <Target className="text-primary" size={32} />, title: "Sứ mệnh", desc: "Cung cấp những sản phẩm thuốc thú y chất lượng cao nhất, góp phần bảo vệ sức khỏe vật nuôi và nâng cao hiệu quả kinh tế cho người chăn nuôi Việt Nam." },
    { icon: <Award className="text-primary" size={32} />, title: "Tầm nhìn", desc: "Trở thành doanh nghiệp hàng đầu trong lĩnh vực dược phẩm thú y tại Việt Nam và khu vực, tiên phong trong ứng dụng công nghệ hiện đại." },
    { icon: <Heart className="text-primary" size={32} />, title: "Giá trị cốt lõi", desc: "Tận tâm - Chuyên nghiệp - Sáng tạo - Trách nhiệm. Chúng tôi đặt chữ Tín và lợi ích của khách hàng lên hàng đầu." }
  ];

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-sanfovet-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/farm.png')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
           <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-wider">Giới Thiệu Về SANFOVET</h1>
           <p className="text-xl text-primary-light max-w-3xl mx-auto font-medium">
             Công ty CP Đầu tư Liên doanh Việt Anh – Tiên phong công nghệ USA trong ngành dược thú y Việt Nam.
           </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
             <div className="w-full lg:w-1/2">
                <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white group">
                   <img src="/images/about.png" alt="Nhà máy Sanfovet" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
             </div>
             <div className="w-full lg:w-1/2">
                <h2 className="text-primary font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                  <span className="w-10 h-px bg-primary"></span> Lịch sử hình thành
                </h2>
                <h3 className="text-3xl font-black text-sanfovet-dark mb-8 leading-tight">Hơn 15 Năm Đồng Hành Cùng Nhà Chăn Nuôi</h3>
                <div className="space-y-6 text-gray-600 leading-relaxed font-medium">
                   <p>
                     Được thành lập từ năm 2009, SANFOVET là thương hiệu thuộc Công ty CP Đầu tư Liên doanh Việt Anh. 
                     Chúng tôi đã không ngừng nỗ lực để xây dựng hệ thống sản xuất và phân phối chuyên nghiệp nhất.
                   </p>
                   <p>
                     Với nhà máy đạt tiêu chuẩn <strong>GMP-WHO</strong> tại Khu công nghiệp Liên Phương, Thường Tín, Hà Nội, 
                     SANFOVET cam kết quy trình sản xuất khép kín, kiểm soát chất lượng nghiêm ngặt theo tiêu chuẩn quốc tế.
                   </p>
                   <p>
                     Hiện nay, mạng lưới phân phối của chúng tôi đã phủ khắp 63 tỉnh thành, với hơn 200 mã sản phẩm đa dạng 
                     đáp ứng mọi nhu cầu điều trị và bổ sung dinh dưỡng cho gia súc, gia cầm.
                   </p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {values.map((v, i) => (
               <div key={i} className="bg-sanfovet-alt p-10 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="mb-6">{v.icon}</div>
                  <h4 className="text-xl font-black text-sanfovet-dark mb-4">{v.title}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed">{v.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Stats/Highlights section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                 <div className="text-5xl font-black mb-2 italic">15+</div>
                 <div className="text-xs font-bold uppercase tracking-[2px] opacity-80">Năm kinh nghiệm</div>
              </div>
              <div className="text-center">
                 <div className="text-5xl font-black mb-2 italic">GMP</div>
                 <div className="text-xs font-bold uppercase tracking-[2px] opacity-80">Tiêu chuẩn WHO</div>
              </div>
              <div className="text-center">
                 <div className="text-5xl font-black mb-2 italic">200+</div>
                 <div className="text-xs font-bold uppercase tracking-[2px] opacity-80">Sản phẩm chất lượng</div>
              </div>
              <div className="text-center">
                 <div className="text-5xl font-black mb-2 italic">100%</div>
                 <div className="text-xs font-bold uppercase tracking-[2px] opacity-80">Công nghệ USA</div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
