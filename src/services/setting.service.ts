import { adminDb } from '@/lib/firebase/admin';
import { Setting } from '@/types';

export class SettingService {
  private collectionName = 'settings';
  private docId = 'global';

  async getSettings(): Promise<Setting | null> {
    try {
      if (!adminDb) return null;
      const doc = await adminDb.collection(this.collectionName).doc(this.docId).get();
      if (!doc.exists) return null;
      return doc.data() as Setting;
    } catch (error) {
      console.error('Error in SettingService.getSettings:', error);
      return null;
    }
  }

  async updateSettings(data: Setting): Promise<boolean> {
    try {
      if (!adminDb) return false;
      await adminDb.collection(this.collectionName).doc(this.docId).set(data, { merge: true });
      return true;
    } catch (error) {
      console.error('Error in SettingService.updateSettings:', error);
      return false;
    }
  }
}

export const settingService = new SettingService();
