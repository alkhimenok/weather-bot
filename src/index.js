require('dotenv').config({ path: '.env' })

const TelegramBot = require('node-telegram-bot-api')

const Events = require('./models/Events')
const Commands = require('./models/Commands')
const { initLang } = require('./utils')

;(() => {
  const { BOT_TOKEN: token } = process.env

  const bot = new TelegramBot(token, { polling: true })
  const { initEvents, initHandlers } = new Events(bot)
  const { initCommands } = new Commands(bot)

  initLang()
  initEvents()
  initHandlers()
  initCommands()
})()
