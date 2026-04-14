# BẢNG CHỨC NĂNG CHI TIẾT – WEBSITE SANFOVET.COM.VN

> **Website:** https://sanfovet.com.vn  
> **Thương hiệu:** SANFOVET – Công ty CP Đầu tư Liên doanh Việt Anh  
> **Nền tảng:** WordPress (Custom Theme)  
> **Ngày lập:** 13/04/2026  

---

## MỤC LỤC MÀN HÌNH

| STT | Màn hình | URL |
|-----|----------|-----|
| 01 | Header – Thanh điều hướng toàn cục | (Global component) |
| 02 | Footer – Chân trang toàn cục | (Global component) |
| 03 | Float/Sticky – Hỗ trợ nhanh | (Global component) |
| 04 | Trang Chủ | `/` |
| 05 | Giới Thiệu Công Ty | `/gioi-thieu/` |
| 06 | Catalogue | `/catalogue/` |
| 07 | Trang Tổng Sản Phẩm | `/danh-muc-san-pham/san-pham/` |
| 08 | Trang Danh Mục Sản Phẩm (10 loại) | `/danh-muc-san-pham/san-pham/{category-slug}/` |
| 09 | Trang Chi Tiết Sản Phẩm | `/san-pham/{product-slug}/` |
| 10 | Cẩm Nang Chăn Nuôi | `/cam-nang-chan-nuoi/` |
| 11 | Sub-tag Cẩm Nang (Gà / Heo / Trâu Bò / Thủy Sản / Vịt...) | `/ga/`, `/heo-cam-nang-chan-nuoi/`, `/trau-bo-cam-nang-chan-nuoi/`... |
| 12 | Bệnh và Điều Trị Bệnh | `/benh-va-dieu-tri-banh/` |
| 13 | Tin Tức (tổng hợp) | `/tin-tuc/` |
| 14 | Tin Tức Nội Bộ | `/tin-tuc-noi-bo/` |
| 15 | Tin Tức Ngành Chăn Nuôi Thú Y | `/tin-tuc-nganh-chan-nuoi-thu-y/` |
| 16 | Chi Tiết Bài Viết (Post Detail) | `/{post-slug}/` |
| 17 | Tuyển Dụng | `/tuyen-dung/` |
| 18 | Chi Tiết Tin Tuyển Dụng | `/{job-slug}/` |
| 19 | Liên Hệ | `/lien-he/` |
| 20 | Popup Liên Hệ Nhanh | (Overlay component) |

---

## 01 – HEADER (Thanh Điều Hướng Toàn Cục)

> Hiển thị trên **tất cả các trang** của website.

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| H-01 | Hiển thị logo | Hiển thị logo Sanfovet ở góc trên bên trái | — | Render ảnh logo | Click logo → về trang chủ `/` |
| H-02 | Topbar – Email liên hệ | Hiển thị `pkd.sanfovet@gmail.com` dạng link `mailto:` | — | Mở email client | Click → `mailto:pkd.sanfovet@gmail.com` |
| H-03 | Topbar – Hotline | Hiển thị `097 499 9204` dạng link `tel:` | — | Gọi điện trực tiếp | Click → `tel:0974999204` |
| H-04 | Chuyển ngôn ngữ EN | Icon cờ Anh + text "en" | Click | Reload trang bản tiếng Anh | Đa ngôn ngữ VI/EN |
| H-05 | Chuyển ngôn ngữ VI | Icon cờ Việt Nam + text "vi" | Click | Reload trang bản tiếng Việt | Mặc định là VI |
| H-06 | Menu: Trang chủ | Link điều hướng | Click | Chuyển trang `/` | — |
| H-07 | Menu: Giới thiệu (dropdown) | Tiêu đề menu cha, hover/click hiển thị sub-menu | Hover / Click | Dropdown menu mở ra | — |
| H-08 | Sub-menu: Giới thiệu | Link điều hướng | Click | Chuyển trang `/gioi-thieu/` | — |
| H-09 | Sub-menu: Catalogue | Link điều hướng | Click | Chuyển trang `/catalogue/` | — |
| H-10 | Menu: SẢN PHẨM (dropdown) | Tiêu đề menu cha | Hover / Click | Dropdown 10 danh mục sản phẩm | — |
| H-11 | Sub-menu: 10 danh mục sản phẩm | Các link danh mục sản phẩm | Click | Chuyển trang danh mục tương ứng | Xem chi tiết danh mục tại mục 08 |
| H-12 | Menu: Cẩm nang chăn nuôi | Link điều hướng | Click | Chuyển trang `/cam-nang-chan-nuoi/` | — |
| H-13 | Menu: Bệnh và điều trị bệnh | Link điều hướng | Click | Chuyển trang `/benh-va-dieu-tri-banh/` | — |
| H-14 | Menu: Tin tức (dropdown) | Tiêu đề menu cha | Hover / Click | Dropdown 2 sub-menu | — |
| H-15 | Sub-menu: Tin tức nội bộ | Link điều hướng | Click | Chuyển trang `/tin-tuc-noi-bo/` | — |
| H-16 | Sub-menu: Tin tức ngành chăn nuôi thú y | Link điều hướng | Click | Chuyển trang `/tin-tuc-nganh-chan-nuoi-thu-y/` | — |
| H-17 | Menu: TUYỂN DỤNG | Link điều hướng | Click | Chuyển trang `/tuyen-dung/` | — |
| H-18 | Menu: Liên hệ | Link điều hướng | Click | Chuyển trang `/lien-he/` | — |
| H-19 | Menu mobile (hamburger) | Trên thiết bị di động, menu thu gọn thành icon ☰ | Click icon | Mở/đóng menu mobile dạng drawer/overlay | Responsive |

