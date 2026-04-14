# BẢNG HẠNG MỤC PHÁT TRIỂN – WEBSITE SANFOVET.COM.VN

> **Website:** https://sanfovet.com.vn  
> **Thương hiệu:** SANFOVET – Công ty CP Đầu tư Liên doanh Việt Anh  
> **Nền tảng:** WordPress (Custom Theme)  
> **Ngày lập:** 13/04/2026  
> **Đơn vị chi phí:** nghìn đồng (VNĐ)

---

## I. FRONTEND – GIAO DIỆN NGƯỜI DÙNG

| STT | Hạng mục | Mô tả | Loại | Chi phí (VND) |
|:---:|----------|-------|:----:|:-------------:|
| 1 | Cấu trúc chung & Header / Footer | Logo, topbar (email + hotline + ngôn ngữ VI/EN), menu chính có dropdown (Sản phẩm 10 danh mục, Tin tức, Giới thiệu), menu mobile hamburger; footer 4 cột: thông tin công ty, link sản phẩm, hỗ trợ kỹ thuật, mạng xã hội, copyright | Frontend | 800 |
| 2 | Widget Float / Sticky – Hỗ trợ nhanh | Các nút cố định màn hình: Hotline click-to-call, Email click-to-email, Zalo, Facebook, nút mở Popup liên hệ nhanh | Frontend | 250 |
| 3 | Trang chủ (`/`) | Banner slider tự động (3–4 ảnh), block "Về chúng tôi" + nút xem thêm + nút catalogue, thumbnail video giới thiệu, block "Sản phẩm nổi bật" (grid 7 sản phẩm + hover overlay), block "Bệnh & điều trị" (5 bài mới nhất), block "Tin nổi bật" (5 bài), block "Tại sao chọn chúng tôi" (5 icon) | Frontend | 1.000 |
| **3a** | **Block Video & Hình ảnh – Trang chủ** | **Section riêng trên trang chủ: gallery hình ảnh dạng masonry/grid (tối đa 12 ảnh, lightbox phóng to), nhúng 1–2 video (YouTube embed hoặc MP4 self-hosted) với thumbnail tùy chỉnh, autoplay tắt theo mặc định, responsive đầy đủ trên mobile/tablet** | **Frontend** | **350** |
| 4 | Trang Giới thiệu (`/gioi-thieu/`) | Video MP4 self-hosted nhúng trực tiếp có play/pause; 6 tab/section nội dung: Catalogue, Lịch sử, Giới thiệu, Tầm nhìn–Sứ mệnh, Cơ sở vật chất, Cơ cấu tổ chức; sidebar sản phẩm nổi bật + tin tức; breadcrumb | Frontend | 450 |
| 5 | Trang Catalogue (`/catalogue/`) | Hiển thị PDF/ảnh catalogue, nút tải xuống file PDF/ZIP, breadcrumb | Frontend | 250 |
| 6 | Trang Tổng Sản phẩm (`/danh-muc-san-pham/san-pham/`) | Grid tất cả sản phẩm (ảnh + tên + hover "Xem thêm"), sidebar 10 danh mục lọc nhanh, phân trang | Frontend | 350 |
| 7 | Nhóm 10 Danh mục Sản phẩm (`/…/{category-slug}/`) | Template dùng chung cho 10 danh mục: tiêu đề H1, breadcrumb, grid sản phẩm (ảnh + overlay), phân trang (VD: 21 trang), sidebar nổi bật + tin tức + link nhanh | Frontend | 600 |
| 8 | Trang Chi tiết Sản phẩm (`/san-pham/{slug}/`) | Ảnh sản phẩm + lightbox phóng to, tên H1, tagline, nút CTA "Liên hệ mua hàng", bảng Thành phần, Đặc tính, Chỉ định, Cách dùng & Liều lượng, Dạng bào chế, Ngừng thuốc, Bảo quản, Thể tích, SĐK; sản phẩm liên quan (related grid); sidebar nổi bật + tin tức + link nhanh | Frontend | 650 |
| 9 | Trang Cẩm nang Chăn nuôi (`/cam-nang-chan-nuoi/`) | Các section theo loài vật (Gà, Heo, Thủy Sản, Trâu Bò, Vịt...): tiêu đề nhóm + nút "Xem tất cả" + grid bài viết (ảnh + tiêu đề + ngày + excerpt) | Frontend | 500 |
| 10 | Sub-tag Cẩm nang theo loài (`/ga/`, `/heo-…/`, …) | Tiêu đề tag, breadcrumb, danh sách bài viết theo tag (ảnh + tiêu đề + ngày + excerpt), phân trang | Frontend | 250 |
| 11 | Trang Bệnh & Điều trị bệnh (`/benh-va-dieu-tri-banh/`) | Breadcrumb, grid bài viết (ảnh + tiêu đề + ngày + excerpt), phân trang, sidebar sản phẩm nổi bật + tin tức | Frontend | 350 |
| 12 | Module Tin tức – 3 trang danh sách | Trang Tổng hợp (`/tin-tuc/`), Tin nội bộ (`/tin-tuc-noi-bo/`), Tin ngành (`/tin-tuc-nganh-chan-nuoi-thu-y/`): breadcrumb, grid bài, lọc sub-category, phân trang | Frontend | 450 |
| 13 | Chi tiết Bài viết (`/{post-slug}/`) | Breadcrumb, tiêu đề H1, ngày đăng, ảnh đại diện, mục lục (TOC tự động từ H2/H3), nội dung HTML đầy đủ, ảnh + bảng trong bài, link nội bộ cross-linking, sidebar sản phẩm nổi bật + tin tức liên quan, bài viết liên quan (related posts), bảo vệ nội dung (chặn chuột phải + popup cảnh báo) | Frontend | 450 |
| 14 | Trang Tuyển dụng (`/tuyen-dung/`) | Breadcrumb, danh sách card tuyển dụng (poster + tiêu đề + ngày + excerpt), phân trang, sidebar tabs giới thiệu nhanh + sản phẩm nổi bật | Frontend | 350 |
| 15 | Chi tiết Tin tuyển dụng (`/{job-slug}/`) | Breadcrumb, tiêu đề H1, ngày đăng, ảnh poster, nội dung HTML chi tiết (giới thiệu, yêu cầu, quyền lợi, cách nộp), thông tin liên hệ ứng tuyển, sidebar sản phẩm + tin tức | Frontend | 250 |
| 16 | Trang Liên hệ (`/lien-he/`) | Breadcrumb, hiển thị địa chỉ 2 cơ sở, hotline click-to-call, email click-to-email, Google Maps embed (iframe), form liên hệ đầy đủ: Họ tên + SĐT + Email + Nội dung + Validation + Submit + thông báo thành công + gửi email đến admin + email xác nhận người dùng | Frontend | 450 |
| 17 | Popup Liên hệ nhanh (Overlay) | Kích hoạt từ nút Float (FL-03): overlay với tiêu đề, mô tả, tên công ty, đóng bằng nút X hoặc click ngoài | Frontend | 200 |

