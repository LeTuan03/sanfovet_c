const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log(' Connection successful!');
    const res = await client.query('SELECT current_database(), current_user;');
    console.log('Result:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error(' Connection failed:', err.message);
  }
}

testConnection();
