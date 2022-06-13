const commandTypes = require('./constants/commandTypes')
const availableLangs = require('./constants/availableLangs')

class Events {
  constructor(bot, { handleStart, handleSwitchLang }) {
    this.bot = bot
    this.handleStart = handleStart
    this.handleSwitchLang = handleSwitchLang

    this.initEvents = this.initEvents.bind(this)
  }

  initEvents() {
    this.bot.on('message', this._initMessageEvents.bind(this))
    this.bot.on('callback_query', this._initCallbackEvents.bind(this))
  }

  _initMessageEvents(message, metadata) {
    const { values, fromEntries } = Object
    const langTitleList = values(availableLangs)
    const langHandlers = fromEntries(langTitleList.map((lang) => [lang, this.handleSwitchLang]))

    try {
      const handler = {
        [commandTypes.start]: this.handleStart,
        ...langHandlers
      }[message.text]

      handler(message, metadata)
    } catch (e) {
      console.warn('_initMessageEvents', e)
    }
  }

  _initCallbackEvents(message, metadata) {
    try {
      console.log('_initCallbackEvents', message, metadata)
    } catch (e) {
      console.warn('_initCallbackEvents', e)
    }
  }
}

module.exports = Events
