// ============================================
// Middleware Kustom untuk Task Manager API
// ============================================

/**
 * Middleware Logging
 * Mencetak metode HTTP, URL, dan waktu setiap ada request masuk
 */
const loggingMiddleware = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url}`);

  next(); // Lanjut ke handler berikutnya
};

/**
 * Middleware Validasi Title
 * Memastikan field 'title' tidak kosong atau hanya berisi spasi
 * Digunakan pada endpoint POST dan PUT /tasks
 */
const validateTitle = (req, res, next) => {
  const { title } = req.body;

  // Cek apakah title ada dan tidak hanya berisi spasi
  if (!title || title.trim() === '') {
    return res.status(400).json({
      status: 'error',
      message: "Field 'title' tidak boleh kosong atau hanya berisi spasi.",
    });
  }

  next();
};

module.exports = { loggingMiddleware, validateTitle };
