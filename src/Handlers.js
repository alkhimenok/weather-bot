const { langList, t, switchLang, getLang } = require('./utils/lang')
const availableLangs = require('./constants/availableLangs')
const userConnectionStatuses = require('./constants/userConnectionStatuses')

class Handlers {
  constructor(bot, user) {
    this.bot = bot
    this.user = user

    this.handleStart = this.handleStart.bind(this)
    this.handleSetLang = this.handleSetLang.bind(this)
    this.handleConfirmLang = this.handleConfirmLang.bind(this)
    this.handleChangeLang = this.handleChangeLang.bind(this)
    this.handleSetLocation = this.handleSetLocation.bind(this)

    this.handleMessageCatch = this.handleMessageCatch.bind(this)
    this.handleQueryCatch = this.handleQueryCatch.bind(this)
  }

  get isBotRunning() {
    return !!this.user.status
  }

  async handleStart({ chat }) {
    if (this.isBotRunning) {
      const title = t('botIsRun')

      await this._sendMessage(title)
    } else {
      const { id: chatId, first_name: firstName, last_name: lastName, username } = chat
      const status = userConnectionStatuses.launched
      const title = t('fillProfile.lang.set.title')
      const keyboard = this._getLandKeyboard()
      const option = this._getDefaultInlineKeyboardOptions(keyboard)

      this.user.updateData({ chatId, firstName, lastName, username, status })

      await this._sendMessage(title, option)
    }
  } // command

  async handleSetLang({ message }, selectedLang) {
    switchLang(selectedLang)

    const lang = availableLangs[selectedLang]
    const title = t('fillProfile.lang.confirm.title', { lang })
    const keyboard = this._getLangSwitchFinishKeyboard()
    const option = this._getDefaultInlineKeyboardOptions(keyboard)

    await this._editMessage(title, option, message)
  } // query

  async handleConfirmLang({ message }) {
    const selectedLang = getLang()
    const lang = availableLangs[selectedLang]
    const title = t('fillProfile.lang.finish.title', { lang })
    const options = this._getDefaultInlineKeyboardOptions()

    this.user.updateData({ lang })

    await this._editMessage(title, options, message)

    if (this.user.isConnected) return

    const status = userConnectionStatuses.waiting

    this.user.updateData({ status })

    await this.handleSetLocation({ message })
  } // query

  async handleChangeLang({ message }) {
    const title = t('fillProfile.lang.change.title')
    const keyboard = this._getLandKeyboard()
    const option = this._getDefaultInlineKeyboardOptions(keyboard)

    await this._editMessage(title, option, message)
  } // query

  async handleSetLocation({ message }) {
    const title = t('fillProfile.location.set.title')
    const keyboardOptions = { request_location: true }
    const keyboard = this._getLocationKeyboard(keyboardOptions)
    const options = this._getDefaultKeyboardOptions(keyboard)

    await this._sendMessage(title, options)
  } // query

  async handleMessageCatch(region, e) {
    const title = !this.user.isConnected
      ? t('services.region.notFound', { region })
      : t('fillProfile.continue')

    await this._sendMessage(title)
  }

  async handleQueryCatch(type, e) {
    console.warn('error')
  }

  async _sendMessage(title, keyboardOptions) {
    const options = this._abstractOptions(keyboardOptions)

    await this.bot.sendMessage(this.user.chatId, title, options)
  }

  async _editMessage(title, keyboardOptions, { message_id }) {
    const chat_id = this.user.chatId
    const initOptions = this._abstractOptions(keyboardOptions)
    const options = { message_id, chat_id, ...initOptions }

    await this.bot.editMessageText(title, options)
  }

  _getDefaultKeyboardOptions(keyboard) {
    return { keyboard, resize_keyboard: true, one_time_keyboard: true }
  }

  _getDefaultInlineKeyboardOptions(inline_keyboard) {
    return { inline_keyboard }
  }

  _getLandKeyboard(options) {
    const callback = (lang) => ({ text: availableLangs[lang], callback_data: `setLang:${lang}` })

    const list = langList

    return this._abstractKeyboard(list, callback, options)
  }

  _getLangSwitchFinishKeyboard(options) {
    const callback = (action) => ({ text: t(`actions.${action}`), callback_data: `${action}Lang` })

    const list = ['confirm', 'change']

    return this._abstractKeyboard(list, callback, options)
  }

  _getLocationKeyboard(options) {
    const callback = (action) => ({ text: t(`fillProfile.location.${action}`) })

    const list = ['allow']

    return this._abstractKeyboard(list, callback, options)
  }

  _abstractOptions(data = {}) {
    return { reply_markup: JSON.stringify(data), parse_mode: 'Markdown' }
  }

  _abstractKeyboard(list = [], callback = () => null, options = {}) {
    return [list.map((item, index, array) => ({ ...callback(item, index, array), ...options }))]
  }
}

module.exports = Handlers
