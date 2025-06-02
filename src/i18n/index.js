import { en } from './locales/en'
import { zhHans } from './locales/zhHans'

// src/i18n/index.js
const messages = {
  en: {
    $vuetify: {
      ...en,
    },
  },
  zhHans: {
    $vuetify: {
      ...zhHans,
    },
  },
}

export { messages }
