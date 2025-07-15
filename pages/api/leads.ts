import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const leads = await prisma.lead.findMany({ include: { followups: true } });
    res.status(200).json(leads);
  } else if (req.method === 'POST') {
    const { name, stage } = req.body;
    const lead = await prisma.lead.create({
      data: { name, stage: stage || "New" },
    });
    res.status(201).json(lead);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
