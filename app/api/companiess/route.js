'use server';

import { query } from "@/app/lib/db";

export async function GET() {
  try {
    const result = await query('SELECT * FROM companies');
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    console.error(err); // Log the error to understand the issue
    return new Response(
      JSON.stringify({ error: 'Failed to fetch companies' }),
      { status: 500 }
    );
  }
}