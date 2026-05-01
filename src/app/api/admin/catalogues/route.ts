import { NextResponse } from 'next/server';
import { catalogueService } from '@/services';

export async function GET() {
  try {
    const data = await catalogueService.getAll();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch catalogues' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const id = await catalogueService.create(data);
    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create catalogue' }, { status: 500 });
  }
}
