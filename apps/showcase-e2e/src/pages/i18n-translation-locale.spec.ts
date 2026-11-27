import { expect, test } from '@playwright/test';
// The entry's internals (not exported): the file itself, as a unit.
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  type ScI18nConfig,
  localeTag,
  translationLocaleOf,
} from '../../../../packages/ui/i18n/src/lib/i18n/i18n-config';

/**
 * Two locales, one translation: Egyptian and Moroccan readers each get their
 * own locale (months, digits, separators, clock from `Intl`), both read
 * `ar`'s translations. Plain logic: no page.
 */
const config: ScI18nConfig = {
  sourceLocale: 'en',
  locales: [
    { id: 'en', label: 'English' },
    { id: 'en-GB', label: 'English (UK)', translationLocale: 'en' },
    { id: 'fr', label: 'Français' },
    {
      id: 'ar-EG',
      label: 'العربية (مصر)',
      dir: 'rtl',
      translationLocale: 'ar',
    },
    {
      id: 'ar-MA',
      label: 'العربية (المغرب)',
      dir: 'rtl',
      translationLocale: 'ar',
    },
  ],
};

test('Left out: a locale reads its own translations', () => {
  expect(translationLocaleOf(config, 'fr')).toBe('fr');
});

test("Set: both Arabic locales read ar's translations", () => {
  expect(translationLocaleOf(config, 'ar-EG')).toBe('ar');
  expect(translationLocaleOf(config, 'ar-MA')).toBe('ar');
});

test('The source one: nothing to load (the templates are its text)', () => {
  expect(translationLocaleOf(config, 'en-GB')).toBe(config.sourceLocale);
});

test('Each keeps its own locale: what Angular is given, and so Intl', () => {
  expect(localeTag(config, 'ar-EG')).toBe('ar-EG');
  expect(localeTag(config, 'ar-MA')).toBe('ar-MA');
});
