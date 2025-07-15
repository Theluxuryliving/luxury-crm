
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);

  if (req.method === 'DELETE') {
    try {
      await prisma.followup.delete({ where: { id } });
      res.status(200).json({ message: 'Follow-up deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete follow-up' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
