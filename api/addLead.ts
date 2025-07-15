// pages/api/addLead.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const leads = Array.isArray(req.body) ? req.body : [req.body];

  try {
    const client = await pool.connect();

    for (const lead of leads) {
      const {
        name, phone, email, city, country, area,
        plan, propertyType, project, budget,
        purchasePlan, source
      } = lead;

      await client.query(
        `INSERT INTO leads (
          name, phone, email, city, country, area,
          plan, property_type, project, budget,
          purchase_plan, source
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10,
          $11, $12
        )`,
        [
          name || null,
          phone || null,
          email || null,
          city || null,
          country || null,
          area || null,
          plan || null,
          propertyType || null,
          project || null,
          parseFloat(budget) || 0,
          purchasePlan || null,
          source || null,
        ]
      );
    }

    client.release();
    res.status(200).json({ message: "Lead(s) added successfully" });
  } catch (error) {
    console.error("❌ Error inserting leads:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
