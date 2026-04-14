import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: "Liên Hệ",
  description: "Liên hệ với SANFOVET – Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn về thuốc thú y và kỹ thuật chăn nuôi 24/7.",
  keywords: ["liên hệ sanfovet", "hotline sanfovet", "địa chỉ công ty việt anh", "hỗ trợ kỹ thuật thú y"],
};

export default function Page() {
  return <ContactContent />;
}
