import de from '~/i18n/locales/de.json'
import en from '~/i18n/locales/en.json'
import es from '~/i18n/locales/es.json'
import fr from '~/i18n/locales/fr.json'
import us from '~/i18n/locales/us.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locales: [
        { code: 'de', name: 'German', file: de },
        { code: 'en', name: 'English UK', file: en },
        { code: 'es', name: 'Spanish', file: es },
        { code: 'fr', name: 'French', file: fr },
        { code: 'us', name: 'English US', file: us },
    ],
    defaultLocale: 'de',
    strategy: 'prefix',
    detectBrowserLanguage: false,
  }))