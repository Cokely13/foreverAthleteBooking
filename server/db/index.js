//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Session = require('./models/Session')

//associations could go here!
Session.belongsTo(User)
User.hasMany(Session)

module.exports = {
  db,
  models: {
    User,
    Session
  },
}