---

## 02 – FOOTER (Chân Trang Toàn Cục)

> Hiển thị trên **tất cả các trang** của website.

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| F-01 | Thông tin công ty – Tên | Hiển thị tên công ty đầy đủ | — | Text tĩnh | — |
| F-02 | Thông tin công ty – Địa chỉ trụ sở | Cụm CN Liên Phương, Xã Hồng Vân, Hà Nội | — | Text tĩnh | — |
| F-03 | Thông tin công ty – Chi nhánh miền Nam | Hố Nai, Trảng Bom, Đồng Nai | — | Text tĩnh | — |
| F-04 | Thông tin công ty – Điện thoại | `024 66861629 - 097 499 9204` | — | Text tĩnh | — |
| F-05 | Thông tin công ty – Email | `pkd.sanfovet@gmail.com` | — | Text tĩnh | — |
| F-06 | Thông tin công ty – Website | `www.sanfovet.com.vn` | — | Text tĩnh | — |
| F-07 | Danh sách sản phẩm nhanh (10 link) | Các link tắt đến 10 danh mục sản phẩm | Click | Chuyển trang danh mục | — |
| F-08 | Hỗ trợ kỹ thuật – Tên BSTY | BSTY. Hoàng Đăng Trạng | — | Text tĩnh | — |
| F-09 | Hỗ trợ kỹ thuật – Email | `dangtrang19877@gmail.com` | — | Text tĩnh | — |
| F-10 | Hỗ trợ kỹ thuật – SĐT | `038 3814838` | — | Text tĩnh | — |
| F-11 | Icon mạng xã hội – Facebook | Link đến page Facebook Sanfovet | Click | Mở tab mới `facebook.com/ThuocThuYSANFOVET` | — |
| F-12 | Icon mạng xã hội – YouTube | Link đến kênh YouTube chăn nuôi | Click | Mở tab mới YouTube | — |
| F-13 | Icon mạng xã hội – Zalo | Link đến Zalo OA của công ty | Click | Mở Zalo / Zalo Web | — |
| F-14 | Copyright | © 2024 Copyright by Sanfovet.com.vn | — | Text tĩnh | — |

---

## 03 – FLOAT / STICKY (Hỗ Trợ Nhanh – Cố Định Màn Hình)

> Luôn hiện khi cuộn trang, không bị che khuất bởi nội dung.

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| FL-01 | Nút Hotline click-to-call | Icon điện thoại + số `097 499 9204` | Click | Gọi điện trực tiếp | Fixed bottom/side |
| FL-02 | Nút Email click-to-email | Icon email + địa chỉ | Click | Mở email client | Fixed |
| FL-03 | Nút mở Popup liên hệ | Text "Liên hệ với chúng tôi" | Click | Mở Popup Liên Hệ Nhanh (xem màn 20) | Fixed |
| FL-04 | Nút Zalo | Icon Zalo | Click | Mở chat Zalo với công ty | Fixed |
| FL-05 | Nút Facebook | Icon Facebook | Click | Mở page Facebook | Fixed |

---

