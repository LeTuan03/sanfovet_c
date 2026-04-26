
// Product categories
export const categories = [
  { id: 1, name: 'Thuốc bổ trợ tiêm dạng dung dịch, hỗn dịch', slug: 'thuoc-bo-tro-tiem-dang-dung-dich-hon-dich' },
  { id: 2, name: 'Thuốc kháng sinh tiêm dạng dung dịch, hỗn dịch', slug: 'thuoc-khang-sinh-tiem-dang-dung-dich-hon-dich' },
  { id: 3, name: 'Thuốc kháng sinh dạng dung dịch uống, dạng xịt', slug: 'thuoc-khang-sinh-dang-dung-dich-uong-dang-xit' },
  { id: 4, name: 'Thuốc kháng sinh dạng Premix siêu bám dính', slug: 'thuoc-khang-sinh-dang-premix-sieu-bam-dinh' },
  { id: 5, name: 'Thuốc kháng sinh dạng bột, dạng hạt hòa tan', slug: 'thuoc-khang-sinh-dang-bot-dang-hat-hoa-tan' },
  { id: 6, name: 'Thuốc bổ trợ dạng cốm, dạng bột hòa tan', slug: 'thuoc-bo-tro-dang-com-dang-bot-hoa-tan' },
  { id: 7, name: 'Thuốc bổ trợ dạng dung dịch', slug: 'thuoc-bo-tro-dang-dung-dich' },
  { id: 8, name: 'Thuốc trị cầu trùng, kí sinh trùng', slug: 'thuoc-tri-cau-trung-ki-sinh-trung-dang-bot-dang-dung-dich' },
  { id: 9, name: 'Thuốc sát trùng, diệt côn trùng', slug: 'thuoc-sat-trung-diet-con-trung' },
  { id: 10, name: 'Thuốc trị nấm, trị giun sán', slug: 'thuoc-tri-nam-tri-giun-san' },
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
    characteristics: 'AMOX-INJECT chứa Amoxicillin dạng trihydrate, kháng sinh nhóm β-lactam phổ rộng, tác dụng diệt khuẩn nhanh trên cả vi khuẩn Gram (+) và vi khuẩn Gram (-).',
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
    characteristics: 'FLOR-PREMIX sử dụng công nghệ siêu bám dính, giúp thuốc phân bổ đều trong thức ăn, tăng hiệu quả điều trị.',
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
    category: 'benh-dieu-tri', animalTag: 'heo-cam-nang-chan-nuoi', publishDate: '15/03/2026', thumbnail: '/images/news-1.png',
    excerpt: 'Bệnh Glasser do vi khuẩn Haemophilus parasuis gây ra, là một trong những bệnh nguy hiểm nhất ở heo con. Tìm hiểu triệu chứng, chẩn đoán và phác đồ điều trị hiệu quả.',
    content: `
      <h2>1. Nguyên nhân gây bệnh Glasser</h2>
      <p>Bệnh Glasser do vi khuẩn <strong>Haemophilus parasuis</strong> gây ra. Đây là vi khuẩn Gram (-), có nhiều serotype khác nhau (từ 1-15). Vi khuẩn thường xâm nhập qua đường hô hấp khi heo con bị stress do vận chuyển, thay đổi thời tiết hoặc cai sữa.</p>
      <img src="/images/news-1.png" alt="Bệnh Glasser ở lợn" />
      <h2>2. Triệu chứng lâm sàng</h2>
      <p>Heo bệnh thường có biểu hiện cấp tính:</p>
      <ul>
        <li><strong>Sốt cao:</strong> Nhiệt độ cơ thể tăng lên 40.5 - 42°C.</li>
        <li><strong>Hô hấp:</strong> Khó thở, thở nhanh, ho khan.</li>
        <li><strong>Vận động:</strong> Sưng các khớp chân, đi lại khập khiễng hoặc run rẩy.</li>
        <li><strong>Thần kinh:</strong> Viêm màng não, có thể co giật hoặc nằm nghiêng chèo thuyền.</li>
      </ul>
      <h2>3. Chẩn đoán</h2>
      <p>Dựa trên các triệu chứng lâm sàng đặc trưng như viêm đa màng (màng phổi, màng tim, màng bụng). Có thể lấy bệnh phẩm để xét nghiệm phân lập vi khuẩn tại phòng thí nghiệm.</p>
      <h2>4. Phác đồ điều trị hiệu quả</h2>
      <p>Sử dụng kháng sinh nhạy cảm kết hợp các thuốc bổ trợ tăng sức đề kháng:</p>
      <ul>
        <li><strong>Kháng sinh:</strong> Tiêm <strong>AMOX-INJECT</strong> (Liều 1ml/10kg TT) hoặc <strong>FLOR-PREMIX</strong> trộn thức ăn.</li>
        <li><strong>Hạ sốt:</strong> Sử dụng các loại thuốc hạ sốt, giảm đau.</li>
        <li><strong>Bồi bổ:</strong> Pha <strong>ELECTROLYTE-C</strong> vào nước uống để bù điện giải và giảm stress cho đàn heo.</li>
      </ul>
    `,
  },
  {
    id: 2, slug: 'benh-adeno-tren-vit', title: 'Bệnh Adeno trên vịt - Phòng và điều trị bệnh do virus Adenovirus',
    category: 'benh-dieu-tri', animalTag: 'vit-cam-nang-chan-nuoi', publishDate: '10/03/2026', thumbnail: '/images/news-2.png',
    excerpt: 'Bệnh Adeno trên vịt gây thiệt hại nghiêm trọng cho ngành chăn nuôi thủy cầm. Bài viết phân tích nguyên nhân, triệu chứng và phương pháp phòng trị hiệu quả.',
    content: `
      <h2>1. Đặc điểm bệnh Adeno trên vịt</h2>
      <p>Bệnh Adenovirus trên vịt hay còn gọi là hội chứng giảm đẻ hoặc viêm gan do vurus trên vịt. Bệnh lây lan rất nhanh qua đường tiêu hóa và hô hấp, đặc biệt nguy hiểm đối với vịt con từ 2-5 tuần tuổi.</p>
      <h2>2. Triệu chứng điển hình</h2>
      <ul>
        <li>Vịt ủ rũ, kém ăn, sụt cân nhanh.</li>
        <li><strong>Tiêu chảy:</strong> Phân xanh, phân trắng có mùi hôi.</li>
        <li><strong>Dấu hiệu thần kinh:</strong> Vịt đi lại không vững, hay bị ngã ngửa.</li>
        <li>Tỷ lệ chết có thể lên tới 30-50% nếu không được can thiệp kịp thời.</li>
      </ul>
      <h2>3. Bệnh tích khi mổ khám</h2>
      <p>Gan sưng to, bở, có các điểm xuất huyết lốm đốm. Thận sưng và có thể có dịch tiết ở các xoang cơ thể.</p>
      <h2>4. Phương pháp phòng và can thiệp</h2>
      <p>Vì đây là bệnh do virus nên không có thuốc đặc trị. Nguyên tắc chính là dùng vaccine phòng bệnh và hỗ trợ điều trị:</p>
      <ul>
        <li>Tiêm vaccine phòng bệnh Adeno định kỳ.</li>
        <li><strong>Sát trùng:</strong> Phun sát trùng chuồng trại thường xuyên.</li>
        <li><strong>Hỗ trợ:</strong> Bổ sung <strong>LIVER TONIC</strong> để giải độc gan và <strong>ELECTROLYTE-C</strong> để nâng cao thể trạng.</li>
      </ul>
    `,
  },
  {
    id: 3, slug: 'huong-dan-nuoi-vit-sieu-thit', title: 'Hướng dẫn kỹ thuật nuôi vịt siêu thịt đạt hiệu quả cao',
    category: 'cam-nang', animalTag: 'vit-cam-nang-chan-nuoi', publishDate: '28/02/2026', thumbnail: '/images/news-3.png',
    excerpt: 'Tổng hợp kỹ thuật nuôi vịt siêu thịt từ A-Z: chọn giống, chuồng trại, dinh dưỡng, phòng bệnh giúp đạt năng suất tối đa.',
    content: `
      <h2>1. Chọn giống vịt siêu thịt</h2>
      <p>Chọn vịt con khỏe mạnh, nhanh nhẹn, mắt sáng, lông khô và bông. Tránh chọn những con hở rốn hoặc có khuyết tật ở chân, mỏ.</p>
      <h2>2. Chuẩn bị chuồng trại</h2>
      <p>Chuồng nuôi cần đảm bảo các yếu tố:</p>
      <ul>
        <li>Thông thoáng vào mùa hè, ấm áp vào mùa đông.</li>
        <li>Nền chuồng khô ráo, có lớp đệm lót bằng trấu hoặc rơm khô.</li>
        <li>Hệ thống máng ăn, máng uống sạch sẽ, dễ vệ sinh.</li>
      </ul>
      <h2>3. Chế độ dinh dưỡng và nước uống</h2>
      <p>Vịt siêu thịt có tốc độ tăng trưởng rất nhanh nên đòi hỏi hàm lượng đạm cao trong khẩu phần ăn. Cần cung cấp đầy đủ nước uống sạch 24/24.</p>
      <h2>4. Quy trình phòng bệnh</h2>
      <p>Áp dụng lịch tiêm vaccine đầy đủ cho vịt (Dịch tả, viêm gan, cúm gia cầm). Bổ sung định kỳ các loại thuốc bổ trợ như <strong>LIVER TONIC</strong> và <strong>ELECTROLYTE-C</strong> vào nước uống.</p>
    `,
  },
  {
    id: 4, slug: 'benh-lo-mom-long-mong', title: 'Bệnh Lở mồm long móng (LMLM) - Bệnh truyền nhiễm cấp tính nguy hiểm',
    category: 'benh-dieu-tri', animalTag: 'trau-bo-cam-nang-chan-nuoi', publishDate: '20/03/2026', thumbnail: '/images/news-2.png',
    excerpt: 'Bệnh LMLM là bệnh truyền nhiễm cấp tính nguy hiểm, gây thiệt hại lớn cho ngành chăn nuôi gia súc. Tìm hiểu cách phòng và điều trị hiệu quả.',
    content: `
      <h2>1. Tổng quan bệnh LMLM</h2>
      <p>Bệnh Lở mồm long móng do virus Aphtae epizooticae gây ra, thuộc họ Picornaviridae. Bệnh lây lan rất nhanh qua đường hô hấp, tiếp xúc trực tiếp và qua các vật trung gian.</p>
      <img src="/images/news-2.png" alt="Bệnh Lở mồm long móng" />
      <h2>2. Triệu chứng lâm sàng</h2>
      <ul>
        <li><strong>Sốt cao:</strong> Vật nuôi sốt cao đột ngột từ 40-41°C.</li>
        <li><strong>Mụn nước:</strong> Xuất hiện các mụn nước ở niêm mạc miệng, lưỡi, lợi, kẽ móng chân và ở vú.</li>
        <li><strong>Dấu hiệu khác:</strong> Chảy dãi nhiều như bọt xà phòng, vật nuôi bỏ ăn, đi lại khập khiễng hoặc nằm một chỗ.</li>
      </ul>
      <h2>3. Quy trình xử lý và phòng bệnh</h2>
      <p>Vì đây là bệnh do virus, việc phòng bệnh bằng vaccine là quan trọng nhất:</p>
      <ul>
        <li>Tiêm vaccine định kỳ 6 tháng/lần cho đàn gia súc.</li>
        <li>Tăng cường vệ sinh, sát trùng chuồng trại bằng các sản phẩm chuyên dụng.</li>
        <li>Cách ly tuyệt đối vật nuôi bị bệnh để tránh lây lan diện rộng.</li>
      </ul>
    `,
  },
  {
    id: 5, slug: 'ky-thuat-phong-benh-cho-ga', title: 'Kỹ thuật phòng bệnh tổng hợp cho gà nuôi công nghiệp',
    category: 'cam-nang', animalTag: 'ga', publishDate: '15/02/2026', thumbnail: '/images/news-2.png',
    excerpt: 'Hướng dẫn chi tiết về lịch vaccine, vệ sinh chuồng trại, dinh dưỡng và sử dụng thuốc phòng bệnh cho gà công nghiệp.',
    content: `
      <h2>1. Quản lý môi trường nuôi dưỡng</h2>
      <p>Môi trường sạch sẽ là yếu tố tiên quyết giúp gà khỏe mạnh. Cần đảm bảo chuồng trại thông thoáng, đệm lót khô ráo và thay định kỳ.</p>
      <h2>2. Lịch tiêm vaccine chi tiết</h2>
      <p>Tuân thủ nghiêm ngặt lịch vaccine cho gà từ 1 ngày tuổi:</p>
      <ul>
        <li><strong>Ngày 1:</strong> Gumboro, Marek.</li>
        <li><strong>Ngày 5-7:</strong> Newcastle (hệ II), Viêm phế quản truyền nhiễm (IB).</li>
        <li><strong>Ngày 10-14:</strong> Gumboro lần 2.</li>
        <li><strong>Ngày 18-21:</strong> Newcastle lần 2.</li>
      </ul>
      <h2>3. Vệ sinh sát trùng</h2>
      <p>Sử dụng các loại thuốc sát trùng có phổ diệt khuẩn rộng để phun xịt chuồng trại ít nhất 1 lần/tuần. Đặc biệt chú ý vệ sinh máng ăn, máng uống sạch sẽ hàng ngày.</p>
    `,
  },
  {
    id: 6, slug: 'tin-hoi-thao-chan-nuoi-2026', title: 'biotechvet tham dự Hội thảo Chăn nuôi Quốc tế 2026 tại Hà Nội',
    category: 'tin-noi-bo', publishDate: '20/03/2026', thumbnail: '/images/news-3.png',
    excerpt: 'Công ty BIOTECH-VET vinh dự tham dự Hội thảo Chăn nuôi Quốc tế 2026 tại Trung tâm Hội nghị Quốc gia với nhiều sản phẩm mới.',
    content: `
      <h2>Sự kiện nổi bật trong ngành chăn nuôi</h2>
      <p>Từ ngày 18-20/03/2026, Công Ty CP Công Nghệ Sinh Học Thú Y (BIOTECH-VET) đã tham dự Hội thảo Chăn nuôi Quốc tế được tổ chức tại Hà Nội. Đây là cơ hội để biotechvet giới thiệu các dòng sản phẩm mới nhất ứng dụng công nghệ đột phá từ Hoa Kỳ.</p>
      <h2>Trưng bày sản phẩm và tư vấn kỹ thuật</h2>
      <p>Gian hàng của biotechvet đã thu hút hàng ngàn lượt khách tham quan, bao gồm các chủ trang trại lớn, doanh nghiệp chăn nuôi và các chuyên gia thú y trong và ngoài nước.</p>
      <ul>
        <li>Giới thiệu bộ sản phẩm kháng sinh thế hệ mới.</li>
        <li>Tư vấn phác đồ điều trị bệnh hiệu quả cho các quy mô trang trại khác nhau.</li>
        <li>Ký kết biên bản ghi nhớ hợp tác với nhiều đối tác chiến lược.</li>
      </ul>
      <p>Sự kiện này khẳng định vị thế của biotechvet trong việc mang lại những giải pháp chất lượng cao cho ngành chăn nuôi Việt Nam.</p>
    `,
  },
  {
    id: 7, slug: 'xu-huong-chan-nuoi-2026', title: 'Xu hướng chăn nuôi 2026: Công nghệ và phát triển bền vững',
    category: 'tin-nganh', publishDate: '05/03/2026', thumbnail: '/images/news-1.png',
    excerpt: 'Phân tích xu hướng chăn nuôi năm 2026 với trọng tâm là ứng dụng công nghệ, an toàn sinh học và phát triển bền vững.',
    content: `
      <h2>1. Ứng dụng công nghệ cao (Chăn nuôi 4.0)</h2>
      <p>Năm 2026 đánh dấu bước tiến quan trọng trong việc ứng dụng AI và IoT vào quản lý trang trại. Hệ thống giám sát sức khỏe vật nuôi thời gian thực giúp phát hiện sớm dịch bệnh và tối ưu hóa lượng thức ăn.</p>
      <h2>2. An toàn sinh học là chìa khóa</h2>
      <p>Trong bối cảnh dịch bệnh diễn biến phức tạp, an toàn sinh học không còn là tùy chọn mà là bắt buộc. Việc kiểm soát người ra vào, phương tiện và sử dụng các chế phẩm sát trùng chất lượng cao trở thành tiêu chuẩn chung.</p>
      <h2>3. Phát triển bền vững và bảo vệ môi trường</h2>
      <p>Xử lý chất thải chăn nuôi bằng công nghệ Biogas thế hệ mới và sản xuất phân bón hữu cơ giúp giảm thiểu ô nhiễm môi trường, tạo ra giá trị gia tăng ổn định cho trang trại.</p>
    `,
  },
  {
    id: 8, slug: 'ga-bi-thuong-han', title: 'Gà bị thương hàn - Cách nhận biết và phác đồ điều trị dứt điểm',
    category: 'benh-dieu-tri', animalTag: 'ga', publishDate: '05/04/2026', thumbnail: '/images/news-1.png',
    excerpt: 'Bệnh thương hàn do vi khuẩn Salmonella gây ra, ảnh hưởng nghiêm trọng đến năng suất trứng và sức khỏe đàn gà. Xem ngay giải pháp điều trị.',
    content: `
      <h2>1. Nguyên nhân gây bệnh</h2>
      <p>Bệnh do vi khuẩn <strong>Salmonella gallinarum</strong> và <strong>Salmonella pullorum</strong> gây ra. Vi khuẩn có thể lây truyền từ mẹ sang con qua trứng hoặc lây ngang qua môi trường chăn nuôi.</p>
      <h2>2. Triệu chứng nhận biết</h2>
      <ul>
        <li><strong>Gà con:</strong> Ỉa chảy phân trắng, dính bết ở lỗ huyệt, gà gầy sút, chết nhanh.</li>
        <li><strong>Gà lớn:</strong> Mào tím tái, tiêu chảy phân loãng màu xanh vàng, giảm đẻ đột ngột.</li>
      </ul>
      <h2>3. Phác đồ điều trị dứt điểm</h2>
      <p>Sử dụng kháng sinh diệt khuẩn mạnh kết hợp bồi bổ:</p>
      <ul>
        <li><strong>Kháng sinh:</strong> Pha <strong>COLISTIN POWDER</strong> hoặc <strong>TYLOSIN-50</strong> vào nước uống liên tục 3-5 ngày.</li>
        <li><strong>Giải độc:</strong> Sử dụng <strong>LIVER TONIC</strong> để phục hồi chức năng gan thận sau khi dùng kháng sinh.</li>
        <li><strong>Men tiêu hóa:</strong> Bổ sung men để ổn định hệ vi sinh đường ruột.</li>
      </ul>
    `,
  },
];

