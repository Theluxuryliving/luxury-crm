import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, phone, email, source, status } = req.body;

    const newLead = await prisma.lead.create({
      data: { name, phone, email, source, status },
    });

    return res.status(201).json(newLead);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create lead' });
  }
}
