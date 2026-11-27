import type { ScI18nConfig } from '@semantic-components/ui/i18n';

/** The app's locales: English first (the source), French, Arabic (right to left). Translations in `public/i18n/<id>.json`. */
export const I18N: ScI18nConfig = {
  sourceLocale: 'en',
  // Read before the app starts (loadLocale): its own name, as the others.
  storageKey: 'dashboard-locale',
  locales: [
    { id: 'en', label: 'English' },
    { id: 'fr', label: 'Français' },
    { id: 'ar', label: 'العربية', dir: 'rtl' },
  ],
  localeData: {
    fr: () => import('@angular/common/locales/fr'),
    ar: () => import('@angular/common/locales/ar'),
  },
};
