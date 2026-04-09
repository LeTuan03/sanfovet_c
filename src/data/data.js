import { icon } from '../utils/icons.js';

// Product categories
export const categories = [
  { id: 1, name: 'Thuốc bổ trợ tiêm dạng dung dịch, hỗn dịch', slug: 'thuoc-bo-tro-tiem-dang-dung-dich-hon-dich', icon: icon('syringe', 28) },
  { id: 2, name: 'Thuốc kháng sinh tiêm dạng dung dịch, hỗn dịch', slug: 'thuoc-khang-sinh-tiem-dang-dung-dich-hon-dich', icon: icon('flask-conical', 28) },
  { id: 3, name: 'Thuốc kháng sinh dạng dung dịch uống, dạng xịt', slug: 'thuoc-khang-sinh-dang-dung-dich-uong-dang-xit', icon: icon('spray-can', 28) },
  { id: 4, name: 'Thuốc kháng sinh dạng Premix siêu bám dính', slug: 'thuoc-khang-sinh-dang-premix-sieu-bam-dinh', icon: icon('test-tube', 28) },
  { id: 5, name: 'Thuốc kháng sinh dạng bột, dạng hạt hòa tan', slug: 'thuoc-khang-sinh-dang-bot-dang-hat-hoa-tan', icon: icon('microscope', 28) },
  { id: 6, name: 'Thuốc bổ trợ dạng cốm, dạng bột hòa tan', slug: 'thuoc-bo-tro-dang-com-dang-bot-hoa-tan', icon: icon('pill', 28) },
  { id: 7, name: 'Thuốc bổ trợ dạng dung dịch', slug: 'thuoc-bo-tro-dang-dung-dich', icon: icon('droplets', 28) },
  { id: 8, name: 'Thuốc trị cầu trùng, kí sinh trùng', slug: 'thuoc-tri-cau-trung-ki-sinh-trung-dang-bot-dang-dung-dich', icon: icon('bug', 28) },
  { id: 9, name: 'Thuốc sát trùng, diệt côn trùng', slug: 'thuoc-sat-trung-diet-con-trung', icon: icon('shield-check', 28) },
  { id: 10, name: 'Thuốc trị nấm, trị giun sán', slug: 'thuoc-tri-nam-tri-giun-san', icon: icon('leaf', 28) },
];

