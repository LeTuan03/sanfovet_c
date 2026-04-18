import { BaseService } from './base.service';
import { Job } from '@/types';

export class JobService extends BaseService<Job> {
  constructor() {
    super('jobs');
  }

  async getBySlug(slug: string): Promise<Job | null> {
    const snapshot = await this.collection.where('slug', '==', slug).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as unknown as Job;
  }
}

export const jobService = new JobService();
