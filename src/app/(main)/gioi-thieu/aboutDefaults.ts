import { AboutPageContent } from '@/types';

export type AboutContentResolved = {
  gioiThieu: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
  };
  lichSu: {
    title: string;
    intro: string;
    timeline: { year: string; text: string }[];
  };
  tamNhin: {
    visionTitle: string;
    visionText: string;
    missionTitle: string;
    missionText: string;
    quoteText: string;
    quoteAuthor: string;
    quoteRole: string;
  };
  coSo: {
    title: string;
    intro: string;
    cardTitle: string;
    cardText: string;
    stats: { number: string; label: string }[];
  };
  coCau: {
    title: string;
    intro: string;
    roles: string[];
    quoteText: string;
  };
};

export const aboutDefaults: AboutContentResolved = {
  gioiThieu: {
    title: 'Tổng quan về BIOTECH-VET',
    paragraph1:
      'BIOTECH-VET là thương hiệu thuốc thú y thuộc Công Ty CP Công Nghệ Sinh Học Thú Y. Với hơn 20 năm phát triển, chúng tôi tự hào mang đến các giải pháp dược phẩm chất lượng cao, ứng dụng công nghệ hiện đại từ Hoa Kỳ.',
    paragraph2:
      'Chúng tôi hướng đến việc liên tục đổi mới, cải tiến chất lượng và dịch vụ, đáp ứng nhu cầu ngày càng cao của ngành chăn nuôi trong và ngoài nước.',
    stat1Number: '200+',
    stat1Label: 'Sản phẩm',
    stat2Number: '63',
    stat2Label: 'Tỉnh thành',
  },
  lichSu: {
    title: 'Lịch sử hình thành',
    intro:
      'Hành trình đầy tự hào của biotechvet trong suốt hơn hai thập kỷ cống hiến cho ngành chăn nuôi Việt Nam.',
    timeline: [
      {
        year: '2002',
        text: 'Công ty Cổ phần Công Nghệ Sinh Học Thú Y chính thức được thành lập, đặt nền móng cho sự ra đời của thương hiệu BIOTECH-VET.',
      },
      {
        year: '2010',
        text: 'Khánh thành nhà máy sản xuất thuốc thú y đầu tiên đạt chuẩn GMP-WHO, khẳng định vị thế về chất lượng trên thị trường trong nước.',
      },
      {
        year: '2018',
        text: 'Mở rộng hệ sinh thái Sanford Pharma USA và Viaprotic, ứng dụng công nghệ hiện đại từ Hoa Kỳ vào sản xuất chuyên sâu.',
      },
      {
        year: 'Hiện tại',
        text: 'Trở thành tập đoàn dược phẩm thú y hàng đầu Việt Nam với mạng lưới hơn 1.000 đại lý và xuất khẩu sang nhiều thị trường quốc tế.',
      },
    ],
  },
  tamNhin: {
    visionTitle: 'Tầm nhìn chiến lược',
    visionText:
      'Trở thành Tập đoàn dược phẩm với hệ sinh thái công nghệ sinh học và dược phẩm toàn diện, mang lại hiệu quả thiết thực và bền vững trong chăn nuôi, vươn tầm quốc tế.',
    missionTitle: 'Sứ mệnh cao cả',
    missionText:
      'Bảo vệ sức khỏe cho con người và vật nuôi thông qua các sản phẩm hữu hiệu; góp phần bảo vệ môi trường và phát triển cộng đồng chăn nuôi bền vững.',
    quoteText:
      '"Chất lượng là danh dự, sự hài lòng của bà con là thước đo thành công của biotechvet."',
    quoteAuthor: 'Ban Lãnh Đạo',
    quoteRole: 'biotechvet Group',
  },
  coSo: {
    title: 'Cơ sở vật chất',
    intro:
      'BIOTECH-VET đầu tư hệ thống trang thiết bị máy móc tiên tiến, dây chuyền sản xuất khép kín vận hành theo tiêu chuẩn GMP-WHO nghiêm ngặt nhất.',
    cardTitle: 'Nhà máy',
    cardText: 'Trung tâm nghiên cứu và kiểm soát chất lượng đầu ra khắt khe.',
    stats: [
      { number: '03', label: 'Nhà máy lớn' },
      { number: '10+', label: 'Dây chuyền' },
      { number: '5k', label: 'Diện tích m²' },
      { number: 'Top', label: 'Thương hiệu' },
    ],
  },
  coCau: {
    title: 'Cơ cấu tổ chức',
    intro:
      'Hệ thống quản trị tinh gọn với đội ngũ nhân sự chất lượng cao, tận tâm và chuyên nghiệp.',
    roles: [
      'Hội đồng Quản trị',
      'Tổng Giám đốc',
      'Khối Sản xuất - Kỹ thuật',
      'Khối Kinh doanh - Marketing',
      'Khối Hành chính - Nhân sự',
    ],
    quoteText:
      '"Chúng tôi tin rằng con người là tài sản quý giá nhất. Tại biotechvet, mỗi cá nhân đều là một mắt xích quan trọng trong hành trình bảo vệ sự phát triển rực rỡ của ngành chăn nuôi."',
  },
};

export function mergeAbout(data?: AboutPageContent | null): AboutContentResolved {
  const d = data || {};
  return {
    gioiThieu: { ...aboutDefaults.gioiThieu, ...(d.gioiThieu || {}) } as AboutContentResolved['gioiThieu'],
    lichSu: {
      ...aboutDefaults.lichSu,
      ...(d.lichSu || {}),
      timeline:
        d.lichSu?.timeline && d.lichSu.timeline.length > 0
          ? d.lichSu.timeline
          : aboutDefaults.lichSu.timeline,
    } as AboutContentResolved['lichSu'],
    tamNhin: { ...aboutDefaults.tamNhin, ...(d.tamNhin || {}) } as AboutContentResolved['tamNhin'],
    coSo: {
      ...aboutDefaults.coSo,
      ...(d.coSo || {}),
      stats:
        d.coSo?.stats && d.coSo.stats.length > 0
          ? d.coSo.stats
          : aboutDefaults.coSo.stats,
    } as AboutContentResolved['coSo'],
    coCau: {
      ...aboutDefaults.coCau,
      ...(d.coCau || {}),
      roles:
        d.coCau?.roles && d.coCau.roles.length > 0
          ? d.coCau.roles
          : aboutDefaults.coCau.roles,
    } as AboutContentResolved['coCau'],
  };
}
