require('dotenv').config();

const express = require('express');
const { loggingMiddleware } = require('./middleware');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// Built-in Middleware
// ============================================
app.use(express.json());           // Parse body JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body

// ============================================
// Custom Middleware: Logging
// Mencetak metode HTTP, URL, dan waktu request
// ============================================
app.use(loggingMiddleware);

// ============================================
// Routes
// ============================================
app.use('/tasks', taskRoutes);

// Route utama untuk cek API berjalan
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Task Manager API berjalan!',
    endpoints: {
      'GET /tasks':        'Ambil semua tugas',
      'GET /tasks/:id':    'Ambil satu tugas berdasarkan ID',
      'POST /tasks':       'Tambah tugas baru',
      'PUT /tasks/:id':    'Update data tugas',
      'DELETE /tasks/:id': 'Hapus tugas',
    },
  });
});

// ============================================
// Global Error Handler (404 untuk route tidak dikenal)
// ============================================
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route '${req.originalUrl}' tidak ditemukan.`,
  });
});

// ============================================
// Start Server
// ============================================
app.listen(PORT, () => {
  console.log('=========================================');
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log('=========================================');
});
