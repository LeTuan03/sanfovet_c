import { adminDb } from '@/lib/firebase/admin';

export class BaseService<T extends { id?: string | number }> {
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  protected get collection() {
    if (!adminDb) {
      throw new Error('Firebase Admin DB is not initialized. Check your environment variables.');
    }
    return adminDb.collection(this.collectionName);
  }

  async getAll(): Promise<T[]> {
    try {
      const snapshot = await this.collection.get();
      return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }) as unknown as T);
    } catch (error) {
      console.error(`Error in BaseService.getAll for collection ${this.collectionName}:`, error);
      return [];
    }
  }

  async getById(id: string): Promise<T | null> {
    try {
      const doc = await this.collection.doc(id).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() } as unknown as T;
    } catch (error) {
      console.error(`Error in BaseService.getById for collection ${this.collectionName}:`, error);
      return null;
    }
  }

  async create(data: Omit<T, 'id'>): Promise<string | null> {
    try {
      const docRef = await this.collection.add(data);
      return docRef.id;
    } catch (error) {
      console.error(`Error in BaseService.create for collection ${this.collectionName}:`, error);
      return null;
    }
  }

  async update(id: string, data: Partial<T>): Promise<boolean> {
    try {
      await this.collection.doc(id).update(data as any);
      return true;
    } catch (error) {
      console.error(`Error in BaseService.update for collection ${this.collectionName}:`, error);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.collection.doc(id).delete();
      return true;
    } catch (error) {
      console.error(`Error in BaseService.delete for collection ${this.collectionName}:`, error);
      return false;
    }
  }

  async setAll(dataList: T[]): Promise<void> {
    // Get all current documents in the collection to identify which ones to delete
    const snapshot = await this.collection.get();
    
    // Get a set of IDs that should exist after this operation
    const incomingIds = new Set(
      dataList
        .map(data => (data.id !== undefined && data.id !== null ? String(data.id) : null))
        .filter((id): id is string => id !== null)
    );

    const batch = adminDb.batch();
    
    // Delete documents that are not in the incoming list
    snapshot.docs.forEach(doc => {
      if (!incomingIds.has(doc.id)) {
        batch.delete(doc.ref);
      }
    });

    // Add/Update documents from the incoming list
    dataList.forEach(data => {
      const { id, ...rest } = data;
      const docRef = (id !== undefined && id !== null) 
        ? this.collection.doc(String(id)) 
        : this.collection.doc();
      batch.set(docRef, rest);
    });

    await batch.commit();
  }
}
