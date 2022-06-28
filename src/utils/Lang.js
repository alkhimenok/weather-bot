const { join } = require('path')
const { I18n } = require('i18n')

class Lang {
  constructor() {
    this.i18n = new I18n({
      locales: ['en', 'ru'],
      defaultLocale: 'ru',
      directory: join(__dirname, '../lang'),
      objectNotation: true
    })

    this.initLang = this.initLang.bind(this)
    this.getLangList = this.getLangList.bind(this)
    this.getLang = this.getLang.bind(this)
    this.switchLang = this.switchLang.bind(this)
    this.t = this.t.bind(this)
  }

  initLang() {
    this.i18n.init()
  }

  getLangList() {
    const queue = { ru: 0, en: 1 }

    return this.i18n.getLocales().sort((a, b) => queue[a] - queue[b])
  }

  getLang() {
    return this.i18n.getLocale()
  }

  switchLang(lang) {
    this.i18n.setLocale(lang)

    return this.getLang()
  }

  t(key, options = {}) {
    return this.i18n.__(key, options)
  }
}

module.exports = Lang
