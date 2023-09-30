// const express = require('express');
// const { Pool } = require('pg');

// const app = express();
// const port = process.env.PORT || 3000; // Port yang digunakan (dapat disesuaikan)

// // Konfigurasi koneksi database PostgreSQL
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'HW8',
//     password: 'admin123',
//     port: 5432, // Port default PostgreSQL
// });

// // Test koneksi database
// pool.connect()
//   .then(() => {
//     console.log('Connected to PostgreSQL database');
//   })
//   .catch((err) => {
//     console.error('Error connecting to database', err);
//   });

// // Middleware untuk mengizinkan aplikasi Express.js menerima JSON
// app.use(express.json());

// // Mulai server Express.js
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/routes'); //

// Middleware
app.use(express.json());

// Gunakan routing
app.use('/api', routes);


// ...