## 04 – TRANG CHỦ (`/`)

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| TC-01 | Banner Slider tự động | Trình chiếu 3–4 banner hình ảnh xoay vòng tự động | Tự động / Swipe | Hiển thị lần lượt từng banner | Auto-play slideshow |
| TC-02 | Banner – Click điều hướng | Mỗi banner có thể link đến trang sản phẩm/bài viết | Click banner | Chuyển đến trang đích | Tùy từng banner |
| TC-03 | Block "Về chúng tôi" – Đọc giới thiệu | Đoạn giới thiệu ngắn về Sanfovet | — | Hiển thị text mô tả | — |
| TC-04 | Block "Về chúng tôi" – Nút Xem thêm | Link đến trang giới thiệu đầy đủ | Click | Chuyển trang `/gioi-thieu/` | — |
| TC-05 | Block "Về chúng tôi" – Nút Hồ sơ năng lực | Link đến catalogue | Click | Chuyển trang `/catalogue/` | — |
| TC-06 | Thumbnail video – Xem video giới thiệu | Hình ảnh kèm nút play | Click | Chuyển trang `/gioi-thieu/` (có video) | Video MP4 self-hosted |
| TC-07 | Block "Sản phẩm nổi bật" – Danh sách | Grid 7 sản phẩm nổi bật: ảnh + tên | — | Render danh sách sản phẩm | — |
| TC-08 | Block "Sản phẩm nổi bật" – Click sản phẩm | Click vào ảnh hoặc tên sản phẩm | Click | Chuyển trang chi tiết sản phẩm | — |
| TC-09 | Block "Sản phẩm nổi bật" – Nút "Xem thêm" | Overlay khi hover vào ảnh sản phẩm | Hover + Click | Chuyển trang chi tiết sản phẩm | — |
| TC-10 | Block "Sản phẩm nổi bật" – Link xem tất cả | "Xem thêm các sản phẩm khác" | Click | Chuyển trang `/san-pham` | — |
| TC-11 | Block "Bệnh và điều trị bệnh" – Danh sách | 4–5 bài viết mới nhất thuộc chuyên mục bệnh | — | Render list: ảnh + tiêu đề + ngày | — |
| TC-12 | Block "Bệnh và điều trị bệnh" – Click bài | Click vào bài viết | Click | Chuyển trang bài viết chi tiết | — |
| TC-13 | Block "Tin nổi bật" – Danh sách | 5 bài viết tin tức/blog mới nhất | — | Render list: ảnh + tiêu đề + ngày + excerpt | — |
| TC-14 | Block "Tin nổi bật" – Click bài | Click vào bài viết | Click | Chuyển trang bài viết chi tiết | — |
| TC-15 | Block "Tại sao nên chọn chúng tôi" | 5 icon + tiêu đề điểm mạnh của Sanfovet | — | Render dạng icon grid | Nội dung tĩnh |

---

## 05 – GIỚI THIỆU CÔNG TY (`/gioi-thieu/`)

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| GT-01 | Video giới thiệu thương hiệu | Nhúng file MP4 trực tiếp, có nút play/pause | Click Play | Phát video giới thiệu Sanfovet | Self-hosted MP4 |
| GT-02 | Tab / Section: Catalogue | Nội dung hoặc link tải catalogue công ty | Click | Hiện nội dung/link catalogue | — |
| GT-03 | Tab / Section: Lịch sử hình thành | Mốc thời gian lịch sử phát triển công ty | — | Hiển thị timeline / text | — |
| GT-04 | Tab / Section: Giới thiệu về Sanfovet | Mô tả chi tiết thương hiệu, sứ mệnh | — | Hiển thị text + hình ảnh | — |
| GT-05 | Tab / Section: Tầm nhìn – Sứ mệnh | Tầm nhìn dài hạn và sứ mệnh công ty | — | Hiển thị text | — |
| GT-06 | Tab / Section: Cơ sở vật chất | Hình ảnh nhà máy, thiết bị sản xuất | — | Hiển thị ảnh + mô tả | GMP-GLP-GSP |
| GT-07 | Tab / Section: Cơ cấu tổ chức | Sơ đồ/danh sách bộ phận tổ chức | — | Hiển thị sơ đồ tổ chức | — |
| GT-08 | Sidebar: Sản phẩm nổi bật | Danh sách nhanh 7 sản phẩm nổi bật | Click | Chuyển trang chi tiết sản phẩm | — |
| GT-09 | Sidebar: Tin tức mới nhất | Danh sách 5 bài viết mới | Click | Chuyển trang bài viết | — |
| GT-10 | Breadcrumb | Đường dẫn: Home > Giới thiệu | Click | Điều hướng về trang trước | — |

---

## 06 – CATALOGUE (`/catalogue/`)

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| CAT-01 | Hiển thị catalogue | Render hình ảnh/PDF catalogue | — | Hiển thị tài liệu dạng ảnh hoặc PDF viewer | — |
| CAT-02 | Tải xuống catalogue | Nút tải file catalogue về máy | Click | Tải file PDF/ZIP về thiết bị | Download link |
| CAT-03 | Breadcrumb | Home > Catalogue | Click | Điều hướng | — |

---

## 07 – TRANG TỔNG SẢN PHẨM (`/danh-muc-san-pham/san-pham/`)

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| TSP-01 | Hiển thị tất cả sản phẩm | Grid tất cả sản phẩm không phân biệt danh mục | — | Danh sách sản phẩm dạng grid: ảnh + tên | — |
| TSP-02 | Click sản phẩm | Click vào ảnh/tên/nút "Xem thêm" | Click | Chuyển trang chi tiết sản phẩm | — |
| TSP-03 | Phân trang (Pagination) | Điều hướng giữa các trang sản phẩm | Click số trang / Next / Prev | Tải trang sản phẩm tiếp theo | — |
| TSP-04 | Sidebar: Danh mục sản phẩm | Hiển thị 10 danh mục con để lọc | Click | Chuyển trang danh mục tương ứng | Xem mục 08 |

---

## 08 – DANH MỤC SẢN PHẨM (10 loại)

> URL: `/danh-muc-san-pham/san-pham/{category-slug}/`

