import { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: "Giới Thiệu",
  description: "Tìm hiểu về SANFOVET - Công ty CP Đầu tư Liên doanh Việt Anh, đơn vị tiên phong trong sản xuất thuốc thú y công nghệ USA tại Việt Nam.",
  keywords: ["giới thiệu sanfovet", "công ty việt anh", "nhà máy thuốc thú y", "lịch sử sanfovet", "tầm nhìn sứ mệnh"],
};

export default function Page() {
  return <AboutContent />;
}
