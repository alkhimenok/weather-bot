const { langList, t, switchLang } = require('./utils/lang')
const availableLangs = require('./constants/availableLangs')

class Handlers {
  constructor(bot, user) {
    this.bot = bot
    this.user = user

    this.handleStart = this.handleStart.bind(this)
    this.handleSwitchLang = this.handleSwitchLang.bind(this)
    this.handleConfirmLang = this.handleConfirmLang.bind(this)
    this.handleChangeLang = this.handleChangeLang.bind(this)
  }

  async handleStart({ chat }) {
    const { id, first_name, last_name, username } = chat
    const title = t('fillProfile.lang.select')
    const keyboard = this._getLandKeyboard()
    const option = this._getDefaultInlineKeyboardOptions(keyboard)

    await this._sendMessage(id, title, option)
  }

  async handleSwitchLang({ message }, selectedLang) {
    switchLang(selectedLang)

    const lang = availableLangs[selectedLang]
    const title = t('fillProfile.lang.confirm', { lang })
    const keyboard = this._getLangSwitchFinishKeyboard()
    const option = this._getEditDefaultInlineKeyboardOptions(keyboard, message)

    await this._editMessage(title, option)
  }

  async handleConfirmLang(query) {
    console.log('handleConfirmLang')
  }

  async handleChangeLang({ message }) {
    const title = t('fillProfile.lang.change')
    const keyboard = this._getLandKeyboard()
    const option = this._getEditDefaultInlineKeyboardOptions(keyboard, message)

    await this._editMessage(title, option)
  }

  async _sendMessage(id, title, options) {
    await this.bot.sendMessage(id, title, options)
  }

  async _editMessage(title, options) {
    await this.bot.editMessageText(title, options)
  }

  _getDefaultInlineKeyboardOptions(inline_keyboard) {
    const data = { inline_keyboard }

    return { reply_markup: JSON.stringify(data) }
  }

  _getEditDefaultInlineKeyboardOptions(inline_keyboard, { message_id, chat }) {
    const data = { inline_keyboard }
    const { id: chat_id } = chat

    return { reply_markup: JSON.stringify(data), message_id, chat_id }
  }

  _getDefaultKeyboardOptions(keyboard) {
    const data = { keyboard, resize_keyboard: true, one_time_keyboard: true }

    return { reply_markup: JSON.stringify(data) }
  }

  _getLandKeyboard() {
    const callback = (lang) => ({ text: availableLangs[lang], callback_data: `lang:${lang}` })

    return [langList.map(callback)]
  }

  _getLangSwitchFinishKeyboard() {
    const callback = (action) => ({ text: t(`actions.${action}`), callback_data: `${action}Lang` })

    return [['confirm', 'change'].map(callback)]
  }
}

module.exports = Handlers
