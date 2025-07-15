import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const result = await sql`
      SELECT * FROM leads
      ORDER BY created_at DESC
    `;

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching leads:", error);
    return res.status(500).json({ message: "Failed to fetch leads" });
  }
}
