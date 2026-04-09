import { jobs } from '../data/data.js';
import { updateSEO, renderBreadcrumb } from '../utils/router.js';
import { icon } from '../utils/icons.js';

export function renderTuyenDungPage() {
  updateSEO({ title: 'Tuyển dụng', description: 'Tuyển dụng nhân sự SANFOVET. Các vị trí Nhân viên kinh doanh thuốc thú y tại nhiều tỉnh thành.' });

  return `
    <div class="page-hero"><div class="container"><h1>Tuyển Dụng</h1><p>Gia nhập đội ngũ SANFOVET – Cùng phát triển sự nghiệp trong ngành thú y</p></div></div>
    ${renderBreadcrumb([{label:'Trang chủ',href:'#/'},{label:'Tuyển dụng'}])}
    <section class="section"><div class="container">
      <div class="job-list vertical">
        ${jobs.map((j, i) => `
          <article class="job-card animate-in" style="animation-delay:${i * 0.1}s">
            <div class="job-card-body">
              <div class="job-info">
                <h3>${j.title}</h3>
                <div style="display:flex;gap:15px;margin-bottom:8px">
                  <div class="location">${icon('map-pin', 16)} ${j.location}</div>
                  <div class="date">${icon('calendar', 14)} ${j.date}</div>
                </div>
                <p style="color:var(--text-light);font-size:.9rem;line-height:1.5">${j.description}</p>
              </div>
              <div class="job-actions">
                <a href="mailto:pkd.sanfovet@gmail.com?subject=Ứng tuyển: ${encodeURIComponent(j.title)}" class="btn-primary" style="font-size:.85rem;padding:10px 20px">${icon('mail', 16)} Ứng tuyển</a>
                <a href="tel:0974999204" class="btn-secondary" style="border-color:var(--primary);color:var(--primary);font-size:.85rem;padding:10px 20px">${icon('phone', 16)} Liên hệ</a>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </div></section>
  `;
}
