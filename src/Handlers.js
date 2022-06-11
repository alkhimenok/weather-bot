const { t } = require('./utils/lang')

class Handlers {
  constructor(bot) {
    this.bot = bot

    this.handleStart = this.handleStart.bind(this)
  }

  handleStart(message, messageTypes) {
    this.bot.sendMessage(message.chat.id, t('welcome')).then(() => console.log('send'))
  }
}

module.exports = Handlers
