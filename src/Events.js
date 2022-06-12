const commandTypes = require('./constants/commandTypes')

class Events {
  constructor(bot, { handleStart }) {
    this.bot = bot
    this.handleStart = handleStart

    this.initEvents = this.initEvents.bind(this)
  }

  initEvents() {
    this.bot.on('message', this._initMessageEvents.bind(this))
  }

  _initMessageEvents(message, metadata) {
    try {
      const handler = {
        [commandTypes.start]: this.handleStart
      }[message.text]

      handler(message, metadata)
    } catch (e) {
      console.warn(e)
    }
  }
}

module.exports = Events