// Sample products
export const products = [
  {
    id: 1, slug: 'thuoc-thu-y-hemopro', name: 'HEMOPRO', categoryId: 1,
    tagline: 'Bổ sung sắt, đồng, vitamin B12 cho gia súc, gia cầm',
    image: '/images/product1.png', featured: true,
    ingredients: [
      { name: 'Iron Dextran', amount: '100', unit: 'mg' },
      { name: 'Copper Gluconate', amount: '5', unit: 'mg' },
      { name: 'Vitamin B12', amount: '150', unit: 'μg' },
    ],
    characteristics: 'HEMOPRO là dung dịch tiêm bổ sung sắt thế hệ mới, giúp phòng và trị bệnh thiếu máu do thiếu sắt ở heo con, bê, nghé. Sắt dạng Dextran có sinh khả dụng cao, được hấp thu nhanh và an toàn.',
    indications: 'Phòng và trị bệnh thiếu máu do thiếu sắt ở heo con, bê, nghé. Kích thích tăng trưởng, tăng sức đề kháng. Bổ sung sắt cho heo nái mang thai và cho con bú.',
    dosage: { route: 'Tiêm bắp sâu', duration: '1 liều duy nhất', byAnimal: [
      { animal: 'Heo con (3-5 ngày tuổi)', dose: '1-2 ml/con' },
      { animal: 'Heo nái', dose: '5-10 ml/con' },
      { animal: 'Bê, nghé', dose: '4-8 ml/con' },
    ]},
    formulation: 'Dung dịch tiêm', withdrawalPeriod: '28 ngày',
    storage: 'Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Nhiệt độ 15-25°C',
    volume: '100 ml', registrationNo: 'VN-2024-0156',
  },
  {
    id: 2, slug: 'thuoc-thu-y-amox-inject', name: 'AMOX-INJECT', categoryId: 2,
    tagline: 'Kháng sinh Amoxicillin tiêm hiệu lực mạnh',
    image: '/images/product2.png', featured: true,
    ingredients: [
      { name: 'Amoxicillin trihydrate', amount: '150', unit: 'mg' },
    ],
    characteristics: 'AMOX-INJECT chứa Amoxicillin dạng trihydrate, kháng sinh nhóm β-lactam phổ rộng, tác dụng diệt khuẩn nhanh trên cả vi khuẩn Gram (+) và Gram (-).',
    indications: 'Điều trị viêm phổi, viêm ruột, viêm tử cung, viêm vú, nhiễm trùng đường tiết niệu ở gia súc.',
    dosage: { route: 'Tiêm bắp', duration: '3-5 ngày', byAnimal: [
      { animal: 'Heo', dose: '1ml/10kg TT' },
      { animal: 'Trâu, bò', dose: '1ml/10kg TT' },
    ]},
    formulation: 'Hỗn dịch tiêm', withdrawalPeriod: '15 ngày',
    storage: 'Nơi khô ráo, thoáng mát. Nhiệt độ 15-25°C',
    volume: '100 ml', registrationNo: 'VN-2024-0203',
  },
  {
    id: 3, slug: 'thuoc-thu-y-electrolyte-c', name: 'ELECTROLYTE-C', categoryId: 6,
    tagline: 'Bổ sung điện giải, Vitamin C, chống stress',
    image: '/images/product3.png', featured: true,
    ingredients: [
      { name: 'Vitamin C', amount: '5000', unit: 'mg' },
      { name: 'Sodium Chloride', amount: '2000', unit: 'mg' },
      { name: 'Potassium Chloride', amount: '1000', unit: 'mg' },
      { name: 'Glucose', amount: '50000', unit: 'mg' },
    ],
    characteristics: 'ELECTROLYTE-C cung cấp điện giải và vitamin C, giúp phục hồi nhanh chóng cân bằng nước và điện giải trong cơ thể vật nuôi.',
    indications: 'Phòng chống stress do vận chuyển, thời tiết thay đổi. Bổ sung điện giải khi tiêu chảy, mất nước. Tăng sức đề kháng.',
    dosage: { route: 'Pha nước uống', duration: '3-5 ngày liên tục', byAnimal: [
      { animal: 'Gà, vịt', dose: '1g/lít nước uống' },
      { animal: 'Heo', dose: '2g/lít nước uống' },
    ]},
    formulation: 'Bột hòa tan', withdrawalPeriod: 'Không',
    storage: 'Nơi khô ráo, thoáng mát', volume: '1 kg', registrationNo: 'VN-2024-0089',
  },
  {
    id: 4, slug: 'thuoc-thu-y-tylosin-50', name: 'TYLOSIN-50', categoryId: 3,
    tagline: 'Kháng sinh Tylosin dạng dung dịch uống',
    image: '/images/product1.png', featured: true,
    ingredients: [{ name: 'Tylosin tartrate', amount: '50', unit: 'mg' }],
    characteristics: 'TYLOSIN-50 chứa Tylosin tartrate, kháng sinh nhóm Macrolide có tác dụng kìm khuẩn mạnh trên vi khuẩn Gram (+) và Mycoplasma.',
    indications: 'Điều trị CRD, viêm phổi do Mycoplasma, viêm ruột hoại tử ở gia cầm.',
    dosage: { route: 'Pha nước uống', duration: '3-5 ngày', byAnimal: [
      { animal: 'Gà, vịt', dose: '1ml/lít nước' },
    ]},
    formulation: 'Dung dịch uống', withdrawalPeriod: '5 ngày',
    storage: 'Nơi khô ráo, thoáng mát', volume: '1 lít', registrationNo: 'VN-2024-0112',
  },
  {
    id: 5, slug: 'thuoc-thu-y-flor-premix', name: 'FLOR-PREMIX', categoryId: 4,
    tagline: 'Kháng sinh Florfenicol dạng premix siêu bám dính',
    image: '/images/product2.png', featured: true,
    ingredients: [{ name: 'Florfenicol', amount: '40', unit: 'g/kg' }],
    characteristics: 'FLOR-PREMIX sử dụng công nghệ siêu bám dính, giúp thuốc phân bố đều trong thức ăn, tăng hiệu quả điều trị.',
    indications: 'Điều trị viêm phổi, các bệnh đường hô hấp do vi khuẩn nhạy cảm với Florfenicol.',
    dosage: { route: 'Trộn thức ăn', duration: '5-7 ngày', byAnimal: [
      { animal: 'Heo', dose: '2-4 kg/tấn thức ăn' },
    ]},
    formulation: 'Premix', withdrawalPeriod: '20 ngày',
    storage: 'Nơi khô ráo, thoáng mát', volume: '25 kg', registrationNo: 'VN-2024-0178',
  },
  {
    id: 6, slug: 'thuoc-thu-y-colistin-powder', name: 'COLISTIN POWDER', categoryId: 5,
    tagline: 'Kháng sinh Colistin dạng bột hòa tan',
    image: '/images/product3.png', featured: true,
    ingredients: [{ name: 'Colistin sulfate', amount: '10,000,000', unit: 'IU' }],
    characteristics: 'COLISTIN POWDER chứa Colistin sulfate, kháng sinh nhóm Polypeptide, tác dụng diệt khuẩn mạnh trên vi khuẩn Gram (-).',
    indications: 'Điều trị tiêu chảy do E.coli, Salmonella. Viêm ruột, viêm phổi ở gia súc, gia cầm.',
    dosage: { route: 'Pha nước uống / trộn thức ăn', duration: '3-5 ngày', byAnimal: [
      { animal: 'Gà, vịt', dose: '0.5g/lít nước' },
      { animal: 'Heo', dose: '1g/lít nước' },
    ]},
    formulation: 'Bột hòa tan', withdrawalPeriod: '7 ngày',
    storage: 'Nơi khô ráo, thoáng mát', volume: '100 g', registrationNo: 'VN-2024-0095',
  },
  {
    id: 7, slug: 'thuoc-thu-y-liver-tonic', name: 'LIVER TONIC', categoryId: 7,
    tagline: 'Bổ gan thận, giải độc, tăng cường chức năng gan',
    image: '/images/product1.png', featured: true,
    ingredients: [
      { name: 'Sorbitol', amount: '250', unit: 'mg/ml' },
      { name: 'DL-Methionine', amount: '20', unit: 'mg/ml' },
      { name: 'Choline Chloride', amount: '10', unit: 'mg/ml' },
    ],
    characteristics: 'LIVER TONIC là dung dịch uống bổ gan thận, giúp tăng cường chức năng gan, thải độc kim loại nặng và mycotoxin.',
    indications: 'Bổ gan, giải độc gan cho gia súc, gia cầm. Hỗ trợ phục hồi sau bệnh, sau dùng kháng sinh kéo dài.',
    dosage: { route: 'Pha nước uống', duration: '5-7 ngày', byAnimal: [
      { animal: 'Gia cầm', dose: '1ml/lít nước' },
      { animal: 'Heo', dose: '2ml/lít nước' },
    ]},
    formulation: 'Dung dịch uống', withdrawalPeriod: 'Không',
    storage: 'Nơi khô ráo, thoáng mát', volume: '1 lít', registrationNo: 'VN-2024-0201',
  },
];

