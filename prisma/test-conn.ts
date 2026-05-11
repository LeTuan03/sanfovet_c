import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  const connectionString = `${process.env.DATABASE_URL}`;
  console.log(`🔌 Connecting to: ${connectionString}`);
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const menus = await prisma.navMenu.findMany({ take: 5 });
    console.log('✅ Connected successfully!');
    console.log('Menus:', JSON.stringify(menus, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    , 2));
  } catch (error) {
    console.error('❌ Connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
