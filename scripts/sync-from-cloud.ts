/**
 * Script to fetch data from Firebase and Supabase and save directly to PostgreSQL via Prisma
 * Run: npx tsx scripts/sync-from-cloud.ts
 */
import 'dotenv/config';
import * as admin from 'firebase-admin';
import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// --- CONFIGURATION ---
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('❌ Missing DATABASE_URL in .env');
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Polyfill for BigInt JSON serialization
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// Initialize Firebase Admin
if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
  console.error('❌ Missing Firebase configuration in .env');
  process.exit(1);
}

const firebaseApp = admin.apps.length 
  ? admin.app() 
  : admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });

const db = firebaseApp.firestore();

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase configuration in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- UTILS ---
async function fetchCollection(collectionName: string) {
  console.log(`📥 Fetching ${collectionName} from Firebase...`);
  try {
    const snapshot = await db.collection(collectionName).get();
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error(`❌ Error fetching ${collectionName}:`, error);
    return [];
  }
}

async function syncSequences() {
  console.log('\n🔄 Synchronizing database sequences...');
  const tables = [
    { name: 'articles', seq: 'articles_id_seq' },
    { name: 'products', seq: 'products_id_seq' },
    { name: 'categories', seq: 'categories_id_seq' },
    { name: 'banners', seq: 'banners_id_seq' },
    { name: 'nav_menus', seq: 'nav_menus_id_seq' },
    { name: 'animal_tags', seq: 'animal_tags_id_seq' },
    { name: 'jobs', seq: 'jobs_id_seq' },
    { name: 'media_images', seq: 'media_images_id_seq' },
    { name: 'media_videos', seq: 'media_videos_id_seq' },
    { name: 'catalogues', seq: 'catalogues_id_seq' }
  ];

  for (const table of tables) {
    try {
      await prisma.$executeRawUnsafe(`
        SELECT setval('${table.seq}', (SELECT COALESCE(MAX(id), 0) + 1 FROM ${table.name}), false);
      `);
      console.log(`✅ Synced sequence for ${table.name}`);
    } catch (e: any) {
      console.warn(`⚠️ Could not sync sequence for ${table.name}: ${e?.message}`);
    }
  }
}

