import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, phone, email, source, stage } = req.body;

      const lead = await prisma.lead.create({
        data: { name, phone, email, source, stage },
      });

      // ⏰ Auto-create follow-up
      await prisma.followUp.create({
        data: {
          leadId: lead.id,
          reminderDate: new Date(), // set to today or use custom logic
          status: "pending",
          note: "Initial follow-up created automatically.",
        },
      });

      return res.status(201).json(lead);
    } catch (err: any) {
      console.error("❌ Error:", err);
      return res.status(500).json({ message: "Failed to create lead", error: err.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
