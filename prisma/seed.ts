/**
 * Seed script - Import existing JSON data into PostgreSQL
 * Run: npx ts-node --compiler-options '{"module":"commonjs"}' prisma/seed.ts
 * Or: npx tsx prisma/seed.ts
 */
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as fs from 'fs';
import * as path from 'path';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

function readJsonFile(filename: string): any[] {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠ File not found: ${filename}, skipping...`);
    return [];
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

async function main() {
  console.log('🌱 Starting seed...\n');

  // 1. Categories
  console.log('📦 Seeding categories...');
  const categories = readJsonFile('categories.json');
  for (const cat of categories) {
    const id = Number(cat.id);
    await prisma.category.upsert({
      where: { id },
      update: { name: cat.name, slug: cat.slug },
      create: { id, name: cat.name, slug: cat.slug },
    });
  }
  console.log(`  ✅ ${categories.length} categories seeded\n`);

  // 2. Products  
  console.log('📦 Seeding products...');
  const products = readJsonFile('products.json');
  for (const p of products) {
    const id = Number(p.id);
    await prisma.product.upsert({
      where: { id },
      update: {},
      create: {
        id,
        slug: p.slug,
        name: p.name,
        categoryId: Number(p.categoryId),
        image: p.image || '',
        images: p.images || [],
        featured: p.featured || false,
        registrationNumber: p.registrationNumber || null,
        description: p.description || null,
        specifications: p.specifications || [],
      },
    });
  }
  console.log(`  ✅ ${products.length} products seeded\n`);

  // 3. Articles
  console.log('📰 Seeding articles...');
  const articles = readJsonFile('articles.json');
  for (const a of articles) {
    const id = Number(a.id);
    await prisma.article.upsert({
      where: { id },
      update: {},
      create: {
        id,
        slug: a.slug,
        title: a.title,
        category: a.category,
        animalTag: a.animalTag || null,
        publishDate: a.publishDate || '',
        thumbnail: a.thumbnail || '',
        excerpt: a.excerpt || '',
        content: a.content || '',
      },
    });
  }
  console.log(`  ✅ ${articles.length} articles seeded\n`);

  // 4. Jobs
  console.log('💼 Seeding jobs...');
  const jobs = readJsonFile('jobs.json');
  for (const j of jobs) {
    const id = Number(j.id);
    await (prisma.job as any).upsert({
      where: { id },
      update: {},
      create: {
        id,
        slug: j.slug,
        title: j.title,
        location: j.location,
        date: j.date,
        description: j.description || '',
        status: j.status !== undefined ? String(j.status) : 'active',
      },
    });
  }
  console.log(`  ✅ ${jobs.length} jobs seeded\n`);

  // 5. Banners
  console.log('🖼️ Seeding banners...');
  const banners = readJsonFile('banners.json');
  for (const b of banners) {
    const id = Number(b.id);
    await prisma.banner.upsert({
      where: { id },
      update: {},
      create: {
        id,
        image: b.image || '',
        title: b.title,
        link: b.link || '',
        status: b.status !== undefined ? b.status : true,
        order: b.order !== undefined ? Number(b.order) : 0,
      },
    });
  }
  console.log(`  ✅ ${banners.length} banners seeded\n`);

  // 6. Menus
  console.log('📋 Seeding menus...');
  const menus = readJsonFile('menus.json');
  for (const m of menus) {
    const id = Number(m.id);
    await prisma.navMenu.upsert({
      where: { id },
      update: {},
      create: {
        id,
        name: m.name,
        link: m.link,
        parent: m.parent ? Number(m.parent) : null,
        position: m.position || 'header',
        order: m.order !== undefined ? Number(m.order) : 0,
        status: m.status !== undefined ? m.status : true,
        hasMega: m.hasMega || false,
        isButton: m.isButton || false,
      },
    });
  }
  console.log(`  ✅ ${menus.length} menus seeded\n`);

  // 7. Animal Tags
  console.log('🏷️ Seeding animal tags...');
  const animalTags = readJsonFile('animal-tags.json');
  for (const t of animalTags) {
    const id = Number(t.id);
    await prisma.animalTag.upsert({
      where: { id },
      update: {},
      create: {
        id,
        name: t.name,
        slug: t.slug,
        icon: t.icon || '',
        description: t.description || '',
      },
    });
  }
  console.log(`  ✅ ${animalTags.length} animal tags seeded\n`);

  // 8. Settings
  console.log('⚙️ Seeding settings...');
  const settingsPath = path.join(DATA_DIR, 'settings.json');
  if (fs.existsSync(settingsPath)) {
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
    await (prisma.setting as any).upsert({
      where: { id: 1 },
      update: { data: settings },
      create: { id: 1, data: settings },
    });
    console.log('  ✅ Settings seeded\n');
  }

  // 9. Media Gallery
  console.log('🎬 Seeding media gallery...');
  const mediaPath = path.join(DATA_DIR, 'media-gallery.json');
  if (fs.existsSync(mediaPath)) {
    const media = JSON.parse(fs.readFileSync(mediaPath, 'utf-8'));
    if (media.images) {
      for (const img of media.images) {
        await prisma.mediaImage.create({
          data: {
            url: img.url || '',
            title: img.title || '',
            order: img.order !== undefined ? Number(img.order) : 0,
            status: img.status || 'active',
          },
        });
      }
      console.log(`  ✅ ${media.images.length} images seeded`);
    }
    if (media.videos) {
      for (const vid of media.videos) {
        await prisma.mediaVideo.create({
          data: {
            url: vid.url || '',
            title: vid.title || '',
            thumbnail: vid.thumbnail || '',
            order: vid.order !== undefined ? Number(vid.order) : 0,
            status: vid.status || 'active',
          },
        });
      }
      console.log(`  ✅ ${media.videos.length} videos seeded`);
    }
  }

  // 10. Catalogues
  console.log('📚 Seeding catalogues...');
  const cataloguesPath = path.join(DATA_DIR, 'catalogues.json');
  if (fs.existsSync(cataloguesPath)) {
    const catalogues = JSON.parse(fs.readFileSync(cataloguesPath, 'utf-8'));
    for (const c of catalogues) {
      await prisma.catalogue.upsert({
        where: { id: Number(c.id) },
        update: {},
        create: {
          id: Number(c.id),
          title: c.title,
          size: c.size,
          type: c.type,
          link: c.link,
          createdAt: c.created_at ? new Date(c.created_at) : new Date(),
        },
      });
    }
    console.log(`  ✅ ${catalogues.length} catalogues seeded\n`);
  }

  console.log('\n🎉 Seed completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
