export interface ProductSpecification {
  title: string;
  content: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  categoryId: number;
  image: string;
  featured?: boolean;
  specifications: ProductSpecification[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  category: string;
  animalTag?: string;
  publishDate: string;
  thumbnail: string;
  excerpt: string;
  content: string;
}

export interface Job {
  id: number;
  slug: string;
  title: string;
  location: string;
  date: string;
  description: string;
}

export interface Banner {
  id: number;
  image: string;
  title: string;
  link: string;
  status: boolean;
  order: number;
}

export interface NavMenu {
  id: number;
  name: string;
  link: string;
  parent: number | null;
  position: 'header' | 'footer' | 'both';
  order: number;
  status: boolean;
  hasMega?: boolean;
  isButton?: boolean;
}

export interface Setting {
  hotline1?: string;
  hotline2?: string;
  email?: string;
  address?: string;
  intro_slogan?: string;
  social?: {
    facebook?: string;
    youtube?: string;
    zalo?: string;
  };
}

export interface AnimalTag {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
}
