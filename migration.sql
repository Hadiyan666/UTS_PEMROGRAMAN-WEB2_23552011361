-- ============================================
-- Script SQL untuk membuat database Task Manager
-- Jalankan script ini di PostgreSQL terlebih dahulu
-- ============================================

-- Buat database (jalankan sebagai superuser di psql)
-- CREATE DATABASE task_manager_db;

-- Gunakan database (uncomment jika perlu)
-- \c task_manager_db;

-- Buat tabel tasks
CREATE TABLE IF NOT EXISTS tasks (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT false,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contoh data awal (opsional)
INSERT INTO tasks (title, description) VALUES
  ('Belajar Express.js', 'Pelajari framework Express untuk Node.js'),
  ('Setup PostgreSQL', 'Konfigurasi database PostgreSQL untuk project'),
  ('Buat REST API', 'Implementasi endpoint CRUD untuk Task Manager');
