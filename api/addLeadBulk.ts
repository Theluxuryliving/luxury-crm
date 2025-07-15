// api/addLeadBulk.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const { leads } = req.body;

    if (!Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ message: "No leads provided" });
    }

    // Transform: Map incoming data to your Prisma model
    const formattedLeads = leads.map((lead: any) => ({
      name: lead.name || "Unnamed",
      phone: lead.phone || null,
      email: lead.email || null,
      source: lead.source || "imported",
      stage: lead.stage || "new",
      createdAt: new Date(),
    }));

    // Insert into DB
    await prisma.lead.createMany({
      data: formattedLeads,
      skipDuplicates: true,
    });

    return res.status(200).json({ message: "Leads uploaded successfully" });
  } catch (error) {
    console.error("Error uploading leads:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
