import { updateSEO, renderBreadcrumb } from '../utils/router.js';
import { icon } from '../utils/icons.js';

export function renderAboutPage() {
  updateSEO({ title: 'Giới thiệu', description: 'Giới thiệu về Công ty CP Đầu tư Liên doanh Việt Anh - SANFOVET. Lịch sử hình thành, tầm nhìn sứ mệnh, cơ sở vật chất hiện đại.' });

  return `
    <div class="page-hero"><div class="container"><h1>Giới Thiệu SANFOVET</h1><p>Công ty CP Đầu tư Liên doanh Việt Anh - Thuốc thú y trang trại Technology USA</p></div></div>
    ${renderBreadcrumb([{label:'Trang chủ',href:'#/'},{label:'Giới thiệu'}])}
    <section class="section"><div class="container">
      <div class="about-grid">
        <div class="about-image animate-in"><img src="/images/about.png" alt="Trụ sở SANFOVET" width="600" height="380" loading="lazy" /></div>
        <div class="about-text animate-in" style="animation-delay:.2s">
          <h2 style="font-family:var(--font-heading);font-size:2rem;color:var(--primary-dark);margin-bottom:20px">Về Công Ty SANFOVET</h2>
          <p>Công ty CP Đầu tư Liên doanh Việt Anh (SANFOVET) được thành lập với sứ mệnh mang đến những sản phẩm thuốc thú y chất lượng cao nhất cho ngành chăn nuôi Việt Nam.</p>
          <p>Với công nghệ sản xuất tiên tiến nhập khẩu từ Hoa Kỳ, SANFOVET đã và đang khẳng định vị thế hàng đầu trong lĩnh vực dược phẩm thú y trang trại.</p>
          <div class="about-stats">
            <div class="stat-item"><span class="number">15+</span><span class="label">Năm kinh nghiệm</span></div>
            <div class="stat-item"><span class="number">200+</span><span class="label">Sản phẩm</span></div>
            <div class="stat-item"><span class="number">63</span><span class="label">Tỉnh thành</span></div>
          </div>
        </div>
      </div>
    </div></section>
    <section class="section section-alt"><div class="container">
      <div class="section-header"><h2>Tầm Nhìn – Sứ Mệnh</h2></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px">
        <div style="background:#fff;padding:32px;box-shadow:var(--shadow);border-left:4px solid var(--primary)">
          <h3 style="color:var(--primary);margin-bottom:12px;font-size:1.2rem">${icon('eye', 20)} Tầm nhìn</h3>
          <p style="color:var(--text-light);line-height:1.8">Trở thành công ty dược phẩm thú y hàng đầu Đông Nam Á, cung cấp giải pháp sức khỏe vật nuôi toàn diện, ứng dụng công nghệ hiện đại nhất.</p>
        </div>
        <div style="background:#fff;padding:32px;box-shadow:var(--shadow);border-left:4px solid var(--accent)">
          <h3 style="color:var(--accent);margin-bottom:12px;font-size:1.2rem">${icon('sparkles', 20)} Sứ mệnh</h3>
          <p style="color:var(--text-light);line-height:1.8">Đồng hành cùng người chăn nuôi Việt Nam, nâng cao chất lượng sản phẩm chăn nuôi, bảo vệ sức khỏe vật nuôi và an toàn thực phẩm.</p>
        </div>
      </div>
    </div></section>
    <section class="section"><div class="container">
      <div class="section-header"><h2>Cơ Sở Vật Chất</h2><p>Nhà máy sản xuất đạt tiêu chuẩn GMP-WHO</p></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
        <div style="border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow)"><img src="/images/banner3.png" alt="Nhà máy sản xuất SANFOVET" style="width:100%;height:220px;object-fit:cover" loading="lazy" /><div style="padding:16px;text-align:center"><h4>Nhà máy sản xuất</h4></div></div>
        <div style="border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow)"><img src="/images/banner1.png" alt="Phòng kiểm nghiệm SANFOVET" style="width:100%;height:220px;object-fit:cover" loading="lazy" /><div style="padding:16px;text-align:center"><h4>Phòng kiểm nghiệm</h4></div></div>
        <div style="border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow)"><img src="/images/banner2.png" alt="Kho bảo quản SANFOVET" style="width:100%;height:220px;object-fit:cover" loading="lazy" /><div style="padding:16px;text-align:center"><h4>Kho bảo quản</h4></div></div>
      </div>
    </div></section>
  `;
}

export function renderCataloguePage() {
  updateSEO({ title: 'Catalogue sản phẩm', description: 'Tải catalogue sản phẩm thuốc thú y SANFOVET. Hồ sơ năng lực công ty và danh mục sản phẩm đầy đủ.' });

  return `
    <div class="page-hero"><div class="container"><h1>Catalogue Sản Phẩm</h1><p>Xem và tải hồ sơ năng lực, catalogue sản phẩm SANFOVET</p></div></div>
    ${renderBreadcrumb([{label:'Trang chủ',href:'#/'},{label:'Giới thiệu',href:'#/gioi-thieu'},{label:'Catalogue'}])}
    <section class="section"><div class="container" style="text-align:center">
      <div style="max-width:600px;margin:0 auto;background:var(--bg-alt);padding:48px;border-radius:var(--radius-lg);box-shadow:var(--shadow)">
        <div style="font-size:4rem;margin-bottom:20px">${icon('file-text', 64)}</div>
        <h2 style="font-family:var(--font-heading);margin-bottom:16px">Catalogue SANFOVET 2026</h2>
        <p style="color:var(--text-light);margin-bottom:24px">Tải về catalogue sản phẩm đầy đủ với thông tin chi tiết về hơn 200 sản phẩm thuốc thú y chất lượng cao.</p>
        <button class="btn-primary" onclick="alert('Chức năng tải catalogue sẽ được cập nhật sớm!')">${icon('download', 16)} Tải Catalogue PDF</button>
        <p style="font-size:.82rem;color:var(--text-muted);margin-top:12px">Dung lượng: ~15MB | Định dạng: PDF</p>
      </div>
    </div></section>
  `;
}
