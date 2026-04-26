"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronRight, Building2, History, Target, Award, Heart, Factory, Users } from 'lucide-react';
import Sidebar from '@/components/shared/Sidebar';

const tabs = [
  { id: 'gioi-thieu', label: 'Giới thiệu', icon: <Building2 size={18} /> },
  { id: 'lich-su', label: 'Lịch sử', icon: <History size={18} /> },
  { id: 'tam-nhin', label: 'Tầm nhìn – Sứ mệnh', icon: <Target size={18} /> },
  { id: 'co-so', label: 'Cơ sở', icon: <Factory size={18} /> },
  { id: 'co-cau', label: 'Cơ cấu', icon: <Users size={18} /> },
];

export default function AboutContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('gioi-thieu');

  useEffect(() => {
    if (tabParam && tabs.find(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const tabVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="bg-biotechvet-dark text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/farm.png')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-biotechvet-dark via-biotechvet-dark/90 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
           <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 text-center lg:text-left"
              >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-sm font-bold text-primary-light uppercase tracking-widest">
                     <Building2 size={16} /> Câu chuyện biotechvet
                  </div>
                 <h1 className="text-5xl lg:text-7xl font-black mb-6 uppercase tracking-tighter leading-tight">
                    Về <span className="text-primary-dark">biotechvet</span>
                 </h1>
                 <p className="text-xl text-gray-300 max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0">
                    Hành trình 20 năm đồng hành cùng người chăn nuôi Việt Nam, kiến tạo những giá trị bền vững và mang lại giải pháp thú y toàn diện.
                 </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 w-full"
              >
                 <div className="relative w-full aspect-video rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group">
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                    <video 
                      src="/videos/about.mp4" 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      poster="/images/about.png"
                      controls
                    ></video>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1">
            <Sidebar />
          </div>
          
          <div className="lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
            {/* Tabs Navigation */}
            <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-12 bg-gray-50/80 backdrop-blur-sm p-3 rounded-3xl lg:rounded-full border border-gray-100 shadow-sm md:flex-wrap">
               {tabs.map((tab) => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                     activeTab === tab.id 
                     ? 'bg-primary text-white shadow-[0_8px_20px_rgb(var(--color-primary)/0.25)] scale-100' 
                     : 'text-gray-500 hover:text-biotechvet-dark hover:bg-white hover:shadow-sm'
                   }`}
                 >
                   {tab.icon} {tab.label}
                 </button>
               ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[500px]">
              <AnimatePresence mode="wait">
                {activeTab === 'gioi-thieu' && (
                  <motion.div key="gioi-thieu" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                      <div className="flex-1 space-y-8">
                        <div className="border-l-4 border-primary pl-6">
                           <h2 className="text-3xl lg:text-4xl font-black text-biotechvet-dark uppercase tracking-tight">Tổng quan về BIOTECH-VET</h2>
                           <p className="text-gray-500 font-medium leading-relaxed mt-6 text-lg">
                             <strong className="text-biotechvet-dark">BIOTECH-VET</strong> là thương hiệu thuốc thú y thuộc Công Ty CP Công Nghệ Sinh Học Thú Y. Với hơn 20 năm phát triển, chúng tôi tự hào mang đến các giải pháp dược phẩm chất lượng cao, ứng dụng công nghệ hiện đại từ Hoa Kỳ.
                           </p>
                           <p className="text-gray-500 font-medium leading-relaxed mt-4 text-lg">
                             Chúng tôi hướng đến việc liên tục đổi mới, cải tiến chất lượng và dịch vụ, đáp ứng nhu cầu ngày càng cao của ngành chăn nuôi trong và ngoài nước.
                           </p>
                        </div>
                        <div className="flex gap-4 sm:gap-6">
                          <div className="flex-1 p-6 bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                             <div className="text-primary font-black text-4xl lg:text-5xl mb-2">200+</div>
                             <div className="text-xs uppercase font-bold text-gray-400 tracking-widest">Sản phẩm</div>
                          </div>
                          <div className="flex-1 p-6 bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                             <div className="text-primary font-black text-4xl lg:text-5xl mb-2">63</div>
                             <div className="text-xs uppercase font-bold text-gray-400 tracking-widest">Tỉnh thành</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 w-full">
                        <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
                           <img src="/images/about.png" alt="Nhà máy biotechvet" className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-gradient-to-t from-biotechvet-dark/60 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'lich-su' && (
                  <motion.div key="lich-su" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
                    <div className="border-l-4 border-primary pl-6 mb-12">
                       <h2 className="text-3xl lg:text-4xl font-black text-biotechvet-dark uppercase tracking-tight">Lịch sử hình thành</h2>
                       <p className="text-gray-500 font-medium leading-relaxed mt-4 text-lg">
                         Hành trình đầy tự hào của biotechvet trong suốt hơn hai thập kỷ cống hiến cho ngành chăn nuôi Việt Nam.
                       </p>
                    </div>
                    <div className="relative pl-8 md:pl-0">
                      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 rounded-full"></div>
                      <div className="md:hidden absolute left-[15px] top-0 bottom-0 w-1 bg-gray-100 rounded-full"></div>
                      <div className="space-y-12">
                         {[
                           { year: "2002", text: "Công ty Cổ phần Đầu tư Liên doanh Việt Anh (Viet Anh Group) chính thức được thành lập, đặt nền móng cho sự ra đời của thương hiệu BIOTECH-VET." },
                           { year: "2010", text: "Khánh thành nhà máy sản xuất thuốc thú y đầu tiên đạt chuẩn GMP-WHO, khẳng định vị thế về chất lượng trên thị trường trong nước." },
                           { year: "2018", text: "Mở rộng hệ sinh thái Sanford Pharma USA và Viaprotic, ứng dụng công nghệ hiện đại từ Hoa Kỳ vào sản xuất chuyên sâu." },
                           { year: "Hiện tại", text: "Trở thành tập đoàn dược phẩm thú y hàng đầu Việt Nam với mạng lưới hơn 1.000 đại lý và xuất khẩu sang nhiều thị trường quốc tế." }
                         ].map((item, index) => (
                           <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                              <div className="absolute left-[-33px] md:left-1/2 w-8 h-8 rounded-full bg-primary border-4 border-white shadow-md md:-translate-x-1/2 z-10 flex items-center justify-center">
                                 <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                                 <div className="bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-500 group">
                                     <div className="text-4xl font-black text-primary-dark mb-4 inline-block">{item.year}</div>
                                     <p className="text-gray-600 font-medium leading-relaxed group-hover:text-biotechvet-dark transition-colors">{item.text}</p>
                                 </div>
                              </div>
                           </div>
                         ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'tam-nhin' && (
                  <motion.div key="tam-nhin" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                    <div className="bg-biotechvet-dark text-white p-10 lg:p-16 rounded-[40px] relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl -mr-64 -mt-64 pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -ml-64 -mb-64 pointer-events-none"></div>
                      
                      <div className="relative z-10 flex flex-col lg:flex-row gap-16">
                        <div className="flex-1 space-y-10 border-b lg:border-b-0 lg:border-r border-white/10 pb-10 lg:pb-0 lg:pr-16">
                          <div>
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary-light mb-8 backdrop-blur-md">
                               <Target size={32} />
                            </div>
                            <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-4">
                              Tầm nhìn chiến lược
                            </h4>
                            <p className="text-lg text-gray-300 font-medium leading-relaxed">
                              Trở thành Tập đoàn dược phẩm với hệ sinh thái công nghệ sinh học và dược phẩm toàn diện, mang lại hiệu quả thiết thực và bền vững trong chăn nuôi, vươn tầm quốc tế.
                            </p>
                          </div>
                        </div>
                        <div className="flex-1 space-y-10">
                          <div>
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary-light mb-8 backdrop-blur-md">
                               <Heart size={32} />
                            </div>
                            <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-4">
                              Sứ mệnh cao cả
                            </h4>
                            <p className="text-lg text-gray-300 font-medium leading-relaxed">
                              Bảo vệ sức khỏe cho con người và vật nuôi thông qua các sản phẩm hữu hiệu; góp phần bảo vệ môi trường và phát triển cộng đồng chăn nuôi bền vững.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-10 bg-white rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                         <QuoteIcon className="absolute right-6 bottom-6 w-24 h-24 text-gray-50 opacity-50 group-hover:text-primary/5 transition-colors" />
                         <p className="text-xl font-bold text-biotechvet-dark leading-relaxed italic relative z-10">
                           "Chất lượng là danh dự, sự hài lòng của bà con là thước đo thành công của biotechvet."
                         </p>
                         <div className="mt-6 flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400">CEO</div>
                            <div>
                               <div className="font-black text-biotechvet-dark">Ban Lãnh Đạo</div>
                               <div className="text-xs uppercase font-bold text-gray-400">biotechvet Group</div>
                            </div>
                         </div>
                      </div>
                      <div className="p-10 bg-gradient-to-br from-primary to-primary-dark rounded-[32px] text-white shadow-lg flex flex-col justify-center items-center text-center">
                         <Award size={48} className="mb-6 opacity-80" />
                         <h4 className="text-2xl font-black mb-4">Tìm hiểu triết lý của chúng tôi</h4>
                         <Link href="/cam-nang-chan-nuoi" className="inline-flex items-center gap-2 bg-white text-biotechvet-dark px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-xl">
                            Khám phá ngay <ChevronRight size={18} />
                         </Link>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'co-so' && (
                  <motion.div key="co-so" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
                    <div className="border-l-4 border-primary pl-6">
                       <h2 className="text-3xl lg:text-4xl font-black text-biotechvet-dark uppercase tracking-tight">Cơ sở vật chất</h2>
                       <p className="text-gray-500 font-medium leading-relaxed mt-4 text-lg max-w-3xl">
                         BIOTECH-VET đầu tư hệ thống trang thiết bị máy móc tiên tiến, dây chuyền sản xuất khép kín vận hành theo tiêu chuẩn GMP-WHO nghiêm ngặt nhất.
                       </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group rounded-[32px] overflow-hidden shadow-lg relative aspect-[4/3]">
                        <img src="/images/farm.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Nhà máy GMP" />
                        <div className="absolute inset-0 bg-gradient-to-t from-biotechvet-dark via-biotechvet-dark/40 to-transparent flex flex-col justify-end p-8 text-white">
                          <span className="w-12 h-1 bg-primary mb-4 rounded-full"></span>
                          <h4 className="text-2xl font-black uppercase tracking-tight mb-2">Dây chuyền Tiêm</h4>
                          <p className="text-sm text-gray-300 font-medium">Đạt chuẩn GMP-WHO quốc tế với công nghệ tự động hóa 100%.</p>
                        </div>
                      </div>
                      <div className="group rounded-[32px] overflow-hidden shadow-lg relative aspect-[4/3]">
                        <img src="/images/news-2.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Phòng thí nghiệm" />
                        <div className="absolute inset-0 bg-gradient-to-t from-biotechvet-dark via-biotechvet-dark/40 to-transparent flex flex-col justify-end p-8 text-white">
                          <span className="w-12 h-1 bg-primary mb-4 rounded-full"></span>
                          <h4 className="text-2xl font-black uppercase tracking-tight mb-2">Phòng Lab R&D</h4>
                          <p className="text-sm text-gray-300 font-medium">Trung tâm nghiên cứu và kiểm soát chất lượng đầu ra khắt khe.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8 lg:p-12 rounded-[40px] border border-gray-100 shadow-sm">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 divide-x divide-gray-100">
                         <div className="text-center px-4">
                            <div className="text-5xl font-black text-primary-dark mb-3">03</div>
                            <div className="text-xs uppercase font-bold text-gray-400 tracking-widest">Nhà máy lớn</div>
                         </div>
                         <div className="text-center px-4">
                            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-biotechvet-dark to-slate-600 mb-3">10+</div>
                            <div className="text-xs uppercase font-bold text-gray-400 tracking-widest">Dây chuyền</div>
                         </div>
                         <div className="text-center px-4">
                            <div className="text-5xl font-black text-primary-dark mb-3">5k</div>
                            <div className="text-xs uppercase font-bold text-gray-400 tracking-widest">Diện tích m²</div>
                         </div>
                         <div className="text-center px-4">
                            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-biotechvet-dark to-slate-600 mb-3">Top</div>
                            <div className="text-xs uppercase font-bold text-gray-400 tracking-widest">Thương hiệu</div>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'co-cau' && (
                  <motion.div key="co-cau" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
                    <div className="border-l-4 border-primary pl-6 mb-12">
                       <h2 className="text-3xl lg:text-4xl font-black text-biotechvet-dark uppercase tracking-tight">Cơ cấu tổ chức</h2>
                       <p className="text-gray-500 font-medium leading-relaxed mt-4 text-lg">
                         Hệ thống quản trị tinh gọn với đội ngũ nhân sự chất lượng cao, tận tâm và chuyên nghiệp.
                       </p>
                    </div>

                    <div className="space-y-6 max-w-3xl mx-auto py-8">
                      {[
                        { role: "Hội đồng Quản trị", color: "bg-gradient-to-r from-biotechvet-dark to-slate-800 text-white shadow-xl" },
                        { role: "Tổng Giám đốc", color: "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg" },
                        { role: "Khối Sản xuất - Kỹ thuật", color: "bg-white text-biotechvet-dark border border-gray-100 shadow-sm" },
                        { role: "Khối Kinh doanh - Marketing", color: "bg-white text-biotechvet-dark border border-gray-100 shadow-sm" },
                        { role: "Khối Hành chính - Nhân sự", color: "bg-white text-biotechvet-dark border border-gray-100 shadow-sm" }
                      ].map((node, i) => (
                        <div key={i} className="relative">
                          {i > 1 && <div className="absolute left-1/2 -top-8 w-0.5 h-8 bg-gray-200 -translate-x-1/2"></div>}
                          <div className={`p-6 md:p-8 rounded-[24px] text-center font-black uppercase tracking-widest text-sm md:text-base mx-auto max-w-sm md:max-w-md ${node.color} hover:-translate-y-1 transition-transform duration-300`}>
                            {node.role}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-16 p-10 md:p-16 bg-gradient-to-br from-primary/5 to-transparent rounded-[40px] flex flex-col md:flex-row items-center gap-10 border border-primary/10">
                      <div className="w-24 h-24 shrink-0 rounded-3xl bg-white flex items-center justify-center p-4 shadow-sm">
                         <img src="/images/logo.png" className="w-full h-full object-contain opacity-40 grayscale" alt="biotechvet" />
                      </div>
                      <div className="relative">
                         <QuoteIcon className="absolute -left-6 -top-6 w-12 h-12 text-primary/10" />
                         <p className="text-xl text-gray-600 font-medium italic leading-relaxed relative z-10">
                           "Chúng tôi tin rằng con người là tài sản quý giá nhất. Tại biotechvet, mỗi cá nhân đều là một mắt xích quan trọng trong hành trình bảo vệ sự phát triển rực rỡ của ngành chăn nuôi."
                         </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Quote Icon Component
function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
    </svg>
  );
}

