//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Session = require('./models/Session')
const Result = require('./models/Result')

//associations could go here!
Session.belongsTo(User)
User.hasMany(Session)
User.hasMany(Result);
Result.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Session,
    Result
  },
}
