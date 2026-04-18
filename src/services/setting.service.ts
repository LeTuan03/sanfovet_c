import { adminDb } from '@/lib/firebase/admin';
import { Setting } from '@/types';

export class SettingService {
  private collectionName = 'settings';
  private docId = 'global';

  async getSettings(): Promise<Setting | null> {
    const doc = await adminDb.collection(this.collectionName).doc(this.docId).get();
    if (!doc.exists) return null;
    return doc.data() as Setting;
  }

  async updateSettings(data: Setting): Promise<void> {
    await adminDb.collection(this.collectionName).doc(this.docId).set(data, { merge: true });
  }
}

export const settingService = new SettingService();