// Articles / Blog Posts
export const articles = [
  {
    id: 1, slug: 'benh-glasser-o-lon', title: 'Bệnh Glasser ở lợn - Nguyên nhân, triệu chứng và cách điều trị hiệu quả',
    category: 'benh-dieu-tri', publishDate: '2026-03-15', thumbnail: '/images/farm.png',
    excerpt: 'Bệnh Glasser do vi khuẩn Haemophilus parasuis gây ra, là một trong những bệnh nguy hiểm nhất ở heo con. Tìm hiểu triệu chứng, chẩn đoán và phác đồ điều trị hiệu quả.',
    content: `<h2>1. Nguyên nhân gây bệnh Glasser</h2><p>Bệnh Glasser do vi khuẩn <strong>Haemophilus parasuis</strong> gây ra. Đây là vi khuẩn Gram (-), có nhiều serotype khác nhau (từ 1-15). Vi khuẩn thường xâm nhập qua đường hô hấp khi heo con bị stress.</p><h2>2. Triệu chứng lâm sàng</h2><p>Heo bệnh thường có các biểu hiện:</p><ul><li>Sốt cao 40.5-42°C</li><li>Bỏ ăn, ủ rũ</li><li>Khó thở, ho</li><li>Sưng khớp, đi lại khó khăn</li><li>Viêm phúc mạc, viêm màng não</li></ul><h2>3. Phác đồ điều trị</h2><p>Sử dụng kháng sinh phổ rộng kết hợp thuốc bổ trợ. Khuyến nghị sử dụng sản phẩm AMOX-INJECT của Sanfovet kết hợp với ELECTROLYTE-C để tăng sức đề kháng.</p>`,
  },
  {
    id: 2, slug: 'benh-adeno-tren-vit', title: 'Bệnh Adeno trên vịt - Phòng và điều trị bệnh do virus Adenovirus',
    category: 'benh-dieu-tri', publishDate: '2026-03-10', thumbnail: '/images/about.png',
    excerpt: 'Bệnh Adeno trên vịt gây thiệt hại nghiêm trọng cho ngành chăn nuôi thủy cầm. Bài viết phân tích nguyên nhân, triệu chứng và phương pháp phòng trị hiệu quả.',
    content: `<h2>1. Đặc điểm bệnh Adeno trên vịt</h2><p>Bệnh do Fowl Adenovirus (FAdV) gây ra, chủ yếu ảnh hưởng đến vịt con 2-5 tuần tuổi. Bệnh lây lan nhanh qua đường tiêu hóa và hô hấp.</p><h2>2. Triệu chứng</h2><ul><li>Gan sưng to, xuất huyết</li><li>Vịt chết đột ngột, tỷ lệ chết cao</li><li>Tiêu chảy phân xanh, phân trắng</li></ul><h2>3. Phương pháp phòng trị</h2><p>Hiện chưa có thuốc đặc trị virus. Điều trị triệu chứng bằng kháng sinh phòng bội nhiễm kết hợp bổ sung điện giải và vitamin.</p>`,
  },
  {
    id: 3, slug: 'huong-dan-nuoi-vit-sieu-thit', title: 'Hướng dẫn kỹ thuật nuôi vịt siêu thịt đạt hiệu quả cao',
    category: 'cam-nang', publishDate: '2026-02-28', thumbnail: '/images/farm.png',
    excerpt: 'Tổng hợp kỹ thuật nuôi vịt siêu thịt từ A-Z: chọn giống, chuồng trại, dinh dưỡng, phòng bệnh giúp đạt năng suất tối đa.',
    content: `<h2>1. Chọn giống vịt siêu thịt</h2><p>Chọn những giống vịt có tốc độ tăng trưởng nhanh như Super Meat, Cherry Valley. Vịt con khỏe mạnh, lông khô, mắt sáng.</p><h2>2. Thiết kế chuồng trại</h2><p>Chuồng nuôi phải đảm bảo thoáng mát mùa hè, ấm áp mùa đông. Mật độ nuôi 5-6 con/m².</p><h2>3. Chế độ dinh dưỡng</h2><p>Sử dụng thức ăn công nghiệp kết hợp bổ sung vitamin và khoáng chất.</p>`,
  },
  {
    id: 4, slug: 'benh-lo-mom-long-mong', title: 'Bệnh Lở mồm long móng (LMLM) - Bệnh truyền nhiễm cấp tính nguy hiểm',
    category: 'benh-dieu-tri', publishDate: '2026-02-20', thumbnail: '/images/about.png',
    excerpt: 'Bệnh LMLM là bệnh truyền nhiễm cấp tính nguy hiểm, gây thiệt hại lớn cho ngành chăn nuôi gia súc. Tìm hiểu cách phòng và điều trị hiệu quả.',
    content: `<h2>1. Tổng quan bệnh LMLM</h2><p>Bệnh Lở mồm long móng do virus Aphtae epizooticae gây ra, thuộc họ Picornaviridae. Bệnh lây lan rất nhanh qua đường hô hấp, tiếp xúc trực tiếp.</p><h2>2. Triệu chứng</h2><ul><li>Sốt cao 40-41°C</li><li>Mụn nước ở miệng, lưỡi, chân</li><li>Chảy dãi nhiều, bỏ ăn</li><li>Đi lại khập khiễng</li></ul>`,
  },
  {
    id: 5, slug: 'ky-thuat-phong-benh-cho-ga', title: 'Kỹ thuật phòng bệnh tổng hợp cho gà nuôi công nghiệp',
    category: 'cam-nang', publishDate: '2026-02-15', thumbnail: '/images/farm.png',
    excerpt: 'Hướng dẫn chi tiết về lịch vaccine, vệ sinh chuồng trại, dinh dưỡng và sử dụng thuốc phòng bệnh cho gà công nghiệp.',
    content: `<h2>1. Lịch tiêm vaccine</h2><p>Tuân thủ lịch vaccine đầy đủ theo khuyến cáo của cơ quan thú y địa phương.</p><h2>2. Vệ sinh chuồng trại</h2><p>Sử dụng thuốc sát trùng SANFO-CLEAN của Sanfovet để vệ sinh chuồng trại định kỳ 2 tuần/lần.</p>`,
  },
  {
    id: 6, slug: 'tin-hoi-thao-chan-nuoi-2026', title: 'Sanfovet tham dự Hội thảo Chăn nuôi Quốc tế 2026 tại Hà Nội',
    category: 'tin-noi-bo', publishDate: '2026-03-20', thumbnail: '/images/about.png',
    excerpt: 'Công ty SANFOVET vinh dự tham dự Hội thảo Chăn nuôi Quốc tế 2026 tại Trung tâm Hội nghị Quốc gia với nhiều sản phẩm mới.',
    content: `<h2>Sự kiện nổi bật</h2><p>Ngày 18-20/03/2026, SANFOVET đã tham dự Hội thảo Chăn nuôi Quốc tế tại Hà Nội, giới thiệu dòng sản phẩm kháng sinh thế hệ mới.</p>`,
  },
  {
    id: 7, slug: 'xu-huong-chan-nuoi-2026', title: 'Xu hướng chăn nuôi 2026: Công nghệ và phát triển bền vững',
    category: 'tin-nganh', publishDate: '2026-03-05', thumbnail: '/images/farm.png',
    excerpt: 'Phân tích xu hướng chăn nuôi năm 2026 với trọng tâm là ứng dụng công nghệ, an toàn sinh học và phát triển bền vững.',
    content: `<h2>Công nghệ trong chăn nuôi</h2><p>Năm 2026 đánh dấu bước tiến quan trọng trong ứng dụng AI và IoT vào quản lý trang trại.</p>`,
  },
];

