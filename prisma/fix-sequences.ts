import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  const connectionString = "postgresql://postgres:123456@127.0.0.1:5432/biotechvet?schema=public";
  console.log(`🔌 Connecting to: ${connectionString}`);
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  
  console.log('🔄 Resetting sequences for all tables...');

  const tables = [
    { table: 'products', seq: 'products_id_seq' },
    { table: 'categories', seq: 'categories_id_seq' },
    { table: 'articles', seq: 'articles_id_seq' },
    { table: 'jobs', seq: 'jobs_id_seq' },
    { table: 'banners', seq: 'banners_id_seq' },
    { table: 'nav_menus', seq: 'nav_menus_id_seq' },
    { table: 'animal_tags', seq: 'animal_tags_id_seq' },
    { table: 'media_images', seq: 'media_images_id_seq' },
    { table: 'media_videos', seq: 'media_videos_id_seq' },
    { table: 'catalogues', seq: 'catalogues_id_seq' },
  ];

  for (const item of tables) {
    try {
      // Find the maximum ID in the table
      const result = await prisma.$queryRawUnsafe<{ max: bigint }[]>(
        `SELECT MAX(id) FROM "${item.table}"`
      );
      
      const maxId = result[0]?.max;
      
      if (maxId !== null && maxId !== undefined) {
        console.log(` Table ${item.table}: Max ID is ${maxId}. Resetting sequence ${item.seq}...`);
        
        // Reset the sequence to maxId + 1
        await prisma.$executeRawUnsafe(
          `SELECT setval('${item.seq}', ${maxId})`
        );
      } else {
        console.log(` Table ${item.table} is empty. Skipping sequence reset.`);
      }
    } catch (error) {
      console.error(` Error resetting sequence for ${item.table}:`, error);
    }
  }

  await prisma.$disconnect();
  console.log(' All sequences have been reset.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
