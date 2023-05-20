import { createI18n } from 'vue-i18n'
import de from '../locales/de.json'
import en from '../locales/en.json'
import fr from '../locales/fr.json'
import us from '../locales/us.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    warnHtmlMessage: false,
    locale: 'de',
    messages: {
      de,
      en,
      fr,
      us
    }
  })

  vueApp.use(i18n)
})