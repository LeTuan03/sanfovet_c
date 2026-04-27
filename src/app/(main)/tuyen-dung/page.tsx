import { Metadata } from 'next';
import React from 'react';
import { jobService } from '@/services';
import { Target, CircleCheck, Heart } from 'lucide-react';
import JobListings from '@/components/recruitment/JobListings';

export const metadata: Metadata = {
  title: "Tuyển Dụng - Gia Nhập biotechvet",
  description: "Gia nhập BIOTECH-VET – Môi trường làm việc năng động, chuyên nghiệp với chế độ đãi ngộ hấp dẫn. Xem các vị trí đang tuyển dụng ngay.",
  keywords: ["tuyển dụng biotechvet", "việc làm thú y", "tuyển nhân viên kinh doanh", "hành trình sự nghiệp", "công ty việt anh"],
  robots: "index, follow",
  openGraph: {
    title: "Tuyển Dụng - Gia Nhập biotechvet",
    description: "Môi trường làm việc năng động, chuyên nghiệp với chế độ đãi ngộ hấp dẫn.",
    url: "https://biotechvet.com.vn/tuyen-dung",
    images: [
      {
        url: "/images/banner1.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};


export default async function RecruitmentPage() {
  const jobs = await jobService.getAll();
  const benefits = [
    { icon: <Target className="text-secondary" />, title: "Môi trường năng động", desc: "Đội ngũ trẻ trung, sáng tạo and nhiệt huyết trong công việc." },
    { icon: <Heart className="text-secondary" />, title: "Chế độ đãi ngộ tốt", desc: "Lương thưởng hấp dẫn, bảo hiểm đầy đủ and du lịch hàng năm." },
    { icon: <CircleCheck className="text-secondary" />, title: "Đào tạo chuyên sâu", desc: "Cơ hội học tập and nâng cao chuyên môn từ các chuyên gia." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-biotechvet-dark text-white py-24 relative overflow-hidden">
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
                <div className="w-16 h-16 bg-biotechvet-alt rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-secondary/10">
                   {b.icon}
                </div>
                <h3 className="text-xl font-black text-biotechvet-dark mb-3 uppercase tracking-wider">{b.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{b.desc}</p>
             </div>
           ))}
        </div>

        <div className="pt-20">
          <JobListings jobs={jobs} />
        </div>
      </div>
    </div>
  );
}
