"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Play, Pause, Building2, History, Target, Award, Heart, Factory, Users, FileText, Download, Eye } from 'lucide-react';
import Sidebar from '@/components/shared/Sidebar';

const tabs = [
  { id: 'catalogue', label: 'Catalogue', icon: <FileText size={18} /> },
  { id: 'gioi-thieu', label: 'Giới thiệu', icon: <Building2 size={18} /> },
  { id: 'lich-su', label: 'Lịch sử', icon: <History size={18} /> },
  { id: 'tam-nhin', label: 'Tầm nhìn – Sứ mệnh', icon: <Target size={18} /> },
  { id: 'co-so', label: 'Cơ sở vật chất', icon: <Factory size={18} /> },
  { id: 'co-cau', label: 'Cơ cấu tổ chức', icon: <Users size={18} /> },
];

export default function AboutContent() {
  const [activeTab, setActiveTab] = useState('catalogue');

  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="bg-sanfovet-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/farm.png')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
           <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                 <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter italic">Về Sanfovet</h1>
                 <p className="text-xl text-primary-light max-w-2xl font-medium">Hành trình 20 năm đồng hành cùng người chăn nuôi Việt Nam.</p>
              </div>
              <div className="flex-1 relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                 <video 
                   src="/videos/about.mp4" 
                   className="w-full h-full object-cover"
                   poster="/images/about.png"
                   controls
                 ></video>
              </div>
           </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <Sidebar />
          
          <div className="flex-1">
            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 mb-12 bg-gray-50 p-2 rounded-[24px] border border-gray-100">
               {tabs.map((tab) => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                     activeTab === tab.id 
                     ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                     : 'text-gray-400 hover:text-sanfovet-dark hover:bg-white'
                   }`}
                 >
                   {tab.icon} {tab.label}
                 </button>
               ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'catalogue' && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-black text-sanfovet-dark italic">Hồ Sơ Năng Lực & Catalogue</h2>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    Khám phá chi tiết năng lực sản xuất và danh mục sản phẩm thuốc thú y đa dạng của SANFOVET qua các tài liệu được cập nhật mới nhất.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: "Catalogue Sản phẩm 2026", type: "PDF", size: "24 MB" },
                      { title: "Hồ sơ năng lực Sanfovet", type: "PDF", size: "12 MB" }
                    ].map((doc, idx) => (
                      <div key={idx} className="p-6 bg-sanfovet-alt rounded-[24px] border border-gray-100 flex items-center gap-4 group hover:bg-white hover:shadow-xl transition-all">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          <FileText size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sanfovet-dark text-sm">{doc.title}</h4>
                          <span className="text-[10px] font-bold text-gray-400 uppercase">{doc.type} • {doc.size}</span>
                        </div>
                        <div className="flex gap-2">
                           <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"><Eye size={18} /></button>
                           <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"><Download size={18} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-primary/5 p-8 rounded-[32px] border border-primary/10">
                    <h4 className="font-black text-primary mb-2">Bạn muốn nhận bản in?</h4>
                    <p className="text-sm text-gray-500 mb-6">Chúng tôi sẵn sàng gửi bộ Catalogue in màu chất lượng cao đến tận showroom/trang trại của bạn hoàn toàn miễn phí.</p>
                    <Link href="/lien-he" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">Liên hệ ngay</Link>
                  </div>
                </div>
              )}
              {activeTab === 'gioi-thieu' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-6">
                      <h2 className="text-3xl font-black text-sanfovet-dark italic">Tổng quan về SANFOVET</h2>
                      <p className="text-gray-600 font-medium leading-relaxed">
                        SANFOVET là thương hiệu thuốc thú y thuộc Công ty CP Đầu tư liên doanh Việt Anh. Với hơn 20 năm phát triển, chúng tôi tự hào mang đến các giải pháp dược phẩm chất lượng cao, ứng dụng công nghệ hiện đại từ Hoa Kỳ.
                      </p>
                      <div className="flex gap-4">
                        <div className="flex-1 p-4 bg-sanfovet-alt rounded-2xl border border-gray-100">
                           <div className="text-primary font-black text-2xl mb-1">200+</div>
                           <div className="text-[10px] uppercase font-bold text-gray-400">Sản phẩm</div>
                        </div>
                        <div className="flex-1 p-4 bg-sanfovet-alt rounded-2xl border border-gray-100">
                           <div className="text-primary font-black text-2xl mb-1">63</div>
                           <div className="text-[10px] uppercase font-bold text-gray-400">Tỉnh thành</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <img src="/images/about-factory.png" alt="Nhà máy Sanfovet" className="rounded-[40px] shadow-xl" />
                    </div>
                  </div>
                </div>
              )}
              {/* Other tabs omitted for brevity in this scratch reconstruct, but I should restore them too if I have them */}
              {/* Restoration from history... */}
              {activeTab === 'lich-su' && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-black text-sanfovet-dark italic">Lịch sử hình thành</h2>
                  <div className="relative pl-8 border-l-2 border-primary/30 space-y-12 py-4">
                    <div className="relative">
                      <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm"></div>
                      <div className="font-black text-primary text-xl mb-2">Năm 2002</div>
                      <p className="text-gray-600 font-medium">Công ty Cổ phần Đầu tư Liên doanh Việt Anh (Viet Anh Group) chính thức được thành lập, đặt nền móng cho sự ra đời của thương hiệu SANFOVET.</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm"></div>
                      <div className="font-black text-primary text-xl mb-2">Năm 2010</div>
                      <p className="text-gray-600 font-medium">Khánh thành nhà máy sản xuất thuốc thú y đầu tiên đạt chuẩn GMP-WHO, khẳng định vị thế về chất lượng trên thị trường.</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm"></div>
                      <div className="font-black text-primary text-xl mb-2">Năm 2018</div>
                      <p className="text-gray-600 font-medium">Mở rộng hệ sinh thái Sanford Pharma USA và Viaprotic, ứng dụng công nghệ hiện đại từ Hoa Kỳ vào sản xuất chuyên sâu.</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm"></div>
                      <div className="font-black text-primary text-xl mb-2">Hiện tại</div>
                      <p className="text-gray-600 font-medium">Trở thành tập đoàn dược phẩm thú y hàng đầu Việt Nam với mạng lưới hơn 1.000 đại lý và xuất khẩu sang nhiều thị trường quốc tế.</p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'tam-nhin' && (
                <div className="space-y-10 animate-fade-in">
                  <div className="bg-sanfovet-dark text-white p-10 rounded-[40px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <h2 className="text-3xl font-black italic mb-6 relative z-10">Tầm nhìn & Sứ mệnh</h2>
                    <div className="space-y-8 relative z-10">
                      <div>
                        <h4 className="text-primary-light font-black uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                          <Target size={16} /> Tầm nhìn chiến lược
                        </h4>
                        <p className="text-lg font-medium leading-relaxed">
                          Trở thành Tập đoàn dược phẩm với hệ sinh thái công nghệ sinh học và dược phẩm toàn diện, mang lại hiệu quả thiết thực và bền vững trong chăn nuôi, vươn tầm quốc tế.
                        </p>
                      </div>
                      <div className="pt-8 border-t border-white/10">
                        <h4 className="text-primary-light font-black uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                          <Heart size={16} /> Sứ mệnh cao cả
                        </h4>
                        <p className="text-lg font-medium leading-relaxed">
                          Bảo vệ sức khỏe cho con người và vật nuôi thông qua các sản phẩm hữu hiệu; góp phần bảo vệ môi trường và phát triển cộng đồng chăn nuôi bền vững.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-sanfovet-alt rounded-[32px] border border-gray-100 italic">
                      "Chất lượng là danh dự, sự hài lòng của bà con là thước đo thành công của Sanfovet."
                    </div>
                    <div className="p-8 bg-primary/5 rounded-[32px] border border-primary/10 flex items-center justify-center">
                       <Link href="/cam-nang-chan-nuoi" className="text-primary font-black uppercase tracking-widest text-xs hover:underline">Khám phá giá trị cốt lõi</Link>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'co-so' && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-black text-sanfovet-dark italic">Cơ sở vật chất</h2>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    SANFOVET đầu tư hệ thống trang thiết bị máy móc tiên tiến, dây chuyền sản xuất khép kín vận hành theo tiêu chuẩn nghiêm ngặt nhất thế giới.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group rounded-[32px] overflow-hidden shadow-lg border-4 border-white relative">
                      <img src="/images/farm.png" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" alt="Nhà máy GMP" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                        <h4 className="font-black uppercase text-sm mb-1">Dây chuyền Tiêm</h4>
                        <p className="text-[10px] opacity-70 font-medium">Đạt chuẩn GMP-WHO quốc tế</p>
                      </div>
                    </div>
                    <div className="group rounded-[32px] overflow-hidden shadow-lg border-4 border-white relative">
                      <img src="/images/news-2.png" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" alt="Phòng thí nghiệm" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                        <h4 className="font-black uppercase text-sm mb-1">Phòng Lab R&D</h4>
                        <p className="text-[10px] opacity-70 font-medium">Kiểm soát chất lượng đầu ra 100%</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                       <div><div className="text-primary font-black text-2xl">03</div><div className="text-[10px] uppercase font-bold text-gray-400">Nhà máy lớn</div></div>
                       <div><div className="text-primary font-black text-2xl">10+</div><div className="text-[10px] uppercase font-bold text-gray-400">Dây chuyền</div></div>
                       <div><div className="text-primary font-black text-2xl">5000m²</div><div className="text-[10px] uppercase font-bold text-gray-400">Diện tích kho</div></div>
                       <div><div className="text-primary font-black text-2xl">Top 10</div><div className="text-[10px] uppercase font-bold text-gray-400">Thương hiệu</div></div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'co-cau' && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-3xl font-black text-sanfovet-dark italic">Cơ cấu tổ chức</h2>
                  <p className="text-gray-600 font-medium leading-relaxed mb-10">
                    Hệ thống quản trị tinh gọn với đội ngũ nhân sự chất lượng cao, tận tâm và chuyên nghiệp.
                  </p>
                  <div className="space-y-4 max-w-2xl mx-auto">
                    {[
                      { role: "Hội đồng Quản trị", color: "bg-sanfovet-dark text-white" },
                      { role: "Tổng Giám đốc", color: "bg-primary text-white" },
                      { role: "Khối Sản xuất - Kỹ thuật", color: "bg-sanfovet-alt text-sanfovet-dark" },
                      { role: "Khối Kinh doanh - Marketing", color: "bg-sanfovet-alt text-sanfovet-dark" },
                      { role: "Khối Hành chính - Nhân sự", color: "bg-sanfovet-alt text-sanfovet-dark" }
                    ].map((node, i) => (
                      <div key={i} className={`p-6 rounded-2xl shadow-sm text-center font-black uppercase tracking-widest text-sm border border-gray-100 ${node.color} relative overflow-hidden`}>
                        {i > 1 && <div className="absolute left-1/2 -top-10 w-px h-10 bg-gray-200 -translate-x-1/2"></div>}
                        {node.role}
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 p-8 bg-primary/5 rounded-[40px] flex flex-col md:flex-row items-center gap-8 border border-primary/10">
                    <img src="/images/logo.png" className="w-20 opacity-30 grayscale" alt="Sanfovet" />
                    <p className="text-sm text-gray-500 font-medium italic">
                      "Chúng tôi tin rằng con người là tài sản quý giá nhất. Tại Sanfovet, mỗi cá nhân đều là một mắt xích quan trọng trong hành trình bảo vệ vật nuôi."
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
