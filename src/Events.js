const commandTypes = require('./constants/commandTypes')
const queryTypes = require('./constants/queryTypes')

class Events {
  constructor(bot, handlers) {
    this.bot = bot
    this.handleStart = handlers.handleStart
    this.handleSetLang = handlers.handleSetLang
    this.handleConfirmLang = handlers.handleConfirmLang
    this.handleChangeLang = handlers.handleChangeLang

    this.handleMessageCatch = handlers.handleMessageCatch
    this.handleQueryCatch = handlers.handleQueryCatch

    this.initEvents = this.initEvents.bind(this)
  }

  initEvents() {
    this.bot.on('message', this._initMessageEvents.bind(this))
    this.bot.on('callback_query', this._initQueryEvents.bind(this))
    this.bot.on('polling_error', this._initPollingErrorEvents.bind(this))
  }

  _initMessageEvents(message, metadata) {
    const type = message.text

    const handler = {
      [commandTypes.start]: this.handleStart
    }[type]

    this._abstractEvent(handler, this.handleMessageCatch, type, message, metadata)
  }

  _initQueryEvents(query) {
    const [type, option] = query.data.split(':')

    const handler = {
      [queryTypes.setLang]: this.handleSetLang,
      [queryTypes.confirmLang]: this.handleConfirmLang,
      [queryTypes.changeLang]: this.handleChangeLang
    }[type] // ?? handleSearchRegion

    this._abstractEvent(handler, this.handleQueryCatch, type, query, option)
  }

  _initPollingErrorEvents(...error) {
    console.log('error', error)
  }

  _abstractEvent(handler, handleCatch, type, ...params) {
    console.log('handler', handler.name)

    try {
      handler(...params)
    } catch (e) {
      handleCatch(type, e)
    }
  }
}

module.exports = Events