---

## II. ADMIN – QUẢN TRỊ NỘI DUNG (CMS)

| STT | Hạng mục | Mô tả | Loại | Chi phí (VND) |
|:---:|----------|-------|:----:|:-------------:|
| 18 | Khung Admin & Đăng nhập | Trang đăng nhập admin riêng, layout dashboard tổng quan, phân quyền user | Admin | 250 |
| 19 | Quản lý Sản phẩm | CRUD đầy đủ sản phẩm: thêm/sửa/xóa/ẩn; quản lý 10 danh mục; nhập liệu bảng thành phần, thành phần kỹ thuật, ảnh, SĐK, tagline; gán sản phẩm nổi bật | Admin | 600 |
| 20 | Quản lý Bài viết (Cẩm nang + Bệnh & Điều trị) | CRUD bài viết: tiêu đề, nội dung HTML, ảnh đại diện, ngày đăng, phân loại tag theo loài vật (Gà, Heo, Thủy Sản, Trâu Bò...), mục lục tự động | Admin | 400 |
| 21 | Quản lý Tin tức | CRUD tin tức: tiêu đề, nội dung, ảnh đại diện, phân loại (Nội bộ / Ngành chăn nuôi thú y), ngày đăng, trạng thái đăng/ẩn | Admin | 250 |
| 22 | Quản lý Tuyển dụng | CRUD tin tuyển dụng: tiêu đề vị trí, ảnh poster, nội dung HTML chi tiết (khu vực, yêu cầu, quyền lợi), ngày đăng, trạng thái | Admin | 200 |
| 23 | Quản lý Banner / Slider trang chủ | Thêm/sửa/xóa/sắp xếp thứ tự banner slider; upload ảnh; gán link điều hướng | Admin | 200 |
| **23a** | **Quản lý Video & Hình ảnh – Trang chủ** | **Giao diện admin quản lý riêng cho section video/hình ảnh trang chủ: upload/xóa/sắp xếp ảnh gallery (tối đa 12 ảnh, kéo thả đổi thứ tự); thêm/sửa/xóa video (nhập URL YouTube hoặc upload MP4); đặt thumbnail tùy chỉnh cho từng video; bật/tắt hiển thị từng item** | **Admin** | **300** |
| 24 | Quản lý Menu | Quản lý menu chính & sub-menu dropdown (Sản phẩm 10 danh mục, Giới thiệu, Tin tức) | Admin | 150 |
| 25 | Quản lý Thông tin chung | Email, hotline, địa chỉ 2 cơ sở, link mạng xã hội (Facebook, YouTube, Zalo), thông tin hỗ trợ kỹ thuật | Admin | 200 |
| 26 | Quản lý User | CRUD tài khoản admin, đổi mật khẩu, phân quyền | Admin | 150 |

