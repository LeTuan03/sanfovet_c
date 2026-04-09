import { updateSEO, renderBreadcrumb } from '../utils/router.js';
import { icon } from '../utils/icons.js';

export function renderContactPage() {
  updateSEO({ title: 'Liên hệ', description: 'Liên hệ SANFOVET - Công ty CP Đầu tư Liên doanh Việt Anh. Địa chỉ: Cụm CN Liên Phương, Hồng Vân, Hà Nội. ĐT: 024 66861629.' });

  return `
    <div class="page-hero"><div class="container"><h1>Liên Hệ</h1><p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p></div></div>
    ${renderBreadcrumb([{label:'Trang chủ',href:'#/'},{label:'Liên hệ'}])}
    <section class="section"><div class="container">
      <div class="contact-grid">
        <div>
          <h2 style="font-family:var(--font-heading);font-size:1.6rem;margin-bottom:24px;color:var(--primary-dark)">Gửi Tin Nhắn</h2>
          <form id="contact-form" onsubmit="return false;">
            <div class="form-group">
              <label for="contact-name">Họ và tên <span style="color:red">*</span></label>
              <input type="text" id="contact-name" name="name" required placeholder="Nhập họ và tên" />
            </div>
            <div class="form-group">
              <label for="contact-phone">Số điện thoại <span style="color:red">*</span></label>
              <input type="tel" id="contact-phone" name="phone" required placeholder="Nhập số điện thoại" />
            </div>
            <div class="form-group">
              <label for="contact-email">Email</label>
              <input type="email" id="contact-email" name="email" placeholder="Nhập địa chỉ email" />
            </div>
            <div class="form-group">
              <label for="contact-message">Nội dung tin nhắn <span style="color:red">*</span></label>
              <textarea id="contact-message" name="message" required placeholder="Nhập nội dung tin nhắn..."></textarea>
            </div>
            <button type="submit" class="btn-primary" id="contact-submit">${icon('send', 16)} Gửi tin nhắn</button>
          </form>
        </div>
        <div>
          <div class="contact-info-card">
            <h3>Thông Tin Liên Hệ</h3>
            <div class="contact-info-item">
              <div class="icon-circle">${icon('map-pin', 18)}</div>
              <div class="info"><h4>Trụ sở chính</h4><p>Cụm CN Liên Phương, Xã Hồng Vân, Hà Nội</p></div>
            </div>
            <div class="contact-info-item">
              <div class="icon-circle">${icon('phone', 18)}</div>
              <div class="info"><h4>Điện thoại</h4><p>024 66861629 | 097 499 9204</p></div>
            </div>
            <div class="contact-info-item">
              <div class="icon-circle">${icon('mail', 18)}</div>
              <div class="info"><h4>Email</h4><p>pkd.sanfovet@gmail.com</p></div>
            </div>
            <div class="contact-info-item">
              <div class="icon-circle">${icon('globe', 18)}</div>
              <div class="info"><h4>Website</h4><p>www.sanfovet.com.vn</p></div>
            </div>
            <div class="contact-info-item">
              <div class="icon-circle">${icon('map-pin', 18)}</div>
              <div class="info"><h4>Chi nhánh miền Nam</h4><p>Hố Nai, Trảng Bom, Đồng Nai</p></div>
            </div>
          </div>
        </div>
      </div>
    </div></section>
    <section class="section section-alt"><div class="container">
      <div class="section-header"><h2>Vị Trí Trên Bản Đồ</h2></div>
      <div class="map-container">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.3023789655567!2d105.8741613!3d20.9602149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac76ccab6887%3A0x55b7bd0267e41c4d!2zSOG7kyBOw7RpLCBUcsOhbmcgQm9tLCDEkOG7k25nIE5haQ!5e0!3m2!1svi!2svn!4v1678901234567!5m2!1svi!2svn" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Bản đồ vị trí SANFOVET"></iframe>
      </div>
    </div></section>
  `;
}