**Danh sách 10 danh mục:**

| Danh mục | URL Slug |
|----------|----------|
| Thuốc bổ trợ tiêm dạng dung dịch, hỗn dịch | `thuoc-bo-tro-tiem-dang-dung-dich-hon-dich` |
| Thuốc kháng sinh tiêm dạng dung dịch, hỗn dịch | `thuoc-khang-sinh-tiem-dang-dung-dich-hon-dich` |
| Thuốc kháng sinh dạng dung dịch uống, dạng xịt | `thuoc-khang-sinh-dang-dung-dich-uong-dang-xit` |
| Thuốc kháng sinh dạng Premix siêu bám dính | `thuoc-khang-sinh-dang-premix-sieu-bam-dinh` |
| Thuốc kháng sinh dạng bột, dạng hạt hòa tan | `thuoc-khang-sinh-dang-bot-dang-hat-hoa-tan` |
| Thuốc bổ trợ dạng cốm, dạng bột hòa tan | `thuoc-bo-tro-dang-com-dang-bot-hoa-tan` |
| Thuốc bổ trợ dạng dung dịch | `thuoc-bo-tro-dang-dung-dich` |
| Thuốc trị cầu trùng, kí sinh trùng dạng bột, dạng dung dịch | `thuoc-tri-cau-trung-ki-sinh-trung-dang-bot-dang-dung-dich` |
| Thuốc sát trùng, diệt côn trùng | `thuoc-sat-trung-diet-con-trung` |
| Thuốc trị nấm, trị giun sán | `thuoc-tri-nam-tri-giun-san` |

**Bảng chức năng (áp dụng cho tất cả 10 danh mục):**

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| DM-01 | Tiêu đề danh mục | Hiển thị tên danh mục dạng H1/H2 | — | Text tiêu đề | — |
| DM-02 | Breadcrumb | Home > SẢN PHẨM > {Tên danh mục} | Click | Điều hướng về trang trước | — |
| DM-03 | Danh sách sản phẩm trong danh mục | Grid sản phẩm: ảnh + tên | — | Render grid sản phẩm | — |
| DM-04 | Click sản phẩm – ảnh | Hover hiện overlay "Xem thêm" | Click | Chuyển trang chi tiết sản phẩm | — |
| DM-05 | Click sản phẩm – tên | Click vào tên sản phẩm | Click | Chuyển trang chi tiết sản phẩm | — |
| DM-06 | Phân trang (Pagination) | Điều hướng trang: Trang 1/21, Next, Prev, số trang | Click | Tải trang tiếp theo trong danh mục | VD: 21 trang cho thuốc kháng sinh tiêm |
| DM-07 | Sidebar: Sản phẩm nổi bật | 7 sản phẩm nổi bật toàn site | Click | Chuyển trang sản phẩm | — |
| DM-08 | Sidebar: Tin tức mới nhất | 5 bài viết gần nhất | Click | Chuyển trang bài viết | — |
| DM-09 | Sidebar: Link nhanh trang | Catalogue, Giới thiệu, Liên hệ, Trang chủ | Click | Điều hướng | — |

---

## 09 – CHI TIẾT SẢN PHẨM (`/san-pham/{product-slug}/`)

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| SP-01 | Breadcrumb | Home > SẢN PHẨM > {Tên sản phẩm} | Click | Điều hướng | — |
| SP-02 | Hình ảnh sản phẩm | Ảnh chính sản phẩm hiển thị kích thước lớn | — | Render ảnh sản phẩm | — |
| SP-03 | Phóng to ảnh (lightbox) | Click ảnh để xem full màn hình | Click ảnh | Mở lightbox / modal ảnh phóng to | — |
| SP-04 | Tên sản phẩm (H1) | Tên chính thức sản phẩm | — | Text H1 | — |
| SP-05 | Tagline / công dụng chính | Dòng mô tả tóm tắt ngay dưới tên | — | Text nổi bật | VD: "CHỐNG SUY KIỆT – PHỤC HỒI CẤP TỐC" |
| SP-06 | Nút "Liên hệ mua hàng" | CTA chính để mua hàng | Click | Chuyển trang `/lien-he/` | Không có giỏ hàng |
| SP-07 | Thành phần (bảng) | Bảng liệt kê hoạt chất, hàm lượng, đơn vị | — | Render bảng HTML | — |
| SP-08 | Đặc tính | Mô tả dược lý, cơ chế tác động | — | Text/HTML | — |
| SP-09 | Chỉ định | Danh sách các trường hợp sử dụng | — | Text/HTML dạng bullet | — |
| SP-10 | Cách dùng và liều lượng | Đường dùng, liệu trình, liều theo loài vật | — | Text/HTML có bảng | — |
| SP-11 | Dạng bào chế | Dạng thuốc: dung dịch tiêm / bột / premix... | — | Text | — |
| SP-12 | Thời gian ngừng thuốc | Số ngày ngừng trước khi giết mổ | — | Text (VD: "0 ngày") | — |
| SP-13 | Bảo quản | Điều kiện bảo quản nhiệt độ, ánh sáng | — | Text | — |
| SP-14 | Thể tích thực | Thể tích của lọ thuốc (VD: 100ml) | — | Text | — |
| SP-15 | Số đăng ký (SĐK) | Mã số đăng ký lưu hành thuốc thú y | — | Text (VD: VA-264) | — |
| SP-16 | Sản phẩm khác (related) | Grid các sản phẩm liên quan | Click | Chuyển trang sản phẩm được chọn | — |
| SP-17 | Sidebar: Sản phẩm nổi bật | 7 sản phẩm nổi bật | Click | Chuyển trang sản phẩm | — |
| SP-18 | Sidebar: Tin tức mới nhất | 5 bài viết gần nhất | Click | Chuyển trang bài viết | — |
| SP-19 | Sidebar: Link nhanh trang | Catalogue, Giới thiệu, Liên hệ, Trang chủ | Click | Điều hướng | — |

