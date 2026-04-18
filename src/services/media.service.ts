import { adminDb } from '@/lib/firebase/admin';

export interface MediaImage {
  id?: string;
  url: string;
  title: string;
  order: number;
  status: 'active' | 'hidden';
}

export interface MediaVideo {
  id?: string;
  url: string;
  title: string;
  thumbnail: string;
  order: number;
  status: 'active' | 'hidden';
}

export class MediaService {
  async getImages(): Promise<MediaImage[]> {
    const snapshot = await adminDb.collection('media-images').orderBy('order', 'asc').get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }) as MediaImage);
  }

  async getVideos(): Promise<MediaVideo[]> {
    const snapshot = await adminDb.collection('media-videos').orderBy('order', 'asc').get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }) as MediaVideo);
  }

  async addImage(image: Omit<MediaImage, 'id'>): Promise<string> {
    const docRef = await adminDb.collection('media-images').add(image);
    return docRef.id;
  }

  async addVideo(video: Omit<MediaVideo, 'id'>): Promise<string> {
    const docRef = await adminDb.collection('media-videos').add(video);
    return docRef.id;
  }
}

export const mediaService = new MediaService();
