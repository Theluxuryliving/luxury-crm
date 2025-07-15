// pages/api/addLeadBulk.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { leads } = req.body;

  if (!Array.isArray(leads) || leads.length === 0) {
    return res.status(400).json({ error: "Invalid lead data" });
  }

  try {
    const values = leads.map(lead => [
      lead.name || "",
      lead.email || "",
      lead.phone || "",
      lead.city || "",
      lead.country || "🇵🇰 Pakistan",
      lead.area || "",
      lead.plan || "",
      lead.propertyType || "",
      lead.project || "",
      Number(lead.budget) || 0,
      lead.purchasePlan || "",
      lead.source || ""
    ]);

    const insertQuery = `
      INSERT INTO leads (
        name, email, phone, city, country,
        area, plan, property_type, project,
        budget, purchase_plan, source
      )
      SELECT * FROM UNNEST (
        ${values.map((_, i) => `$${i + 1}::text[][]`).join(", ")}
      );
    `;

    // Flatten the array of arrays
    const flatValues = values.reduce((acc, cur) => acc.concat([cur]), []);

    await sql.query(insertQuery, [flatValues]);

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("❌ Bulk insert error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
