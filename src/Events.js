const commandTypes = require('./constants/commandTypes')
const queryTypes = require('./constants/queryTypes')

class Events {
  constructor(bot, { handleStart, handleSetLang, handleConfirmLang, handleChangeLang }) {
    this.bot = bot
    this.handleStart = handleStart
    this.handleSetLang = handleSetLang
    this.handleConfirmLang = handleConfirmLang
    this.handleChangeLang = handleChangeLang

    this.initEvents = this.initEvents.bind(this)
  }

  initEvents() {
    this.bot.on('message', this._initMessageEvents.bind(this))
    this.bot.on('callback_query', this._initCallbackEvents.bind(this))
  }

  _initMessageEvents(message, metadata) {
    const type = message.text

    try {
      const handler = {
        [commandTypes.start]: this.handleStart
      }[type]

      handler(message, metadata)
    } catch (e) {
      console.warn('_initMessageEvents', e)
    }
  }

  _initCallbackEvents(query) {
    const [type, option] = query.data.split(':')

    try {
      const handler = {
        [queryTypes.setLang]: this.handleSetLang,
        [queryTypes.confirmLang]: this.handleConfirmLang,
        [queryTypes.changeLang]: this.handleChangeLang
      }[type]

      handler(query, option)
    } catch (e) {
      console.warn('_initCallbackEvents', e)
    }
  }
}

module.exports = Events
