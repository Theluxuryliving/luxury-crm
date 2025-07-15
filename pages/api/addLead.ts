// src/pages/api/addLead.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // from .env
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name, email, phone, city, country, area,
    plan, propertyType, project, budget,
    purchasePlan, source
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO leads 
        (name, email, phone, city, country, area, plan, property_type, project, budget, purchase_plan, source)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [name, email, phone, city, country, area, plan, propertyType, project, budget, purchasePlan, source]
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ DB insert error:", error);
    return res.status(500).json({ error: 'DB insert failed' });
  }
}
