export interface ProductSpecification {
  title: string;
  content: string;
}

export interface Product {
  id: bigint;
  slug: string;
  name: string;
  categoryId: bigint;
  image: string;
  images?: string[] | null;
  featured?: boolean | null;
  registrationNumber?: string | null;
  description?: string | null;
  specifications: any; // Prisma returns JsonValue, frontend expects array
}

export interface Category {
  id: bigint;
  name: string;
  slug: string;
}

export interface Article {
  id: bigint;
  slug: string;
  title: string;
  category: string;
  animalTag?: string | null;
  publishDate: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  featured?: boolean | null;
}

export type ArticleSummary = Omit<Article, 'content'>;
export type ProductSummary = Omit<Product, 'description'>;

export interface Job {
  id: bigint;
  slug: string;
  title: string;
  location: string;
  date: string;
  description: string;
  status?: string | null;
}

export type JobSummary = Omit<Job, 'description'>;

export interface Banner {
  id: bigint;
  image: string;
  title: string;
  link: string;
  status: boolean;
  order: number;
}

export interface NavMenu {
  id: bigint;
  name: string;
  link: string;
  parent: bigint | null;
  position: string;
  order: number;
  status: boolean;
  hasMega?: boolean | null;
  isButton?: boolean | null;
}

export interface AboutPageContent {
  gioiThieu?: {
    title?: string;
    paragraph1?: string;
    paragraph2?: string;
    stat1Number?: string;
    stat1Label?: string;
    stat2Number?: string;
    stat2Label?: string;
  };
  lichSu?: {
    title?: string;
    intro?: string;
    timeline?: { year: string; text: string }[];
  };
  tamNhin?: {
    visionTitle?: string;
    visionText?: string;
    missionTitle?: string;
    missionText?: string;
    quoteText?: string;
    quoteAuthor?: string;
    quoteRole?: string;
  };
  coSo?: {
    title?: string;
    intro?: string;
    cardTitle?: string;
    cardText?: string;
    stats?: { number: string; label: string }[];
  };
  coCau?: {
    title?: string;
    intro?: string;
    roles?: string[];
    quoteText?: string;
  };
  thanhTuu?: {
    title?: string;
    images?: ({ url: string; title?: string; subtitle?: string } | string)[];
  };
}

export interface Setting {
  hotline1?: string | null;
  hotline2?: string | null;
  email?: string | null;
  address?: string | null;
  intro_slogan?: string | null;
  social?: any;
  aboutPage?: AboutPageContent;
}

export interface AnimalTag {
  id: bigint;
  name: string;
  slug: string;
  icon: string;
  description: string;
}
