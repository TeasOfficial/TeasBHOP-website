/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import { createI18n } from 'vue-i18n'
import { messages } from '@/i18n'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'zhHans',
  fallbackLocale: 'zhHans',
  messages,
})


export function registerPlugins (app) {
  app
    .use(i18n)
    .use(vuetify)
    .use(router)
    .use(pinia)
}
