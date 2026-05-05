import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Không tìm thấy trang',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <h1 className="text-[12rem] font-black text-gray-50 leading-none select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-pulse">
                <Search size={48} />
             </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-biotechvet-dark mb-4 uppercase tracking-tight">Oops! Trang không tồn tại</h2>
        <p className="text-gray-500 mb-10 font-medium leading-relaxed">
          Có vẻ như đường dẫn bạn đang truy cập không tồn tại hoặc đã được di chuyển. 
          Vui lòng quay lại trang chủ để tiếp tục khám phá.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-black transition-all shadow-lg hover:shadow-primary/20 uppercase tracking-widest text-xs active:scale-95"
          >
            <Home size={16} /> Về trang chủ
          </Link>
          <Link 
            href="/san-pham" 
            className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-biotechvet-dark px-8 py-4 rounded-full font-black transition-all uppercase tracking-widest text-xs active:scale-95"
          >
            <ArrowLeft size={16} /> Xem sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
}
