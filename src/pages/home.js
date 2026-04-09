import { products, articles, categories } from '../data/data.js';
import { updateSEO } from '../utils/router.js';
import { icon } from '../utils/icons.js';

export function renderHomePage() {
  updateSEO({
    title: 'Trang chủ',
    description: 'SANFOVET - Công ty CP Đầu tư Liên doanh Việt Anh. Chuyên sản xuất, phân phối thuốc thú y trang trại chất lượng cao. Công nghệ USA. Thuốc kháng sinh, thuốc bổ trợ, thuốc sát trùng cho gia súc gia cầm.',
    canonical: 'https://sanfovet.com.vn/',
  });

  const featuredProducts = products.filter(p => p.featured).slice(0, 7);
  const diseaseArticles = articles.filter(a => a.category === 'benh-dieu-tri').slice(0, 4);
  const latestNews = articles.slice(0, 5);

  return `
    <!-- Hero Banner Slider -->
    <section class="hero-section" aria-label="Banner quảng cáo">
      <div class="banner-slider" id="banner-slider">
        <div class="banner-slide active">
          <img src="/images/banner1.png" alt="SANFOVET - Thuốc thú y trang trại chất lượng cao Technology USA" width="1920" height="520" loading="eager" />
          <div class="banner-overlay">
            <div class="banner-content container">
              <h1>SANFOVET<br/>Thuốc Thú Y Trang Trại</h1>
              <p>Công nghệ USA – Chất lượng quốc tế – Giải pháp toàn diện cho chăn nuôi Việt Nam</p>
              <a href="#/san-pham" class="btn-primary">${icon('eye', 16)} Xem sản phẩm</a>
            </div>
          </div>
        </div>
        <div class="banner-slide">
          <img src="/images/banner2.png" alt="Đội ngũ bác sĩ thú y chuyên nghiệp của SANFOVET" width="1920" height="520" loading="lazy" />
          <div class="banner-overlay">
            <div class="banner-content container">
              <h1>Đội Ngũ Chuyên Gia<br/>Hàng Đầu</h1>
              <p>Hơn 15 năm kinh nghiệm trong lĩnh vực thuốc thú y, đồng hành cùng người chăn nuôi Việt Nam</p>
              <a href="#/gioi-thieu" class="btn-primary">${icon('arrow-right', 16)} Tìm hiểu thêm</a>
            </div>
          </div>
        </div>
        <div class="banner-slide">
          <img src="/images/banner3.png" alt="Nhà máy sản xuất thuốc thú y SANFOVET đạt tiêu chuẩn GMP" width="1920" height="520" loading="lazy" />
          <div class="banner-overlay">
            <div class="banner-content container">
              <h1>Nhà Máy GMP<br/>Công Nghệ Hiện Đại</h1>
              <p>Nhà máy đạt tiêu chuẩn GMP-WHO, trang thiết bị nhập khẩu từ Mỹ và Châu Âu</p>
              <a href="#/catalogue" class="btn-primary">${icon('download', 16)} Xem Catalogue</a>
            </div>
          </div>
        </div>
      </div>
      <div class="banner-dots" id="banner-dots">
        <button class="banner-dot active" data-index="0" aria-label="Banner 1"></button>
        <button class="banner-dot" data-index="1" aria-label="Banner 2"></button>
        <button class="banner-dot" data-index="2" aria-label="Banner 3"></button>
      </div>
    </section>

    <!-- About Section -->
    <section class="section" id="about-section">
      <div class="container">
        <div class="about-grid">
          <div class="about-image animate-in">
            <img src="/images/about.png" alt="Trụ sở công ty SANFOVET - Công ty CP Đầu tư Liên doanh Việt Anh" width="600" height="380" loading="lazy" />
          </div>
          <div class="about-text animate-in" style="animation-delay:.2s">
            <h2 style="font-family:var(--font-heading);font-size:1.2rem;color:var(--primary);margin-bottom:6px;text-transform:uppercase;letter-spacing:2px">Về chúng tôi</h2>
            <h3>Công ty CP Đầu tư Liên doanh Việt Anh</h3>
            <p>SANFOVET tự hào là đơn vị tiên phong trong lĩnh vực sản xuất và phân phối thuốc thú y trang trại tại Việt Nam. Với công nghệ tiên tiến từ Hoa Kỳ, chúng tôi cam kết mang đến những sản phẩm chất lượng cao nhất.</p>
            <p>Đội ngũ hơn 50 bác sĩ thú y và kỹ thuật viên giàu kinh nghiệm luôn sẵn sàng hỗ trợ kỹ thuật cho bà con chăn nuôi trên toàn quốc.</p>
            <div class="about-stats">
              <div class="stat-item"><span class="number">15+</span><span class="label">Năm kinh nghiệm</span></div>
              <div class="stat-item"><span class="number">200+</span><span class="label">Sản phẩm</span></div>
              <div class="stat-item"><span class="number">50+</span><span class="label">BSTY chuyên gia</span></div>
              <div class="stat-item"><span class="number">63</span><span class="label">Tỉnh thành</span></div>
            </div>
            <div style="margin-top:24px;display:flex;gap:12px">
              <a href="#/gioi-thieu" class="btn-primary">${icon('arrow-right', 16)} Tìm hiểu thêm</a>
              <a href="#/catalogue" class="btn-secondary" style="border-color:var(--primary);color:var(--primary)">${icon('download', 16)} Xem Catalogue</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section section-alt" id="featured-products">
      <div class="container">
        <div class="section-header animate-in">
          <h2>Sản Phẩm Nổi Bật</h2>
          <p>Các sản phẩm thuốc thú y chất lượng cao được tin dùng trên toàn quốc</p>
        </div>
        <div class="product-grid">
          ${featuredProducts.map((p, i) => `
            <article class="product-card animate-in" style="animation-delay:${i * 0.1}s">
              <div class="product-card-image">
                <img src="${p.image}" alt="Thuốc thú y ${p.name} - ${p.tagline}" width="260" height="220" loading="lazy" />
              </div>
              <div class="product-card-body">
                <span class="category-tag">${categories.find(c => c.id === p.categoryId)?.name?.split(' ').slice(0, 3).join(' ') || ''}</span>
                <h3>${p.name}</h3>
                <p style="font-size:.84rem;color:var(--text-light)">${p.tagline}</p>
              </div>
              <a href="#/san-pham/${p.slug}" class="btn-view">${icon('eye', 16)} Xem chi tiết</a>
            </article>
          `).join('')}
        </div>
        <div style="text-align:center;margin-top:36px">
          <a href="#/san-pham" class="btn-primary">${icon('arrow-right', 16)} Xem tất cả sản phẩm</a>
        </div>
      </div>
    </section>

    <!-- Disease & Treatment -->
    <section class="section" id="disease-section">
      <div class="container">
        <div class="section-header animate-in">
          <h2>Bệnh Và Điều Trị Bệnh</h2>
          <p>Kiến thức chuyên sâu về các bệnh thường gặp trên vật nuôi và phác đồ điều trị</p>
        </div>
        <div class="article-grid">
          ${diseaseArticles.map((a, i) => `
            <article class="article-card animate-in" style="animation-delay:${i * 0.1}s">
              <div class="article-card-image">
                <img src="${a.thumbnail}" alt="${a.title}" width="400" height="200" loading="lazy" />
              </div>
              <div class="article-card-body">
                <div class="meta">
                  <span>${icon('calendar', 14)} ${a.publishDate}</span>
                </div>
                <h3><a href="#/bai-viet/${a.slug}">${a.title}</a></h3>
                <p>${a.excerpt}</p>
                <a href="#/bai-viet/${a.slug}" class="read-more">${icon('arrow-right', 14)} Đọc tiếp</a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Latest News -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header animate-in">
          <h2>Tin Nổi Bật</h2>
          <p>Cập nhật tin tức mới nhất từ SANFOVET và ngành chăn nuôi thú y</p>
        </div>
        <div class="article-grid">
          ${latestNews.slice(0, 3).map((a, i) => `
            <article class="article-card animate-in" style="animation-delay:${i * 0.1}s">
              <div class="article-card-image">
                <img src="${a.thumbnail}" alt="${a.title}" width="400" height="200" loading="lazy" />
              </div>
              <div class="article-card-body">
                <div class="meta"><span>${a.publishDate}</span></div>
                <h3><a href="#/bai-viet/${a.slug}">${a.title}</a></h3>
                <p>${a.excerpt}</p>
                <a href="#/bai-viet/${a.slug}" class="read-more">${icon('arrow-right', 14)} Đọc tiếp</a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section section-dark" id="why-us">
      <div class="container">
        <div class="section-header animate-in">
          <h2>Tại Sao Nên Chọn SANFOVET?</h2>
          <p>Chúng tôi cam kết mang đến giải pháp chất lượng nhất cho ngành chăn nuôi</p>
        </div>
        <div class="features-grid">
          ${[
            { ico: 'microscope', title: 'Công nghệ USA', desc: 'Ứng dụng công nghệ tiên tiến từ Hoa Kỳ trong sản xuất thuốc thú y' },
            { ico: 'shield-check', title: 'Tiêu chuẩn GMP', desc: 'Nhà máy đạt tiêu chuẩn GMP-WHO về sản xuất dược phẩm thú y' },
            { ico: 'users', title: 'Chuyên gia hàng đầu', desc: 'Đội ngũ BSTY giàu kinh nghiệm hỗ trợ kỹ thuật 24/7' },
            { ico: 'truck', title: 'Phân phối toàn quốc', desc: 'Mạng lưới phân phối rộng khắp 63 tỉnh thành' },
            { ico: 'gem', title: 'Chất lượng cao', desc: 'Sản phẩm được kiểm nghiệm nghiêm ngặt, đạt tiêu chuẩn quốc tế' },
          ].map((f, i) => `
            <div class="feature-card animate-in" style="animation-delay:${i * 0.1}s">
              <div class="icon">${icon(f.ico, 28)}</div>
              <h3>${f.title}</h3>
              <p>${f.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
