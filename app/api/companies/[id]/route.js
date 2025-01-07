'use server';

import { query } from "@/app/lib/db";

export async function GET(request, context) {
  try {
    const { id } = await context.params;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID parameter is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch the company by ID
    const companyResult = await query("SELECT * FROM companies WHERE id = $1", [id]);
    const directorsResult = await query("SELECT name FROM directors WHERE company_id = $1", [id]);

    if (companyResult.rows.length === 0) {
      return new Response(
        JSON.stringify({ error: "Company not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const company = companyResult.rows[0];
    const directors = directorsResult.rows.map((row) => row.name);

    const responseData = [
      {
        description: company.description,
        directors: directors,
        name:company.name
      }
    ];

    return new Response(
      JSON.stringify(responseData),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching company details:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch company details" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
