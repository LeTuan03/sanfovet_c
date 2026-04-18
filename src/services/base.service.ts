import { adminDb } from '@/lib/firebase/admin';

export class BaseService<T extends { id?: string | number }> {
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  protected get collection() {
    return adminDb.collection(this.collectionName);
  }

  async getAll(): Promise<T[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }) as unknown as T);
  }

  async getById(id: string): Promise<T | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as unknown as T;
  }

  async create(data: Omit<T, 'id'>): Promise<string> {
    const docRef = await this.collection.add(data);
    return docRef.id;
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    await this.collection.doc(id).update(data as any);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }

  async setAll(dataList: T[]): Promise<void> {
    const batch = adminDb.batch();
    
    // Clear existing (optional - sometimes desired for full reset)
    // For now, let's just add/update everything
    
    dataList.forEach(data => {
      const { id, ...rest } = data;
      const docRef = id ? this.collection.doc(String(id)) : this.collection.doc();
      batch.set(docRef, rest);
    });

    await batch.commit();
  }
}
