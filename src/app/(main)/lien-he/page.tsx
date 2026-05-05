import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: "Liên Hệ - BIOTECH-VET | Hỗ Trợ Kỹ Thuật 24/7",
  description: "Liên hệ với BIOTECH-VET – Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn về thuốc thú y và kỹ thuật chăn nuôi 24/7.",
  keywords: ["liên hệ biotechvet", "hotline biotechvet", "địa chỉ công ty thú y", "hỗ trợ kỹ thuật thú y", "tư vấn thuốc thú y"],
  robots: "index, follow",
  openGraph: {
    title: "Liên Hệ - BIOTECH-VET",
    description: "Liên hệ với BIOTECH-VET – Hỗ trợ kỹ thuật và tư vấn 24/7.",
    url: "https://biotechvet.com.vn/lien-he",
    images: [
      {
        url: "/images/about.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

import Script from 'next/script';
import { breadcrumbSchema } from '@/lib/schema';

export default function Page() {
  return (
    <>
      <Script
        id="breadcrumb-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Trang chủ", url: "/" },
            { name: "Liên hệ", url: "/lien-he" },
          ]))
        }}
      />
      <ContactContent />
    </>
  );
}
