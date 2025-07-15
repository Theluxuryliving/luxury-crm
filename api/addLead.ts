// api/addLead.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Only POST allowed" });

  const {
    name, email, phone, city, country, areaInterestedIn,
    planInterestedIn, propertyType, projectInterestedIn,
    budget, planOnPurchasing, leadSource, agent
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO leads (
        name, email, phone, city, country, area_interested_in,
        plan_interested_in, property_type, project_interested_in,
        budget, plan_on_purchasing, lead_source, agent
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9,
        $10, $11, $12, $13
      ) RETURNING *`,
      [
        name, email, phone, city, country, areaInterestedIn,
        planInterestedIn, propertyType, projectInterestedIn,
        budget, planOnPurchasing, leadSource, agent,
      ]
    );

    res.status(200).json({ message: "Lead saved successfully", lead: result.rows[0] });
  } catch (error) {
    console.error("Error saving lead:", error);
    res.status(500).json({ message: "Failed to save lead", error });
  }
}