---

## III. CÀI ĐẶT & DỊCH VỤ VẬN HÀNH

| STT | Hạng mục | Mô tả | Loại | Chi phí (VND) |
|:---:|----------|-------|:----:|:-------------:|
| 27 | Tối ưu SEO On-page | Cấu hình Yoast/RankMath, meta title/description cho từng loại trang, sitemap XML, robots.txt, schema sản phẩm | Frontend | 350 |
| 28 | Tối ưu tốc độ & Responsive | Caching (WP Rocket/LiteSpeed), nén ảnh WebP, lazy load, kiểm tra giao diện mobile/tablet toàn bộ 20 màn hình | Frontend | 250 |
| 39 | Bảo vệ nội dung & Bảo mật | Right-click block toàn site, bảo vệ form spam (reCAPTCHA), cập nhật SSL, ẩn phiên bản WP | Frontend | 150 |
| 30 | Giá Hosting (đề xuất) | Hosting tốc độ cao | Dịch vụ | **.../tháng** |
| 31 | Giá Tên miền `.com` | Gia hạn tên miền `.com` hằng năm | Dịch vụ | **.../năm** |

---

## TỔNG HỢP CHI PHÍ

| Nhóm | Số hạng mục | Tổng chi phí (VND) |
|------|:-----------:|:------------------:|
| Frontend – Giao diện người dùng (18 hạng mục) | 18 | **7.950.000đ** |
| Admin – Quản trị nội dung (10 hạng mục) | 10 | **2.700.000đ** |
| Cài đặt & Tối ưu vận hành (3 hạng mục) | 3 | **1.000.000đ** |
| **TỔNG CHI PHÍ PHÁT TRIỂN** | **31** | **11.650.000đ** |
| Hosting (tháng đầu) | — | ......đ/tháng |
| Tên miền .com (năm đầu) | — | ......đ/năm |

---
