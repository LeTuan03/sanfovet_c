import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
      console.warn('Firebase admin environment variables are missing. Some server-side features may not work.');
    } else {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n').replace(/^"|"$/g, ''),
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    }
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}

// Fallback to avoid crashes if initialization failed
let adminDb: admin.firestore.Firestore = null as any;
let adminStorage: admin.storage.Storage = null as any;
let adminAuth: admin.auth.Auth = null as any;

try {
  if (admin.apps.length > 0) {
    adminDb = admin.firestore();
    adminStorage = admin.storage();
    adminAuth = admin.auth();
  }
} catch (error) {
  console.error('Error accessing Firebase Admin services:', error);
}

export { adminDb, adminStorage, adminAuth };
