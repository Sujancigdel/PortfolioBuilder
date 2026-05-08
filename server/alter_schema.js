const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
    try {
        await pool.query(`
      ALTER TABLE templates
      ALTER COLUMN name TYPE VARCHAR(255),
      ALTER COLUMN description TYPE TEXT,
      ALTER COLUMN html_structure TYPE TEXT,
      ALTER COLUMN css_styles TYPE TEXT,
      ALTER COLUMN preview_image_url TYPE TEXT;
    `);
        console.log("Migration successful");
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}
migrate();