---

## 10 – CẨM NANG CHĂN NUÔI (`/cam-nang-chan-nuoi/`)

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| CN-01 | Tiêu đề trang | "Cẩm nang chăn nuôi" | — | Text H1 | — |
| CN-02 | Breadcrumb | Home > Cẩm nang chăn nuôi | Click | Điều hướng | — |
| CN-03 | Section: Gà – Tiêu đề nhóm | Tiêu đề "Gà" + nút "Xem tất cả" | Click "Xem tất cả" | Chuyển trang `/ga/` | — |
| CN-04 | Section: Gà – Danh sách bài | Grid các bài viết cẩm nang về gà | Click bài | Chuyển trang chi tiết bài viết | — |
| CN-05 | Section: Heo – Tiêu đề nhóm | Tiêu đề "Heo" + nút "Xem tất cả" | Click "Xem tất cả" | Chuyển trang `/heo-cam-nang-chan-nuoi/` | — |
| CN-06 | Section: Heo – Danh sách bài | Grid bài viết cẩm nang về heo/lợn | Click bài | Chuyển trang chi tiết bài viết | — |
| CN-07 | Section: Thủy Sản – Tiêu đề nhóm | Tiêu đề "Thủy Sản" + nút "Xem tất cả" | Click "Xem tất cả" | Chuyển trang `/thuy-san/` | — |
| CN-08 | Section: Thủy Sản – Danh sách bài | Grid bài viết nuôi tôm, cá... | Click bài | Chuyển trang chi tiết bài viết | — |
| CN-09 | Section: Trâu Bò – Tiêu đề nhóm | Tiêu đề "Trâu Bò" + nút "Xem tất cả" | Click "Xem tất cả" | Chuyển trang `/trau-bo-cam-nang-chan-nuoi/` | — |
| CN-10 | Section: Trâu Bò – Danh sách bài | Grid bài viết kỹ thuật nuôi trâu bò | Click bài | Chuyển trang chi tiết bài viết | — |
| CN-11 | Section: Vịt / Các loài khác | Tương tự như các section trên | Click | Chuyển trang | Có thể có thêm vịt, dê, cừu |
| CN-12 | Mỗi card bài viết – Ảnh | Thumbnail ảnh đại diện bài | Click | Chuyển trang bài viết | — |
| CN-13 | Mỗi card bài viết – Tiêu đề | Text tiêu đề bài viết | Click | Chuyển trang bài viết | — |
| CN-14 | Mỗi card bài viết – Ngày đăng | Hiển thị ngày đăng bài (DD/MM/YYYY) | — | Text | — |
| CN-15 | Mỗi card bài viết – Excerpt | Đoạn mô tả ngắn (khoảng 2–3 dòng) | — | Text | — |

---

## 11 – SUB-TAG CẨM NANG (Theo loài vật)

> URL ví dụ: `/ga/`, `/heo-cam-nang-chan-nuoi/`, `/trau-bo-cam-nang-chan-nuoi/`, `/thuy-san/`

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| ST-01 | Tiêu đề tag | Tên nhóm bài (VD: "Gà") | — | Text H1 | — |
| ST-02 | Breadcrumb | Home > Cẩm nang chăn nuôi > {Tên nhóm} | Click | Điều hướng | — |
| ST-03 | Danh sách bài viết theo tag | Grid/list tất cả bài viết thuộc tag | — | Render list: ảnh + tiêu đề + ngày + excerpt | — |
| ST-04 | Click bài viết | Click ảnh hoặc tiêu đề | Click | Chuyển trang chi tiết bài viết | — |
| ST-05 | Phân trang | Điều hướng trang nếu nhiều bài | Click | Tải trang tiếp theo | — |

---

