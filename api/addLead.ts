// /api/addLead.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    name, email, phone, city, country,
    area, plan, propertyType, project,
    budget, purchasePlan, source
  } = req.body;

  try {
    await pool.query(`
      INSERT INTO leads (
        name, email, phone, city, country,
        area, plan, property_type, project,
        budget, purchase_plan, source
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    `, [
      name, email, phone, city, country,
      area, plan, propertyType, project,
      budget, purchasePlan, source
    ]);

    res.status(200).json({ message: "Lead added" });
  } catch (err) {
    console.error("Error inserting lead:", err);
    res.status(500).json({ message: "Error inserting lead" });
  }
}
