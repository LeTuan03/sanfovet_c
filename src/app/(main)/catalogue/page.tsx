import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldCheck, Award } from 'lucide-react';
import DocumentList from './CatalogueClient';
export const metadata: Metadata = {
  title: "Catalogue & Tài Liệu - biotechvet",
  description: "Tải về Catalogue sản phẩm thú y 2026 và Hồ sơ năng lực mới nhất của BIOTECH-VET. Tài liệu kỹ thuật chuyên sâu cho trang trại.",
  keywords: ["catalogue thuốc thú y", "hồ sơ năng lực biotechvet", "tải tài liệu thú y", "hướng dẫn sử dụng thuốc thú y"],
  robots: "index, follow",
  openGraph: {
    title: "Catalogue & Tài Liệu - biotechvet",
    description: "Tải về danh mục sản phẩm và hồ sơ năng lực đầy đủ nhất của biotechvet.",
    url: "https://biotechvet.com.vn/catalogue",
    images: [
      {
        url: "/images/banner1.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};
import { supabase } from '@/lib/supabase/config';

export default async function CataloguePage() {
  const { data: fetchedDocuments } = await supabase
    .from('catalogues')
    .select('*')
    .order('created_at', { ascending: false });

  const documents = fetchedDocuments && fetchedDocuments.length > 0 ? fetchedDocuments : [
    { title: "Catalogue Sản phẩm biotechvet 2026", size: "24.5 MB", type: "PDF", link: "/catalogue/mau1.pdf" },
    { title: "Hồ sơ năng lực công ty (Profile)", size: "12.8 MB", type: "PDF", link: "/catalogue/mau1.pdf" },
    { title: "Hướng dẫn sử dụng thuốc thú y", size: "8.2 MB", type: "PDF", link: "/catalogue/mau1.pdf" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-biotechvet-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/farm.png')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
           <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-wider">Catalogue & Tài liệu</h1>
           <p className="text-xl text-primary-light max-w-2xl mx-auto font-medium">Tải về danh mục sản phẩm và hồ sơ năng lực đầy đủ nhất của biotechvet.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center">
              <div className="bg-biotechvet-alt p-8 rounded-[40px] border border-gray-100 flex flex-col items-center">
                 <ShieldCheck size={40} className="text-primary mb-4" />
                 <h3 className="font-black text-biotechvet-dark uppercase text-sm mb-2 tracking-widest">Tin cậy</h3>
                 <p className="text-xs text-gray-500 font-medium">Thông tin chính xác 100%</p>
              </div>
              <div className="bg-biotechvet-alt p-8 rounded-[40px] border border-gray-100 flex flex-col items-center">
                 <Award size={40} className="text-primary mb-4" />
                 <h3 className="font-black text-biotechvet-dark uppercase text-sm mb-2 tracking-widest">Tiêu chuẩn</h3>
                 <p className="text-xs text-gray-500 font-medium">Đạt chuẩn GMP-WHO</p>
              </div>
              <div className="bg-biotechvet-alt p-8 rounded-[40px] border border-gray-100 flex flex-col items-center">
                 <FileText size={40} className="text-primary mb-4" />
                 <h3 className="font-black text-biotechvet-dark uppercase text-sm mb-2 tracking-widest">Cập nhật</h3>
                 <p className="text-xs text-gray-500 font-medium">Phiên bản 2026 mới nhất</p>
              </div>
           </div>

           <div className="space-y-6">
              <DocumentList documents={documents} />
           </div>

           <div className="mt-20 p-12 bg-biotechvet-dark rounded-[48px] text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <h3 className="text-2xl font-black mb-4 relative z-10">Bạn cần bản in cứng?</h3>
              <p className="opacity-70 text-sm max-w-md mx-auto mb-8 relative z-10">Liên hệ với chúng tôi để nhận bộ Catalogue in ấn chất lượng cao gửi tận nơi hoàn toàn miễn phí.</p>
              <Link href="/lien-he" className="bg-white text-biotechvet-dark font-black py-4 px-10 rounded-full text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all relative z-10 inline-block text-center">Yêu cầu bản in</Link>
           </div>
        </div>
      </div>
    </div>
  );
}
