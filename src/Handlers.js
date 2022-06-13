const { langList, t, switchLang } = require('./utils/lang')
const availableLangs = require('./constants/availableLangs')

class Handlers {
  constructor(bot) {
    this.bot = bot

    this.handleStart = this.handleStart.bind(this)
    this.handleSwitchLang = this.handleSwitchLang.bind(this)
  }

  async handleStart({ chat }) {
    const { id, first_name, last_name, username } = chat
    const keyboard = [langList.map((lang) => ({ text: availableLangs[lang] }))]
    const option = this._getDefaultKeyboardOptions(keyboard)

    await this.bot.sendMessage(id, t('fillProfile.lang.select'), option)
  }

  async handleSwitchLang({ chat, text }) {
    const { entries, fromEntries } = Object
    const availableLangsEntries = entries(availableLangs).map(([key, value]) => [value, key])
    const selectedLang = fromEntries(availableLangsEntries)[text]

    switchLang(selectedLang)

    const { id } = chat
    const lang = availableLangs[selectedLang]
    const keyboard = [[{ text: t('actions.continue') }, { text: t('actions.change') }]]
    const option = this._getDefaultKeyboardOptions(keyboard)

    await this.bot.sendMessage(id, t('fillProfile.lang.confirm', { lang }), option)
  }

  _getDefaultKeyboardOptions(keyboard) {
    const data = { keyboard, resize_keyboard: true, one_time_keyboard: true }

    return { reply_markup: JSON.stringify(data) }
  }
}

module.exports = Handlers
