// api/getLeads.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Only GET allowed" });

  try {
    const result = await pool.query(`SELECT * FROM leads ORDER BY created_at DESC`);
    res.status(200).json({ leads: result.rows });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Failed to get leads", error });
  }
}
