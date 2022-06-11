require('dotenv').config({ path: '.env' })

const TelegramBot = require('node-telegram-bot-api')

const initLang = require('./utils/lang')
const Handlers = require('./Handlers')
const Events = require('./Events')

const { TOKEN: token } = process.env
const bot = new TelegramBot(token, { polling: true })

const runBot = () => {
  initLang()

  new Events(bot, new Handlers(bot))
}

runBot()
