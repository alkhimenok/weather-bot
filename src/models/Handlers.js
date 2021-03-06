const { createUser } = require('../services')
const { langList, t, switchLang, getLang } = require('../utils')
// const availableLangs = require('./constants/availableLangs')
const USER_STATUSES = require('../constants/userStatuses')

class Handlers {
  constructor(bot) {
    this.bot = bot

    this.handleStart = this.handleStart.bind(this)
    // this.handleSetLang = this.handleSetLang.bind(this)
    // this.handleConfirmLang = this.handleConfirmLang.bind(this)
    // this.handleChangeLang = this.handleChangeLang.bind(this)
    // this.handleRequestLocation = this.handleRequestLocation.bind(this)
    // this.handleSetLocation = this.handleSetLocation.bind(this)
    // this.handleConfirmLocation = this.handleConfirmLocation.bind(this)
    // this.handleChangeLocation = this.handleChangeLocation.bind(this)

    // this.handleMessageCatch = this.handleMessageCatch.bind(this)
    // this.handleQueryCatch = this.handleQueryCatch.bind(this)
    // this.handleRequestLocationCatch = this.handleRequestLocationCatch.bind(this)
  }

  user = null
  chatId = null
  messageId = null

  async handleStart({ chat }, metadata, user) {
    if (user) {
      this.user = user

      const title = t('warnings.commands.botIsRun')

      // TODO: add handler for user status

      await this._sendMessage(title)
    } else {
      const { id, username, first_name: firstName, last_name: lastName } = chat
      const status = USER_STATUSES.waitingLang

      this.user = await createUser({ id, username, firstName, lastName, status })

      const title = t('about.shortDescription')
      // const keyboard = this._getLandKeyboard()
      const option = {} //this._getDefaultInlineKeyboardOptions(keyboard)

      await this._sendMessage(title, option)
    }

    console.log('this.user', this.user)
  } // command

  // async handleSetLang({ message }, selectedLang) {
  //   switchLang(selectedLang)

  //   const lang = availableLangs[selectedLang]
  //   const title = t('profile.lang.confirm.title', { lang })
  //   const keyboard = this._getLangSwitchFinishKeyboard()
  //   const option = this._getDefaultInlineKeyboardOptions(keyboard)

  //   await this._editLastMessage(title, option)
  // } // query

  // async handleConfirmLang({ message }) {
  //   const selectedLang = getLang()
  //   const lang = availableLangs[selectedLang]
  //   const title = t('profile.lang.finish.title', { lang })
  //   const options = this._getDefaultInlineKeyboardOptions()

  //   this.user.updateData({ lang })

  //   await this._editLastMessage(title, options)

  //   if (this.user.isConnected) return

  //   const status = userConnectionStatuses.waiting

  //   this.user.updateData({ status })

  //   await this.handleRequestLocation({ message })
  // } // query

  // async handleChangeLang({ message }) {
  //   const title = t('profile.lang.change.title')
  //   const keyboard = this._getLandKeyboard()
  //   const option = this._getDefaultInlineKeyboardOptions(keyboard)

  //   await this._editLastMessage(title, option)
  // } // query

  // async handleRequestLocation({ message }) {
  //   const title = t('profile.location.request.title')
  //   const keyboardOptions = { request_location: true }
  //   const keyboard = this._getLocationKeyboard(keyboardOptions)
  //   const options = this._getDefaultKeyboardOptions(keyboard)

  //   await this._sendMessage(title, options)
  // } // query

  // async handleSetLocation(message) {
  //   // console.log(message.location.latitude)
  //   // console.log(message.location.longitude)
  //   // TODO: request get location on coords

  //   const location = 'Belarus'
  //   const title = t('profile.location.set.title', { location })
  //   const keyboard = this._getLocationSwitchFinishKeyboard()
  //   const option = this._getDefaultInlineKeyboardOptions(keyboard)

  //   this._deleteLastMessage()
  //   this._sendMessage(title, option)
  // } // message

  // async handleConfirmLocation() {
  //   const location = 'Belarus'
  //   const title = t('profile.location.finish.title', { location })

  //   this.user.updateData({ location })

  //   await this._editLastMessage(title)

  //   if (this.user.isConnected) return

  //   this._sendMessage(title)
  // } // query

  // async handleChangeLocation() {
  //   const title = t('profile.location.change.title')
  //   const keyboardOptions = { request_location: true }
  //   const keyboard = this._getLocationKeyboard(keyboardOptions)
  //   const options = this._getDefaultKeyboardOptions(keyboard)

  //   await this._editLastMessage(title, options)
  // } // query

  // async handleMessageCatch(location, e) {
  //   const title = this.user.isConnected
  //     ? t('warnings.location.notFound', { location })
  //     : t('warnings.profile.notCompleted')

  //   await this._sendMessage(title)
  // }

  // async handleQueryCatch(type, e) {
  //   console.warn('query error')
  // }

  // async handleRequestLocationCatch(type, e) {
  //   console.warn('location error')
  // }

  async _sendMessage(title, keyboardOptions) {
    const { id } = this.user
    const options = {} //this._abstractOptions(keyboardOptions)

    const { message_id } = await this.bot.sendMessage(id, title, options)

    // this.lastMessageId = message_id
  }

  // async _editMessage(title, keyboardOptions, message_id) {
  //   const chat_id = this.user.id
  //   const initOptions = this._abstractOptions(keyboardOptions)
  //   const options = { message_id, chat_id, ...initOptions }

  //   await this.bot.editMessageText(title, options)
  // }

  // async _editLastMessage(title, keyboardOptions) {
  //   await this._editMessage(title, keyboardOptions, this.lastMessageId)
  // }

  // async _deleteMessage({ message_id }) {
  //   const { chatId } = this.user

  //   await this.bot.deleteMessage(chatId, message_id)
  // }

  // async _deleteLastMessage() {
  //   await this._deleteMessage({ message_id: this.lastMessageId })
  // }

  // _getDefaultKeyboardOptions(keyboard) {
  //   return { keyboard, resize_keyboard: true, one_time_keyboard: true }
  // }

  // _getDefaultInlineKeyboardOptions(inline_keyboard) {
  //   return { inline_keyboard }
  // }

  // _getLandKeyboard(options) {
  //   const callback = (i) => ({ text: availableLangs[i], callback_data: `setLang:${i}` })

  //   const list = langList

  //   return this._abstractKeyboard(list, callback, options)
  // }

  // _getLangSwitchFinishKeyboard(options) {
  //   const callback = (i) => ({ text: t(`actions.${i}`), callback_data: `${i}Lang` })

  //   const list = ['confirm', 'change']

  //   return this._abstractKeyboard(list, callback, options)
  // }

  // _getLocationKeyboard(options) {
  //   const callback = (i) => ({ text: t(`profile.location.${i}`) })

  //   const list = ['allow']

  //   return this._abstractKeyboard(list, callback, options)
  // }

  // _getLocationSwitchFinishKeyboard(options) {
  //   const callback = (i) => ({ text: t(`actions.${i}`), callback_data: `${i}Location` })

  //   const list = ['confirm', 'change']

  //   return this._abstractKeyboard(list, callback, options)
  // }

  // _abstractOptions(data = {}) {
  //   return { reply_markup: JSON.stringify(data), parse_mode: 'Markdown' }
  // }

  // _abstractKeyboard(list = [], callback = () => null, options = {}) {
  //   return [list.map((item, index, array) => ({ ...callback(item, index, array), ...options }))]
  // }
}

module.exports = Handlers
