import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'de',
  fallbackLocale: 'en',
  messages: {
    en: require('./locales/en'),
    de: require('./locales/de')
  }
})

export default i18n

// Hot updates
if (module.hot) {
  module.hot.accept(['./locales/en', './locales/de'], function () {
    i18n.setLocaleMessage('en', require('./locales/en'))
    i18n.setLocaleMessage('de', require('./locales/de'))
  })
}
