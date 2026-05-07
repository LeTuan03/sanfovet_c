import prisma from '@/lib/prisma';

export class JobService {
  async getAll() {
    return prisma.job.findMany({ orderBy: { id: 'desc' } });
  }

  async getAllSummary() {
    return prisma.job.findMany({
      orderBy: { id: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        location: true,
        date: true,
        status: true,
      },
    });
  }

  async getById(id: any) {
    return prisma.job.findUnique({ where: { id: BigInt(id) as any } });
  }

  async getBySlug(slug: string) {
    return prisma.job.findUnique({ where: { slug } });
  }

  async create(data: any) {
    const { id, ...createData } = data;
    const job = await prisma.job.create({ data: createData });
    return String(job.id);
  }

  async update(id: any, data: any) {
    if (!id) throw new Error('ID is required');
    const { id: _, ...updateData } = data;
    await prisma.job.update({ 
      where: { id: BigInt(id) as any }, 
      data: updateData 
    });
  }

  async delete(id: any) {
    if (!id) throw new Error('ID is required');
    await prisma.job.delete({ where: { id: BigInt(id) as any } });
  }
}

export const jobService = new JobService();
