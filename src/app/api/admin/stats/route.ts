import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [productsCount, categoriesCount, articlesCount, jobsCount, latestArticles] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.article.count(),
      prisma.job.count(),
      prisma.article.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          slug: true,
          title: true,
          category: true,
          publishDate: true,
          thumbnail: true,
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        products: productsCount,
        categories: categoriesCount,
        articles: articlesCount,
        jobs: jobsCount,
      },
      latestArticles,
    });
  } catch (error) {
    console.error('Failed to fetch admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
