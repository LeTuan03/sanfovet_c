"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Play, Pause, Building2, History, Target, Award, Heart, Factory, Users } from 'lucide-react';
import Sidebar from '@/components/shared/Sidebar';

const tabs = [
  { id: 'gioi-thieu', label: 'Giới thiệu', icon: <Building2 size={18} /> },
  { id: 'lich-su', label: 'Lịch sử', icon: <History size={18} /> },
  { id: 'tam-nhin', label: 'Tầm nhìn – Sứ mệnh', icon: <Target size={18} /> },
  { id: 'co-so', label: 'Cơ sở vật chất', icon: <Factory size={18} /> },
  { id: 'co-cau', label: 'Cơ cấu tổ chức', icon: <Users size={18} /> },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('gioi-thieu');

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-sanfovet-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/farm.png')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/60 font-bold mb-6 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-white">Giới thiệu</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-wider">Giới Thiệu Về SANFOVET</h1>
          <p className="text-xl text-primary-light max-w-3xl font-medium">
            Công ty CP Đầu tư Liên doanh Việt Anh – Tiên phong công nghệ USA trong ngành dược thú y Việt Nam.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 bg-sanfovet-alt">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-[32px] overflow-hidden shadow-2xl border-4 border-white relative group">
            <video 
              className="w-full aspect-video object-cover bg-black"
              poster="/images/about.png"
              controls
              preload="none"
            >
              <source src="/videos/sanfovet-intro.mp4" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <main className="flex-1">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-10 bg-sanfovet-alt p-2 rounded-2xl">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-gray-500 hover:bg-white hover:text-primary'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'gioi-thieu' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2">
                      <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-white">
                        <img src="/images/about.png" alt="Nhà máy Sanfovet" className="w-full h-auto object-cover" />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-6 text-gray-600 leading-relaxed font-medium">
                      <h2 className="text-3xl font-black text-sanfovet-dark leading-tight">Công ty CP Đầu tư Liên doanh Việt Anh</h2>
                      <p>
                        SANFOVET tự hào là đơn vị tiên phong trong lĩnh vực sản xuất và phân phối thuốc thú y trang trại tại Việt Nam. 
                        Với công nghệ tiên tiến từ Hoa Kỳ, chúng tôi cam kết mang đến những sản phẩm chất lượng cao nhất.
                      </p>
                      <p>
                        Đội ngũ hơn 50 bác sĩ thú y và kỹ thuật viên giàu kinh nghiệm luôn sẵn sàng hỗ trợ kỹ thuật cho bà con chăn nuôi trên toàn quốc.
                      </p>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="text-center p-4 bg-primary-light rounded-2xl">
                          <div className="text-2xl font-black text-primary">200+</div>
                          <div className="text-xs text-gray-500 font-bold uppercase">Sản phẩm</div>
                        </div>
                        <div className="text-center p-4 bg-primary-light rounded-2xl">
                          <div className="text-2xl font-black text-primary">63</div>
                          <div className="text-xs text-gray-500 font-bold uppercase">Tỉnh thành</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'lich-su' && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-black text-sanfovet-dark">Hơn 15 Năm Đồng Hành Cùng Nhà Chăn Nuôi</h2>
                  <div className="space-y-6 text-gray-600 leading-relaxed font-medium">
                    <p>Được thành lập từ năm 2009, SANFOVET là thương hiệu thuộc Công ty CP Đầu tư Liên doanh Việt Anh.</p>
                    <div className="space-y-6 border-l-4 border-primary pl-8 ml-4">
                      <div className="relative">
                        <div className="absolute -left-[42px] w-5 h-5 bg-primary rounded-full border-4 border-white"></div>
                        <h4 className="font-black text-primary text-lg">2009</h4>
                        <p>Thành lập Công ty CP Đầu tư Liên doanh Việt Anh, ra mắt thương hiệu SANFOVET.</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[42px] w-5 h-5 bg-primary rounded-full border-4 border-white"></div>
                        <h4 className="font-black text-primary text-lg">2012</h4>
                        <p>Khánh thành nhà máy sản xuất đạt tiêu chuẩn GMP-WHO tại Khu CN Liên Phương, Hà Nội.</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[42px] w-5 h-5 bg-primary rounded-full border-4 border-white"></div>
                        <h4 className="font-black text-primary text-lg">2018</h4>
                        <p>Mở rộng hệ thống phân phối ra toàn quốc 63 tỉnh thành. Đạt mốc 100+ sản phẩm.</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[42px] w-5 h-5 bg-primary rounded-full border-4 border-white"></div>
                        <h4 className="font-black text-primary text-lg">2024</h4>
                        <p>Ra mắt dòng sản phẩm mới ứng dụng công nghệ USA, vượt mốc 200+ sản phẩm.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tam-nhin' && (
                <div className="space-y-10 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { icon: <Target className="text-primary" size={32} />, title: "Sứ mệnh", desc: "Cung cấp những sản phẩm thuốc thú y chất lượng cao nhất, góp phần bảo vệ sức khỏe vật nuôi và nâng cao hiệu quả kinh tế cho người chăn nuôi Việt Nam." },
                      { icon: <Award className="text-primary" size={32} />, title: "Tầm nhìn", desc: "Trở thành doanh nghiệp hàng đầu trong lĩnh vực dược phẩm thú y tại Việt Nam và khu vực, tiên phong trong ứng dụng công nghệ hiện đại." },
                      { icon: <Heart className="text-primary" size={32} />, title: "Giá trị cốt lõi", desc: "Tận tâm - Chuyên nghiệp - Sáng tạo - Trách nhiệm. Chúng tôi đặt chữ Tín và lợi ích của khách hàng lên hàng đầu." },
                    ].map((v, i) => (
                      <div key={i} className="bg-sanfovet-alt p-10 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <div className="mb-6">{v.icon}</div>
                        <h4 className="text-xl font-black text-sanfovet-dark mb-4">{v.title}</h4>
                        <p className="text-gray-500 font-medium leading-relaxed">{v.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'co-so' && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-black text-sanfovet-dark">Nhà Máy Đạt Tiêu Chuẩn GMP-GLP-GSP</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-[24px] overflow-hidden shadow-xl">
                      <img src="/images/about.png" alt="Nhà máy GMP" className="w-full h-64 object-cover" />
                    </div>
                    <div className="rounded-[24px] overflow-hidden shadow-xl">
                      <img src="/images/farm.png" alt="Dây chuyền sản xuất" className="w-full h-64 object-cover" />
                    </div>
                  </div>
                  <div className="text-gray-600 leading-relaxed space-y-4 font-medium">
                    <p>Nhà máy sản xuất thuốc thú y SANFOVET tọa lạc tại Khu công nghiệp Liên Phương, Thường Tín, Hà Nội với diện tích hơn 5.000m².</p>
                    <p>Toàn bộ quy trình sản xuất được thực hiện trong các phòng sạch đạt tiêu chuẩn GMP-WHO, với hệ thống kiểm soát chất lượng nghiêm ngặt từ nguyên liệu đầu vào đến thành phẩm.</p>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="text-center p-5 bg-primary-light rounded-2xl border border-primary/10">
                        <div className="text-xl font-black text-primary">GMP</div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase mt-1">Tiêu chuẩn WHO</div>
                      </div>
                      <div className="text-center p-5 bg-primary-light rounded-2xl border border-primary/10">
                        <div className="text-xl font-black text-primary">GLP</div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase mt-1">Phòng thí nghiệm</div>
                      </div>
                      <div className="text-center p-5 bg-primary-light rounded-2xl border border-primary/10">
                        <div className="text-xl font-black text-primary">GSP</div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase mt-1">Bảo quản thuốc</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'co-cau' && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-black text-sanfovet-dark">Cơ Cấu Tổ Chức Công Ty</h2>
                  <div className="bg-sanfovet-alt rounded-[32px] p-8 border border-gray-100">
                    <div className="text-center mb-8">
                      <div className="inline-block bg-primary text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg">
                        HỘI ĐỒNG QUẢN TRỊ
                      </div>
                    </div>
                    <div className="text-center mb-8">
                      <div className="inline-block bg-primary-dark text-white px-8 py-4 rounded-2xl font-black shadow-lg">
                        BAN GIÁM ĐỐC
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Phòng Kinh doanh', 'Phòng Kỹ thuật', 'Phòng Sản xuất', 'Phòng Hành chính'].map(dept => (
                        <div key={dept} className="bg-white p-5 rounded-2xl text-center border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                          <div className="font-bold text-sanfovet-dark text-sm">{dept}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <Sidebar />
          </aside>
        </div>
      </div>

      {/* Stats section */}
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