// --- MAIN ---
async function main() {
  console.log('🚀 Starting deep direct cloud-to-db synchronization...\n');

  // 1. Categories
  const categories = await fetchCollection('categories');
  if (categories.length > 0) {
    console.log(`⏳ Syncing ${categories.length} categories...`);
    await prisma.category.deleteMany();
    await prisma.category.createMany({
      data: categories.map((item: any) => ({
        id: BigInt(item.id) as any,
        name: item.name,
        slug: item.slug
      }))
    });
  }

  // 2. Products
  const products = await fetchCollection('products');
  if (products.length > 0) {
    console.log(`⏳ Syncing ${products.length} products...`);
    await prisma.product.deleteMany();
    await prisma.product.createMany({
      data: products.map((item: any) => ({
        id: BigInt(item.id) as any,
        slug: item.slug || `product-${item.id}`,
        name: item.name || 'No Name',
        categoryId: BigInt(item.categoryId || 0) as any,
        image: item.image || '',
        images: Array.isArray(item.images) ? item.images : [],
        featured: Boolean(item.featured),
        registrationNumber: item.registrationNumber || item.registrationNo || null,
        description: item.description || null,
        specifications: item.specifications || []
      }))
    });
  }

  // 3. Articles
  const articles = await fetchCollection('articles');
  if (articles.length > 0) {
    console.log(`⏳ Syncing ${articles.length} articles...`);
    await prisma.article.deleteMany();
    await prisma.article.createMany({
      data: articles.map((item: any) => ({
        id: BigInt(item.id) as any,
        slug: item.slug,
        title: item.title,
        category: item.category || 'uncategorized',
        animalTag: item.animalTag || null,
        publishDate: item.publishDate,
        thumbnail: item.thumbnail || '',
        excerpt: item.excerpt || '',
        content: item.content || ''
      }))
    });
  }

  // 4. Jobs
  const jobs = await fetchCollection('jobs');
  if (jobs.length > 0) {
    console.log(`⏳ Syncing ${jobs.length} jobs...`);
    await prisma.job.deleteMany();
    await prisma.job.createMany({
      data: jobs.map((item: any) => ({
        id: BigInt(item.id) as any,
        slug: item.slug,
        title: item.title,
        location: item.location,
        date: item.date,
        description: item.description || '',
        status: item.status || 'active'
      }))
    });
  }

  // 5. Banners
  const banners = await fetchCollection('banners');
  if (banners.length > 0) {
    console.log(`⏳ Syncing ${banners.length} banners...`);
    await prisma.banner.deleteMany();
    await prisma.banner.createMany({
      data: banners.map((item: any) => ({
        id: BigInt(item.id) as any,
        image: item.image,
        title: item.title || '',
        link: item.link || '/',
        status: item.status !== undefined ? Boolean(item.status) : true,
        order: Number(item.order || 0)
      }))
    });
  }

  // 6. Menus
  const menus = await fetchCollection('menus');
  if (menus.length > 0) {
    console.log(`⏳ Syncing ${menus.length} menus...`);
    await prisma.navMenu.deleteMany();
    await prisma.navMenu.createMany({
      data: menus.map((item: any) => ({
        id: BigInt(item.id) as any,
        name: item.name,
        link: item.link,
        parent: item.parentId ? BigInt(item.parentId) as any : (item.parent ? BigInt(item.parent) as any : null),
        position: item.position || 'header',
        order: Number(item.order || 0),
        status: item.status !== undefined ? Boolean(item.status) : true,
        hasMega: Boolean(item.hasMega),
        isButton: Boolean(item.isButton)
      }))
    });
  }

  // 7. Animal Tags
  const animalTags = await fetchCollection('animal-tags');
  if (animalTags.length > 0) {
    console.log(`⏳ Syncing ${animalTags.length} animal-tags...`);
    await prisma.animalTag.deleteMany();
    await prisma.animalTag.createMany({
      data: animalTags.map((item: any) => ({
        id: BigInt(item.id) as any,
        name: item.name,
        slug: item.slug,
        icon: item.icon || item.image || '',
        description: item.description || ''
      }))
    });
  }

  // 8. Settings
  console.log('📥 Syncing settings...');
  try {
    const settingsSnap = await db.collection('settings').limit(1).get();
    if (!settingsSnap.empty) {
      const data = settingsSnap.docs[0].data();
      await prisma.setting.upsert({
        where: { id: BigInt(1) as any },
        update: { 
          id: BigInt(1) as any,
          data: data
        },
        create: { 
          id: BigInt(1) as any,
          data: data
        }
      });
      console.log('✅ Updated settings');
    }
  } catch (e) {
    console.error('❌ Error syncing settings:', e);
  }

  // 9. Media Gallery
  console.log('📥 Syncing media-gallery...');
  try {
    const imagesSnap = await db.collection('media-gallery-images').get();
    const videosSnap = await db.collection('media-gallery-videos').get();
    
    if (!imagesSnap.empty) {
      await prisma.mediaImage.deleteMany();
      await prisma.mediaImage.createMany({
        data: imagesSnap.docs.map(doc => ({
          id: BigInt(doc.id) as any,
          url: doc.data().url,
          title: doc.data().title || '',
          order: Number(doc.data().order || 0),
          status: doc.data().status || 'active'
        }))
      });
    }
    
    if (!videosSnap.empty) {
      await prisma.mediaVideo.deleteMany();
      await prisma.mediaVideo.createMany({
        data: videosSnap.docs.map(doc => ({
          id: BigInt(doc.id) as any,
          url: doc.data().url,
          title: doc.data().title || '',
          thumbnail: doc.data().thumbnail || '',
          order: Number(doc.data().order || 0),
          status: doc.data().status || 'active'
        }))
      });
    }
    console.log('✅ Synced media gallery');
  } catch (e) {
    console.error('❌ Error syncing media-gallery:', e);
  }

  // 10. Catalogues (Supabase)
  console.log('\n📥 Syncing catalogues from Supabase...');
  try {
    const { data, error } = await supabase
      .from('catalogues')
      .select('*');

    if (error) throw error;
    if (data && data.length > 0) {
      await prisma.catalogue.deleteMany();
      await prisma.catalogue.createMany({
        data: data.map(item => ({
          id: BigInt(item.id) as any,
          title: item.title,
          size: item.size || '',
          type: item.type || 'PDF',
          link: item.link || item.fileUrl || '',
          createdAt: item.created_at ? new Date(item.created_at) : new Date()
        }))
      });
      console.log(`✅ Synced ${data.length} catalogues`);
    }
  } catch (error) {
    console.error('❌ Error fetching catalogues from Supabase:', error);
  }

  // --- FINAL STEP: FIX SEQUENCES ---
  await syncSequences();

  console.log('\n🎉 Synchronization completed successfully!');
}

main()
  .catch(err => {
    console.error('💥 Critical error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
