import { products, categories } from '../data/data.js';
import { updateSEO, renderBreadcrumb } from '../utils/router.js';
import { icon } from '../utils/icons.js';

export function renderProductsPage() {
  updateSEO({ title: 'Danh mục sản phẩm', description: 'Danh mục sản phẩm thuốc thú y SANFOVET: kháng sinh, bổ trợ, sát trùng cho gia súc gia cầm. 10 nhóm sản phẩm chất lượng cao.' });

  return `
    <div class="page-hero"><div class="container"><h1>Danh Mục Sản Phẩm</h1><p>10 nhóm sản phẩm thuốc thú y chất lượng cao – Công nghệ USA</p></div></div>
    ${renderBreadcrumb([{label:'Trang chủ',href:'#/'},{label:'Sản phẩm'}])}
    <section class="section"><div class="container">
      <div class="section-header"><h2>Nhóm Sản Phẩm</h2><p>Chọn nhóm sản phẩm để xem chi tiết</p></div>
      <div class="category-grid">
        ${categories.map((c, i) => `
          <a href="#/san-pham/danh-muc/${c.slug}" class="category-card animate-in" style="animation-delay:${i * 0.05}s;text-decoration:none">
            <div class="cat-icon">${c.icon}</div>
            <h3>${c.name}</h3>
          </a>
        `).join('')}
      </div>
    </div></section>
    <section class="section section-alt"><div class="container">
      <div class="section-header"><h2>Tất Cả Sản Phẩm</h2></div>
      <div class="product-grid">
        ${products.map((p, i) => `
          <article class="product-card animate-in" style="animation-delay:${i * 0.05}s">
            <div class="product-card-image"><img src="${p.image}" alt="Thuốc thú y ${p.name}" width="260" height="220" loading="lazy" /></div>
            <div class="product-card-body">
              <span class="category-tag">${categories.find(c => c.id === p.categoryId)?.name?.split(' ').slice(0, 3).join(' ') || ''}</span>
              <h3>${p.name}</h3>
              <p style="font-size:.84rem;color:var(--text-light)">${p.tagline}</p>
            </div>
            <a href="#/san-pham/${p.slug}" class="btn-view">${icon('eye', 16)} Xem chi tiết</a>
          </article>
        `).join('')}
      </div>
    </div></section>
  `;
}