## 12 – BỆNH VÀ ĐIỀU TRỊ BỆNH (`/benh-va-dieu-tri-banh/`)

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| BV-01 | Tiêu đề trang | "Bệnh và điều trị bệnh" | — | Text H1 | — |
| BV-02 | Breadcrumb | Home > Bệnh và điều trị bệnh | Click | Điều hướng | — |
| BV-03 | Danh sách bài viết | Grid bài viết về bệnh thú y | — | Render: ảnh + tiêu đề + ngày + excerpt | — |
| BV-04 | Card bài viết – Click ảnh | — | Click | Chuyển trang chi tiết bài | — |
| BV-05 | Card bài viết – Click tiêu đề | — | Click | Chuyển trang chi tiết bài | — |
| BV-06 | Card bài viết – Ngày đăng | Ngày đăng bài (DD/MM/YYYY) | — | Text | — |
| BV-07 | Card bài viết – Excerpt | Mô tả ngắn 2–3 dòng | — | Text | — |
| BV-08 | Phân trang | Điều hướng giữa các trang | Click | Tải trang tiếp theo | — |
| BV-09 | Sidebar: Sản phẩm nổi bật | 7 sản phẩm nổi bật | Click | Chuyển trang sản phẩm | — |
| BV-10 | Sidebar: Tin tức | 5 bài viết mới nhất | Click | Chuyển trang bài viết | — |

---

## 13 – TIN TỨC TỔNG HỢP (`/tin-tuc/`)

> Trang tổng hợp, có thể redirect hoặc hiển thị toàn bộ tin tức.

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| TT-01 | Tiêu đề trang | "Tin tức" | — | Text H1 | — |
| TT-02 | Breadcrumb | Home > Tin tức | Click | Điều hướng | — |
| TT-03 | Danh sách tất cả tin | Grid/list toàn bộ bài tin tức | — | Render list bài viết | — |
| TT-04 | Lọc theo sub-category | Chọn xem tin nội bộ hoặc tin ngành | Click | Filter danh sách theo chuyên mục | — |
| TT-05 | Click bài viết | — | Click | Chuyển trang chi tiết bài | — |
| TT-06 | Phân trang | — | Click | Tải trang tiếp | — |

---

## 14 – TIN TỨC NỘI BỘ (`/tin-tuc-noi-bo/`)

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| NB-01 | Tiêu đề trang | "Tin tức nội bộ" | — | Text H1 | — |
| NB-02 | Breadcrumb | Home > Tin tức nội bộ | Click | Điều hướng | — |
| NB-03 | Danh sách bài viết nội bộ | Grid bài: hoạt động công ty, hội thảo, triển lãm, sự kiện | — | Render list bài | — |
| NB-04 | Card bài – Click ảnh/tiêu đề | — | Click | Chuyển trang chi tiết bài | — |
| NB-05 | Card bài – Ngày đăng | — | — | Text | — |
| NB-06 | Card bài – Excerpt | — | — | Text | — |
| NB-07 | Phân trang | — | Click | Tải trang tiếp | — |

---

## 15 – TIN TỨC NGÀNH CHĂN NUÔI THÚ Y (`/tin-tuc-nganh-chan-nuoi-thu-y/`)

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| TN-01 | Tiêu đề trang | "Tin tức ngành chăn nuôi thú y" | — | Text H1 | — |
| TN-02 | Breadcrumb | Home > Tin tức ngành chăn nuôi thú y | Click | Điều hướng | — |
| TN-03 | Danh sách bài viết ngành | Grid bài: chính sách, xu hướng, thông tin ngành | — | Render list bài | — |
| TN-04 | Card bài – Click ảnh/tiêu đề | — | Click | Chuyển trang chi tiết bài | — |
| TN-05 | Card bài – Ngày đăng | — | — | Text | — |
| TN-06 | Card bài – Excerpt | — | — | Text | — |
| TN-07 | Phân trang | — | Click | Tải trang tiếp | — |

---

## 16 – CHI TIẾT BÀI VIẾT (`/{post-slug}/`)

> Áp dụng cho: Cẩm nang chăn nuôi, Bệnh & điều trị, Tin tức nội bộ, Tin tức ngành.

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| BW-01 | Breadcrumb | Home > {Chuyên mục} > {Tiêu đề bài} | Click | Điều hướng về trang trước | — |
| BW-02 | Tiêu đề bài viết (H1) | Tên đầy đủ bài viết | — | Text H1 lớn | — |
| BW-03 | Ngày đăng bài | Hiển thị ngày tháng năm | — | Text (DD/MM/YYYY) | — |
| BW-04 | Ảnh đại diện (thumbnail) | Hình ảnh đầu bài viết | — | Render ảnh | — |
| BW-05 | Mục lục (Table of Contents) | Danh sách anchor link tự động từ các heading trong bài | Click mục | Scroll đến phần tương ứng | Tự động sinh từ heading H2/H3 |
| BW-06 | Nội dung bài viết | HTML đầy đủ: text, ảnh, bảng, danh sách | — | Render nội dung | — |
| BW-07 | Link nội bộ trong bài | Các link dẫn đến sản phẩm/bài khác của Sanfovet | Click | Chuyển trang sản phẩm hoặc bài liên quan | Cross-linking |
| BW-08 | Ảnh minh họa trong bài | Hình ảnh chèn giữa nội dung | — | Render ảnh | — |
| BW-09 | Bảng trong bài | Bảng thống kê, bảng thành phần... | — | Render bảng HTML | — |
| BW-10 | Sidebar: Sản phẩm nổi bật | 7 sản phẩm nổi bật | Click | Chuyển trang sản phẩm | — |
| BW-11 | Sidebar: Tin tức liên quan | Các bài cùng chuyên mục gần nhất | Click | Chuyển trang bài viết | — |
| BW-12 | Bài viết liên quan (related posts) | Grid bài cùng danh mục hoặc tag ở cuối bài | Click | Chuyển trang bài viết | — |
| BW-13 | Bảo vệ nội dung (right-click block) | Chặn chuột phải, hiển thị cảnh báo | Right-click | Popup: "Nội dung được bảo vệ !!" | JS Protection |

