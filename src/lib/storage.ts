import { 
  productService, 
  categoryService, 
  articleService, 
  jobService, 
  animalTagService, 
  menuService, 
  settingService, 
  bannerService, 
  mediaService 
} from '@/services';

export type DataType = 
  | 'products' 
  | 'categories' 
  | 'articles' 
  | 'jobs' 
  | 'animal-tags' 
  | 'menus' 
  | 'settings' 
  | 'banners' 
  | 'media-gallery';

export async function readData<T>(type: DataType): Promise<T> {
  try {
    let data;
    switch (type) {
      case 'products':
        data = await productService.getAll();
        break;
      case 'categories':
        data = await categoryService.getAll();
        break;
      case 'articles':
        data = await articleService.getAll();
        break;
      case 'jobs':
        data = await jobService.getAll();
        break;
      case 'animal-tags':
        data = await animalTagService.getAll();
        break;
      case 'menus':
        data = await menuService.getAll();
        break;
      case 'settings':
        data = await settingService.getSettings();
        break;
      case 'banners':
        data = await bannerService.getAll();
        break;
      case 'media-gallery':
        data = {
          images: await mediaService.getImages(),
          videos: await mediaService.getVideos()
        };
        break;
      default:
        throw new Error('Invalid data type');
    }
    return data as unknown as T;
  } catch (error) {
    console.error(`Error reading data for ${type}:`, error);
    if (type === 'settings' || type === 'media-gallery') {
       return {} as T;
    }
    return [] as unknown as T;
  }
}

export async function writeData<T>(type: DataType, data: T): Promise<void> {
  try {
    switch (type) {
      case 'products':
        await productService.setAll(data as any);
        break;
      case 'categories':
        await categoryService.setAll(data as any);
        break;
      case 'articles':
        await articleService.setAll(data as any);
        break;
      case 'jobs':
        await jobService.setAll(data as any);
        break;
      case 'animal-tags':
        await animalTagService.setAll(data as any);
        break;
      case 'menus':
        await menuService.setAll(data as any);
        break;
      case 'settings':
        await settingService.updateSettings(data as any);
        break;
      case 'banners':
        await bannerService.setAll(data as any);
        break;
      default:
        throw new Error('Invalid data type for write');
    }
  } catch (error) {
    console.error(`Error writing data for ${type}:`, error);
    throw new Error(`Failed to save data for ${type}`);
  }
}