// Job listings
export const jobs = [
  { id: 1, slug: 'nvkd-ninh-binh-thanh-hoa', title: 'Nhân viên Kinh doanh - Khu vực Ninh Bình, Thanh Hoá', location: 'Ninh Bình, Thanh Hoá', date: '2026-03-25', description: 'Tìm kiếm NVKD năng động tại khu vực Ninh Bình, Thanh Hoá. Yêu cầu: Tốt nghiệp Đại học/Cao đẳng ngành Thú y hoặc Chăn nuôi. Có kinh nghiệm ưu tiên.' },
  { id: 2, slug: 'nvkd-quang-binh-hue', title: 'Nhân viên Kinh doanh - Khu vực Quảng Bình, Quảng Trị, Huế', location: 'Quảng Bình, Quảng Trị, Huế', date: '2026-03-20', description: 'Tuyển NVKD khu vực miền Trung. Mức lương hấp dẫn + thưởng doanh số.' },
  { id: 3, slug: 'nvkd-lao-cai-yen-bai', title: 'Nhân viên Kinh doanh - Khu vực Lào Cai, Yên Bái, Sơn La', location: 'Lào Cai, Yên Bái, Sơn La, Hà Giang', date: '2026-03-15', description: 'Mở rộng thị trường khu vực Tây Bắc. Yêu cầu có phương tiện di chuyển.' },
];