---

## 17 – TUYỂN DỤNG (`/tuyen-dung/`)

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| TD-01 | Tiêu đề trang | "TUYỂN DỤNG" | — | Text H1 | — |
| TD-02 | Breadcrumb | Home > TUYỂN DỤNG | Click | Điều hướng | — |
| TD-03 | Danh sách tin tuyển dụng | Grid/list các bài đăng tuyển dụng | — | Render: ảnh poster + tiêu đề + ngày | — |
| TD-04 | Card tuyển dụng – Ảnh poster | Ảnh poster thiết kế đẹp thông tin tuyển dụng | Click | Chuyển trang chi tiết tin tuyển dụng | — |
| TD-05 | Card tuyển dụng – Tiêu đề | Tên vị trí + khu vực tuyển | Click | Chuyển trang chi tiết | VD: "Sanfovet tuyển NVKD: Ninh Bình, Thanh Hoá..." |
| TD-06 | Card tuyển dụng – Ngày đăng | Ngày đăng tin | — | Text | — |
| TD-07 | Card tuyển dụng – Excerpt | Đoạn giới thiệu ngắn về vị trí | — | Text | — |
| TD-08 | Phân trang | — | Click | Tải trang tiếp | — |
| TD-09 | Sidebar: Giới thiệu nhanh | Tabs: Catalogue, Lịch sử, Giới thiệu, Tầm nhìn... | Click | Hiện nội dung tương ứng | — |
| TD-10 | Sidebar: Sản phẩm nổi bật | 7 sản phẩm | Click | Chuyển trang sản phẩm | — |

---

## 18 – CHI TIẾT TIN TUYỂN DỤNG (`/{job-slug}/`)

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| JD-01 | Breadcrumb | Home > TUYỂN DỤNG > {Tên tin} | Click | Điều hướng | — |
| JD-02 | Tiêu đề vị trí tuyển dụng | Tên vị trí + khu vực | — | Text H1 | — |
| JD-03 | Ngày đăng | — | — | Text | — |
| JD-04 | Ảnh poster tuyển dụng | Ảnh thiết kế đầy đủ thông tin | — | Render ảnh | — |
| JD-05 | Nội dung chi tiết | Mô tả: giới thiệu công ty, yêu cầu, quyền lợi, cách nộp | — | HTML content | — |
| JD-06 | Thông tin liên hệ nộp CV | Email/SĐT công ty để ứng tuyển | — | Text / Link | Không có form nộp CV |
| JD-07 | Sidebar: Sản phẩm nổi bật | — | Click | Chuyển trang sản phẩm | — |
| JD-08 | Sidebar: Tin tức | — | Click | Chuyển trang bài viết | — |

---

## 19 – LIÊN HỆ (`/lien-he/`)

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| LH-01 | Tiêu đề trang | "Liên hệ" | — | Text H1 | — |
| LH-02 | Breadcrumb | Home > Liên hệ | Click | Điều hướng | — |
| LH-03 | Hiển thị địa chỉ trụ sở | Cụm CN Liên Phương, Xã Hồng Vân, Hà Nội | — | Text tĩnh | — |
| LH-04 | Hiển thị địa chỉ chi nhánh miền Nam | Hố Nai, Trảng Bom, Đồng Nai | — | Text tĩnh | — |
| LH-05 | Số điện thoại click-to-call | `024 66861629 - 097 499 9204` | Click | Gọi điện | — |
| LH-06 | Email click-to-email | `pkd.sanfovet@gmail.com` | Click | Mở email client | — |
| LH-07 | Website | `www.sanfovet.com.vn` | — | Text tĩnh | — |
| LH-08 | Google Maps embed | Bản đồ nhúng iframe hiển thị vị trí công ty | Tương tác bản đồ | Phóng to, thu nhỏ, xem đường đi | Iframe Google Maps |
| LH-09 | Form liên hệ – Trường Họ và tên | Input text bắt buộc | Nhập text | Lưu giá trị | Required |
| LH-10 | Form liên hệ – Trường Số điện thoại | Input tel bắt buộc | Nhập số | Lưu giá trị | Required |
| LH-11 | Form liên hệ – Trường Email | Input email | Nhập email | Lưu giá trị | Optional / Required tùy config |
| LH-12 | Form liên hệ – Trường Nội dung | Textarea bắt buộc | Nhập text | Lưu giá trị | Required |
| LH-13 | Form liên hệ – Nút Gửi | Submit button | Click | Gửi form đến server | — |
| LH-14 | Form liên hệ – Validation | Kiểm tra trường bắt buộc trước khi gửi | Submit | Thông báo lỗi nếu thiếu/sai định dạng | Client-side + Server-side |
| LH-15 | Form liên hệ – Gửi thành công | Sau khi submit hợp lệ | — | Thông báo "Gửi thành công" trên trang | — |
| LH-16 | Form liên hệ – Email admin | Server gửi email đến `pkd.sanfovet@gmail.com` | — | Email chứa: Họ tên, SĐT, Email, Nội dung | WP Contact Form plugin |
| LH-17 | Form liên hệ – Email confirm | Server có thể gửi xác nhận đến người dùng | — | Email xác nhận đã nhận liên hệ | Tùy config plugin |

