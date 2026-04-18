import { BaseService } from './base.service';
import { Article } from '@/types';

export class ArticleService extends BaseService<Article> {
  constructor() {
    super('articles');
  }

  async getByCategory(category: string): Promise<Article[]> {
    const snapshot = await this.collection.where('category', '==', category).get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }) as unknown as Article);
  }

  async getByAnimalTag(animalTag: string): Promise<Article[]> {
    const snapshot = await this.collection.where('animalTag', '==', animalTag).get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }) as unknown as Article);
  }

  async getBySlug(slug: string): Promise<Article | null> {
    const snapshot = await this.collection.where('slug', '==', slug).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as unknown as Article;
  }
}

export const articleService = new ArticleService();
