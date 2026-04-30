const express = require('express');
const router = express.Router();
const pool = require('../db');
const { validateTitle } = require('../middleware');

// ============================================
// GET /tasks — Ambil semua tugas
// ============================================
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    );

    res.status(200).json({
      status: 'success',
      count: result.rowCount,
      data: result.rows,
    });
  } catch (err) {
    console.error('Error GET /tasks:', err.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// ============================================
// GET /tasks/:id — Ambil satu tugas berdasarkan ID
// ============================================
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    // 404 jika ID tidak ditemukan
    if (result.rowCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: `Task dengan ID ${id} tidak ditemukan.`,
      });
    }

    res.status(200).json({
      status: 'success',
      data: result.rows[0],
    });
  } catch (err) {
    console.error(`Error GET /tasks/${id}:`, err.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// ============================================
// POST /tasks — Tambah tugas baru
// Input: title (wajib), description (opsional)
// ============================================
router.post('/', validateTitle, async (req, res) => {
  const { title, description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title.trim(), description || null]
    );

    res.status(201).json({
      status: 'success',
      message: 'Task berhasil ditambahkan.',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error POST /tasks:', err.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// ============================================
// PUT /tasks/:id — Update data tugas
// ============================================
router.put('/:id', validateTitle, async (req, res) => {
  const { id } = req.params;
  const { title, description, is_completed } = req.body;

  try {
    // Cek apakah task ada terlebih dahulu
    const check = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (check.rowCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: `Task dengan ID ${id} tidak ditemukan.`,
      });
    }

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1, description = $2, is_completed = $3
       WHERE id = $4
       RETURNING *`,
      [
        title.trim(),
        description !== undefined ? description : check.rows[0].description,
        is_completed !== undefined ? is_completed : check.rows[0].is_completed,
        id,
      ]
    );

    res.status(200).json({
      status: 'success',
      message: 'Task berhasil diperbarui.',
      data: result.rows[0],
    });
  } catch (err) {
    console.error(`Error PUT /tasks/${id}:`, err.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// ============================================
// DELETE /tasks/:id — Hapus tugas
// ============================================
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );

    // 404 jika ID tidak ditemukan
    if (result.rowCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: `Task dengan ID ${id} tidak ditemukan.`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Task dengan ID ${id} berhasil dihapus.`,
      data: result.rows[0],
    });
  } catch (err) {
    console.error(`Error DELETE /tasks/${id}:`, err.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

module.exports = router;
