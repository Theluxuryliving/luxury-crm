// api/followups.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const followups = await prisma.followup.findMany({
        include: { lead: true },
        orderBy: { date: 'asc' },
      });
      res.status(200).json(followups);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch follow-ups' });
    }
  }

  else if (req.method === 'POST') {
    try {
      const { leadId, note, date, status, agent } = req.body;
      const newFollowup = await prisma.followup.create({
        data: {
          leadId,
          note,
          date: new Date(date),
          status,
          agent,
        },
      });
      res.status(201).json(newFollowup);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to create follow-up' });
    }
  }

  else if (req.method === 'PUT') {
    try {
      const { id, date, status } = req.body;
      const updated = await prisma.followup.update({
        where: { id },
        data: {
          ...(date && { date: new Date(date) }),
          ...(status && { status }),
        },
      });
      res.status(200).json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update follow-up' });
    }
  }

  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
