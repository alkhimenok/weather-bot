const messageTypes = require('./constants/messageTypes')

class Events {
  constructor(bot, { handleStart }) {
    this.bot = bot
    this.handleStart = handleStart

    this.initMessageEvents = this.initMessageEvents.bind(this)

    this.initEvents()
  }

  initEvents() {
    this.bot.on('message', this.initMessageEvents)
  }

  initMessageEvents(message, metadata) {
    try {
      const handler = {
        [messageTypes.start]: this.handleStart
      }[message.text]

      handler(message, metadata)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = Events
