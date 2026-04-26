import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Montserrat } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ContentProtection from "@/components/shared/ContentProtection";
import { LanguageProvider } from "@/lib/LanguageContext";
import { organizationSchema, localBusinessSchema } from "@/lib/schema";
import "./globals.css";

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "BIOTECH-VET - Thuốc Thú Y Công Nghệ USA | Chất Lượng Vượt Trội",
    template: "%s | BIOTECH-VET"
  },
  description: "BIOTECH-VET tự hào là đơn vị tiên phong trong sản xuất và phân phối thuốc thú y trang trại tại Việt Nam với công nghệ tiên tiến từ Hoa Kỳ. Nhà máy đạt tiêu chuẩn GMP-WHO.",
  keywords: ["thuốc thú y", "biotechvet", "chăn nuôi", "gmp-who", "phòng bệnh vật nuôi", "điều trị bệnh thú y"],
  authors: [{ name: "BIOTECH-VET Team" }],
  metadataBase: new URL("https://biotechvet.com.vn"),
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://biotechvet.com.vn",
    siteName: "BIOTECH-VET",
    title: "BIOTECH-VET - Thuốc Thú Y Công Nghệ USA",
    description: "Tiên phong sản xuất thuốc thú y công nghệ USA tại Việt Nam. Nhà máy đạt chuẩn GMP-WHO.",
    images: [
      {
        url: "/images/banner1.png",
        width: 1200,
        height: 630,
        alt: "BIOTECH-VET - Công nghệ USA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BIOTECH-VET - Thuốc Thú Y Công Nghệ USA",
    description: "Tiên phong sản xuất thuốc thú y công nghệ USA tại Việt Nam.",
    images: ["/images/banner1.png"],
  },
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        {/* JSON-LD Schema Markup */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen`} suppressHydrationWarning>
        <AntdRegistry>
          <LanguageProvider>
            <ContentProtection />
            {children}
          </LanguageProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