export function renderProductDetailPage(params) {
  const product = products.find(p => p.slug === params.slug);
  if (!product) return `<section class="section"><div class="container"><h1>Sản phẩm không tìm thấy</h1><a href="#/san-pham" class="btn-primary">← Quay lại</a></div></section>`;

  const cat = categories.find(c => c.id === product.categoryId);
  updateSEO({ title: product.name, description: `${product.name} - ${product.tagline}. ${product.indications}. SĐK: ${product.registrationNo}`, type: 'product' });

  const related = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  return `
    ${renderBreadcrumb([{label:'Trang chủ',href:'#/'},{label:'Sản phẩm',href:'#/san-pham'},{label:product.name}])}
    <section class="section"><div class="container">
      <div class="product-detail">
        <div class="product-detail-image animate-in">
          <img src="${product.image}" alt="Thuốc thú y ${product.name} - ${product.tagline}" width="350" height="350" loading="lazy" />
        </div>
        <div class="product-detail-info animate-in" style="animation-delay:.2s">
          <h1>${product.name}</h1>
          <p class="tagline">${product.tagline}</p>
          <a href="#/lien-he" class="btn-primary" style="margin-bottom:24px">${icon('phone', 16)} Liên hệ mua hàng</a>

          <div class="info-section"><h2>${icon('file-text', 18)} Thành phần</h2>
            <table class="ingredient-table"><thead><tr><th>Hoạt chất</th><th>Hàm lượng</th><th>Đơn vị</th></tr></thead><tbody>
            ${product.ingredients.map(ig => `<tr><td>${ig.name}</td><td>${ig.amount}</td><td>${ig.unit}</td></tr>`).join('')}
            </tbody></table>
          </div>
          <div class="info-section"><h2>${icon('microscope', 18)} Đặc tính</h2><p>${product.characteristics}</p></div>
          <div class="info-section"><h2>${icon('pill', 18)} Chỉ định</h2><p>${product.indications}</p></div>
          <div class="info-section"><h2>${icon('syringe', 18)} Cách dùng và liều lượng</h2>
            <p><strong>Đường dùng:</strong> ${product.dosage.route} | <strong>Liệu trình:</strong> ${product.dosage.duration}</p>
            <table class="ingredient-table"><thead><tr><th>Đối tượng</th><th>Liều lượng</th></tr></thead><tbody>
            ${product.dosage.byAnimal.map(d => `<tr><td>${d.animal}</td><td>${d.dose}</td></tr>`).join('')}
            </tbody></table>
          </div>
          <div class="info-section"><h2>${icon('file-text', 18)} Thông tin khác</h2>
            <ul>
              <li><strong>Dạng bào chế:</strong> ${product.formulation}</li>
              <li><strong>Thời gian ngừng thuốc:</strong> ${product.withdrawalPeriod}</li>
              <li><strong>Bảo quản:</strong> ${product.storage}</li>
              <li><strong>Thể tích:</strong> ${product.volume}</li>
              <li><strong>SĐK:</strong> ${product.registrationNo}</li>
            </ul>
          </div>
        </div>
      </div>
    </div></section>
    ${related.length ? `<section class="section section-alt"><div class="container">
      <div class="section-header"><h2>Sản Phẩm Cùng Nhóm</h2></div>
      <div class="product-grid">${related.map(p => `
        <article class="product-card">
          <div class="product-card-image"><img src="${p.image}" alt="${p.name}" width="260" height="220" loading="lazy" /></div>
          <div class="product-card-body"><h3>${p.name}</h3><p style="font-size:.84rem;color:var(--text-light)">${p.tagline}</p></div>
          <a href="#/san-pham/${p.slug}" class="btn-view">${icon('eye', 16)} Xem chi tiết</a>
        </article>
      `).join('')}</div>
    </div></section>` : ''}
    <script type="application/ld+json">${JSON.stringify({
      "@context":"https://schema.org","@type":"Product","name":product.name,"description":product.tagline,"image":"https://sanfovet.com.vn"+product.image,
      "brand":{"@type":"Brand","name":"SANFOVET"},"manufacturer":{"@type":"Organization","name":"Công ty CP Đầu tư Liên doanh Việt Anh"}
    })}</script>
  `;
}

export function renderCategoryPage(params) {
  const cat = categories.find(c => c.slug === params.slug);
  if (!cat) return `<section class="section"><div class="container"><h1>Danh mục không tìm thấy</h1><a href="#/san-pham" class="btn-primary">← Quay lại</a></div></section>`;

  const catProducts = products.filter(p => p.categoryId === cat.id);
  updateSEO({ title: cat.name, description: `Danh mục ${cat.name} - SANFOVET. Sản phẩm thuốc thú y chất lượng cao.` });

  return `
    <div class="page-hero"><div class="container"><h1>${cat.name}</h1></div></div>
    ${renderBreadcrumb([{label:'Trang chủ',href:'#/'},{label:'Sản phẩm',href:'#/san-pham'},{label:cat.name}])}
    <section class="section"><div class="container">
      ${catProducts.length ? `<div class="product-grid">${catProducts.map(p => `
        <article class="product-card"><div class="product-card-image"><img src="${p.image}" alt="${p.name}" width="260" height="220" loading="lazy" /></div>
        <div class="product-card-body"><h3>${p.name}</h3><p style="font-size:.84rem;color:var(--text-light)">${p.tagline}</p></div>
        <a href="#/san-pham/${p.slug}" class="btn-view">${icon('eye', 16)} Xem chi tiết</a></article>
      `).join('')}</div>` : '<p style="text-align:center;color:var(--text-muted)">Đang cập nhật sản phẩm...</p>'}
    </div></section>
  `;
}
