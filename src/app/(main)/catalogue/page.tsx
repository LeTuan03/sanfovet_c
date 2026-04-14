import React from 'react';
import { FileText, Download, Eye, ShieldCheck, Award } from 'lucide-react';

export default function CataloguePage() {
  const documents = [
    { title: "Catalogue Sản phẩm Sanfovet 2026", size: "24.5 MB", type: "PDF", link: "#" },
    { title: "Hồ sơ năng lực công ty (Profile)", size: "12.8 MB", type: "PDF", link: "#" },
    { title: "Hướng dẫn sử dụng thuốc thú y", size: "8.2 MB", type: "PDF", link: "#" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-sanfovet-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/farm.png')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
           <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-wider">Catalogue & Tài liệu</h1>
           <p className="text-xl text-primary-light max-w-2xl mx-auto font-medium">Tải về danh mục sản phẩm và hồ sơ năng lực đầy đủ nhất của Sanfovet.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center">
              <div className="bg-sanfovet-alt p-8 rounded-[40px] border border-gray-100 flex flex-col items-center">
                 <ShieldCheck size={40} className="text-primary mb-4" />
                 <h3 className="font-black text-sanfovet-dark uppercase text-sm mb-2 tracking-widest">Tin cậy</h3>
                 <p className="text-xs text-gray-500 font-medium">Thông tin chính xác 100%</p>
              </div>
              <div className="bg-sanfovet-alt p-8 rounded-[40px] border border-gray-100 flex flex-col items-center">
                 <Award size={40} className="text-primary mb-4" />
                 <h3 className="font-black text-sanfovet-dark uppercase text-sm mb-2 tracking-widest">Tiêu chuẩn</h3>
                 <p className="text-xs text-gray-500 font-medium">Đạt chuẩn GMP-WHO</p>
              </div>
              <div className="bg-sanfovet-alt p-8 rounded-[40px] border border-gray-100 flex flex-col items-center">
                 <FileText size={40} className="text-primary mb-4" />
                 <h3 className="font-black text-sanfovet-dark uppercase text-sm mb-2 tracking-widest">Cập nhật</h3>
                 <p className="text-xs text-gray-500 font-medium">Phiên bản 2026 mới nhất</p>
              </div>
           </div>

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
                   <div className="flex gap-4">
                      <button className="flex items-center gap-2 bg-sanfovet-alt text-primary font-black py-3 px-6 rounded-full text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                         <Eye size={16} /> Xem
                      </button>
                      <button className="flex items-center gap-2 bg-primary text-white font-black py-3 px-6 rounded-full text-xs uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                         <Download size={16} /> Tải về
                      </button>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-20 p-12 bg-sanfovet-dark rounded-[48px] text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <h3 className="text-2xl font-black mb-4 relative z-10">Bạn cần bản in cứng?</h3>
              <p className="opacity-70 text-sm max-w-md mx-auto mb-8 relative z-10">Liên hệ với chúng tôi để nhận bộ Catalogue in ấn chất lượng cao gửi tận nơi hoàn toàn miễn phí.</p>
              <button className="bg-white text-sanfovet-dark font-black py-4 px-10 rounded-full text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all relative z-10">Yêu cầu bản in</button>
           </div>
        </div>
      </div>
    </div>
  );
}
