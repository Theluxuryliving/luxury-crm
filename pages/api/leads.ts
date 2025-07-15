
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch leads' });
  }
}
