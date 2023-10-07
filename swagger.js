const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0', // Versi OpenAPI
        info: {
            title: 'Movie users',
            version: '1.0.0',
            description: 'movie and user api',
        },
    },
    apis: ['./Routes/*.js'], // Daftar file yang berisi definisi rute
};

const specs = swaggerJsdoc(options);

module.exports = specs;
