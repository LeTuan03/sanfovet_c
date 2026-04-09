// Shared layout components
import { icon } from '../utils/icons.js';

export function renderTopBar() {
  return `
  <div class="top-bar">
    <div class="container">
      <div class="top-bar-left">
        <span>${icon('phone', 14)} 024 66861629 | 097 499 9204</span>
        <span>${icon('mail', 14)} pkd.sanfovet@gmail.com</span>
      </div>
      <div class="top-bar-right">
        <div class="social-top">
          <a href="https://facebook.com/sanfovet" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook', 16)}</a>
          <a href="https://youtube.com/sanfovet" target="_blank" rel="noopener" aria-label="YouTube">${icon('youtube', 16)}</a>
        </div>
        <button class="lang-btn active" data-lang="vi">🇻🇳 VI</button>
        <button class="lang-btn" data-lang="en">🇬🇧 EN</button>
      </div>
    </div>
  </div>`;
}

export function renderHeader() {
  return `
  <div class="site-header">
    <div class="container header-inner">
      <a href="#/" class="logo" aria-label="SANFOVET - Trang chủ">
        <img src="/images/logo.png" alt="Logo SANFOVET - Thuốc thú y trang trại" width="48" height="48" loading="eager" />
        <span>SANFOVET<small>Technology USA</small></span>
      </a>
      <nav aria-label="Điều hướng chính">
        <ul class="main-nav" id="main-nav" role="menubar">
          <li role="none"><a href="#/" role="menuitem">Trang chủ</a></li>
          <li role="none">
            <a href="#/gioi-thieu" role="menuitem">Giới thiệu ${icon('chevron-down', 12)}</a>
            <ul class="dropdown" role="menu">
              <li role="none"><a href="#/gioi-thieu" role="menuitem">Giới thiệu công ty</a></li>
              <li role="none"><a href="#/catalogue" role="menuitem">Catalogue sản phẩm</a></li>
            </ul>
          </li>
          <li role="none">
            <a href="#/san-pham" role="menuitem">Sản phẩm ${icon('chevron-down', 12)}</a>
            <ul class="dropdown" role="menu" id="product-dropdown"></ul>
          </li>
          <li role="none"><a href="#/cam-nang-chan-nuoi" role="menuitem">Cẩm nang</a></li>
          <li role="none"><a href="#/benh-va-dieu-tri" role="menuitem">Bệnh & điều trị</a></li>
          <li role="none">
            <a href="#/tin-tuc" role="menuitem">Tin tức ${icon('chevron-down', 12)}</a>
            <ul class="dropdown" role="menu">
              <li role="none"><a href="#/tin-tuc/noi-bo" role="menuitem">Tin tức nội bộ</a></li>
              <li role="none"><a href="#/tin-tuc/nganh" role="menuitem">Tin tức ngành chăn nuôi</a></li>
            </ul>
          </li>
          <li role="none"><a href="#/tuyen-dung" role="menuitem">Tuyển dụng</a></li>
          <li role="none"><a href="#/lien-he" role="menuitem">Liên hệ</a></li>
        </ul>
      </nav>
      <button class="menu-toggle" id="menu-toggle" aria-label="Mở menu">
        ${icon('menu', 24)}
      </button>
    </div>
  </div>`;
}

