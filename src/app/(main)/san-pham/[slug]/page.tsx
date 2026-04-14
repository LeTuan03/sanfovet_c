import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, categories } from '@/lib/data';
import { ChevronRight, ArrowLeft, CheckCircle, FileText, Info, Package, AlertCircle, ShieldCheck, Download, Microscope, Calendar } from 'lucide-react';

export default async function ProductDetailPage({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  const category = categories.find((c: any) => c.id === product.categoryId);
  const relatedProducts = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="bg-sanfovet-alt py-4">
        <div className="container mx-auto px-4 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight size={14} className="mx-2 text-gray-300" />
          <Link href="/san-pham" className="hover:text-primary transition-colors">Sản phẩm</Link>
          <ChevronRight size={14} className="mx-2 text-gray-300" />
          <span className="text-primary font-bold">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Link href="/san-pham" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-8 font-bold transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Quay lại danh mục
        </Link>

        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          {/* Image */}
          <div className="bg-sanfovet-alt rounded-[24px] p-8 md:p-12 flex items-center justify-center relative group shadow-inner">
             <img 
               src={product.image} 
               alt={product.name} 
               className="max-h-[400px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
             />
             <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-sm">
                <ShieldCheck className="text-primary" size={24} />
             </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="text-xs font-black text-primary bg-primary-light px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-[2px]">
              {category?.name}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-sanfovet-dark mb-4 leading-tight">{product.name}</h1>
            <p className="text-xl text-gray-500 mb-8 font-medium leading-relaxed italic border-l-4 border-gray-100 pl-6">{product.tagline}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
               <div className="bg-primary-light/50 border border-primary-light rounded-2xl p-6">
                 <h3 className="font-bold text-primary-dark mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                   <Package size={18} /> Quy cách đóng gói
                 </h3>
                 <div className="bg-white px-4 py-2 rounded-xl font-bold text-primary shadow-sm inline-block border border-primary/10">
                   {product.volume}
                 </div>
               </div>
               <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6">
                 <h3 className="font-bold text-orange-700 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                   <AlertCircle size={18} /> Số Đăng ký
                 </h3>
                 <div className="bg-white px-4 py-2 rounded-xl font-bold text-orange-600 shadow-sm inline-block border border-orange/10">
                   {product.registrationNo}
                 </div>
               </div>
            </div>

            <div className="space-y-5 mb-10 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <div className="flex gap-4 items-start">
                 <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <CheckCircle className="text-green-600" size={18} />
                 </div>
                 <p className="text-gray-700 text-[0.95rem] leading-relaxed"><strong>Đặc tính:</strong> {product.characteristics}</p>
               </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-auto">
               <button className="bg-gradient-to-r from-primary to-primary-dark hover:shadow-xl hover:-translate-y-1 text-white px-10 py-4 rounded-full font-black transition-all flex-1 text-center shadow-lg active:scale-95">
                 LIÊN HỆ ĐẶT HÀNG
               </button>
               <button className="bg-white border-2 border-gray-100 hover:border-primary hover:text-primary text-gray-500 px-6 py-4 rounded-full font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2">
                 <Download size={20} /> PDF
               </button>
            </div>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-[1.1rem] font-black text-primary mb-6 flex items-center gap-3 bg-primary-light px-5 py-3.5 border-l-[6px] border-primary uppercase tracking-wider shadow-sm">
                <FileText size={20} /> Thành phần hoạt chất
              </h2>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-primary-light/30 border-b border-gray-100 text-primary uppercase text-[0.7rem] font-black tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Hoạt chất chính</th>
                      <th className="px-6 py-4 w-1/3">Hàm lượng chuẩn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {product.ingredients?.map((ing: any) => (
                      <tr key={ing.name} className="hover:bg-primary-light/20 transition-colors">
                        <td className="px-6 py-4 text-gray-800 font-medium">{ing.name}</td>
                        <td className="px-6 py-4 font-black text-primary-dark">{ing.amount} <span className="text-[0.7rem] font-bold opacity-60 uppercase">{ing.unit}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-10">
              <div>
                <h2 className="text-[1.1rem] font-black text-primary mb-6 flex items-center gap-3 bg-primary-light px-5 py-3.5 border-l-[6px] border-primary uppercase tracking-wider shadow-sm">
                  <Info size={20} /> Chỉ định điều trị
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm leading-relaxed text-gray-700">
                  {product.indications}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <h2 className="text-[1.1rem] font-black text-primary mb-6 flex items-center gap-3 bg-primary-light px-5 py-3.5 border-l-[6px] border-primary uppercase tracking-wider shadow-sm">
                    <Microscope size={20} /> Liều & Cách dùng
                  </h2>
                  <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
                     <div className="mb-6 pb-6 border-b border-gray-50">
                        <p className="mb-2 flex items-center gap-2 text-sm text-gray-400 font-bold uppercase tracking-widest leading-none">Đường cấp thuốc</p>
                        <p className="text-sanfovet-dark font-black text-lg">{product.dosage?.route}</p>
                     </div>
                     <div className="mb-8">
                        <p className="mb-2 flex items-center gap-2 text-sm text-gray-400 font-bold uppercase tracking-widest leading-none">Liệu trình</p>
                        <p className="text-sanfovet-dark font-black text-lg">{product.dosage?.duration}</p>
                     </div>
                     
                     <div className="space-y-3 mt-auto bg-sanfovet-alt p-5 rounded-xl">
                        {product.dosage?.byAnimal?.map((a: any) => (
                          <div key={a.animal} className="flex justify-between items-center border-b border-gray-200/50 last:border-0 pb-2.5 last:pb-0">
                            <span className="font-bold text-gray-600 text-sm">{a.animal}</span>
                            <span className="text-primary font-black">{a.dose}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>

                <div>
                   <h2 className="text-[1.1rem] font-black text-orange-600 mb-6 flex items-center gap-3 bg-orange-50 px-5 py-3.5 border-l-[6px] border-orange-600 uppercase tracking-wider shadow-sm">
                    <Calendar size={20} /> Ngưng thuốc
                  </h2>
                  <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full font-medium">
                     <p className="text-gray-600 leading-relaxed mb-6">Ngừng sử dụng thuốc trước khi giết mổ:</p>
                     <div className="mt-auto bg-orange-50 p-6 rounded-2xl border border-orange-100 text-center">
                        <span className="text-3xl font-black text-orange-700 block mb-1">{product.withdrawalPeriod}</span>
                        <span className="text-[0.65rem] font-bold text-orange-600/60 uppercase tracking-[2px]">Thời gian an toàn</span>
                     </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
             <div className="bg-sanfovet-alt p-8 rounded-[24px] border border-gray-100 shadow-inner sticky top-24">
                <h3 className="font-black text-lg text-sanfovet-dark mb-8 border-b border-gray-200 pb-4 uppercase tracking-wider">Sản phẩm cùng loại</h3>
                <div className="space-y-6">
                  {relatedProducts.map((p: any) => (
                    <Link href={`/san-pham/${p.slug}`} key={p.id} className="flex gap-5 group">
                      <div className="w-20 h-20 bg-white rounded-2xl border border-gray-100 p-2 flex items-center justify-center shrink-0 group-hover:border-primary-dark group-hover:shadow-lg transition-all duration-300">
                        <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-sanfovet-dark group-hover:text-primary transition-colors line-clamp-2 text-[0.9rem] leading-snug">{p.name}</h4>
                        <p className="text-[0.7rem] text-gray-400 mt-1.5 line-clamp-1 font-medium">{p.tagline}</p>
                      </div>
                    </Link>
                  ))}
                  {relatedProducts.length === 0 && (
                    <p className="text-sm text-gray-400 font-medium italic">Không có sản phẩm cùng loại.</p>
                  )}
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