---

## 20 – POPUP LIÊN HỆ NHANH (Overlay Component)

> Kích hoạt bằng nút "Liên hệ với chúng tôi" ở góc màn hình (FL-03).

| STT | Chức năng | Mô tả chi tiết | Input | Output | Ghi chú |
|-----|-----------|----------------|-------|--------|---------|
| POP-01 | Mở popup | Click nút "Liên hệ với chúng tôi" fixed | Click | Overlay popup mở trên màn hình | — |
| POP-02 | Tiêu đề popup | "Liên hệ với chúng tôi" | — | Text | — |
| POP-03 | Mô tả trong popup | "Hãy liên hệ ngay với đội ngũ chuyên gia của Sanfovet để được hỗ trợ kịp thời" | — | Text | — |
| POP-04 | Tên công ty trong popup | Công ty CP Đầu tư Liên doanh Việt Anh (Sanfovet) | — | Text | — |
| POP-05 | Đóng popup – Nút X | Nút đóng góc popup | Click X | Đóng overlay, quay lại trang | — |
| POP-06 | Đóng popup – Click ngoài | Click ra vùng ngoài popup | Click overlay | Đóng popup | — |

---

## TỔNG HỢP SỐ LƯỢNG CHỨC NĂNG THEO MÀN HÌNH

| STT | Màn hình | Số chức năng | Có tương tác form |
|-----|----------|:------------:|:-----------------:|
| 01 | Header | 19 | Không |
| 02 | Footer | 14 | Không |
| 03 | Float/Sticky | 5 | Không |
| 04 | Trang Chủ | 15 | Không |
| 05 | Giới Thiệu | 10 | Không |
| 06 | Catalogue | 3 | Không |
| 07 | Tổng Sản Phẩm | 4 | Không |
| 08 | Danh Mục Sản Phẩm (×10) | 9 × 10 = 90 | Không |
| 09 | Chi Tiết Sản Phẩm | 19 | Không (link liên hệ) |
| 10 | Cẩm Nang Chăn Nuôi | 15 | Không |
| 11 | Sub-tag Cẩm Nang | 5 | Không |
| 12 | Bệnh và Điều Trị Bệnh | 10 | Không |
| 13 | Tin Tức Tổng Hợp | 6 | Không |
| 14 | Tin Tức Nội Bộ | 7 | Không |
| 15 | Tin Tức Ngành | 7 | Không |
| 16 | Chi Tiết Bài Viết | 13 | Không |
| 17 | Tuyển Dụng | 10 | Không |
| 18 | Chi Tiết Tuyển Dụng | 8 | Không |
| 19 | Liên Hệ | 17 | **Có** (Contact Form) |
| 20 | Popup Liên Hệ Nhanh | 6 | Không |
| **TỔNG** | **20 màn hình** | **~293 chức năng** | **1 màn hình có form** |

---

## BẢNG PHÂN LOẠI CHỨC NĂNG THEO NHÓM

| Nhóm | Loại chức năng | Số lượng |
|------|----------------|:--------:|
| **Điều hướng** | Menu, breadcrumb, link, pagination | ~65 |
| **Hiển thị nội dung** | Render text, ảnh, video, bảng, grid | ~120 |
| **Tương tác người dùng** | Click, hover, toggle, scroll | ~55 |
| **Form & gửi dữ liệu** | Input, validate, submit, email | 9 |
| **Truyền thông xã hội** | Link Facebook, YouTube, Zalo | 6 |
| **Liên lạc trực tiếp** | Click-to-call, click-to-email | 8 |
| **Bảo vệ nội dung** | Right-click block | 1 |
| **Đa ngôn ngữ** | VI/EN toggle | 2 |
| **Media** | Video, lightbox ảnh, PDF | 4 |

---

*Tài liệu được phân tích và tổng hợp từ website thực tế https://sanfovet.com.vn – Ngày 13/04/2026*
