import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const followups = await prisma.followup.findMany({ include: { lead: true } });
    res.status(200).json(followups);
  } else if (req.method === 'POST') {
    const { type, date, agent, leadId } = req.body;
    const followup = await prisma.followup.create({
      data: { type, date: new Date(date), agent, leadId },
    });
    res.status(201).json(followup);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
