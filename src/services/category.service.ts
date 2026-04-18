import { BaseService } from './base.service';
import { Category } from '@/types';

export class CategoryService extends BaseService<Category> {
  constructor() {
    super('categories');
  }

  async getBySlug(slug: string): Promise<Category | null> {
    const snapshot = await this.collection.where('slug', '==', slug).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as unknown as Category;
  }
}

export const categoryService = new CategoryService();
