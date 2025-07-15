import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
    });
  }

  try {
    const data = await req.json();

    await pool.query(
      `INSERT INTO leads (
        name, email, phone, city, country, area_interested_in,
        plan_interested_in, property_type, project_interested_in, budget,
        plan_on_purchasing, lead_source, agent
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
      )`,
      [
        data.name,
        data.email,
        data.phone,
        data.city,
        data.country,
        data.areaInterestedIn,
        data.planInterestedIn,
        data.propertyType,
        data.projectInterestedIn,
        data.budget,
        data.planOnPurchasing,
        data.leadSource,
        data.agent,
      ]
    );

    return new Response(JSON.stringify({ message: 'Lead added successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error("Insert Error:", error);
    return new Response(JSON.stringify({ error: 'Failed to add lead' }), {
      status: 500,
    });
  }
}
