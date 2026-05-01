import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting sequence synchronization...');
  
  const tables = [
    'products',
    'categories',
    'articles',
    'jobs',
    'banners',
    'nav_menus',
    'animal_tags',
    'media_images',
    'media_videos',
    'catalogues'
  ];

  for (const table of tables) {
    try {
      // Get the sequence name - usually table_name_id_seq
      const seqName = `${table}_id_seq`;
      console.log(`Syncing sequence for ${table} (${seqName})...`);
      
      // Update the sequence to the max ID
      await prisma.$executeRawUnsafe(`
        SELECT setval('${seqName}', (SELECT COALESCE(MAX(id), 0) + 1 FROM ${table}), false);
      `);
      
      console.log(`Successfully synced ${table}`);
    } catch (error: any) {
      console.error(`Failed to sync ${table}:`, error?.message);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
