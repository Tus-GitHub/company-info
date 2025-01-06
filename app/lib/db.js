<<<<<<< HEAD
import { Pool } from 'pg'; 

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
=======
// lib/db.js
import { Pool } from 'pg'; // Import PostgreSQL client

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Make sure to set this in your environment variables
>>>>>>> bd5de844634343ec74ceae59d9b67d59c01744f0
});

export const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> bd5de844634343ec74ceae59d9b67d59c01744f0
