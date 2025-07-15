import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const leads = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json(leads);
    } catch (err: any) {
      console.error("❌ Error fetching leads:", err);
      res.status(500).json({ message: "Failed to get leads", error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
