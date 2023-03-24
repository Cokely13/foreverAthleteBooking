const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Result = sequelize.define('Result', {
  duration: {
    type: DataTypes.INTERVAL,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  event: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Result
