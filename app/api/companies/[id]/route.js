'use server';

<<<<<<< HEAD
import { query } from "@/app/lib/db";

export async function GET(request, context) {
  try {
    const { id } = await context.params;
=======
import { query } from "@/app/lib/db"; // Adjust the path if necessary

export async function GET(request, context) {
  try {
    const { id } = await context.params; // Await to properly access params
>>>>>>> bd5de844634343ec74ceae59d9b67d59c01744f0

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

<<<<<<< HEAD
=======
    // Combine company description and directors into a single array
>>>>>>> bd5de844634343ec74ceae59d9b67d59c01744f0
    const responseData = [
      {
        description: company.description,
        directors: directors
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
<<<<<<< HEAD
}
=======
}
>>>>>>> bd5de844634343ec74ceae59d9b67d59c01744f0
