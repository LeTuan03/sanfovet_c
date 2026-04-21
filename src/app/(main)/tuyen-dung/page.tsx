import { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { jobService } from '@/services';
import { Job } from '@/types';
// import { jobs } from '@/lib/data'; // Removed static import
import { MapPin, Calendar, Users, Target, CircleCheck, Heart, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: "Tuyển Dụng",
  description: "Gia nhập BIOTECH-VET – Môi trường làm việc năng động, chuyên nghiệp với chế độ đãi ngộ hấp dẫn. Xem các vị trí đang tuyển dụng ngay.",
  keywords: ["tuyển dụng sanfovet", "việc làm thú y", "tuyển nhân viên kinh doanh", "hành trình sự nghiệp"],
};


export default async function RecruitmentPage() {
  const jobs = await jobService.getAll();
  const benefits = [
    { icon: <Target className="text-primary" />, title: "Môi trường năng động", desc: "Đội ngũ trẻ trung, sáng tạo và nhiệt huyết trong công việc." },
    { icon: <Heart className="text-primary" />, title: "Chế độ đãi ngộ tốt", desc: "Lương thưởng hấp dẫn, bảo hiểm đầy đủ và du lịch hàng năm." },
    { icon: <CircleCheck className="text-primary" />, title: "Đào tạo chuyên sâu", desc: "Cơ hội học tập và nâng cao chuyên môn từ các chuyên gia." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-sanfovet-dark text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/farm.png')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
           <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter italic">Gia Nhập BIOTECH-VET</h1>
           <p className="text-xl text-primary-light max-w-2xl mx-auto font-medium">Hành trình bảo vệ sức khỏe vật nuôi và xây dựng sự nghiệp bền vững cùng chúng tôi.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 divide-y divide-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center">
           {benefits.map((b) => (
             <div key={b.title} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-sanfovet-alt rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-primary/10">
                   {b.icon}
                </div>
                <h3 className="text-xl font-black text-sanfovet-dark mb-3 uppercase tracking-wider">{b.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{b.desc}</p>
             </div>
           ))}
        </div>

        <div className="pt-20">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
             <div>
                <h2 className="text-3xl font-black text-sanfovet-dark uppercase italic mb-2 tracking-tight">Vị trí đang tuyển dụng</h2>
                <div className="w-24 h-2 bg-primary rounded-full"></div>
             </div>
             <div className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Users size={16} /> {jobs.length} Vị trí đang mở
             </div>
          </div>

          <div className="space-y-8">
             {jobs.map((job: Job) => (
               <div key={job.id} className="group bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row items-center gap-8 border-l-[12px] border-l-primary hover:border-l-primary-dark">
                  <div className="flex-1 text-center md:text-left">
                     <h4 className="text-2xl font-black text-sanfovet-dark mb-4 group-hover:text-primary transition-colors">{job.title}</h4>
                     <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-400 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> {job.location}</span>
                        <span className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> {job.date}</span>
                     </div>
                  </div>
                  <div className="shrink-0 flex gap-4 w-full md:w-auto">
                     <button className="flex-1 md:shrink-0 bg-sanfovet-alt text-primary font-black py-4 px-10 rounded-full text-xs uppercase tracking-widest hover:bg-primary-light transition-all active:scale-95">Xem mô tả</button>
                     <Link href="/lien-he" className="flex-1 md:shrink-0 bg-primary hover:bg-primary-dark text-white font-black py-4 px-10 rounded-full text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 text-center active:scale-95">Ứng tuyển ngay</Link>
                  </div>
               </div>
             ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-[48px]">
               <Mail size={48} className="mx-auto text-gray-300 mb-4" />
               <p className="text-gray-500 font-bold uppercase tracking-widest mb-2">Hiện tại chưa có vị trí mới</p>
               <p className="text-sm text-gray-400">Bạn có thể gửi CV cho chúng tôi để được lưu hồ sơ tiềm năng.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
