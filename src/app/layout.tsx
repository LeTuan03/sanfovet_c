import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Montserrat } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ContentProtection from "@/components/shared/ContentProtection";
import { LanguageProvider } from "@/lib/LanguageContext";
import { organizationSchema, localBusinessSchema } from "@/lib/schema";
import NextTopLoader from 'nextjs-toploader';
import Preloader from "@/components/shared/Preloader";
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
        url: "/images/about.jpg",
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
    images: ["/images/about.jpg"],
  },
  icons: {
    icon: [
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/favicon.ico' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/images/site.webmanifest',
  verification: {
    google: 'CEwCXJkg_vbmN7CZRiFYNtmAqjlucXutX8DJ5ERM0X0',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${montserrat.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Remove browser extension attributes (e.g. Bitdefender bis_skin_checked) before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var o = new MutationObserver(function(mutations) {
                  mutations.forEach(function(m) {
                    if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
                      m.target.removeAttribute('bis_skin_checked');
                    }
                    if (m.type === 'childList') {
                      m.addedNodes.forEach(function(n) {
                        if (n.nodeType === 1) {
                          if (n.hasAttribute && n.hasAttribute('bis_skin_checked')) n.removeAttribute('bis_skin_checked');
                          if (n.querySelectorAll) n.querySelectorAll('[bis_skin_checked]').forEach(function(el) { el.removeAttribute('bis_skin_checked'); });
                        }
                      });
                    }
                  });
                });
                o.observe(document.documentElement, { attributes: true, attributeFilter: ['bis_skin_checked'], childList: true, subtree: true });
                setTimeout(function() { o.disconnect(); }, 3000);
              } catch(e) {}
            `,
          }}
        />
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
        <NextTopLoader 
          color="#199ad6"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #199ad6,0 0 5px #199ad6"
        />
        <Preloader />
        <AntdRegistry>
          <LanguageProvider>
            <ContentProtection />
            <div suppressHydrationWarning>
              {children}
            </div>
          </LanguageProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

