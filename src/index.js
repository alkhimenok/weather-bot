require('dotenv').config({ path: '.env' })

const TelegramBot = require('node-telegram-bot-api')

const User = require('./User')
const Handlers = require('./Handlers')
const Events = require('./Events')
const Commands = require('./Commands')
const { initLang } = require('./utils/lang')

const runBot = () => {
  const { BOT_TOKEN: token } = process.env
  const bot = new TelegramBot(token, { polling: true })
  const user = new User()
  const handlers = new Handlers(bot, user)
  const { initEvents } = new Events(bot, handlers)
  const { initCommands } = new Commands(bot)

  initLang()
  initEvents()
  initCommands()
}

runBot()
