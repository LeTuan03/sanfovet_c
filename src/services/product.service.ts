import { BaseService } from './base.service';
import { Product } from '@/types';

export class ProductService extends BaseService<Product> {
  constructor() {
    super('products');
  }

  async getByCategory(categoryId: number): Promise<Product[]> {
    const snapshot = await this.collection.where('categoryId', '==', categoryId).get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }) as unknown as Product);
  }

  async getFeatured(): Promise<Product[]> {
    const snapshot = await this.collection.where('featured', '==', true).get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }) as unknown as Product);
  }

  async getBySlug(slug: string): Promise<Product | null> {
    const snapshot = await this.collection.where('slug', '==', slug).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as unknown as Product;
  }
}

export const productService = new ProductService();
