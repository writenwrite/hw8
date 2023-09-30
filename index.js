const express = require('express');
const app = express();
const fs = require('fs');
const { Client } = require('pg');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const express = require('express');

const dbConfig = {
    user: 'your_db_user',
    host: 'your_db_host',
    database: 'your_db_name',
    password: 'your_db_password',
    port: 5432, // Sesuaikan dengan port PostgreSQL Anda
};

const pools = new Pool(dbConfig);

app.get('/migrate', async (req, res) => {
    try {
        // Baca file migrasi SQL
        const sqlFilePath = './add_age_column.sql'; // Sesuaikan dengan path file migrasi Anda
        const sql = fs.readFileSync(sqlFilePath, 'utf8');

        // Eksekusi pernyataan SQL
        await pools.query(sql);

        res.status(200).json({ message: 'Migrasi berhasil' });
    } catch (error) {
        console.error('Error migrasi:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat migrasi' });
    }
});

dotenv.config();

// Konfigurasi koneksi ke PostgreSQL
const client = new Client({
    host: 'localhost',
    port: '5433',
    database: 'postgres',
    user: 'postgres',
    password: 'root',
});

client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to database', err);
    });

// Middleware untuk mengizinkan JSON parsing
app.use(express.json());

// Dynamic Routes
app.get('/actors', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM actor');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const pool = new Pool(client);

app.get('/seed-data', async (req, res) => {
    try {
        // Baca file SQL
        const sqlFilePath = './db/seeding.sql'; 
        const sql = fs.readFileSync(sqlFilePath, 'utf8');

        // Eksekusi SQL
        await pool.query(sql);

        res.status(200).json({ message: 'Seeding data berhasil' });
    } catch (error) {
        console.error('Error seeding data:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat menanamkan data' });
    }
});

// endpoint seluruh list film
app.get('/film', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM film');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/film/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('SELECT * FROM film WHERE film_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/actors/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('SELECT * FROM actor WHERE actor_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/category', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM category');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/film/:category', async (req, res) => {
    const categoryName = req.params.category;

    const regex = /^[a-z]+$/i;
    if (!regex.test(categoryName)) {
        return res.status(400).json({ error: 'Category must be a non-empty string' });
    }

    try {
        const query = 'SELECT film.*, category.name FROM film JOIN film_category ON film.film_id = film_category.film_id JOIN category ON film_category.category_id = category.category_id WHERE category.name = $1::TEXT';
        console.log('Query:', query);
        console.log('Parameter:', [categoryName.toString()]);

        const result = await client.query(query, [categoryName.toString()]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Film Category not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Port untuk server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
