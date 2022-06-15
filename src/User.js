const { uid } = require('uid')
const userConnectionStatuses = require('./constants/userConnectionStatuses')

class User {
  constructor() {
    this.updateData = this.updateData.bind(this)
  }

  data = {
    id: uid(),
    chatId: null,
    firstName: null,
    lastName: null,
    username: null,
    status: userConnectionStatuses.missing,
    lang: null,
    location: null,
    mailing: null
  }

  get chatId() {
    return this.data.chatId
  }

  get firstName() {
    return this.data.firstName
  }

  get lastName() {
    return this.data.lastName
  }

  get userName() {
    return this.data.username
  }

  get status() {
    return this.data.status
  }

  get isConnected() {
    return this.status === userConnectionStatuses.connected
  }

  updateData(data) {
    this.data = { ...this.data, ...data }
  }
}

module.exports = User
