import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import us from './locales/us.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locales: ['de', 'en', 'es', 'fr', 'us'],
    defaultLocale: 'de',
    strategy: 'prefix',
    detectBrowserLanguage: false,
    messages: {
        de,
        en,
        es,
        fr,
        us
      }
  }))