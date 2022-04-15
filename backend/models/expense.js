const sequelize = require('../util/database');
const Sequilze = require('sequelize');

const Expense = sequelize.define('expense', {
    id: {
        type: Sequilze.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: Sequilze.STRING,
        allowNull: false
    },
    amount: {
        type: Sequilze.INTEGER,
        allowNull: false
    },
    category: {
        type: Sequilze.STRING,
        allowNull: false
    },

});


module.exports = Expense;
