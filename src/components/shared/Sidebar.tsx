"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SidebarProps {
  showProducts?: boolean;
  showNews?: boolean;
  showQuickLinks?: boolean;
}

export default function Sidebar({ showProducts = true, showNews = true, showQuickLinks = true }: SidebarProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, aRes] = await Promise.all([
          fetch('/api/data/products'),
          fetch('/api/data/articles')
        ]);
        const pData = await pRes.json();
        const aData = await aRes.json();
        setProducts(pData);
        setArticles(aData);
      } catch (error) {
        console.error('Failed to fetch sidebar data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-40 bg-gray-100 rounded-2xl"></div><div className="h-40 bg-gray-100 rounded-2xl"></div></div>;

  const featuredProducts = products.filter((p: any) => p.featured).slice(0, 7);
  const latestNews = articles.slice(0, 5);

  return (
    <div className="sticky top-24 space-y-10">
      {/* Featured Products */}
      {showProducts && (
        <div className="bg-sanfovet-alt p-6 rounded-[24px] border border-gray-100">
          <h3 className="font-black text-lg text-sanfovet-dark mb-6 border-b border-gray-200 pb-3 uppercase tracking-wider">Sản phẩm nổi bật</h3>
          <div className="space-y-5">
            {featuredProducts.map((p: any) => (
              <Link href={`/san-pham/${p.slug}`} key={p.id} className="flex gap-4 group">
                <div className="w-16 h-16 bg-white rounded-xl border border-gray-100 p-1.5 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:shadow-md transition-all">
                  <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-sanfovet-dark group-hover:text-primary transition-colors line-clamp-2 text-sm leading-snug">{p.name}</h4>
                  <p className="text-[0.65rem] text-gray-400 mt-1 line-clamp-1 font-medium">{p.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Latest News */}
      {showNews && (
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
          <h3 className="font-black text-lg text-sanfovet-dark mb-6 border-b border-gray-200 pb-3 uppercase tracking-wider">Tin tức mới nhất</h3>
          <div className="space-y-5">
            {latestNews.map((a: any) => (
              <Link href={`/bai-viet/${a.slug}`} key={a.id} className="flex gap-4 group">
                <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-sanfovet-dark group-hover:text-primary transition-colors line-clamp-2 text-sm leading-snug">{a.title}</h4>
                  <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">{a.publishDate}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      {showQuickLinks && (
        <div className="bg-sanfovet-dark p-6 rounded-[24px] text-white">
          <h3 className="font-black text-lg mb-6 border-b border-white/10 pb-3 uppercase tracking-wider">Liên kết nhanh</h3>
          <ul className="space-y-3">
            <li><Link href="/catalogue" className="flex items-center gap-2 text-white/70 hover:text-primary-light transition-colors font-medium text-sm">Catalogue sản phẩm</Link></li>
            <li><Link href="/gioi-thieu" className="flex items-center gap-2 text-white/70 hover:text-primary-light transition-colors font-medium text-sm">Giới thiệu công ty</Link></li>
            <li><Link href="/lien-he" className="flex items-center gap-2 text-white/70 hover:text-primary-light transition-colors font-medium text-sm">Liên hệ tư vấn</Link></li>
            <li><Link href="/" className="flex items-center gap-2 text-white/70 hover:text-primary-light transition-colors font-medium text-sm">Trang chủ</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
}
