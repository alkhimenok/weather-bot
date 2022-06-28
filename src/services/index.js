const User = require('./User')
const Weather = require('./Weather')

const user = new User()
const weather = new Weather()

module.exports = { ...user, ...weather }
