'use server';

import { query } from "@/app/lib/db";

export async function GET() {
  try {
    const result = await query('SELECT * FROM companies');
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
<<<<<<< HEAD
    console.error(err);
=======
    console.error(err); // Log the error to understand the issue
>>>>>>> bd5de844634343ec74ceae59d9b67d59c01744f0
    return new Response(
      JSON.stringify({ error: 'Failed to fetch companies' }),
      { status: 500 }
    );
  }
}