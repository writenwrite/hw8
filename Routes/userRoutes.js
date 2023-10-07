const express = require('express');
const userController = require('../Controllers/userController');

const router = express.Router();

// Endpoint untuk mendaftar pengguna

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Mendapatkan daftar pengguna
 *     description: Mendapatkan daftar semua pengguna.
 *     responses:
 *       '200':
 *         description: Sukses mendapatkan daftar pengguna
 *       '500':
 *         description: Kesalahan server
 */
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser)
router.get('/users', userController.getUsersWithPagination);


module.exports = router;
