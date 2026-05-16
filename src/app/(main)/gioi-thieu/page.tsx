import { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: "Giới Thiệu - BIOTECH-VET | Công Ty Cp Công Nghệ Sinh Học Thú Y - Dược Thú Y Công Nghệ USA",
  description: "Tìm hiểu về BIOTECH-VET - Công Ty CP Công Nghệ Sinh Học Thú Y, đơn vị tiên phong trong sản xuất dược thú y công nghệ USA tại Việt Nam.",
  keywords: ["giới thiệu biotechvet", "công ty việt anh", "nhà máy dược thú y", "lịch sử biotechvet", "tầm nhìn sứ mệnh"],
  robots: "index, follow",
  openGraph: {
    title: "Giới Thiệu - BIOTECH-VET",
    description: "Tìm hiểu về BIOTECH-VET - Đơn vị tiên phong sản xuất dược thú y công nghệ USA tại Việt Nam.",
    url: "https://biotechvet.com.vn/gioi-thieu",
    images: [
      {
        url: "/images/about.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
};

import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
      <AboutContent />
    </Suspense>
  );
}
