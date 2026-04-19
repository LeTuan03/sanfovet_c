'use client';

import { useState, useEffect } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import dynamic from 'next/dynamic';

const PdfFlipbook = dynamic(() => import('@/components/ui/PdfFlipbook'), {
  ssr: false,
});

interface DocumentInfo {
  title: string;
  size: string;
  type: string;
  link: string;
}

export default function DocumentList({ documents }: { documents: DocumentInfo[] }) {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPdf) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPdf]);

  return (
    <>
      <div className="space-y-6">
        {documents.map((doc) => (
          <div key={doc.title} className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
              <FileText size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-xl font-black text-sanfovet-dark mb-1">{doc.title}</h4>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center md:justify-start gap-3">
                {doc.type} • {doc.size}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4 w-full md:w-auto">
              <button 
                onClick={() => setSelectedPdf(doc.link)}
                className="flex items-center justify-center flex-1 md:flex-initial gap-2 bg-sanfovet-alt text-primary font-black py-3 px-6 rounded-full text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
              >
                <Eye size={16} /> Xem
              </button>
              <a 
                href={doc.link} 
                download
                className="flex items-center justify-center flex-1 md:flex-initial gap-2 bg-primary text-white font-black py-3 px-6 rounded-full text-xs uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
              >
                <Download size={16} /> Tải về
              </a>
            </div>
          </div>
        ))}
      </div>

      {selectedPdf && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 md:p-6 lg:p-10 animate-in fade-in zoom-in-95 duration-300"
          onClick={() => setSelectedPdf(null)}
        >
           <div 
             className="w-full h-full max-w-[1400px] relative mx-auto flex flex-col shadow-2xl rounded-3xl" 
             onClick={(e) => e.stopPropagation()}
           >
             <PdfFlipbook url={selectedPdf} onClose={() => setSelectedPdf(null)} />
           </div>
        </div>
      )}
    </>
  );
}