// Job listings
export const jobs = [
  { id: 1, slug: 'nvkd-ninh-binh-thanh-hoa', title: 'Nhân viên Kinh doanh - Khu vực Ninh Bình, Thanh Hoá', location: 'Ninh Bình, Thanh Hoá', date: '2026-03-25', description: 'Tìm kiếm NVKD năng động tại khu vực Ninh Bình, Thanh Hoá. Yêu cầu: Tốt nghiệp Đại học/Cao đẳng ngành Thú y hoặc Chăn nuôi. Có kinh nghiệm ưu tiên.' },
  { id: 2, slug: 'nvkd-quang-binh-hue', title: 'Nhân viên Kinh doanh - Khu vực Quảng Bình, Quảng Trị, Huế', location: 'Quảng Bình, Quảng Trị, Huế', date: '2026-03-20', description: 'Tuyển NVKD khu vực miền Trung. Mức lương hấp dẫn + thưởng doanh số.' },
  { id: 3, slug: 'nvkd-lao-cai-yen-bai', title: 'Nhân viên Kinh doanh - Khu vực Lào Cai, Yên Bái, Sơn La', location: 'Lào Cai, Yên Bái, Sơn La, Hà Giang', date: '2026-03-15', description: 'Mở rộng thị trường khu vực Tây Bắc. Yêu cầu có phương tiện di chuyển.' },
];

