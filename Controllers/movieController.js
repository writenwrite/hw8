const Movie = require('../Models/movie');

// GET movies with pagination
const getMoviesWithPagination = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Ambil nilai halaman dari query parameter, default ke halaman 1 jika tidak ada
    const limit = parseInt(req.query.limit) || 10; // Ambil nilai batasan dari query parameter, default ke 10 jika tidak ada
    const offset = (page - 1) * limit; // Hitung offset berdasarkan halaman dan batasan

    try {
        const movies = await Movie.findAll({
            limit,
            offset,
        });

        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching movies' });
    }
};

module.exports = {
    getMoviesWithPagination,
};
