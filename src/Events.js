const commandTypes = require('./constants/commandTypes')
const queryTypes = require('./constants/queryTypes')

class Events {
  constructor(bot, handlers) {
    this.bot = bot
    this.handleStart = handlers.handleStart
    // lang
    this.handleSetLang = handlers.handleSetLang
    this.handleConfirmLang = handlers.handleConfirmLang
    this.handleChangeLang = handlers.handleChangeLang
    // location
    // this.handleRequestLocation = handlers.handleRequestLocation
    this.handleSetLocation = handlers.handleSetLocation
    this.handleConfirmLocation = handlers.handleConfirmLocation
    this.handleChangeLocation = handlers.handleChangeLocation

    this.handleMessageCatch = handlers.handleMessageCatch
    this.handleQueryCatch = handlers.handleQueryCatch
    this.handleRequestLocationCatch = handlers.handleRequestLocationCatch

    this.initEvents = this.initEvents.bind(this)
  }

  initEvents() {
    this.bot.on('message', this._initMessageEvents.bind(this))
    this.bot.on('callback_query', this._initQueryEvents.bind(this))

    this.bot.on('location', this._initLocationEvents.bind(this))
    // this.bot.on('polling_error', this._initPollingErrorEvents.bind(this))
  }

  _initMessageEvents(message, metadata) {
    const type = message.text

    if (!type) return

    const handler = {
      [commandTypes.start]: this.handleStart
    }[type]

    this._abstractEvent(handler, this.handleMessageCatch, type, message, metadata)
  }

  _initQueryEvents(query) {
    const [type, option] = query.data.split(':')

    if (!type) return

    const handler = {
      [queryTypes.setLang]: this.handleSetLang,
      [queryTypes.confirmLang]: this.handleConfirmLang,
      [queryTypes.changeLang]: this.handleChangeLang,
      [queryTypes.confirmLocation]: this.handleConfirmLocation,
      [queryTypes.changeLocation]: this.handleChangeLocation
    }[type] // ?? handleSearchRegion

    this._abstractEvent(handler, this.handleQueryCatch, type, query, option)
  }

  _initLocationEvents(message, metadata) {
    const { type } = metadata

    this._abstractEvent(this.handleSetLocation, this.handleRequestLocationCatch, type, message)
  }

  // _initPollingErrorEvents(...error) {
  //   console.log('error', error)
  // }

  _abstractEvent(handler, handleCatch, type, ...params) {
    try {
      handler(...params)
    } catch (e) {
      handleCatch(type, e)
    }
  }
}

module.exports = Events