export function renderFooter() {
  return `
  <div class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h3>SANFOVET</h3>
          <p>Công ty CP Đầu tư Liên doanh Việt Anh</p>
          <p><strong>Trụ sở:</strong> Cụm CN Liên Phương, Xã Hồng Vân, Hà Nội</p>
          <p><strong>Điện thoại:</strong> 024 66861629 | 097 499 9204</p>
          <p><strong>Email:</strong> pkd.sanfovet@gmail.com</p>
          <p><strong>Website:</strong> www.sanfovet.com.vn</p>
          <p style="margin-top:12px"><strong>Chi nhánh miền Nam:</strong><br/>Hố Nai, Trảng Bom, Đồng Nai</p>
        </div>
        <div class="footer-col">
          <h3>Danh mục sản phẩm</h3>
          <ul>
            <li><a href="#/san-pham">Thuốc bổ trợ tiêm</a></li>
            <li><a href="#/san-pham">Thuốc kháng sinh tiêm</a></li>
            <li><a href="#/san-pham">Thuốc kháng sinh uống</a></li>
            <li><a href="#/san-pham">Thuốc premix bám dính</a></li>
            <li><a href="#/san-pham">Thuốc bột hòa tan</a></li>
            <li><a href="#/san-pham">Thuốc bổ trợ dung dịch</a></li>
            <li><a href="#/san-pham">Thuốc sát trùng</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>Hỗ trợ kỹ thuật</h3>
          <p><strong>BSTY. Nguyễn Văn An</strong></p>
          <p>Email: hotro.sanfovet@gmail.com</p>
          <p>SĐT: 098 765 4321</p>
          <br/>
          <p><strong>BSTY. Trần Thị Lan</strong></p>
          <p>Email: kythuat.sanfovet@gmail.com</p>
          <p>SĐT: 091 234 5678</p>
        </div>
        <div class="footer-col">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><a href="#/">Trang chủ</a></li>
            <li><a href="#/gioi-thieu">Giới thiệu</a></li>
            <li><a href="#/cam-nang-chan-nuoi">Cẩm nang chăn nuôi</a></li>
            <li><a href="#/benh-va-dieu-tri">Bệnh & điều trị</a></li>
            <li><a href="#/tin-tuc">Tin tức</a></li>
            <li><a href="#/tuyen-dung">Tuyển dụng</a></li>
            <li><a href="#/lien-he">Liên hệ</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 SANFOVET - Công ty CP Đầu tư Liên doanh Việt Anh. All Rights Reserved.</p>
      </div>
    </div>
  </div>`;
}

export function renderFloatingButtons() {
  return `
  <div class="float-buttons">
    <a href="tel:0974999204" class="float-btn phone" aria-label="Gọi hotline" title="Gọi: 097 499 9204">
      ${icon('phone', 22)}
    </a>
    <a href="mailto:pkd.sanfovet@gmail.com" class="float-btn email-btn" aria-label="Gửi email" title="Email: pkd.sanfovet@gmail.com">
      ${icon('mail', 22)}
    </a>
    <a href="https://zalo.me/0974999204" target="_blank" rel="noopener" class="float-btn zalo" aria-label="Chat Zalo" title="Chat Zalo">
      <strong style="font-size:.7rem">Zalo</strong>
    </a>
    <a href="https://facebook.com/sanfovet" target="_blank" rel="noopener" class="float-btn facebook" aria-label="Facebook" title="Facebook">
      ${icon('facebook', 22)}
    </a>
    <button class="float-btn contact-btn" id="open-contact-popup" aria-label="Liên hệ nhanh" title="Liên hệ nhanh">
      ${icon('message-square', 22)}
    </button>
  </div>`;
}

export function renderContactPopup() {
  return `
  <div class="popup-box">
    <button class="popup-close" id="close-popup" aria-label="Đóng">${icon('x', 18)}</button>
    <h3 style="font-family:var(--font-heading);font-size:1.4rem;margin-bottom:20px;color:var(--primary-dark)">Liên hệ nhanh</h3>
    <div style="margin-bottom:16px">
      <p style="font-size:.9rem;margin-bottom:8px;display:flex;align-items:center;gap:8px">${icon('phone', 16)} <strong>Hotline:</strong> 097 499 9204</p>
      <p style="font-size:.9rem;margin-bottom:8px;display:flex;align-items:center;gap:8px">${icon('phone', 16)} <strong>Điện thoại:</strong> 024 66861629</p>
      <p style="font-size:.9rem;margin-bottom:8px;display:flex;align-items:center;gap:8px">${icon('mail', 16)} <strong>Email:</strong> pkd.sanfovet@gmail.com</p>
      <p style="font-size:.9rem;margin-bottom:8px;display:flex;align-items:center;gap:8px">${icon('globe', 16)} <strong>Website:</strong> www.sanfovet.com.vn</p>
      <p style="font-size:.9rem;display:flex;align-items:center;gap:8px">${icon('map-pin', 16)} <strong>Địa chỉ:</strong> Cụm CN Liên Phương, Xã Hồng Vân, Hà Nội</p>
    </div>
    <a href="#/lien-he" class="btn-primary" style="display:inline-flex;text-decoration:none" onclick="document.getElementById('contact-popup').classList.remove('show');document.getElementById('contact-popup').classList.add('hidden')">
      ${icon('send', 16)} Gửi tin nhắn
    </a>
  </div>`;
}
