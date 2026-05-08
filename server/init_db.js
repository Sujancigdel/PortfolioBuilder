const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dbConfig = {
  connectionString: process.env.DATABASE_URL.replace('/portfolio_db', '/postgres'), // Connect to 'postgres' default DB
};

async function initDB() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('Connected to Postgres...');

    // Check if db exists
    const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'portfolio_db'");
    if (res.rowCount === 0) {
      console.log('Creating database portfolio_db...');
      await client.query('CREATE DATABASE portfolio_db');
    } else {
      console.log('Database portfolio_db already exists.');
    }

    await client.end();

    // Now connect to the new DB
    const portfolioClient = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    
    await portfolioClient.connect();
    console.log('Connected to portfolio_db...');

    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Running schema...');
    await portfolioClient.query(schemaSql);
    console.log('Schema applied successfully.');

    await portfolioClient.end();

  } catch (err) {
    console.error('Error initializing database:', err);
    if (err.code === '28P01') {
      console.error('Authentication check failed. Please verify .env password.');
    }
  }
}

initDB();
