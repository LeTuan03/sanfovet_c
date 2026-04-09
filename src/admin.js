import { products, articles, jobs } from './data/data.js';

// Elements
const contentArea = document.getElementById('content-area');
const pageTitle = document.getElementById('page-title');
const menuItems = document.querySelectorAll('.menu-item');

// Mocks local storage for persistence across reloads (simple client-side data management)
function initLocalData() {
  if (!localStorage.getItem('admin_products')) {
    localStorage.setItem('admin_products', JSON.stringify(products));
  }
  if (!localStorage.getItem('admin_articles')) {
    localStorage.setItem('admin_articles', JSON.stringify(articles));
  }
  if (!localStorage.getItem('admin_jobs')) {
    localStorage.setItem('admin_jobs', JSON.stringify(jobs));
  }
}

function getLocalData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
}

function saveLocalData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

initLocalData();

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  } else {
    setTimeout(refreshIcons, 100);
  }
}

// Routing via Hash
function navigate() {
  const hash = window.location.hash || '#dashboard';
  const target = hash.replace('#', '');
  
  menuItems.forEach(item => {
    if (item.getAttribute('data-target') === target) {
      item.classList.add('active');
      pageTitle.textContent = item.textContent.trim();
    } else {
      item.classList.remove('active');
    }
  });

  renderContent(target);
  refreshIcons();
}

window.addEventListener('hashchange', navigate);

// Render views
function renderContent(target) {
  switch (target) {
    case 'dashboard':
      contentArea.innerHTML = renderDashboard();
      break;
    case 'products':
      contentArea.innerHTML = renderProducts();
      bindTableEvents('product');
      break;
    case 'articles':
      contentArea.innerHTML = renderArticles();
      bindTableEvents('article');
      break;
    case 'jobs':
      contentArea.innerHTML = renderJobs();
      bindTableEvents('job');
      break;
    default:
      contentArea.innerHTML = renderDashboard();
  }
}

function renderDashboard() {
  const p = getLocalData('admin_products');
  const a = getLocalData('admin_articles');
  const j = getLocalData('admin_jobs');
  
  return `
    <div class="row">
      <div class="col-md-4">
        <div class="card-box text-center">
          <i data-lucide="package" style="color: #1abc9c; width: 48px; height: 48px; margin-bottom: 15px;"></i>
          <h3>${p.length}</h3>
          <p class="text-muted fw-semibold">Sản phẩm</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card-box text-center">
          <i data-lucide="file-text" style="color: #3498db; width: 48px; height: 48px; margin-bottom: 15px;"></i>
          <h3>${a.length}</h3>
          <p class="text-muted fw-semibold">Tin tức & Bài viết</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card-box text-center">
          <i data-lucide="users" style="color: #f39c12; width: 48px; height: 48px; margin-bottom: 15px;"></i>
          <h3>${j.length}</h3>
          <p class="text-muted fw-semibold">Vị trí tuyển dụng</p>
        </div>
      </div>
    </div>
  `;
}

