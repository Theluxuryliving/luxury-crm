import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const {
    query: { id },
    method,
    body,
  } = req;

  if (method === 'PUT') {
    const updated = await prisma.followup.update({
      where: { id: parseInt(id) },
      data: body,
    });
    res.status(200).json(updated);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
