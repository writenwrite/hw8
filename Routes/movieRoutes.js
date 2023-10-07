const express = require('express');
const movieController = require('../Controllers/movieController');

const router = express.Router();

// GET movies with pagination
router.get('/movies', movieController.getMoviesWithPagination);

module.exports = router;
