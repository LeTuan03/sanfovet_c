import './styles/main.css';
import { Router } from './utils/router.js';
import { renderTopBar, renderHeader, renderFooter, renderFloatingButtons, renderContactPopup } from './components/layout.js';
import { renderHomePage } from './pages/home.js';
import { renderAboutPage, renderCataloguePage } from './pages/about.js';
import { renderProductsPage, renderProductDetailPage, renderCategoryPage } from './pages/products.js';
import { renderCamNangPage, renderBenhDieuTriPage, renderTinTucPage, renderTinNoiBoPage, renderTinNganhPage, renderArticleDetailPage } from './pages/articles.js';
import { renderTuyenDungPage } from './pages/recruitment.js';
import { renderContactPage } from './pages/contact.js';
import { categories } from './data/data.js';

// Init layout
function initLayout() {
  document.getElementById('top-bar').innerHTML = renderTopBar();
  document.getElementById('site-header').innerHTML = renderHeader();
  document.getElementById('site-footer').innerHTML = renderFooter();
  document.getElementById('floating-buttons').innerHTML = renderFloatingButtons();
  document.getElementById('contact-popup').innerHTML = renderContactPopup();

  // Populate product dropdown
  const dd = document.getElementById('product-dropdown');
  if (dd) {
    dd.innerHTML = categories.map(c =>
      `<li role="none"><a href="#/san-pham/danh-muc/${c.slug}" role="menuitem">${c.icon} ${c.name}</a></li>`
    ).join('');
  }
}

// Render page content
function renderPage(html) {
  const main = document.getElementById('main-content');
  main.innerHTML = html;
  // Trigger animations on scroll
  requestAnimationFrame(() => initScrollAnimations());
}

// Setup router
function initRouter() {
  const router = new Router();

  router
    .on('/', () => renderPage(renderHomePage()))
    .on('/gioi-thieu', () => renderPage(renderAboutPage()))
    .on('/catalogue', () => renderPage(renderCataloguePage()))
    .on('/san-pham', () => renderPage(renderProductsPage()))
    .on('/san-pham/:slug', (p) => renderPage(renderProductDetailPage(p)))
    .on('/san-pham/danh-muc/:slug', (p) => renderPage(renderCategoryPage(p)))
    .on('/cam-nang-chan-nuoi', () => renderPage(renderCamNangPage()))
    .on('/benh-va-dieu-tri', () => renderPage(renderBenhDieuTriPage()))
    .on('/tin-tuc', () => renderPage(renderTinTucPage()))
    .on('/tin-tuc/noi-bo', () => renderPage(renderTinNoiBoPage()))
    .on('/tin-tuc/nganh', () => renderPage(renderTinNganhPage()))
    .on('/bai-viet/:slug', (p) => renderPage(renderArticleDetailPage(p)))
    .on('/tuyen-dung', () => renderPage(renderTuyenDungPage()))
    .on('/lien-he', () => renderPage(renderContactPage()));
}

// Banner slider
function initBannerSlider() {
  let current = 0;
  const run = () => {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    current = (current + 1) % slides.length;
    slides[current]?.classList.add('active');
    dots[current]?.classList.add('active');
  };
  setInterval(run, 5000);

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('banner-dot')) {
      const idx = parseInt(e.target.dataset.index);
      const slides = document.querySelectorAll('.banner-slide');
      const dots = document.querySelectorAll('.banner-dot');
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[idx]?.classList.add('active');
      dots[idx]?.classList.add('active');
      current = idx;
    }
  });
}

// Scroll animations (IntersectionObserver)
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
}

// Back to top
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn?.classList.add('visible');
      btn?.classList.remove('hidden');
    } else {
      btn?.classList.remove('visible');
    }
  });
  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Mobile menu
function initMobileMenu() {
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('#menu-toggle');
    if (toggle) {
      document.getElementById('main-nav')?.classList.toggle('open');
      return;
    }
    // Close menu on link click
    if (e.target.closest('.main-nav a')) {
      document.getElementById('main-nav')?.classList.remove('open');
    }
    // Toggle dropdown on mobile
    if (e.target.closest('.main-nav > li > a') && window.innerWidth <= 768) {
      const li = e.target.closest('li');
      if (li?.querySelector('.dropdown')) {
        e.preventDefault();
        li.classList.toggle('open');
      }
    }
  });
}

// Contact popup
function initContactPopup() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('#open-contact-popup')) {
      const popup = document.getElementById('contact-popup');
      popup?.classList.remove('hidden');
      requestAnimationFrame(() => popup?.classList.add('show'));
    }
    if (e.target.closest('#close-popup') || (e.target.classList.contains('popup-overlay') && !e.target.closest('.popup-box'))) {
      const popup = document.getElementById('contact-popup');
      popup?.classList.remove('show');
      setTimeout(() => popup?.classList.add('hidden'), 300);
    }
  });
}

// Contact form
function initContactForm() {
  document.addEventListener('submit', (e) => {
    if (e.target.id === 'contact-form') {
      e.preventDefault();
      const form = e.target;
      const name = form.querySelector('#contact-name')?.value;
      const phone = form.querySelector('#contact-phone')?.value;
      if (name && phone) {
        alert('✅ Gửi tin nhắn thành công!\n\nCảm ơn bạn đã liên hệ SANFOVET. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
        form.reset();
      }
    }
  });
}

// Language toggle (demo)
function initLanguageToggle() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('lang-btn')) {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const lang = e.target.dataset.lang;
      if (lang === 'en') {
        alert('English version is coming soon!');
        document.querySelector('.lang-btn[data-lang="vi"]')?.classList.add('active');
        e.target.classList.remove('active');
      }
    }
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initLayout();
  initRouter();
  initBannerSlider();
  initHeaderScroll();
  initBackToTop();
  initMobileMenu();
  initContactPopup();
  initContactForm();
  initLanguageToggle();
});
