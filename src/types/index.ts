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

export interface Setting {
  hotline1?: string | null;
  hotline2?: string | null;
  email?: string | null;
  address?: string | null;
  intro_slogan?: string | null;
  social?: any;
}

export interface AnimalTag {
  id: bigint;
  name: string;
  slug: string;
  icon: string;
  description: string;
}
