import { NextResponse } from 'next/server';
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;

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
        return NextResponse.json({ error: 'Invalid data type' }, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  
  // Basic security check for modification requests
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.ADMIN_SECRET_TOKEN || 'sanfovet-dev-token';
  
  if (authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    switch (type) {
      case 'products':
        await productService.setAll(body);
        break;
      case 'categories':
        await categoryService.setAll(body);
        break;
      case 'articles':
        await articleService.setAll(body);
        break;
      case 'jobs':
        await jobService.setAll(body);
        break;
      case 'animal-tags':
        await animalTagService.setAll(body);
        break;
      case 'menus':
        await menuService.setAll(body);
        break;
      case 'settings':
        await settingService.updateSettings(body);
        break;
      case 'banners':
        await bannerService.setAll(body);
        break;
      // Note: media-gallery might need more specific handling if updated as a whole
      default:
        return NextResponse.json({ error: 'Invalid data type' }, { status: 400 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error saving ${type}:`, error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
