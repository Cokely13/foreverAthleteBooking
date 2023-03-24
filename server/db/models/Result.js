
const { DataTypes } = require('sequelize');
const db = require('../db');

const Result = db.define('result', {
  duration: {
    type: DataTypes.STRING,
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

module.exports = Result;
