const path = require('path')
const i18n = require('i18n')

i18n.configure({
  locales: ['en', 'ru'],
  defaultLocale: 'ru',
  directory: path.join(__dirname, '../lang'),
  objectNotation: true
})

const initLang = () => {
  i18n.init()
}

const t = (key) => {
  return i18n.__(key)
}

const switchLang = (lang) => {
  i18n.setLocale(lang)

  return i18n.getLocale()
}

module.exports = initLang
module.exports.t = t
module.exports.switchLang = switchLang
