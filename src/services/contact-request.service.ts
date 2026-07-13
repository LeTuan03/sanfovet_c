import prisma from '@/lib/prisma';

export class ContactRequestService {
  async getAll() {
    return prisma.contactRequest.findMany({ orderBy: { id: 'desc' } });
  }

  async getById(id: any) {
    return prisma.contactRequest.findUnique({ where: { id: BigInt(id) as any } });
  }

  async create(data: any) {
    const rec = await prisma.contactRequest.create({
      data: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        emailAddress: data.emailAddress || '',
        messageBox: data.messageBox || '',
        locale: data.locale === 'en' ? 'en' : 'vi',
      },
    });
    return String(rec.id);
  }

  async update(id: any, data: any) {
    if (!id) throw new Error('ID is required');
    const { id: _, ...updateData } = data;
    await prisma.contactRequest.update({
      where: { id: BigInt(id) as any },
      data: updateData,
    });
  }

  async delete(id: any) {
    if (!id) throw new Error('ID is required');
    await prisma.contactRequest.delete({ where: { id: BigInt(id) as any } });
  }
}

export const contactRequestService = new ContactRequestService();