// Animal tags for Cẩm nang grouping
export const animalTags = [
  { id: 1, name: 'Gà', slug: 'ga', icon: '🐔', description: 'Kỹ thuật chăn nuôi và phòng bệnh cho gà' },
  { id: 2, name: 'Heo', slug: 'heo-cam-nang-chan-nuoi', icon: '🐷', description: 'Kiến thức nuôi heo hiệu quả, phòng trị bệnh trên heo' },
  { id: 3, name: 'Vịt', slug: 'vit-cam-nang-chan-nuoi', icon: '🦆', description: 'Hướng dẫn nuôi vịt siêu thịt, vịt đẻ trứng' },
  { id: 4, name: 'Trâu Bò', slug: 'trau-bo-cam-nang-chan-nuoi', icon: '🐄', description: 'Kỹ thuật chăn nuôi trâu bò thịt, bò sữa' },
  { id: 5, name: 'Thủy Sản', slug: 'thuy-san', icon: '🐟', description: 'Nuôi trồng thủy sản: tôm, cá và các loài khác' },
];

// Menu data for Header and Footer
export const headerMenus = [
  { id: 1, name: 'Trang chủ', link: '/', parent: null, position: 'header', order: 1, status: true },
  { id: 2, name: 'Giới thiệu', link: '/gioi-thieu', parent: null, position: 'header', order: 2, status: true },
  { id: 3, name: 'Sản phẩm', link: '/san-pham', parent: null, position: 'header', order: 3, status: true, hasMega: true },
  { id: 4, name: 'Cẩm nang', link: '/cam-nang-chan-nuoi', parent: null, position: 'header', order: 4, status: true },
  { id: 5, name: 'Tin tức', link: '/tin-tuc', parent: null, position: 'both', order: 5, status: true },
  { id: 6, name: 'Catalogue', link: '/catalogue', parent: null, position: 'header', order: 6, status: true },
  { id: 7, name: 'Tuyển dụng', link: '/tuyen-dung', parent: null, position: 'header', order: 7, status: true },
  { id: 8, name: 'Liên hệ', link: '/lien-he', parent: null, position: 'both', order: 8, status: true, isButton: true },
];


export const footerMenus = [
  ...headerMenus.filter(m => m.position === 'both'),
  { id: 101, name: 'privacy', link: '/privacy', parent: null, position: 'footer', order: 10, status: true },
  { id: 102, name: 'terms', link: '/terms', parent: null, position: 'footer', order: 11, status: true },
];

