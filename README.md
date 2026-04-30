# Task Manager API

Backend REST API untuk aplikasi Task Manager menggunakan **Node.js**, **Express**, dan **PostgreSQL**.

---

## 🛠️ Persiapan

### 1. Install dependencies
```bash
npm install
```

### 2. Setup Database PostgreSQL
Buka PostgreSQL dan jalankan perintah berikut:
```sql
CREATE DATABASE task_manager_db;
\c task_manager_db
```
Lalu jalankan script `migration.sql`:
```bash
psql -U postgres -d task_manager_db -f migration.sql
```

### 3. Konfigurasi Environment
Salin file `.env.example` menjadi `.env` dan sesuaikan:
```bash
cp .env.example .env
```

### 4. Jalankan Server (dengan nodemon)
```bash
npm run dev
```

---

## 📡 Endpoint API

| Method | Endpoint      | Deskripsi                     | Body (JSON)                          |
|--------|---------------|-------------------------------|--------------------------------------|
| GET    | /tasks        | Ambil semua tugas             | -                                    |
| GET    | /tasks/:id    | Ambil satu tugas by ID        | -                                    |
| POST   | /tasks        | Tambah tugas baru             | `{ title, description }`             |
| PUT    | /tasks/:id    | Update tugas                  | `{ title, description, is_completed }`|
| DELETE | /tasks/:id    | Hapus tugas                   | -                                    |

---

## 📋 Contoh Request & Response

### POST /tasks
```json
// Request Body
{ "title": "Belajar Node.js", "description": "Pelajari dasar-dasar Node.js" }

// Response 201
{ "status": "success", "message": "Task berhasil ditambahkan.", "data": { ... } }

// Response 400 (title kosong)
{ "status": "error", "message": "Field 'title' tidak boleh kosong atau hanya berisi spasi." }
```

### GET /tasks/:id (tidak ditemukan)
```json
// Response 404
{ "status": "error", "message": "Task dengan ID 99 tidak ditemukan." }
```

---

## 🏗️ Struktur Project

```
task-manager/
├── index.js          # Entry point & konfigurasi Express
├── db.js             # Koneksi Pool PostgreSQL (pg)
├── middleware.js     # Logging & validasi input
├── routes/
│   └── tasks.js      # Semua endpoint /tasks
├── migration.sql     # Script SQL buat tabel
├── .env.example      # Template konfigurasi
└── package.json
```

---

## ⚙️ Fitur

- ✅ **Middleware Logging** — Mencetak method, URL, dan timestamp setiap request
- ✅ **Validasi Input (400)** — Field `title` tidak boleh kosong
- ✅ **Error 404** — ID tidak ditemukan saat GET, PUT, DELETE
- ✅ **PostgreSQL** — Koneksi via package `pg` (Pool)
- ✅ **Nodemon** — Auto-restart saat file berubah (`npm run dev`)
