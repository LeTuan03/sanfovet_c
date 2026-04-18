import { BaseService } from './base.service';
import { AnimalTag } from '@/types';

export class AnimalTagService extends BaseService<AnimalTag> {
  constructor() {
    super('animal-tags');
  }

  async getBySlug(slug: string): Promise<AnimalTag | null> {
    const snapshot = await this.collection.where('slug', '==', slug).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as unknown as AnimalTag;
  }
}

export const animalTagService = new AnimalTagService();
