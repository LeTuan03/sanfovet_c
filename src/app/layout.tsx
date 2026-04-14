import type { Metadata } from "next";
import { Inter, Montserrat } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ContentProtection from "@/components/shared/ContentProtection";
import { LanguageProvider } from "@/lib/LanguageContext";
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

export const metadata: Metadata = {
  title: {
    default: "SANFOVET - Thuốc Thú Y Công Nghệ USA | Chất Lượng Vượt Trội",
    template: "%s | SANFOVET"
  },
  description: "SANFOVET tự hào là đơn vị tiên phong trong sản xuất và phân phối thuốc thú y trang trại tại Việt Nam với công nghệ tiên tiến từ Hoa Kỳ. Nhà máy đạt tiêu chuẩn GMP-WHO.",
  keywords: ["thuốc thú y", "sanfovet", "chăn nuôi", "gmp-who", "phòng bệnh vật nuôi", "điều trị bệnh thú y"],
  authors: [{ name: "SANFOVET Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
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

