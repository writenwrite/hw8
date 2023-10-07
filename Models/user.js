const Sequelize = require('sequelize');
const sequelize = require('../Config/db');

const User = sequelize.define('user', {
    email: Sequelize.STRING,
    gender: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.STRING

}, {
    timestamps: false, // Disable timestamps
});

module.exports = User;
