const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./Config/db');
const userRoutes = require('./Routes/userRoutes');
const movieRoutes = require('./Routes/movieRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const port = 3000;

// Middleware untuk parsing JSON
app.use(bodyParser.json());

sequelize
    .sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

// Menghubungkan routes
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Tambahkan rute untuk dokumentasi Swagger


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
