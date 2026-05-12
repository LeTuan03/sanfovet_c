"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, Target, Award, Heart, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '@/components/shared/Sidebar';
import { aboutDefaults, mergeAbout } from './aboutDefaults';

export default function AboutContent() {
  const [content, setContent] = useState(aboutDefaults);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/data/settings')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!cancelled && data) {
          setContent(mergeAbout(data?.aboutPage));
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const scrollTimeline = (dir: 'left' | 'right') => {
    if (!timelineRef.current) return;
    const amount = timelineRef.current.clientWidth * 0.8;
    timelineRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <div className="bg-white">
      {/* ===================== HERO BANNER ===================== */}
      <section className="relative bg-biotechvet-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-[url('/images/farm.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-biotechvet-dark via-biotechvet-dark/85 to-biotechvet-dark/40"></div>
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-primary/20 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6 text-xs font-bold text-primary-light uppercase tracking-[0.2em]">
              <Building2 size={14} /> Về chúng tôi
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] mb-6">
              Giới thiệu <span className="text-primary">BIOTECH-VET</span>
            </h1>
            <p className="text-base md:text-lg text-gray-300 font-medium leading-relaxed max-w-2xl">
              Hơn 20 năm đồng hành cùng người chăn nuôi Việt Nam – kiến tạo những giá trị bền vững và mang lại giải pháp thú y toàn diện.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          <div className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1 lg:sticky lg:top-24">
            <Sidebar />
          </div>

          <div className="lg:col-span-8 xl:col-span-9 order-1 lg:order-2 space-y-24 lg:space-y-32">

            {/* ===================== 1. GIỚI THIỆU ===================== */}
            <motion.section
              id="gioi-thieu"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="scroll-mt-24"
            >
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">Tổng quan</div>
                  <h2 className="text-3xl lg:text-4xl font-black text-biotechvet-dark uppercase tracking-tight leading-tight mb-6">
                    {content.gioiThieu.title}
                  </h2>
                  <div className="w-16 h-1 bg-primary mb-6"></div>
                  <p className="text-gray-600 font-medium leading-relaxed text-base lg:text-lg whitespace-pre-line">
                    {content.gioiThieu.paragraph1}
                  </p>
                  <p className="text-gray-600 font-medium leading-relaxed text-base lg:text-lg mt-4 whitespace-pre-line">
                    {content.gioiThieu.paragraph2}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="p-6 bg-primary-light/40 border-l-4 border-primary">
                      <div className="text-primary-dark font-black text-3xl lg:text-4xl mb-1">{content.gioiThieu.stat1Number}</div>
                      <div className="text-xs uppercase font-bold text-gray-600 tracking-widest">{content.gioiThieu.stat1Label}</div>
                    </div>
                    <div className="p-6 bg-primary-light/40 border-l-4 border-primary">
                      <div className="text-primary-dark font-black text-3xl lg:text-4xl mb-1">{content.gioiThieu.stat2Number}</div>
                      <div className="text-xs uppercase font-bold text-gray-600 tracking-widest">{content.gioiThieu.stat2Label}</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <div className="relative overflow-hidden shadow-xl">
                    <img src="/images/about.webp" alt="Nhà máy biotechvet" className="w-full h-[420px] lg:h-[520px] object-cover hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-biotechvet-dark/85 to-transparent p-6">
                      <div className="flex items-center gap-3 text-white">
                        <ShieldCheck size={20} className="text-primary-light" />
                        <span className="text-sm font-bold uppercase tracking-wider">Đạt chuẩn GMP-WHO</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ===================== 2. LỊCH SỬ ===================== */}
            <motion.section
              id="lich-su"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="scroll-mt-24"
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Chặng đường phát triển</div>
                  <h2 className="text-3xl lg:text-4xl font-black text-biotechvet-dark uppercase tracking-tight leading-tight">
                    {content.lichSu.title}
                  </h2>
                  <div className="w-16 h-1 bg-primary mt-4 mb-5"></div>
                  <p className="text-gray-600 font-medium leading-relaxed text-base lg:text-lg max-w-2xl whitespace-pre-line">
                    {content.lichSu.intro}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button onClick={() => scrollTimeline('left')} aria-label="Trước" className="w-11 h-11 flex items-center justify-center border border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-colors text-gray-500">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => scrollTimeline('right')} aria-label="Sau" className="w-11 h-11 flex items-center justify-center border border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-colors text-gray-500">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-[60px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                <div
                  ref={timelineRef}
                  className="flex overflow-x-auto hide-scrollbar gap-6 pb-6 snap-x snap-mandatory"
                >
                  {content.lichSu.timeline.map((item, index) => (
                    <div key={`${item.year}-${index}`} className="snap-start shrink-0 w-[280px] md:w-[320px]">
                      <div className="flex items-center justify-center mb-4">
                        <div className="text-2xl md:text-3xl font-black text-primary-dark">{item.year}</div>
                      </div>
                      <div className="relative flex justify-center mb-4">
                        <div className="w-5 h-5 rounded-full bg-primary border-4 border-white ring-2 ring-primary/40 z-10"></div>
                      </div>
                      <div className="bg-white p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 min-h-[180px]">
                        <p className="text-gray-600 font-medium leading-relaxed whitespace-pre-line">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* ===================== 3. TẦM NHÌN – SỨ MỆNH ===================== */}
            <motion.section
              id="tam-nhin"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="scroll-mt-24"
            >
              <div className="mb-10">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Định hướng phát triển</div>
                <h2 className="text-3xl lg:text-4xl font-black text-biotechvet-dark uppercase tracking-tight leading-tight">
                  Tầm nhìn – Sứ mệnh – Giá trị
                </h2>
                <div className="w-16 h-1 bg-primary mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative bg-white p-8 lg:p-10 border-t-4 border-primary shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-primary-light flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Target size={26} />
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight text-biotechvet-dark mb-4">
                    {content.tamNhin.visionTitle}
                  </h4>
                  <p className="text-gray-600 font-medium leading-relaxed whitespace-pre-line">
                    {content.tamNhin.visionText}
                  </p>
                </div>

                <div className="group relative bg-biotechvet-dark text-white p-8 lg:p-10 border-t-4 border-primary shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md flex items-center justify-center text-primary-light mb-6">
                      <Heart size={26} />
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tight text-white mb-4">
                      {content.tamNhin.missionTitle}
                    </h4>
                    <p className="text-gray-300 font-medium leading-relaxed whitespace-pre-line">
                      {content.tamNhin.missionText}
                    </p>
                  </div>
                </div>

                <div className="group relative bg-white p-8 lg:p-10 border-t-4 border-primary shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-primary-light flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Sparkles size={26} />
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight text-biotechvet-dark mb-4">
                    Giá trị cốt lõi
                  </h4>
                  <ul className="space-y-3">
                    {['Thấu hiểu', 'Chủ động', 'Trách nhiệm'].map((v) => (
                      <li key={v} className="flex items-center gap-3 text-gray-600 font-bold">
                        <span className="w-2 h-2 bg-primary rounded-full shrink-0"></span>
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative bg-primary-light/40 p-8 lg:p-12 border-l-4 border-primary mt-10">
                <QuoteIcon className="absolute right-8 top-8 w-16 h-16 text-primary/15" />
                <p className="text-lg lg:text-xl font-bold text-biotechvet-dark italic leading-relaxed relative z-10 whitespace-pre-line max-w-3xl">
                  {content.tamNhin.quoteText}
                </p>
                <div className="mt-6 flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-sm">
                    CEO
                  </div>
                  <div>
                    <div className="font-black text-biotechvet-dark">{content.tamNhin.quoteAuthor}</div>
                    <div className="text-xs uppercase font-bold text-gray-500 tracking-widest mt-0.5">{content.tamNhin.quoteRole}</div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ===================== 4. THÀNH TỰU ===================== */}
            <motion.section
              id="thanh-tuu"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="scroll-mt-24"
            >
              <div className="mb-10">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Vinh danh & ghi nhận</div>
                <h2 className="text-3xl lg:text-4xl font-black text-biotechvet-dark uppercase tracking-tight leading-tight whitespace-pre-line">
                  {content.thanhTuu.title}
                </h2>
                <div className="w-16 h-1 bg-primary mt-4"></div>
              </div>

              {content.thanhTuu.images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.thanhTuu.images.map((image, i) => (
                    <div key={`${image.url}-${i}`} className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                      <div className="relative aspect-square overflow-hidden bg-primary-light/30">
                        <img
                          src={image.url}
                          alt={image.title || `Thành tựu ${i + 1}`}
                          className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 w-10 h-10 bg-primary text-white flex items-center justify-center shadow-lg">
                          <Award size={18} />
                        </div>
                      </div>
                      {image.title && (
                        <div className="p-5 border-t border-gray-100">
                          <p className="text-sm font-bold text-biotechvet-dark leading-snug whitespace-pre-line text-center">
                            {image.title}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 bg-gray-50 border border-dashed border-gray-200 text-center text-gray-400 font-medium">
                  Chưa có dữ liệu thành tựu.
                </div>
              )}
            </motion.section>

            {/* ===================== 5. CƠ SỞ ===================== */}
            <motion.section
              id="co-so"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="scroll-mt-24"
            >
              <div className="mb-10">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Hạ tầng sản xuất</div>
                <h2 className="text-3xl lg:text-4xl font-black text-biotechvet-dark uppercase tracking-tight leading-tight">
                  {content.coSo.title}
                </h2>
                <div className="w-16 h-1 bg-primary mt-4 mb-5"></div>
                <p className="text-gray-600 font-medium leading-relaxed text-base lg:text-lg max-w-3xl whitespace-pre-line">
                  {content.coSo.intro}
                </p>
              </div>

              <div className="relative overflow-hidden shadow-xl group mb-8">
                <img
                  src="/images/coso.webp"
                  className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt="Nhà máy GMP"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-biotechvet-dark via-biotechvet-dark/50 to-transparent flex flex-col justify-end p-8 lg:p-12 text-white">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="w-8 h-1 bg-primary"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary-light">GMP-WHO</span>
                  </div>
                  <h4 className="text-2xl lg:text-3xl font-black uppercase tracking-tight mb-2">{content.coSo.cardTitle}</h4>
                  <p className="text-sm lg:text-base text-gray-300 font-medium max-w-2xl whitespace-pre-line">{content.coSo.cardText}</p>
                </div>
              </div>

              <div className="bg-white border border-gray-100 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                  {content.coSo.stats.map((stat, i) => (
                    <div key={`${stat.label}-${i}`} className="text-center px-4 py-8 lg:py-10 hover:bg-primary-light/30 transition-colors">
                      <div className="text-4xl lg:text-5xl font-black mb-2 text-primary-dark">{stat.number}</div>
                      <div className="text-xs uppercase font-bold text-gray-500 tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* ===================== 6. CƠ CẤU ===================== */}
            <motion.section
              id="co-cau"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="scroll-mt-24"
            >
              <div className="mb-10">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Sơ đồ tổ chức</div>
                <h2 className="text-3xl lg:text-4xl font-black text-biotechvet-dark uppercase tracking-tight leading-tight">
                  {content.coCau.title}
                </h2>
                <div className="w-16 h-1 bg-primary mt-4 mb-5"></div>
                <p className="text-gray-600 font-medium leading-relaxed text-base lg:text-lg max-w-3xl whitespace-pre-line">
                  {content.coCau.intro}
                </p>
              </div>

              <div className="space-y-4 max-w-2xl mx-auto py-6">
                {content.coCau.roles.map((role, i) => {
                  const isTop = i === 0;
                  const isSecond = i === 1;
                  return (
                    <div key={`${role}-${i}`} className="relative">
                      {i > 0 && (
                        <div className="absolute left-1/2 -top-4 w-0.5 h-4 bg-primary/40 -translate-x-1/2"></div>
                      )}
                      <div
                        className={`p-5 md:p-6 text-center font-black uppercase tracking-widest text-sm md:text-base mx-auto transition-all duration-300 hover:-translate-y-0.5 ${
                          isTop
                            ? 'bg-biotechvet-dark text-white shadow-xl max-w-md'
                            : isSecond
                            ? 'bg-primary text-white shadow-lg max-w-md'
                            : 'bg-white text-biotechvet-dark border-l-4 border-primary shadow-sm hover:shadow-md max-w-lg'
                        }`}
                      >
                        {role}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-primary-light/40 p-8 lg:p-12 border-l-4 border-primary flex flex-col md:flex-row items-start gap-8 mt-10">
                <div className="w-20 h-20 shrink-0 bg-white flex items-center justify-center p-3 shadow-sm">
                  <img src="/images/logo.png" className="w-full h-full object-contain" alt="biotechvet" />
                </div>
                <div className="relative flex-1">
                  <QuoteIcon className="absolute -left-2 -top-4 w-10 h-10 text-primary/20" />
                  <p className="text-base lg:text-lg text-gray-700 font-medium italic leading-relaxed relative z-10 whitespace-pre-line">
                    {content.coCau.quoteText}
                  </p>
                </div>
              </div>
            </motion.section>

          </div>
        </div>
      </div>
    </div>
  );
}

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
    </svg>
  );
}
