import { productService } from '@/services/product.service';
import { categoryService } from '@/services/category.service';
import { articleService } from '@/services/article.service';
import { jobService } from '@/services/job.service';
import { animalTagService } from '@/services/animal-tag.service';
import { menuService } from '@/services/menu.service';
import { settingService } from '@/services/setting.service';
import { bannerService } from '@/services/banner.service';
import { mediaService } from '@/services/media.service';

import products from '../data/products.json';
import categories from '../data/categories.json';
import articles from '../data/articles.json';
import jobs from '../data/jobs.json';
import animalTags from '../data/animal-tags.json';
import menus from '../data/menus.json';
import settings from '../data/settings.json';
import banners from '../data/banners.json';
import mediaGallery from '../data/media-gallery.json';

export async function migrateAll() {
  console.log('Starting migration...');

  try {
    console.log('Migrating products...');
    await productService.setAll(products as any);

    console.log('Migrating categories...');
    await categoryService.setAll(categories as any);

    console.log('Migrating articles...');
    await articleService.setAll(articles as any);

    console.log('Migrating jobs...');
    await jobService.setAll(jobs as any);

    console.log('Migrating animal tags...');
    await animalTagService.setAll(animalTags as any);

    console.log('Migrating menus...');
    await menuService.setAll(menus as any);

    console.log('Migrating settings...');
    await settingService.updateSettings(settings as any);

    console.log('Migrating banners...');
    await bannerService.setAll(banners as any);

    console.log('Migrating media gallery...');
    for (const img of mediaGallery.images) {
      await mediaService.addImage(img as any);
    }
    for (const vid of mediaGallery.videos) {
      await mediaService.addVideo(vid as any);
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}