function renderProducts() {
  const localProducts = getLocalData('admin_products');
  return `
    <div class="card-box">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="m-0">Danh sách sản phẩm</h5>
        <button class="btn btn-primary d-flex align-items-center add-btn" data-type="product">
          <i data-lucide="plus" class="me-1" style="width: 18px; height: 18px;"></i> Thêm sản phẩm
        </button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục ID</th>
              <th>Nổi bật</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            ${localProducts.map(p => `
              <tr>
                <td class="text-muted">#${p.id}</td>
                <td><img src="${p.image}" alt="${p.name}" onerror="this.src='/images/logo.png'" style="width:40px; height:40px; object-fit: contain; border: 1px solid #eee; border-radius: 4px;"></td>
                <td class="fw-semibold">${p.name}</td>
                <td>${p.categoryId}</td>
                <td>
                  <span class="badge ${p.featured ? 'bg-success' : 'bg-secondary'}">${p.featured ? 'Có' : 'Không'}</span>
                </td>
                <td>
                  <i data-lucide="edit" class="action-btn me-2" title="Sửa" data-id="${p.id}" data-type="product" style="width: 18px; height: 18px;"></i>
                  <i data-lucide="trash-2" class="action-btn del" title="Xóa" data-id="${p.id}" data-type="product" style="width: 18px; height: 18px;"></i>
                </td>
              </tr>
            `).join('')}
            ${localProducts.length === 0 ? '<tr><td colspan="6" class="text-center text-muted py-4">Không có sản phẩm nào</td></tr>' : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderArticles() {
  const localArticles = getLocalData('admin_articles');
  return `
    <div class="card-box">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="m-0">Danh sách tin tức</h5>
        <button class="btn btn-primary d-flex align-items-center add-btn" data-type="article">
          <i data-lucide="plus" class="me-1" style="width: 18px; height: 18px;"></i> Thêm bài viết
        </button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Tiêu đề</th>
              <th>Danh mục</th>
              <th>Ngày xuất bản</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            ${localArticles.map(a => `
              <tr>
                <td class="text-muted">#${a.id}</td>
                <td class="fw-semibold" style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${a.title}</td>
                <td><span class="badge bg-info text-dark">${a.category}</span></td>
                <td>${a.publishDate}</td>
                <td>
                  <i data-lucide="edit" class="action-btn me-2" title="Sửa" data-id="${a.id}" data-type="article" style="width: 18px; height: 18px;"></i>
                  <i data-lucide="trash-2" class="action-btn del" title="Xóa" data-id="${a.id}" data-type="article" style="width: 18px; height: 18px;"></i>
                </td>
              </tr>
            `).join('')}
            ${localArticles.length === 0 ? '<tr><td colspan="5" class="text-center text-muted py-4">Không có bài viết nào</td></tr>' : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderJobs() {
    const localJobs = getLocalData('admin_jobs');
    return `
    <div class="card-box">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="m-0">Danh sách tuyển dụng</h5>
        <button class="btn btn-primary d-flex align-items-center add-btn" data-type="job">
          <i data-lucide="plus" class="me-1" style="width: 18px; height: 18px;"></i> Thêm vị trí
        </button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Vị trí</th>
              <th>Khu vực</th>
              <th>Ngày đăng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            ${localJobs.map(j => `
              <tr>
                <td class="text-muted">#${j.id}</td>
                <td class="fw-semibold">${j.title}</td>
                <td>${j.location}</td>
                <td>${j.date}</td>
                <td>
                  <i data-lucide="edit" class="action-btn me-2" title="Sửa" data-id="${j.id}" data-type="job" style="width: 18px; height: 18px;"></i>
                  <i data-lucide="trash-2" class="action-btn del" title="Xóa" data-id="${j.id}" data-type="job" style="width: 18px; height: 18px;"></i>
                </td>
              </tr>
            `).join('')}
            ${localJobs.length === 0 ? '<tr><td colspan="5" class="text-center text-muted py-4">Không có bản ghi tuyển dụng nào</td></tr>' : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Handling interactions
function bindTableEvents(type) {
  const addBtn = document.querySelector(`.add-btn[data-type="${type}"]`);
  if (addBtn) {
    addBtn.addEventListener('click', () => openAdminModal(type, null));
  }

  const tableContainer = document.querySelector('.table-responsive');
  if (tableContainer) {
    tableContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.action-btn');
      if (!btn) return;
      
      const btnType = btn.getAttribute('data-type');
      if (btnType !== type) return;

      const id = btn.getAttribute('data-id');
      const isDel = btn.classList.contains('del');
      
      if (isDel) {
        if(confirm('Bạn có chắc chắn muốn xóa mục này?')) {
          const key = 'admin_' + type + 's'; // e.g., admin_products
          const currentList = getLocalData(key);
          const newList = currentList.filter(item => item.id != id);
          saveLocalData(key, newList);
          
          renderContent(type + 's'); // Simple plural mapping for refresh
          refreshIcons();
        }
      } else {
        openAdminModal(type, id);
      }
    });
  }
}

// Admin Modal Logic
function openAdminModal(type, id = null) {
  const modalContent = document.getElementById('adminModalContent');
  const items = getLocalData('admin_' + type + 's');
  const isEdit = id !== null;
  const item = isEdit ? items.find(i => i.id == id) : null;
  
  let bodyHTML = '';
  let title = '';

  if (type === 'product') {
    title = isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới';
    
    // Build initial HTML for arrays
    const ings = item && item.ingredients ? item.ingredients : [];
    let ingHTML = ings.map(ing => `
      <div class="row mb-2 ing-row">
        <div class="col-5"><input type="text" class="form-control form-control-sm" name="ingName" value="${ing.name}" placeholder="Hoạt chất (vd: Iron Dextran)"></div>
        <div class="col-4"><input type="text" class="form-control form-control-sm" name="ingAmount" value="${ing.amount}" placeholder="Hàm lượng (vd: 100)"></div>
        <div class="col-3"><input type="text" class="form-control form-control-sm" name="ingUnit" value="${ing.unit}" placeholder="Đơn vị (vd: mg)"></div>
      </div>
    `).join('');
    
    const animals = item && item.dosage && item.dosage.byAnimal ? item.dosage.byAnimal : [];
    let animalHTML = animals.map(ba => `
      <div class="row mb-2 animal-row">
        <div class="col-6"><input type="text" class="form-control form-control-sm" name="baAnimal" value="${ba.animal}" placeholder="Đối tượng (vd: Heo con)"></div>
        <div class="col-6"><input type="text" class="form-control form-control-sm" name="baDose" value="${ba.dose}" placeholder="Liều lượng (vd: 1-2 ml/con)"></div>
      </div>
    `).join('');

    bodyHTML = `
      <form id="adminForm">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Tên sản phẩm <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="name" value="${item ? (item.name || '') : ''}" required>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Slug <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="slug" value="${item ? (item.slug || '') : ''}" required>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Danh mục ID <span class="text-danger">*</span></label>
            <input type="number" class="form-control" name="categoryId" value="${item ? (item.categoryId || '') : ''}" required>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Hình ảnh (URL)</label>
            <input type="text" class="form-control" name="image" value="${item ? (item.image || '') : ''}">
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Khẩu hiệu (Tagline)</label>
          <input type="text" class="form-control" name="tagline" value="${item ? (item.tagline || '') : ''}">
        </div>
        
        <!-- THÀNH PHẦN -->
        <div class="card mb-3 border-light shadow-sm">
          <div class="card-header bg-light fw-bold py-2"><i data-lucide="beaker" class="me-1" style="width:16px;height:16px;"></i> Thành phần</div>
          <div class="card-body py-2 px-3" id="ingContainer">
            ${ingHTML}
            <button type="button" class="btn btn-sm btn-outline-secondary mt-1" id="addIngBtn">+ Thêm hoạt chất</button>
          </div>
        </div>

        <!-- ĐẶC TÍNH & CHỈ ĐỊNH -->
        <div class="mb-3">
          <label class="form-label fw-bold"><i data-lucide="flask-conical" class="me-1" style="width:16px;height:16px;"></i> Đặc tính</label>
          <textarea class="form-control" name="characteristics" rows="2">${item ? (item.characteristics || '') : ''}</textarea>
        </div>
        <div class="mb-3">
          <label class="form-label fw-bold"><i data-lucide="stethoscope" class="me-1" style="width:16px;height:16px;"></i> Chỉ định (Đặc trị)</label>
          <textarea class="form-control" name="indications" rows="2">${item ? (item.indications || '') : ''}</textarea>
        </div>

        <!-- CÁCH DÙNG & LIỀU LƯỢNG -->
        <div class="card mb-3 border-light shadow-sm">
          <div class="card-header bg-light fw-bold py-2"><i data-lucide="syringe" class="me-1" style="width:16px;height:16px;"></i> Cách dùng & Liều lượng</div>
          <div class="card-body py-2 px-3">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label opacity-75 small mb-1">Đường dùng</label>
                <input type="text" class="form-control form-control-sm" name="dsgRoute" value="${item && item.dosage ? (item.dosage.route || '') : ''}" placeholder="vd: Tiêm bắp sâu">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label opacity-75 small mb-1">Liệu trình</label>
                <input type="text" class="form-control form-control-sm" name="dsgDuration" value="${item && item.dosage ? (item.dosage.duration || '') : ''}" placeholder="vd: 1 liều duy nhất">
              </div>
            </div>
            <div id="animalContainer">
              <label class="form-label opacity-75 small mb-1">Liều lượng theo đối tượng</label>
              ${animalHTML}
            </div>
            <button type="button" class="btn btn-sm btn-outline-secondary mt-1" id="addAnimalBtn">+ Thêm đối tượng</button>
          </div>
        </div>

        <!-- THÔNG TIN KHÁC -->
        <div class="card mb-3 border-light shadow-sm">
          <div class="card-header bg-light fw-bold py-2"><i data-lucide="info" class="me-1" style="width:16px;height:16px;"></i> Thông tin khác</div>
          <div class="card-body py-2 px-3">
            <div class="row">
              <div class="col-md-6 mb-2">
                <label class="form-label opacity-75 small mb-1">Dạng bào chế</label>
                <input type="text" class="form-control form-control-sm" name="formulation" value="${item ? (item.formulation || '') : ''}">
              </div>
              <div class="col-md-6 mb-2">
                <label class="form-label opacity-75 small mb-1">Thời gian ngưng thuốc</label>
                <input type="text" class="form-control form-control-sm" name="withdrawalPeriod" value="${item ? (item.withdrawalPeriod || '') : ''}">
              </div>
              <div class="col-md-6 mb-2">
                <label class="form-label opacity-75 small mb-1">Bảo quản</label>
                <input type="text" class="form-control form-control-sm" name="storage" value="${item ? (item.storage || '') : ''}">
              </div>
              <div class="col-md-6 mb-2">
                <label class="form-label opacity-75 small mb-1">Thể tích</label>
                <input type="text" class="form-control form-control-sm" name="volume" value="${item ? (item.volume || '') : ''}">
              </div>
              <div class="col-md-6 mb-2">
                <label class="form-label opacity-75 small mb-1">Số đăng ký</label>
                <input type="text" class="form-control form-control-sm" name="registrationNo" value="${item ? (item.registrationNo || '') : ''}">
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-check mb-2">
          <input class="form-check-input" type="checkbox" name="featured" id="featuredCheck" ${item && item.featured ? 'checked' : ''}>
          <label class="form-check-label" for="featuredCheck">
            Sản phẩm nổi bật (Hiển thị ngoài trang chủ)
          </label>
        </div>
      </form>
    `;
  } else if (type === 'article') {
    title = isEdit ? 'Sửa bài viết' : 'Thêm bài viết mới';
    bodyHTML = `
      <form id="adminForm">
        <div class="mb-3">
          <label class="form-label">Tiêu đề <span class="text-danger">*</span></label>
          <input type="text" class="form-control" name="title" value="${item ? (item.title || '') : ''}" required>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Slug <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="slug" value="${item ? (item.slug || '') : ''}" required>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Danh mục <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="category" value="${item ? (item.category || '') : ''}" required>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Ngày xuất bản <span class="text-danger">*</span></label>
            <input type="date" class="form-control" name="publishDate" value="${item ? (item.publishDate || '') : ''}" required>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Ảnh thu nhỏ (URL)</label>
            <input type="text" class="form-control" name="thumbnail" value="${item ? (item.thumbnail || '') : ''}">
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Tóm tắt (Excerpt)</label>
          <textarea class="form-control" name="excerpt" rows="2">${item ? (item.excerpt || '') : ''}</textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Nội dung (HTML)</label>
          <textarea class="form-control" name="content" rows="6">${item ? (item.content || '') : ''}</textarea>
        </div>
      </form>
    `;
  } else if (type === 'job') {
    title = isEdit ? 'Sửa tuyển dụng' : 'Thêm vị trí mới';
    bodyHTML = `
      <form id="adminForm">
        <div class="mb-3">
          <label class="form-label">Vị trí tuyển dụng <span class="text-danger">*</span></label>
          <input type="text" class="form-control" name="title" value="${item ? (item.title || '') : ''}" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Slug <span class="text-danger">*</span></label>
          <input type="text" class="form-control" name="slug" value="${item ? (item.slug || '') : ''}" required>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Khu vực <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="location" value="${item ? (item.location || '') : ''}" required>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Ngày đăng <span class="text-danger">*</span></label>
            <input type="date" class="form-control" name="date" value="${item ? (item.date || '') : ''}" required>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Mô tả công việc</label>
          <textarea class="form-control" name="description" rows="4">${item ? (item.description || '') : ''}</textarea>
        </div>
      </form>
    `;
  }

  modalContent.innerHTML = `
    <div class="modal-header">
      <h5 class="modal-title">${title}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body" style="max-height: 75vh; overflow-y: auto;">
      ${bodyHTML}
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
      <button type="button" class="btn btn-primary" id="saveAdminBtn">Lưu thay đổi</button>
    </div>
  `;

  // Get or Create generic modal instance
  const adminModalEl = document.getElementById('adminModal');
  const modal = bootstrap.Modal.getOrCreateInstance(adminModalEl);
  // Optional: re-init missing lucide icons inside modal
  setTimeout(() => { if(window.lucide) window.lucide.createIcons(); }, 50);

  // Setup dynamic array row event listeners
  if (type === 'product') {
    document.getElementById('addIngBtn')?.addEventListener('click', () => {
      const btn = document.getElementById('addIngBtn');
      const div = document.createElement('div');
      div.className = 'row mb-2 ing-row';
      div.innerHTML = `
        <div class="col-5"><input type="text" class="form-control form-control-sm" name="ingName" placeholder="Hoạt chất"></div>
        <div class="col-4"><input type="text" class="form-control form-control-sm" name="ingAmount" placeholder="Hàm lượng"></div>
        <div class="col-3"><input type="text" class="form-control form-control-sm" name="ingUnit" placeholder="Đơn vị"></div>
      `;
      btn.parentNode.insertBefore(div, btn);
    });

    document.getElementById('addAnimalBtn')?.addEventListener('click', () => {
      const container = document.getElementById('animalContainer');
      const div = document.createElement('div');
      div.className = 'row mb-2 animal-row';
      div.innerHTML = `
        <div class="col-6"><input type="text" class="form-control form-control-sm" name="baAnimal" placeholder="Đối tượng"></div>
        <div class="col-6"><input type="text" class="form-control form-control-sm" name="baDose" placeholder="Liều lượng"></div>
      `;
      container.appendChild(div);
    });
  }

  modal.show();

  document.getElementById('saveAdminBtn').addEventListener('click', () => {
    const form = document.getElementById('adminForm');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (type === 'product') {
      data.featured = formData.has('featured');
      
      // Parse complex arrays
      const ingredients = [];
      document.querySelectorAll('.ing-row').forEach(row => {
        const name = row.querySelector('[name="ingName"]').value.trim();
        const amount = row.querySelector('[name="ingAmount"]').value.trim();
        const unit = row.querySelector('[name="ingUnit"]').value.trim();
        if(name) ingredients.push({ name, amount, unit });
      });
      data.ingredients = ingredients;

      const byAnimal = [];
      document.querySelectorAll('.animal-row').forEach(row => {
        const animal = row.querySelector('[name="baAnimal"]').value.trim();
        const dose = row.querySelector('[name="baDose"]').value.trim();
        if(animal) byAnimal.push({ animal, dose });
      });
      data.dosage = {
        route: data.dsgRoute || '',
        duration: data.dsgDuration || '',
        byAnimal
      };
      
      // Remove temporary flat fields to avoid polluting schema
      delete data.ingName; delete data.ingAmount; delete data.ingUnit;
      delete data.baAnimal; delete data.baDose; delete data.dsgRoute; delete data.dsgDuration;
    }

    let itemsList = getLocalData('admin_' + type + 's');
    if (isEdit) {
      // update
      itemsList = itemsList.map(i => {
        if (i.id == id) {
          return { ...i, ...data };
        }
        return i;
      });
    } else {
      // add
      const newId = itemsList.length > 0 ? Math.max(...itemsList.map(i => i.id)) + 1 : 1;
      data.id = newId;
      if (type === 'product' && !data.image) data.image = '/images/logo.png';
      // Add the newly created record to the beginning of the list
      itemsList.unshift(data);
    }

    saveLocalData('admin_' + type + 's', itemsList);
    modal.hide();
    
    // Slight delay to allow modal to close smoothly before render
    setTimeout(() => {
      renderContent(type + 's');
      refreshIcons();
    }, 150);
  });
}

// Initial boot
document.addEventListener('DOMContentLoaded', navigate);

