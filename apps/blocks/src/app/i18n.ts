import type { ScI18nConfig } from '@semantic-components/ui/i18n';

/** The app's locales: their translations in `public/i18n/<id>.json`. */
export const I18N: ScI18nConfig = {
  sourceLocale: 'en',
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
