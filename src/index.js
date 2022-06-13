require('dotenv').config({ path: '.env' })

const TelegramBot = require('node-telegram-bot-api')

const Handlers = require('./Handlers')
const Events = require('./Events')
const Commands = require('./Commands')
const { initLang } = require('./utils/lang')

const { BOT_TOKEN: token } = process.env
const bot = new TelegramBot(token, { polling: true })

const runBot = () => {
  const handlers = new Handlers(bot)
  const { initEvents } = new Events(bot, handlers)
  const { initCommands } = new Commands(bot)

  initLang()
  initEvents()
  initCommands()
}

runBot()
