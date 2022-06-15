const { join } = require('path')
const i18n = require('i18n')

i18n.configure({
  locales: ['en', 'ru'],
  defaultLocale: 'ru',
  directory: join(__dirname, '../lang'),
  objectNotation: true
})

const initLang = () => {
  i18n.init()
}

const t = (key, options = {}) => {
  return i18n.__(key, options)
}

const switchLang = (lang) => {
  i18n.setLocale(lang)

  return i18n.getLocale()
}

const getLang = () => {
  return i18n.getLocale()
}

const getLangList = () => {
  const queue = { ru: 0, en: 1 }

  return i18n.getLocales().sort((a, b) => queue[a] - queue[b])
}

const langList = getLangList()

module.exports = { langList, initLang, t, switchLang, getLang, getLangList }
