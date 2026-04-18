"use client";

import React from 'react';
import Link from 'next/link';
import { FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
// import { footerMenus } from '@/lib/data'; // Removed static import

export default function Footer() {
  const { t } = useLanguage();
  const [menus, setMenus] = React.useState<any[]>([]);
  const [settings, setSettings] = React.useState<any>(null);
  const [categories, setCategories] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [menusRes, settingsRes, catRes] = await Promise.all([
          fetch('/api/data/menus'),
          fetch('/api/data/settings'),
          fetch('/api/data/categories')
        ]);
        const menusData = await menusRes.json();
        const settingsData = await settingsRes.json();
        const catData = await catRes.json();

        if (Array.isArray(menusData)) {
          setMenus(menusData.filter((m: any) => m.position === 'footer' || m.position === 'both'));
        }
        
        setSettings(settingsData);

        if (Array.isArray(catData)) {
          setCategories(catData.slice(0, 10)); // Take first 10 for footer
        }
      } catch (error) {
        console.error('Failed to fetch footer data', error);
      }
    };
    fetchData();
  }, []);
  return (
    <footer className="bg-gradient-to-b from-sanfovet-dark to-[#061208] text-white/70 py-16 text-[0.85rem] mt-16 w-full relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1 - Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="space-y-4"
          >
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:height-0.5 after:bg-primary uppercase">SANFOVET</h3>
            <p className="font-semibold text-white/90">{settings?.companyName || 'Công ty CP Đầu tư Liên doanh Việt Anh'}</p>
            <p><strong>Trụ sở:</strong> {settings?.addressHN || 'Cụm CN Liên Phương, Xã Hồng Vân, Hà Nội'}</p>
            <p><strong>Điện thoại:</strong> <a href={`tel:${settings?.hotline1}`} className="hover:text-primary transition-colors">{settings?.hotline1 || '024 66861629'}</a> | <a href={`tel:${settings?.hotline2}`} className="hover:text-primary transition-colors">{settings?.hotline2 || '097 499 9204'}</a></p>
            <p><strong>Email:</strong> <a href={`mailto:${settings?.email}`} className="hover:text-primary transition-colors">{settings?.email || 'pkd.sanfovet@gmail.com'}</a></p>
            <p><strong>Website:</strong> www.sanfovet.com.vn</p>
            {settings?.addressHCM && (
              <p className="mt-4 pt-4 border-t border-white/10 text-white/80">
                <strong>Chi nhánh miền Nam:</strong><br/>
                {settings.addressHCM}
              </p>
            )}
          </motion.div>

          {/* Col 2 - Product Categories with exact links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:height-0.5 after:bg-primary uppercase">{t('products')}</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}><Link href={`/san-pham?category=${cat.id}`} className="hover:text-primary transition-colors">{cat.name}</Link></li>
              ))}
              {categories.length === 0 && (
                <>
                  <li><Link href="/san-pham" className="hover:text-primary transition-colors">Tất cả sản phẩm</Link></li>
                </>
              )}
            </ul>
          </motion.div>

          {/* Col 3 - Technical Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:height-0.5 after:bg-primary uppercase">{t('tech_support')}</h3>
            <div className="mb-6">
              <p className="text-white font-bold mb-1">{settings?.support?.doctorName || 'BSTY. Hoàng Đăng Trạng'}</p>
              <p>Email: <a href={`mailto:${settings?.support?.doctorEmail}`} className="hover:text-primary transition-colors">{settings?.support?.doctorEmail || 'dangtrang19877@gmail.com'}</a></p>
              <p>SĐT: <a href={`tel:${settings?.support?.doctorPhone}`} className="hover:text-primary transition-colors">{settings?.support?.doctorPhone || '038 3814838'}</a></p>
            </div>
            <div className="pt-4 border-t border-white/5">
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Kết nối với chúng tôi</h4>
              <div className="flex gap-3">
                <a href={settings?.social?.facebook || "https://facebook.com/ThuocThuYSANFOVET"} target="_blank" rel="noopener" className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all text-lg">
                  <FacebookOutlined />
                </a>
                <a href={settings?.social?.youtube || "https://youtube.com"} target="_blank" rel="noopener" className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all text-lg">
                  <YoutubeOutlined />
                </a>
                <a href={`https://zalo.me/${settings?.social?.zalo || "0974999204"}`} target="_blank" rel="noopener" className="w-10 h-10 bg-white/10 hover:bg-blue-500 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all text-xs font-bold">
                  Zalo
                </a>
              </div>
            </div>
          </motion.div>

          {/* Col 4 - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:height-0.5 after:bg-primary uppercase">Liên kết nhanh</h3>
            <ul className="space-y-2">
              {menus.filter(m => m.status).sort((a, b) => a.order - b.order).map((menu) => (
                <li key={menu.id}>
                  <Link href={menu.link} className="hover:text-primary transition-colors">
                    {t(menu.name) || menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-[0.82rem]">
          <p>&copy; 2024 Copyright by Sanfovet.com.vn - Công ty CP Đầu tư Liên doanh Việt Anh. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
