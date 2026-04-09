"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-sanfovet-dark to-[#061208] text-white/70 py-16 text-[0.85rem] mt-16 w-full relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1 */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:height-0.5 after:bg-primary uppercase">SANFOVET</h3>
            <p className="font-semibold text-white/90">Công ty CP Đầu tư Liên doanh Việt Anh</p>
            <p><strong>Trụ sở:</strong> Cụm CN Liên Phương, Xã Hồng Vân, Hà Nội</p>
            <p><strong>Điện thoại:</strong> 024 66861629 | 097 499 9204</p>
            <p><strong>Email:</strong> pkd.sanfovet@gmail.com</p>
            <p><strong>Website:</strong> www.sanfovet.com.vn</p>
            <p className="mt-4 pt-4 border-t border-white/10 text-white/80">
              <strong>Chi nhánh miền Nam:</strong><br/>
              Hố Nai, Trảng Bom, Đồng Nai
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:height-0.5 after:bg-primary uppercase">Danh mục sản phẩm</h3>
            <ul className="space-y-2">
              <li><Link href="/san-pham" className="hover:text-primary transition-colors">Thuốc bổ trợ tiêm</Link></li>
              <li><Link href="/san-pham" className="hover:text-primary transition-colors">Thuốc kháng sinh tiêm</Link></li>
              <li><Link href="/san-pham" className="hover:text-primary transition-colors">Thuốc kháng sinh uống</Link></li>
              <li><Link href="/san-pham" className="hover:text-primary transition-colors">Thuốc premix bám dính</Link></li>
              <li><Link href="/san-pham" className="hover:text-primary transition-colors">Thuốc bột hòa tan</Link></li>
              <li><Link href="/san-pham" className="hover:text-primary transition-colors">Thuốc bổ trợ dung dịch</Link></li>
              <li><Link href="/san-pham" className="hover:text-primary transition-colors">Thuốc sát trùng</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:height-0.5 after:bg-primary uppercase">Hỗ trợ kỹ thuật</h3>
            <div className="mb-6">
              <p className="text-white font-bold mb-1">BSTY. Nguyễn Văn An</p>
              <p>Email: hotro.sanfovet@gmail.com</p>
              <p>SĐT: 098 765 4321</p>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-white font-bold mb-1">BSTY. Trần Thị Lan</p>
              <p>Email: kythuat.sanfovet@gmail.com</p>
              <p>SĐT: 091 234 5678</p>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:height-0.5 after:bg-primary uppercase">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link></li>
              <li><Link href="/gioi-thieu" className="hover:text-primary transition-colors">Giới thiệu</Link></li>
              <li><Link href="/cam-nang-chan-nuoi" className="hover:text-primary transition-colors">Cẩm nang chăn nuôi</Link></li>
              <li><Link href="/benh-va-dieu-tri-benh" className="hover:text-primary transition-colors">Bệnh & điều trị bệnh</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-primary transition-colors">Tin tức</Link></li>
              <li><Link href="/tuyen-dung" className="hover:text-primary transition-colors">Tuyển dụng</Link></li>
              <li><Link href="/lien-he" className="hover:text-primary transition-colors">Liên hệ</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-[0.82rem]">
          <p>&copy; 2026 SANFOVET - Công ty CP Đầu tư Liên doanh Việt Anh. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

