'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import { Job } from '@/types';

interface JobListingsProps {
  jobs: Job[];
}

export default function JobListings({ jobs }: JobListingsProps) {
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  const toggleDescription = (jobId: number) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-black text-biotechvet-dark uppercase italic mb-2 tracking-tight">Vị trí đang tuyển dụng</h2>
          <div className="w-24 h-2 bg-primary rounded-full"></div>
        </div>
        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <Users size={16} /> {jobs.length} Vị trí đang mở
        </div>
      </div>

      <div className="space-y-8">
        {jobs.map((job: Job) => (
          <div
            key={job.id}
            className="group bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 border-l-[12px] border-l-primary hover:border-l-primary-dark overflow-hidden"
          >
            <div className="p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-black text-biotechvet-dark mb-4 group-hover:text-primary transition-colors">{job.title}</h4>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-400 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> {job.location}</span>
                  <span className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> {job.date}</span>
                </div>
              </div>
              <div className="shrink-0 flex gap-4 w-full md:w-auto flex-col md:flex-row">
                <button
                  onClick={() => toggleDescription(job.id)}
                  className={`flex-1 md:shrink-0 font-black py-4 px-10 rounded-full text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    expandedJobId === job.id
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-biotechvet-alt text-primary hover:bg-primary-light'
                  }`}
                >
                  Xem mô tả
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${expandedJobId === job.id ? 'rotate-180' : ''}`}
                  />
                </button>
                <Link
                  href="/lien-he"
                  className="flex-1 md:shrink-0 bg-primary hover:bg-primary-dark text-white font-black py-4 px-10 rounded-full text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 text-center active:scale-95"
                >
                  Ứng tuyển ngay
                </Link>
              </div>
            </div>

            {expandedJobId === job.id && (
              <div className="px-8 pb-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
                <div className="mt-6 prose prose-sm max-w-none text-gray-600">
                  <div className="whitespace-pre-wrap leading-relaxed text-sm font-medium text-gray-700">
                    {job.description}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-[48px]">
          <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest mb-2">Hiện tại chưa có vị trí mới</p>
          <p className="text-sm text-gray-400">Bạn có thể gửi CV cho chúng tôi để được lưu hồ sơ tiềm năng.</p>
        </div>
      )}
    </>
  );
}
