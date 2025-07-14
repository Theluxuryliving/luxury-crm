// /api/addLead.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    email,
    phone,
    city,
    country,
    areaInterestedIn,
    planInterestedIn,
    propertyType,
    projectInterestedIn,
    budget,
    planOnPurchasing,
    leadSource,
    agent,
    leadStage,
    lastFollowUp,
    notes,
  } = req.body;

  try {
    const client = await pool.connect();

    const query = `
      INSERT INTO leads (
        name, email, phone, city, country, 
        area_interested_in, plan_interested_in, property_type, project_interested_in,
        budget, plan_on_purchasing, lead_source,
        agent, lead_stage, last_follow_up, notes
      ) VALUES (
        $1, $2, $3, $4, $5, 
        $6, $7, $8, $9, $10, 
        $11, $12, $13, $14, $15, $16
      )
      RETURNING id
    `;

    const values = [
      name,
      email,
      phone,
      city,
      country,
      areaInterestedIn,
      planInterestedIn,
      propertyType,
      projectInterestedIn,
      budget,
      planOnPurchasing,
      leadSource,
      agent || '',
      leadStage || 'New',
      lastFollowUp || new Date().toISOString(),
      notes || '',
    ];

    const result = await client.query(query, values);
    client.release();

    res.status(200).json({ message: 'Lead added', leadId: result.rows[0].id });
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: 'Failed to add lead' });
  }
}
