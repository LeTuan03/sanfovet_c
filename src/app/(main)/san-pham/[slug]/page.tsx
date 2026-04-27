import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { productService, categoryService } from '@/services';
import { Product } from '@/types';
import { ChevronRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';

import ProductImageLightbox from '@/components/shared/ProductImageLightbox';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);
  
  if (!product) {
    return {
      title: 'Sản phẩm không tìm thấy - biotechvet',
      description: 'Sản phẩm bạn tìm kiếm không tồn tại.',
    };
  }

  return {
    title: `${product.name} - Thuốc Thú Y biotechvet`,
    description: `Chi tiết sản phẩm ${product.name} từ biotechvet - Công nghệ USA`,
    keywords: ['thuốc thú y', 'biotechvet', product.name, 'chăn nuôi', 'sản phẩm'],
    robots: 'index, follow',
    openGraph: {
      type: "website",
      title: `${product.name} - biotechvet`,
      description: `Chi tiết sản phẩm ${product.name}`,
      url: `https://biotechvet.com.vn/san-pham/${product.slug}`,
      images: [
        {
          url: product.image || '/images/default-product.png',
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - biotechvet`,
      description: 'Sản phẩm thuốc thú y chất lượng cao',
      images: [product.image || '/images/default-product.png'],
    },
  };
}

export default async function ProductDetailPage({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = await categoryService.getById(String(product.categoryId));
  const products = await productService.getAll();
  const relatedProducts = products.filter((p: Product) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white min-h-[100vh] pb-24">
      {/* Breadcrumbs */}
      <div className="bg-biotechvet-alt py-4">
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
          <div className="bg-biotechvet-alt rounded-[24px] p-8 md:p-12 flex items-center justify-center relative shadow-inner">
             <ProductImageLightbox src={product.image} alt={product.name} />
             <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-sm">
                <ShieldCheck className="text-primary" size={24} />
             </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="text-xs font-black text-primary bg-primary-light px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-[2px]">
              {category?.name}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-biotechvet-dark mb-8 leading-tight">{product.name}</h1>
            
            <div className="flex flex-wrap gap-4 mt-auto">
               <Link href="/lien-he" className="bg-gradient-to-r from-primary to-primary-dark hover:shadow-xl hover:-translate-y-1 text-white px-10 py-4 rounded-full font-black transition-all flex-1 text-center shadow-lg active:scale-95 uppercase">
                 LIÊN HỆ ĐẶT HÀNG
               </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-10">
            {product.specifications && product.specifications.length > 0 ? (
              product.specifications.map((spec) => (
                <section key={spec.title}>
                  <h2 className="text-[1.1rem] font-black text-primary mb-6 flex items-center gap-3 bg-primary-light px-5 py-3.5 border-l-[6px] border-primary uppercase tracking-wider shadow-sm">
                    {spec.title}
                  </h2>
                  <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                    {spec.content}
                  </div>
                </section>
              ))
            ) : (
              <div className="bg-gray-50 p-12 rounded-3xl border border-dashed border-gray-200 text-center text-gray-400 font-medium">
                Sản phẩm này chưa có thông số kỹ thuật chi tiết.
              </div>
            )}
          </div>

          <aside className="lg:col-span-1">
             <div className="bg-biotechvet-alt p-8 rounded-[24px] border border-gray-100 shadow-inner sticky top-24">
                <h3 className="font-black text-lg text-biotechvet-dark mb-8 border-b border-gray-200 pb-4 uppercase tracking-wider">Sản phẩm cùng loại</h3>
                <div className="space-y-6">
                  {relatedProducts.map((p: Product) => (
                    <Link href={`/san-pham/${p.slug}`} key={p.id} className="flex gap-5 group">
                      <div className="w-20 h-20 bg-white rounded-2xl border border-gray-100 p-2 flex items-center justify-center shrink-0 group-hover:border-primary-dark group-hover:shadow-lg transition-all duration-300">
                        <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-biotechvet-dark group-hover:text-primary transition-colors line-clamp-2 text-[0.9rem] leading-snug">{p.name}</h4>
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
