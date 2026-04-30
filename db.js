const { Pool } = require('pg');

// Konfigurasi koneksi ke PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'task_manager_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres123',
});

// Test koneksi saat startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('Gagal terhubung ke PostgreSQL:', err.message);
  } else {
    console.log('Berhasil terhubung ke PostgreSQL!');
    release();
  }
});

module.exports = pool;
