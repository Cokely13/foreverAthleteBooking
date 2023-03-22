const Sequelize = require('sequelize')
const db = require('../db')

const Session = db.define('session', {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  confirmed: {
    type: Sequelize.ENUM('pending', 'confirmed', 'denied'),
    allowNull: false,
    defaultValue: 'pending'

  }
})

module.exports = Result
