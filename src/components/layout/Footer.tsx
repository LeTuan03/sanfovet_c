"use client";

import React from 'react';
import Link from 'next/link';
import { FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-sanfovet-dark to-[#061208] text-white/70 py-16 text-[0.85rem] mt-16 w-full relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1 - Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:height-0.5 after:bg-primary uppercase">SANFOVET</h3>
            <p className="font-semibold text-white/90">Công ty CP Đầu tư Liên doanh Việt Anh</p>
            <p><strong>Trụ sở:</strong> Cụm CN Liên Phương, Xã Hồng Vân, Hà Nội</p>
            <p><strong>Điện thoại:</strong> <a href="tel:02466861629" className="hover:text-primary transition-colors">024 66861629</a> | <a href="tel:0974999204" className="hover:text-primary transition-colors">097 499 9204</a></p>
            <p><strong>Email:</strong> <a href="mailto:pkd.sanfovet@gmail.com" className="hover:text-primary transition-colors">pkd.sanfovet@gmail.com</a></p>
            <p><strong>Website:</strong> www.sanfovet.com.vn</p>
            <p className="mt-4 pt-4 border-t border-white/10 text-white/80">
              <strong>Chi nhánh miền Nam:</strong><br/>
              Hố Nai, Trảng Bom, Đồng Nai
            </p>
          </div>

          {/* Col 2 - Product Categories with exact links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:height-0.5 after:bg-primary uppercase">Danh mục sản phẩm</h3>
            <ul className="space-y-2">
              <li><Link href="/san-pham?category=thuoc-bo-tro-tiem-dang-dung-dich-hon-dich" className="hover:text-primary transition-colors">Thuốc bổ trợ tiêm</Link></li>
              <li><Link href="/san-pham?category=thuoc-khang-sinh-tiem-dang-dung-dich-hon-dich" className="hover:text-primary transition-colors">Thuốc kháng sinh tiêm</Link></li>
              <li><Link href="/san-pham?category=thuoc-khang-sinh-dang-dung-dich-uong-dang-xit" className="hover:text-primary transition-colors">Thuốc kháng sinh uống</Link></li>
              <li><Link href="/san-pham?category=thuoc-khang-sinh-dang-premix-sieu-bam-dinh" className="hover:text-primary transition-colors">Thuốc premix bám dính</Link></li>
              <li><Link href="/san-pham?category=thuoc-khang-sinh-dang-bot-dang-hat-hoa-tan" className="hover:text-primary transition-colors">Thuốc bột hòa tan</Link></li>
              <li><Link href="/san-pham?category=thuoc-bo-tro-dang-com-dang-bot-hoa-tan" className="hover:text-primary transition-colors">Thuốc bổ trợ cốm, bột</Link></li>
              <li><Link href="/san-pham?category=thuoc-bo-tro-dang-dung-dich" className="hover:text-primary transition-colors">Thuốc bổ trợ dung dịch</Link></li>
              <li><Link href="/san-pham?category=thuoc-tri-cau-trung-ki-sinh-trung-dang-bot-dang-dung-dich" className="hover:text-primary transition-colors">Thuốc trị cầu trùng</Link></li>
              <li><Link href="/san-pham?category=thuoc-sat-trung-diet-con-trung" className="hover:text-primary transition-colors">Thuốc sát trùng</Link></li>
              <li><Link href="/san-pham?category=thuoc-tri-nam-tri-giun-san" className="hover:text-primary transition-colors">Thuốc trị nấm, giun sán</Link></li>
            </ul>
          </div>

          {/* Col 3 - Technical Support */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:height-0.5 after:bg-primary uppercase">Hỗ trợ kỹ thuật</h3>
            <div className="mb-6">
              <p className="text-white font-bold mb-1">BSTY. Hoàng Đăng Trạng</p>
              <p>Email: <a href="mailto:dangtrang19877@gmail.com" className="hover:text-primary transition-colors">dangtrang19877@gmail.com</a></p>
              <p>SĐT: <a href="tel:0383814838" className="hover:text-primary transition-colors">038 3814838</a></p>
            </div>
            <div className="pt-4 border-t border-white/5">
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Kết nối với chúng tôi</h4>
              <div className="flex gap-3">
                <a href="https://facebook.com/ThuocThuYSANFOVET" target="_blank" rel="noopener" className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all text-lg">
                  <FacebookOutlined />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener" className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all text-lg">
                  <YoutubeOutlined />
                </a>
                <a href="https://zalo.me/0974999204" target="_blank" rel="noopener" className="w-10 h-10 bg-white/10 hover:bg-blue-500 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all text-xs font-bold">
                  Zalo
                </a>
              </div>
            </div>
          </div>

          {/* Col 4 - Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:height-0.5 after:bg-primary uppercase">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link></li>
              <li><Link href="/gioi-thieu" className="hover:text-primary transition-colors">Giới thiệu</Link></li>
              <li><Link href="/catalogue" className="hover:text-primary transition-colors">Catalogue</Link></li>
              <li><Link href="/cam-nang-chan-nuoi" className="hover:text-primary transition-colors">Cẩm nang chăn nuôi</Link></li>
              <li><Link href="/benh-va-dieu-tri-benh" className="hover:text-primary transition-colors">Bệnh & điều trị bệnh</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-primary transition-colors">Tin tức</Link></li>
              <li><Link href="/tuyen-dung" className="hover:text-primary transition-colors">Tuyển dụng</Link></li>
              <li><Link href="/lien-he" className="hover:text-primary transition-colors">Liên hệ</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-[0.82rem]">
          <p>&copy; 2024 Copyright by Sanfovet.com.vn - Công ty CP Đầu tư Liên doanh Việt Anh. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
