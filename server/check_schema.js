const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.query(`
  SELECT column_name, data_type, character_maximum_length 
  FROM information_schema.columns 
  WHERE table_name = 'templates'
`).then(res => {
    console.log(res.rows.map(r => `${r.column_name}: ${r.data_type} (${r.character_maximum_length})`).join(' | '));
    return pool.end();
}).catch(console.error);
