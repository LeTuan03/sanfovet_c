import { articles } from '../data/data.js';
import { updateSEO, renderBreadcrumb } from '../utils/router.js';
import { icon } from '../utils/icons.js';

function renderArticleList(filtered, title, desc, breadcrumbs) {
  return `
    <div class="page-hero"><div class="container"><h1>${title}</h1><p>${desc}</p></div></div>
    ${renderBreadcrumb(breadcrumbs)}
    <section class="section"><div class="container">
      ${filtered.length ? `<div class="article-grid">${filtered.map((a, i) => `
        <article class="article-card animate-in" style="animation-delay:${i * 0.08}s">
          <div class="article-card-image"><img src="${a.thumbnail}" alt="${a.title}" width="400" height="200" loading="lazy" /></div>
          <div class="article-card-body">
            <div class="meta"><span>${icon('calendar', 14)} ${a.publishDate}</span></div>
            <h3><a href="#/bai-viet/${a.slug}">${a.title}</a></h3>
            <p>${a.excerpt}</p>
            <a href="#/bai-viet/${a.slug}" class="read-more">${icon('arrow-right', 14)} Đọc tiếp</a>
          </div>
        </article>
      `).join('')}</div>` : '<p style="text-align:center;color:var(--text-muted)">Đang cập nhật bài viết...</p>'}
    </div></section>
  `;
}

export function renderCamNangPage() {
  updateSEO({ title: 'Cẩm nang chăn nuôi', description: 'Cẩm nang kỹ thuật chăn nuôi gia súc gia cầm. Hướng dẫn nuôi heo, gà, vịt, bò. Dinh dưỡng và quản lý đàn.' });
  return renderArticleList(articles.filter(a => a.category === 'cam-nang'), 'Cẩm Nang Chăn Nuôi', 'Kiến thức kỹ thuật chăn nuôi cho người nông dân và trang trại', [{label:'Trang chủ',href:'#/'},{label:'Cẩm nang chăn nuôi'}]);
}

export function renderBenhDieuTriPage() {
  updateSEO({ title: 'Bệnh và điều trị bệnh', description: 'Thông tin chuyên sâu về các bệnh thường gặp trên gia súc gia cầm. Triệu chứng, chẩn đoán và phác đồ điều trị hiệu quả.' });
  return renderArticleList(articles.filter(a => a.category === 'benh-dieu-tri'), 'Bệnh Và Điều Trị Bệnh', 'Kiến thức chuyên sâu về bệnh thú y trên vật nuôi trang trại', [{label:'Trang chủ',href:'#/'},{label:'Bệnh và điều trị'}]);
}

export function renderTinTucPage() {
  updateSEO({ title: 'Tin tức', description: 'Tin tức nội bộ SANFOVET và tin tức ngành chăn nuôi thú y. Cập nhật xu hướng, sự kiện, chính sách mới nhất.' });
  return renderArticleList(articles.filter(a => a.category === 'tin-noi-bo' || a.category === 'tin-nganh'), 'Tin Tức', 'Cập nhật tin tức mới nhất từ SANFOVET và ngành chăn nuôi', [{label:'Trang chủ',href:'#/'},{label:'Tin tức'}]);
}

export function renderTinNoiBoPage() {
  updateSEO({ title: 'Tin tức nội bộ', description: 'Tin tức nội bộ SANFOVET: hoạt động, sự kiện, hội thảo, triển lãm của công ty.' });
  return renderArticleList(articles.filter(a => a.category === 'tin-noi-bo'), 'Tin Tức Nội Bộ', 'Hoạt động và sự kiện nội bộ Công ty SANFOVET', [{label:'Trang chủ',href:'#/'},{label:'Tin tức',href:'#/tin-tuc'},{label:'Tin tức nội bộ'}]);
}

export function renderTinNganhPage() {
  updateSEO({ title: 'Tin tức ngành chăn nuôi', description: 'Tin tức ngành chăn nuôi thú y: xu hướng thị trường, chính sách, công nghệ mới.' });
  return renderArticleList(articles.filter(a => a.category === 'tin-nganh'), 'Tin Tức Ngành Chăn Nuôi Thú Y', 'Thông tin ngành, chính sách và xu hướng thị trường', [{label:'Trang chủ',href:'#/'},{label:'Tin tức',href:'#/tin-tuc'},{label:'Tin tức ngành'}]);
}

export function renderArticleDetailPage(params) {
  const article = articles.find(a => a.slug === params.slug);
  if (!article) return `<section class="section"><div class="container"><h1>Bài viết không tìm thấy</h1><a href="#/" class="btn-primary">← Trang chủ</a></div></section>`;

  const catMap = { 'cam-nang': 'Cẩm nang chăn nuôi', 'benh-dieu-tri': 'Bệnh và điều trị', 'tin-noi-bo': 'Tin tức nội bộ', 'tin-nganh': 'Tin tức ngành' };
  const catHref = { 'cam-nang': '#/cam-nang-chan-nuoi', 'benh-dieu-tri': '#/benh-va-dieu-tri', 'tin-noi-bo': '#/tin-tuc/noi-bo', 'tin-nganh': '#/tin-tuc/nganh' };
  updateSEO({ title: article.title, description: article.excerpt, type: 'article' });

  const related = articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3);

  return `
    ${renderBreadcrumb([{label:'Trang chủ',href:'#/'},{label:catMap[article.category]||'Bài viết',href:catHref[article.category]||'#/'},{label:article.title}])}
    <section class="section"><div class="container">
      <div class="article-detail">
        <div class="article-detail-header">
          <h1>${article.title}</h1>
          <div class="meta"><span>${icon('calendar', 14)} ${article.publishDate}</span><span>${icon('tag', 14)} ${catMap[article.category] || ''}</span></div>
        </div>
        <div class="article-detail-image"><img src="${article.thumbnail}" alt="${article.title}" width="800" height="400" loading="lazy" /></div>
        <div class="article-content">${article.content}</div>
      </div>
    </div></section>
    ${related.length ? `<section class="section section-alt"><div class="container"><div class="section-header"><h2>Bài Viết Liên Quan</h2></div>
      <div class="article-grid">${related.map(a => `
        <article class="article-card"><div class="article-card-image"><img src="${a.thumbnail}" alt="${a.title}" width="400" height="200" loading="lazy" /></div>
        <div class="article-card-body"><div class="meta"><span>${a.publishDate}</span></div><h3><a href="#/bai-viet/${a.slug}">${a.title}</a></h3><p>${a.excerpt}</p></div></article>
      `).join('')}</div></div></section>` : ''}
    <script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":article.title,"datePublished":article.publishDate,"description":article.excerpt,"image":"https://sanfovet.com.vn"+article.thumbnail,"author":{"@type":"Organization","name":"SANFOVET"},"publisher":{"@type":"Organization","name":"SANFOVET","logo":{"@type":"ImageObject","url":"https://sanfovet.com.vn/images/logo.png"}}})}</script>
  `;
}
