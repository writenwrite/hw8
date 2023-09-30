const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  // Konfigurasi koneksi database
});

// Middleware
app.use(express.json());

// ...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
