import { MetadataRoute } from 'next';
import { productService, articleService, categoryService } from '@/services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://biotechvet.com.vn';

  // Static routes
  const staticRoutes = [
    '',
    '/gioi-thieu',
    '/lien-he',
    '/san-pham',
    '/tin-tuc',
    '/tuyen-dung',
    '/catalogue',
    '/tin-tuc-nganh-chan-nuoi-thu-y',
    '/tin-tuc-noi-bo',
    '/cam-nang-chan-nuoi',
    '/benh-va-dieu-tri-benh',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic routes - Products
  const products = await productService.getAll();
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/san-pham/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Dynamic routes - Articles
  const articles = await articleService.getAll();
  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/bai-viet/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  // Dynamic routes - Categories
  const categories = await categoryService.getAll();
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/san-pham/danh-muc/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes, ...categoryRoutes];
}
