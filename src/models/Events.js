const Handlers = require('./Handlers')
const { findUser } = require('../services')
const COMMANDS = require('../constants/commands')
const QUERIES = require('../constants/queries')

class Events {
  constructor(bot) {
    this.bot = bot

    this.initEvents = this.initEvents.bind(this)
    this.initHandlers = this.initHandlers.bind(this)
    this.onStart = this.onStart.bind(this)
  }

  initEvents() {
    this.bot.on('message', this._initMessageEvents.bind(this))
    this.bot.on('callback_query', this._initQueryEvents.bind(this))
    this.bot.on('location', this._initLocationEvents.bind(this))
  }

  initHandlers() {
    const handlers = new Handlers(this.bot)

    this.handleStart = handlers.handleStart

    this.handleSetLang = handlers.handleSetLang
    this.handleApprovedLang = handlers.handleApprovedLang
    this.handleConfirmLang = handlers.handleConfirmLang
    this.handleChangeLang = handlers.handleChangeLang

    this.handleSetLocation = handlers.handleSetLocation
    this.handleApprovedLocation = handlers.handleApprovedLocation
    this.handleConfirmLocation = handlers.handleConfirmLocation
    this.handleChangeLocation = handlers.handleChangeLocation

    this.handleSetAutoSend = handlers.handleSetAutoSend
    this.handleApprovedAutoSend = handlers.handleApprovedAutoSend
    this.handleConfirmAutoSend = handlers.handleConfirmAutoSend
    this.handleChangeAutoSend = handlers.handleChangeAutoSend

    this.handleMessageCatch = handlers.handleMessageCatch
    this.handleQueryCatch = handlers.handleQueryCatch
    this.handleLocationCatch = handlers.handleLocationCatch
  }

  async onStart(message, metadata) {
    const { user } = await findUser(message.chat.id)

    user || this.initHandlers()

    this.handleStart(message, metadata, user)
  }

  _initMessageEvents(message, metadata) {
    const type = message.text

    if (!type) return

    const handler = {
      [COMMANDS.start]: this.onStart
      // [COMMANDS.profile]: '',
      // [COMMANDS.about]: '',
      // [COMMANDS.capabilities]: ''
    }[type]

    this._abstractEvent(handler, this.handleMessageCatch, type, message, metadata)
  }

  _initQueryEvents(query) {
    const [type, option] = query.data.split(':')

    if (!type) return

    const handler = {
      // [QUERIES.setLang]: this.handleSetLang,
      // [QUERIES.confirmLang]: this.handleConfirmLang,
      // [QUERIES.changeLang]: this.handleChangeLang,
      // [QUERIES.confirmLocation]: this.handleConfirmLocation,
      // [QUERIES.changeLocation]: this.handleChangeLocation
    }[type] // ?? handleSearchRegion

    this._abstractEvent(handler, this.handleQueryCatch, type, query, option)
  }

  _initLocationEvents(message, metadata) {
    const { type } = metadata

    this._abstractEvent(this.handleSetLocation, this.handleRequestLocationCatch, type, message)
  }

  _abstractEvent(handler, handleCatch, type, ...params) {
    try {
      handler(...params)
    } catch (e) {
      handleCatch(type, e)
    }
  }
}

module.exports = Events
