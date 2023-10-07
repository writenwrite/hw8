const Sequelize = require('sequelize');
const sequelize = require('../Config/db');

const Movie = sequelize.define('user', {
    titles: Sequelize.STRING,
    genres: Sequelize.STRING,
    years: Sequelize.STRING
}, {
    timestamps: false, // Disable timestamps
});

module.exports = Movie;
