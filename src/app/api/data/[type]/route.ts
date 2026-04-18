import { NextResponse } from 'next/server';
import { readData, writeData, DataType } from '@/lib/storage';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type: rawType } = await params;
  const type = rawType as DataType;
  
  // Basic validation of data type
  const validTypes: DataType[] = [
    'products', 'categories', 'articles', 'jobs', 
    'animal-tags', 'menus', 'settings', 'banners', 'media-gallery'
  ];
  
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: 'Invalid data type' }, { status: 400 });
  }

  try {
    const data = await readData(type);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type: rawType } = await params;
  const type = rawType as DataType;
  
  const validTypes: DataType[] = [
    'products', 'categories', 'articles', 'jobs', 
    'animal-tags', 'menus', 'settings', 'banners', 'media-gallery'
  ];
  
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: 'Invalid data type' }, { status: 400 });
  }

  // Basic security check for modification requests
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.ADMIN_SECRET_TOKEN || 'sanfovet-dev-token';
  
  if (authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    await writeData(type, body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
