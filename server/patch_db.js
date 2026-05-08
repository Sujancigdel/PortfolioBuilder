const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function patch() {
  try {
    console.log('Altering templates table...');
    await pool.query('ALTER TABLE templates ALTER COLUMN preview_image_url TYPE TEXT;');
    console.log('Successfully changed preview_image_url to TEXT.');
  } catch (err) {
    console.error('Error altering table:', err);
  } finally {
    pool.end();
  }
}

patch();
