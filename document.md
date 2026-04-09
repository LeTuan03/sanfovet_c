# Phân Tích Website sanfovet.com.vn
> **Tên website:** THUỐC THÚ Y TRANG TRẠI – TECHNOLOGY USA  
> **Thương hiệu:** SANFOVET – Công ty CP Đầu tư Liên doanh Việt Anh  
> **URL:** https://sanfovet.com.vn  
> **Nền tảng:** WordPress (Custom Theme: `sanfovet`)  
> **Ngôn ngữ:** Tiếng Việt / Tiếng Anh (song ngữ)  
> **Ngày phân tích:** 09/04/2026

---

## Mục Lục

1. [Tổng Quan Website](#1-tổng-quan-website)
2. [Cấu Trúc Navigation](#2-cấu-trúc-navigation)
3. [Phân Tích Từng Chức Năng](#3-phân-tích-từng-chức-năng)
   - 3.1 [Trang Chủ (Home)](#31-trang-chủ-home)
   - 3.2 [Giới Thiệu](#32-giới-thiệu)
   - 3.3 [Catalogue](#33-catalogue)
   - 3.4 [Sản Phẩm](#34-sản-phẩm)
   - 3.5 [Chi Tiết Sản Phẩm](#35-chi-tiết-sản-phẩm)
   - 3.6 [Cẩm Nang Chăn Nuôi](#36-cẩm-nang-chăn-nuôi)
   - 3.7 [Bệnh và Điều Trị Bệnh](#37-bệnh-và-điều-trị-bệnh)
   - 3.8 [Tin Tức](#38-tin-tức)
   - 3.9 [Tuyển Dụng](#39-tuyển-dụng)
   - 3.10 [Liên Hệ](#310-liên-hệ)
   - 3.11 [Đa Ngôn Ngữ](#311-đa-ngôn-ngữ)
   - 3.12 [Hỗ Trợ Nhanh (Float/Sticky)](#312-hỗ-trợ-nhanh-floatsticky)
4. [Luồng Hoạt Động (User Flow)](#4-luồng-hoạt-động-user-flow)
5. [Dữ Liệu Đầu Vào – Đầu Ra](#5-dữ-liệu-đầu-vào--đầu-ra)
6. [Kiến Trúc Thông Tin & Phân Cấp Trang](#6-kiến-trúc-thông-tin--phân-cấp-trang)
7. [Công Nghệ & Kỹ Thuật](#7-công-nghệ--kỹ-thuật)
8. [Bảo Mật & Hạn Chế Nội Dung](#8-bảo-mật--hạn-chế-nội-dung)

---

## 1. Tổng Quan Website

Website `sanfovet.com.vn` là **website doanh nghiệp B2B/B2C** trong lĩnh vực **thuốc thú y trang trại**, phục vụ chủ yếu cho đối tượng:

- Người chăn nuôi (heo, gà, vịt, trâu, bò, dê, cừu)
- Đại lý / nhà phân phối thuốc thú y
- Bác sĩ thú y, kỹ thuật viên chăn nuôi
- Ứng viên tìm việc ngành thú y

**Mục tiêu chính của website:**
- Giới thiệu thương hiệu và sản phẩm thuốc thú y Sanfovet
- Cung cấp kiến thức chuyên sâu về chăn nuôi và bệnh thú y
- Thu nhận yêu cầu liên hệ / tư vấn mua hàng
- Đăng tin tuyển dụng nhân sự

**Không có** hệ thống mua hàng trực tuyến (không có giỏ hàng, thanh toán online). Việc đặt hàng thực hiện qua kênh liên hệ trực tiếp.

---

## 2. Cấu Trúc Navigation

### Menu chính (Header)

```
├── Trang chủ                       /
├── Giới thiệu
│   ├── Giới thiệu                  /gioi-thieu/
│   └── Catalogue                   /catalogue/
├── SẢN PHẨM
│   ├── Thuốc bổ trợ tiêm dạng dung dịch, hỗn dịch
│   ├── Thuốc kháng sinh tiêm dạng dung dịch, hỗn dịch
│   ├── Thuốc kháng sinh dạng dung dịch uống, dạng xịt
│   ├── Thuốc kháng sinh dạng Premix siêu bám dính
│   ├── Thuốc kháng sinh dạng bột, dạng hạt hòa tan
│   ├── Thuốc bổ trợ dạng cốm, dạng bột hòa tan
│   ├── Thuốc bổ trợ dạng dung dịch
│   ├── Thuốc trị cầu trùng, kí sinh trùng dạng bột, dạng dung dịch
│   ├── Thuốc sát trùng, diệt côn trùng
│   └── Thuốc trị nấm, trị giun sán
├── Cẩm nang chăn nuôi              /cam-nang-chan-nuoi/
├── Bệnh và điều trị bệnh           /benh-va-dieu-tri-banh/
├── Tin tức
│   ├── Tin tức nội bộ              /tin-tuc-noi-bo/
│   └── Tin tức ngành chăn nuôi thú y  /tin-tuc-nganh-chan-nuoi-thu-y/
├── TUYỂN DỤNG                      /tuyen-dung/
└── Liên hệ                         /lien-he/
```

### Footer

```
├── Thông tin công ty (địa chỉ, điện thoại, email, website)
├── Chi nhánh miền Nam
├── Danh sách nhanh sản phẩm (10 danh mục)
├── Hỗ trợ kỹ thuật (tên BSTY, email, SĐT)
└── Mạng xã hội: Facebook, YouTube (kênh chăn nuôi), Zalo
```

---

## 3. Phân Tích Từng Chức Năng

---

### 3.1 Trang Chủ (Home)

**URL:** `/`

**Mô tả:** Trang tổng hợp giới thiệu toàn bộ website, đóng vai trò cổng thông tin chính.

**Các block chức năng:**

| STT | Block | Chức năng |
|-----|-------|-----------|
| 1 | **Banner Slider** | Hiển thị 3–4 banner hình ảnh xoay vòng, quảng bá thương hiệu/sản phẩm nổi bật |
| 2 | **Về chúng tôi** | Giới thiệu ngắn gọn về Sanfovet, link đến `/gioi-thieu/` và `/catalogue/` |
| 3 | **Video giới thiệu** | Thumbnail video có nút play, link đến trang giới thiệu kèm video |
| 4 | **Sản phẩm nổi bật** | Danh sách 7 sản phẩm nổi bật có hình ảnh, tên, nút "Xem thêm" |
| 5 | **Bệnh và điều trị bệnh** | 4–5 bài viết mới nhất thuộc chuyên mục bệnh |
| 6 | **Tin nổi bật** | 5 bài viết tin tức/blog gần nhất |
| 7 | **Tại sao nên chọn chúng tôi** | 5 icon + tiêu đề ưu điểm nổi bật |
| 8 | **Popup liên hệ** | Popup hiện ra khi click nút "Liên hệ với chúng tôi" ở góc màn hình |

**Dữ liệu đầu vào:** Không có (trang tĩnh + dữ liệu từ CMS)  
**Dữ liệu đầu ra:** Trang HTML render các block trên

---

### 3.2 Giới Thiệu

**URL:** `/gioi-thieu/`

**Mô tả:** Trang giới thiệu chi tiết về công ty Sanfovet.

**Các thành phần:**
- Video giới thiệu thương hiệu (file `.mp4` nhúng trực tiếp)
- Tabs/section nội dung:
  - **Catalogue** – liên kết tải/xem catalogue
  - **Lịch sử hình thành Sanfovet**
  - **Giới thiệu về Sanfovet**
  - **Tầm nhìn – Sứ mệnh**
  - **Cơ sở vật chất**
  - **Cơ cấu tổ chức**
- Sidebar: Sản phẩm nổi bật, Tin tức mới nhất

**Dữ liệu đầu vào:** Không có  
**Dữ liệu đầu ra:** Nội dung tĩnh từ CMS WordPress

---

### 3.3 Catalogue

**URL:** `/catalogue/`

**Mô tả:** Trang cho phép người dùng xem/tải hồ sơ năng lực và catalogue sản phẩm của công ty.

**Dữ liệu đầu vào:** Không có  
**Dữ liệu đầu ra:** File PDF/hình ảnh catalogue để xem trực tuyến hoặc tải xuống

---

### 3.4 Sản Phẩm

**URL gốc:** `/danh-muc-san-pham/san-pham/`

**Mô tả:** Hệ thống danh mục sản phẩm thuốc thú y được phân loại theo dạng bào chế và công dụng.

**10 Danh mục sản phẩm:**

| STT | Danh mục | URL slug |
|-----|----------|----------|
| 1 | Thuốc bổ trợ tiêm dạng dung dịch, hỗn dịch | `thuoc-bo-tro-tiem-dang-dung-dich-hon-dich` |
| 2 | Thuốc kháng sinh tiêm dạng dung dịch, hỗn dịch | `thuoc-khang-sinh-tiem-dang-dung-dich-hon-dich` |
| 3 | Thuốc kháng sinh dạng dung dịch uống, dạng xịt | `thuoc-khang-sinh-dang-dung-dich-uong-dang-xit` |
| 4 | Thuốc kháng sinh dạng Premix siêu bám dính | `thuoc-khang-sinh-dang-premix-sieu-bam-dinh` |
| 5 | Thuốc kháng sinh dạng bột, dạng hạt hòa tan | `thuoc-khang-sinh-dang-bot-dang-hat-hoa-tan` |
| 6 | Thuốc bổ trợ dạng cốm, dạng bột hòa tan | `thuoc-bo-tro-dang-com-dang-bot-hoa-tan` |
| 7 | Thuốc bổ trợ dạng dung dịch | `thuoc-bo-tro-dang-dung-dich` |
| 8 | Thuốc trị cầu trùng, kí sinh trùng | `thuoc-tri-cau-trung-ki-sinh-trung-dang-bot-dang-dung-dich` |
| 9 | Thuốc sát trùng, diệt côn trùng | `thuoc-sat-trung-diet-con-trung` |
| 10 | Thuốc trị nấm, trị giun sán | `thuoc-tri-nam-tri-giun-san` |

**Trang danh mục hiển thị:**
- Danh sách sản phẩm dạng lưới (grid)
- Mỗi item: hình ảnh sản phẩm + tên + nút "Xem thêm"
- Pagination (phân trang)

**Dữ liệu đầu vào:** Slug danh mục (URL parameter)  
**Dữ liệu đầu ra:** Danh sách sản phẩm thuộc danh mục tương ứng

---

### 3.5 Chi Tiết Sản Phẩm

**URL mẫu:** `/san-pham/{slug-san-pham}/`  
**Ví dụ:** `/san-pham/thuoc-thu-y-hemopro/`

**Mô tả:** Trang hiển thị thông tin kỹ thuật đầy đủ của từng sản phẩm thuốc thú y.

**Cấu trúc thông tin trang chi tiết sản phẩm:**

```
┌─────────────────────────────────┐
│  Hình ảnh sản phẩm (lightbox)   │
├─────────────────────────────────┤
│  Tên sản phẩm (H1)              │
│  Tagline / Công dụng chính      │
│  Nút: [Liên hệ mua hàng]        │
├─────────────────────────────────┤
│  Thông tin chi tiết:            │
│  - THÀNH PHẦN (bảng hoạt chất)  │
│  - ĐẶC TÍNH (mô tả dược lý)     │
│  - CHỈ ĐỊNH (công dụng)         │
│  - CÁCH DÙNG VÀ LIỀU LƯỢNG      │
│  - DẠNG BÀO CHẾ                 │
│  - THỜI GIAN NGỪNG THUỐC        │
│  - BẢO QUẢN                     │
│  - THỂ TÍCH THỰC                │
│  - SĐK (số đăng ký)             │
├─────────────────────────────────┤
│  Sản phẩm khác (related)        │
└─────────────────────────────────┘
```

**Dữ liệu đầu vào:** Slug sản phẩm (URL)  
**Dữ liệu đầu ra:** Trang chi tiết sản phẩm với toàn bộ thông tin kỹ thuật

**Lưu ý:** Không có giá, không có giỏ hàng. Mua hàng qua nút "Liên hệ mua hàng" dẫn đến `/lien-he/`.

---

### 3.6 Cẩm Nang Chăn Nuôi

**URL:** `/cam-nang-chan-nuoi/`

**Mô tả:** Chuyên mục bài viết hướng dẫn kỹ thuật chăn nuôi cho người nông dân/trang trại.

**Nội dung bao gồm:**
- Hướng dẫn nuôi các loại vật nuôi (vịt siêu thịt, heo, gà...)
- Kiến thức về dinh dưỡng và quản lý đàn
- Kỹ thuật phòng và trị bệnh

**Cấu trúc hiển thị:**
- Danh sách bài viết: thumbnail + tiêu đề + ngày đăng + đoạn mô tả ngắn
- Pagination phân trang
- Click bài → trang bài viết chi tiết

**Dữ liệu đầu vào:** Không có (duyệt danh sách), hoặc slug bài viết khi đọc chi tiết  
**Dữ liệu đầu ra:** Danh sách / nội dung bài viết đầy đủ

---

### 3.7 Bệnh và Điều Trị Bệnh

**URL:** `/benh-va-dieu-tri-banh/`

**Mô tả:** Chuyên mục bài viết chuyên sâu về các loại bệnh trên vật nuôi và phương pháp điều trị.

**Các chủ đề phổ biến (ví dụ thực tế từ website):**
- Bệnh Glasser ở lợn
- Bệnh Adeno trên vịt
- Bệnh Lở mồm long móng
- Gà bị thương hàn
- Các bệnh truyền nhiễm cấp tính

**Cấu trúc bài viết:**
- Tiêu đề H1 + ngày đăng
- Hình ảnh minh họa
- Nội dung có mục lục (table of contents tự động)
- Phần: triệu chứng → chẩn đoán → điều trị → phòng ngừa
- Gợi ý sản phẩm Sanfovet liên quan (cross-sell nội dung)

**Dữ liệu đầu vào:** Slug bài viết  
**Dữ liệu đầu ra:** Bài viết HTML đầy đủ

---

### 3.8 Tin Tức

**URL danh mục chính:** `/tin-tuc/`

**Hai phân mục:**

| Phân mục | URL | Nội dung |
|----------|-----|----------|
| Tin tức nội bộ | `/tin-tuc-noi-bo/` | Hoạt động, sự kiện nội bộ công ty, hội thảo, triển lãm |
| Tin tức ngành chăn nuôi thú y | `/tin-tuc-nganh-chan-nuoi-thu-y/` | Thông tin ngành, chính sách, xu hướng thị trường |

**Cấu trúc hiển thị tương tự Cẩm nang chăn nuôi:**
- Grid bài viết: ảnh đại diện + tiêu đề + ngày + excerpt
- Pagination

**Dữ liệu đầu vào:** Không có (trang danh sách) / slug bài viết (trang chi tiết)  
**Dữ liệu đầu ra:** Danh sách hoặc nội dung bài viết

---

### 3.9 Tuyển Dụng

**URL:** `/tuyen-dung/`

**Mô tả:** Chuyên mục đăng tin tuyển dụng nhân sự, chủ yếu là Nhân viên kinh doanh (NVKD) theo vùng địa lý.

**Cấu trúc tin tuyển dụng:**
- Tên vị trí + khu vực tuyển
- Hình ảnh poster tuyển dụng
- Ngày đăng
- Nội dung chi tiết: mô tả công việc, yêu cầu, quyền lợi

**Ví dụ vị trí tuyển dụng thực tế:**
- NVKD: Ninh Bình, Thanh Hoá, Quảng Bình, Quảng Trị, Huế
- NVKD: Lào Cai, Yên Bái, Sơn La, Hà Giang

**Dữ liệu đầu vào:** Không có (xem tin)  
**Dữ liệu đầu ra:** Danh sách / nội dung tin tuyển dụng  
**Ghi chú:** Không có form nộp CV trực tuyến. Ứng viên liên hệ qua email/SĐT công ty.

---

### 3.10 Liên Hệ

**URL:** `/lien-he/`

**Mô tả:** Trang liên hệ với thông tin công ty và form gửi tin nhắn.

**Thành phần:**

**A. Thông tin liên hệ tĩnh:**
```
Trụ sở chính:  Cụm CN Liên Phương, Xã Hồng Vân, Hà Nội
Điện thoại:    024 66861629 / 097 499 9204
Email:         pkd.sanfovet@gmail.com
Website:       www.sanfovet.com.vn
Chi nhánh Nam: Hố Nai, Trảng Bom, Đồng Nai
```

**B. Form liên hệ (Contact Form):**

| Trường | Loại | Bắt buộc |
|--------|------|----------|
| Họ và tên | Text input | Có |
| Số điện thoại | Tel input | Có |
| Email | Email input | Có (hoặc không) |
| Nội dung tin nhắn | Textarea | Có |
| Nút gửi | Submit button | — |

**C. Bản đồ Google Maps (nhúng iframe)**

**Luồng gửi form:**
```
Người dùng điền form → Submit → 
Server xử lý (WordPress Contact Form plugin) → 
Email gửi đến pkd.sanfovet@gmail.com → 
Hiển thị thông báo "Gửi thành công"
```

**Dữ liệu đầu vào:** Họ tên, SĐT, Email, Nội dung tin nhắn  
**Dữ liệu đầu ra:** Email thông báo gửi đến admin + thông báo thành công cho người dùng

---

### 3.11 Đa Ngôn Ngữ

**Chức năng:** Chuyển đổi giữa Tiếng Việt và Tiếng Anh

**Vị trí:** Header (top bar), hiển thị cờ quốc gia

**Dữ liệu đầu vào:** Click chọn ngôn ngữ (EN / VI)  
**Dữ liệu đầu ra:** Reload trang với nội dung ngôn ngữ tương ứng  
**Công nghệ:** WordPress Multilingual plugin (WPML hoặc tương đương)

---

### 3.12 Hỗ Trợ Nhanh (Float/Sticky)

**Mô tả:** Các nút hỗ trợ nổi cố định ở góc màn hình khi cuộn trang.

**Bao gồm:**
- **Hotline click-to-call:** `097 499 9204`
- **Email click-to-email:** `pkd.sanfovet@gmail.com`
- **Popup liên hệ nhanh:** Mở form liên hệ nhanh với thông tin công ty
- **Nút Zalo** (link đến trang Zalo của công ty)
- **Nút Facebook** (link đến page Facebook)

**Dữ liệu đầu vào:** Click của người dùng  
**Dữ liệu đầu ra:** Mở ứng dụng điện thoại / email / popup

---

## 4. Luồng Hoạt Động (User Flow)

### Flow 1: Khách hàng tìm kiếm và hỏi mua sản phẩm

```
Vào trang chủ
    │
    ▼
Xem Banner/Sản phẩm nổi bật
    │
    ▼
Click vào danh mục sản phẩm (Menu → SẢN PHẨM)
    │
    ▼
Xem danh sách sản phẩm theo loại
    │
    ▼
Click "Xem thêm" vào sản phẩm cụ thể
    │
    ▼
Đọc thông tin chi tiết sản phẩm
(Thành phần, Chỉ định, Liều lượng, SĐK)
    │
    ▼
Click nút "Liên hệ mua hàng"
    │
    ▼
Chuyển đến trang /lien-he/
    │
    ▼
Điền form liên hệ / gọi hotline
    │
    ▼
Nhân viên Sanfovet phản hồi tư vấn
```

---

### Flow 2: Người chăn nuôi tra cứu bệnh và tìm thuốc điều trị

```
Vào trang chủ
    │
    ▼
Click "Bệnh và điều trị bệnh" (menu hoặc block trang chủ)
    │
    ▼
Xem danh sách bài viết bệnh
    │
    ▼
Click vào bài viết bệnh phù hợp
    │
    ▼
Đọc thông tin: triệu chứng, chẩn đoán, điều trị
    │
    ▼
Xem sản phẩm Sanfovet được gợi ý trong bài viết
    │
    ▼
Click link sản phẩm → Trang chi tiết sản phẩm
    │
    ▼
Liên hệ mua hàng (xem Flow 1)
```

---

### Flow 3: Đối tác / Đại lý tìm hiểu công ty

```
Vào trang chủ
    │
    ▼
Click "Giới thiệu" (menu)
    │
    ▼
Xem thông tin: lịch sử, tầm nhìn, cơ sở vật chất, cơ cấu
    │
    ▼
Tải/xem Catalogue
    │
    ▼
Liên hệ qua form / hotline để hợp tác
```

---

### Flow 4: Ứng viên tìm việc

```
Vào trang chủ
    │
    ▼
Click "TUYỂN DỤNG" (menu)
    │
    ▼
Xem danh sách tin tuyển dụng
    │
    ▼
Click vào tin phù hợp
    │
    ▼
Đọc chi tiết vị trí, khu vực, yêu cầu
    │
    ▼
Liên hệ qua email/SĐT công ty để nộp CV
```

---

### Flow 5: Đọc kiến thức chăn nuôi / tin tức ngành

```
Trang chủ → Block "Bệnh và điều trị" hoặc "Tin nổi bật"
    │
    ▼
Hoặc trực tiếp vào: /cam-nang-chan-nuoi/ hoặc /tin-tuc/
    │
    ▼
Duyệt danh sách bài theo chuyên mục
    │
    ▼
Đọc bài chi tiết
    │
    ▼
Xem sản phẩm liên quan (sidebar)
    │
    ▼
Có nhu cầu → Liên hệ
```

---

## 5. Dữ Liệu Đầu Vào – Đầu Ra

### Bảng tổng hợp Input / Output theo trang

| Trang / Chức năng | Dữ liệu đầu vào (Input) | Dữ liệu đầu ra (Output) |
|---|---|---|
| **Trang chủ** | Không có | HTML page: banner, sản phẩm nổi bật, bài viết mới, lý do chọn |
| **Giới thiệu** | Không có | Nội dung công ty: lịch sử, sứ mệnh, cơ sở vật chất, video |
| **Catalogue** | Không có | File PDF/tài liệu catalogue công ty |
| **Danh mục sản phẩm** | `slug danh mục` (URL param) | Danh sách sản phẩm của danh mục: ảnh, tên, link |
| **Chi tiết sản phẩm** | `slug sản phẩm` (URL param) | Thành phần, đặc tính, chỉ định, liều dùng, SĐK, ảnh |
| **Cẩm nang chăn nuôi** | Không có (list) / `slug bài` (detail) | Danh sách / nội dung bài viết kỹ thuật chăn nuôi |
| **Bệnh và điều trị** | Không có (list) / `slug bài` (detail) | Danh sách / nội dung bài viết bệnh thú y |
| **Tin tức nội bộ** | Không có (list) / `slug bài` (detail) | Danh sách / nội dung tin tức nội bộ công ty |
| **Tin tức ngành** | Không có (list) / `slug bài` (detail) | Danh sách / nội dung tin ngành chăn nuôi thú y |
| **Tuyển dụng** | Không có (list) / `slug tin` (detail) | Danh sách / nội dung chi tiết vị trí tuyển dụng |
| **Liên hệ – Xem trang** | Không có | Thông tin liên hệ công ty + Google Maps embed |
| **Liên hệ – Gửi form** | Họ tên, SĐT, Email, Nội dung | Email gửi admin + thông báo thành công cho người dùng |
| **Chuyển ngôn ngữ** | Click chọn EN / VI | Reload trang với nội dung ngôn ngữ được chọn |
| **Hotline float button** | Click | Gọi điện trực tiếp `097 499 9204` |
| **Email float button** | Click | Mở email client với địa chỉ `pkd.sanfovet@gmail.com` |
| **Popup liên hệ nhanh** | Click nút Liên hệ (fixed) | Popup hiện thông tin liên hệ công ty |

---

### Dữ liệu sản phẩm (cấu trúc data model)

Mỗi sản phẩm trên website chứa các trường sau:

```
Product {
  id:                 string          // WordPress post ID
  slug:               string          // URL-friendly name
  name:               string          // Tên sản phẩm
  tagline:            string          // Công dụng chính (H2 ngay dưới tên)
  image:              url             // Hình ảnh sản phẩm
  category:           string          // Danh mục thuộc về
  
  ingredients: [                      // THÀNH PHẦN
    {
      name:     string,               // Tên hoạt chất
      amount:   string,               // Hàm lượng
      unit:     string                // Đơn vị (mg, μg,...)
    }
  ]
  
  characteristics:    text            // ĐẶC TÍNH (dược lý)
  indications:        text            // CHỈ ĐỊNH (công dụng)
  dosage: {                           // CÁCH DÙNG VÀ LIỀU LƯỢNG
    route:            string,         // Đường dùng (tiêm bắp, uống,...)
    duration:         string,         // Thời gian liệu trình
    byAnimal: [
      { animal: string, dose: string }
    ]
  }
  formulation:        string          // DẠNG BÀO CHẾ
  withdrawalPeriod:   string          // THỜI GIAN NGỪNG THUỐC
  storage:            string          // BẢO QUẢN
  volume:             string          // THỂ TÍCH THỰC
  registrationNo:     string          // SĐK (số đăng ký)
}
```

---

### Dữ liệu bài viết (cấu trúc data model)

```
Post {
  id:           string
  slug:         string
  title:        string
  publishDate:  date
  thumbnail:    url
  excerpt:      string        // Đoạn mô tả ngắn (hiển thị ở trang danh sách)
  content:      html          // Nội dung đầy đủ (có thể có TOC tự động)
  category:     string        // cam-nang / benh-dieu-tri / tin-tuc-noi-bo / tin-tuc-nganh
  tags:         string[]
}
```

---

## 6. Kiến Trúc Thông Tin & Phân Cấp Trang

```
sanfovet.com.vn/
│
├── /                               Trang chủ
│
├── /gioi-thieu/                    Giới thiệu công ty
│   └── /catalogue/                 Tải catalogue
│
├── /danh-muc-san-pham/san-pham/    Tất cả sản phẩm
│   ├── /{category-slug}/           Danh mục (10 loại)
│   └── /san-pham/{product-slug}/   Chi tiết sản phẩm
│
├── /cam-nang-chan-nuoi/            Cẩm nang chăn nuôi (danh sách)
│   └── /{post-slug}/               Bài viết cẩm nang
│
├── /benh-va-dieu-tri-banh/        Bệnh & điều trị (danh sách)
│   └── /{post-slug}/               Bài viết bệnh cụ thể
│
├── /tin-tuc/                      Tin tức tổng hợp
│   ├── /tin-tuc-noi-bo/           Tin nội bộ (danh sách)
│   │   └── /{post-slug}/          Chi tiết tin nội bộ
│   └── /tin-tuc-nganh-chan-nuoi-thu-y/   Tin ngành (danh sách)
│       └── /{post-slug}/          Chi tiết tin ngành
│
├── /tuyen-dung/                   Tuyển dụng (danh sách)
│   └── /{job-slug}/               Chi tiết tin tuyển dụng
│
└── /lien-he/                      Liên hệ
```

---

## 7. Công Nghệ & Kỹ Thuật

| Hạng mục | Chi tiết |
|----------|----------|
| **CMS** | WordPress (Custom Theme: `sanfovet`) |
| **Ngôn ngữ backend** | PHP |
| **Database** | MySQL |
| **Frontend** | HTML5, CSS3, JavaScript (jQuery) |
| **Đa ngôn ngữ** | WPML hoặc plugin tương đương |
| **Contact Form** | WordPress Contact Form plugin (CF7 hoặc tương đương) |
| **SEO** | Yoast SEO hoặc Rank Math (suy đoán từ cấu trúc URL thân thiện) |
| **Hosting** | VPS/Shared hosting tại Việt Nam |
| **SSL** | HTTPS (có chứng chỉ SSL) |
| **Google Maps** | Nhúng iframe trong trang Liên hệ |
| **Video** | File MP4 self-hosted (không dùng YouTube embed) |
| **Mạng xã hội** | Facebook Page, YouTube Channel, Zalo OA |
| **Lazy Load** | Có (hình ảnh dùng `data:image/svg+xml` placeholder) |
| **Copyright Protection** | JavaScript chặn chuột phải (right-click), thông báo "Nội dung được bảo vệ!!" |

---

## 8. Bảo Mật & Hạn Chế Nội Dung

Website áp dụng cơ chế **bảo vệ nội dung** thông qua JavaScript:

- **Chặn chuột phải (Right-click):** Hiển thị popup cảnh báo `"error: Nội dung được bảo vệ !!"` khi người dùng cố copy/inspect
- **Mục đích:** Ngăn sao chép nội dung bài viết, thông tin sản phẩm, hình ảnh
- **Hạn chế:** Biện pháp này chỉ mang tính deterrence (ngăn cản cơ bản), không ngăn được người dùng kỹ thuật cao

---

## Tổng Kết

| Nhóm chức năng | Số chức năng | Có form tương tác |
|---|---|---|
| Trang thông tin công ty | 3 (Giới thiệu, Catalogue, Trang chủ) | Không |
| Danh mục & sản phẩm | 12 (10 danh mục + trang tổng + chi tiết) | Không |
| Nội dung kiến thức | 3 (Cẩm nang, Bệnh, Tin tức) | Không |
| Tuyển dụng | 1 | Không (liên hệ ngoài) |
| Liên hệ | 1 | **Có** (Contact Form) |
| Hỗ trợ nhanh | 4 (Hotline, Email, Zalo, Facebook) | Popup |
| Đa ngôn ngữ | 1 (VI/EN) | Toggle button |

**Website sanfovet.com.vn** hoạt động chủ yếu như một **brochure website** + **knowledge hub** – không có thương mại điện tử, toàn bộ việc bán hàng diễn ra qua kênh offline (điện thoại, email, gặp trực tiếp). Điểm mạnh là hệ thống nội dung giáo dục phong phú về chăn nuôi và bệnh thú y, đóng vai trò SEO content marketing quan trọng.

---
