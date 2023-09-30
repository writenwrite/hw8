const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers'); // Sesuaikan dengan struktur proyek Anda

// Rute untuk menampilkan detail film berdasarkan ID
router.get('/film/:id', controllers.getFilmById);

module.exports = router;
