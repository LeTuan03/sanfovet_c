import { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: "Giới Thiệu - BIOTECH-VET | Công Ty Thuốc Thú Y USA",
  description: "Tìm hiểu về BIOTECH-VET - Công Ty CP Công Nghệ Sinh Học Thú Y, đơn vị tiên phong trong sản xuất thuốc thú y công nghệ USA tại Việt Nam.",
  keywords: ["giới thiệu biotechvet", "công ty thú y", "nhà máy thuốc thú y", "lịch sử biotechvet", "tầm nhìn sứ mệnh"],
  robots: "index, follow",
  openGraph: {
    title: "Giới Thiệu - BIOTECH-VET",
    description: "Tìm hiểu về BIOTECH-VET - Đơn vị tiên phong sản xuất thuốc thú y công nghệ USA tại Việt Nam.",
    url: "https://biotechvet.com.vn/gioi-thieu",
    images: [
      {
        url: "/images/about.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

import { Suspense } from 'react';
import Script from 'next/script';
import { breadcrumbSchema } from '@/lib/schema';

export default function Page() {
  return (
    <>
      <Script
        id="breadcrumb-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Trang chủ", url: "/" },
            { name: "Giới thiệu", url: "/gioi-thieu" },
          ]))
        }}
      />
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
        <AboutContent />
      </Suspense>
    </>
  );
}
