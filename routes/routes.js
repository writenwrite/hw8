const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

// Definisikan route-routemu di sini
router.get('/', controllers.getAllData);
router.get('/:id', controllers.getDataById);
// ...

module.exports = router;
