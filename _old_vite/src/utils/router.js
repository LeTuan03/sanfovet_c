// Simple hash-based SPA router
export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  on(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  navigate(path) {
    window.location.hash = '#' + path;
  }

  getPath() {
    const hash = window.location.hash.slice(1) || '/';
    return hash;
  }

  handleRoute() {
    const path = this.getPath();
    // Try exact match
    if (this.routes[path]) {
      this.currentRoute = path;
      this.routes[path]();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.updateActiveNav(path);
      return;
    }
    // Try pattern match (e.g., /san-pham/:slug)
    for (const [pattern, handler] of Object.entries(this.routes)) {
      const regex = this.pathToRegex(pattern);
      const match = path.match(regex);
      if (match) {
        this.currentRoute = path;
        const params = this.extractParams(pattern, match);
        handler(params);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.updateActiveNav(path);
        return;
      }
    }
    // 404 fallback
    if (this.routes['/']) {
      this.routes['/']();
    }
  }

  pathToRegex(pattern) {
    const regexStr = '^' + pattern.replace(/:[^\s/]+/g, '([\\w-]+)') + '$';
    return new RegExp(regexStr);
  }

  extractParams(pattern, match) {
    const keys = (pattern.match(/:[^\s/]+/g) || []).map(k => k.slice(1));
    const params = {};
    keys.forEach((key, i) => { params[key] = match[i + 1]; });
    return params;
  }

  updateActiveNav(path) {
    document.querySelectorAll('.main-nav > li').forEach(li => {
      li.classList.remove('active');
      const link = li.querySelector('a');
      if (link) {
        const href = link.getAttribute('href') || '';
        const linkPath = href.replace('#', '');
        
        // Exact match
        if (path === linkPath) {
          li.classList.add('active');
        } 
        // Match sub-paths but exclude root '/' from prefix matching
        else if (linkPath !== '/' && path.startsWith(linkPath)) {
          li.classList.add('active');
        }
      }
    });
  }
}

// SEO helper - update meta tags
export function updateSEO({ title, description, canonical, type = 'website', image }) {
  document.title = title ? `${title} | SANFOVET` : 'SANFOVET - Thuốc Thú Y Trang Trại | Technology USA';
  
  const setMeta = (name, content) => {
    let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
    if (el) el.setAttribute('content', content || '');
  };
  
  setMeta('description', description || 'SANFOVET - Chuyên sản xuất và phân phối thuốc thú y trang trại chất lượng cao.');
  setMeta('og:title', title || 'SANFOVET');
  setMeta('og:description', description || '');
  setMeta('og:type', type);
  if (canonical) setMeta('og:url', canonical);
  if (image) setMeta('og:image', image);
  
  const canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl && canonical) canonicalEl.setAttribute('href', canonical);
}

// Breadcrumb helper
export function renderBreadcrumb(items) {
  const listItems = items.map((item, i) => {
    if (i === items.length - 1) {
      return `<span class="current">${item.label}</span>`;
    }
    return `<a href="${item.href}">${item.label}</a><span class="separator">›</span>`;
  }).join('');
  
  // Schema.org BreadcrumbList
  const schemaItems = items.map((item, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": item.label,
    "item": item.href ? `https://sanfovet.com.vn${item.href.replace('#', '')}` : undefined
  }));
  
  return `
    <nav class="breadcrumb" aria-label="Đường dẫn">
      <div class="container">
        <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
          ${listItems}
        </ol>
      </div>
    </nav>
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": schemaItems
    })}</script>
  `;
}
