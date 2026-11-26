import { expect, test } from '@playwright/test';
// The entry's internals (not exported): the file itself, as a unit.
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  type ScI18nConfig,
  findLocale,
  localeTag,
} from '../../../../packages/ui/i18n/src/lib/i18n/i18n-config';

/**
 * The week's first day from the i18n config, on a locale: the locale Angular
 * is given (`LOCALE_ID`) carries it as Unicode's `fw`, which
 * `Intl` (and so every calendar) reads. Plain logic: no page.
 */
const config = (): ScI18nConfig => ({
  sourceLocale: 'en',
  locales: [
    { id: 'en', label: 'English' },
    { id: 'fr', label: 'Français' },
    { id: 'pt-BR', label: 'Português' },
    { id: 'ar', label: 'العربية', dir: 'rtl' },
  ],
});

const firstDay = (id: string) => {
  const locale = new Intl.Locale(id) as Intl.Locale & {
    getWeekInfo?: () => { firstDay: number };
    weekInfo?: { firstDay: number };
  };
  return locale.getWeekInfo?.().firstDay ?? locale.weekInfo?.firstDay;
};

test('Nothing set: the locale as it is, its own first day', () => {
  expect(localeTag(config(), 'ar')).toBe('ar');
});

test('Set on a locale: Sunday for Arabic (Intl reads it); the others as they are', () => {
  const c = config();
  const sunday = {
    ...c,
    locales: c.locales.map((l) =>
      l.id === 'ar' ? { ...l, firstDayOfWeek: 'sun' } : l,
    ),
  };
  const id = localeTag(sunday, 'ar');
  expect(id).toBe('ar-u-fw-sun');
  expect(firstDay(id)).toBe(7);
  expect(localeTag(sunday, 'fr')).toBe('fr');
});

test('Its region kept', () => {
  const c = config();
  const sunday = {
    ...c,
    locales: c.locales.map((l) =>
      l.id === 'pt-BR' ? { ...l, firstDayOfWeek: 'sun' } : l,
    ),
  };
  expect(localeTag(sunday, 'pt-BR')).toBe('pt-BR-u-fw-sun');
});

test('The locale found from the id Angular has, its first day in it', () => {
  const c = config();
  expect(findLocale(c, 'ar-u-fw-sun')?.id).toBe('ar');
  expect(findLocale(c, 'pt-BR-u-fw-sun')?.id).toBe('pt-BR');
  expect(findLocale(c, 'fr-CA')?.id).toBe('fr');
  expect(findLocale(c, 'de')).toBeUndefined();
});

test('The numbering system set on a locale: carried as nu, alone or with the week; Intl writes its digits', () => {
  const c = config();
  const set = (patch: object) => ({
    ...c,
    locales: c.locales.map((l) => (l.id === 'ar' ? { ...l, ...patch } : l)),
  });
  expect(localeTag(set({ numberingSystem: 'latn' }), 'ar')).toBe(
    'ar-u-nu-latn',
  );
  expect(
    localeTag(set({ numberingSystem: 'latn', firstDayOfWeek: 'sun' }), 'ar'),
  ).toBe('ar-u-fw-sun-nu-latn');
  expect(
    new Intl.NumberFormat(
      localeTag(set({ numberingSystem: 'arab' }), 'ar'),
    ).format(12),
  ).toBe('١٢');
});
