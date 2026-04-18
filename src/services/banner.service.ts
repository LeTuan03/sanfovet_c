import { BaseService } from './base.service'; // Firebase Service
import { Banner } from '@/types';

export class BannerService extends BaseService<Banner> {
  constructor() {
    super('banners');
  }

  async getActive(): Promise<Banner[]> {
    const snapshot = await this.collection
      .where('status', '==', true)
      .orderBy('order', 'asc')
      .get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }) as unknown as Banner);
  }
}

export const bannerService = new BannerService();
