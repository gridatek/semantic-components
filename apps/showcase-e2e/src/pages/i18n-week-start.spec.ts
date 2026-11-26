import { expect, test } from '@playwright/test';
import {
  type ScI18nConfig,
  findLocale,
  withWeekStart,
} from '../../../../packages/ui/i18n/src/lib/i18n/i18n-config';

/**
 * The week's first day from the i18n config — for every locale, or one: the
 * locale Angular is given (`LOCALE_ID`) carries it as Unicode's `fw`, which
 * `Intl` (and so every calendar) reads. Plain logic: no page.
 */
const config = (extra: Partial<ScI18nConfig> = {}): ScI18nConfig => ({
  sourceLocale: 'en',
  locales: [
    { id: 'en', label: 'English' },
    { id: 'fr', label: 'Français' },
    { id: 'pt-BR', label: 'Português' },
    { id: 'ar', label: 'العربية', dir: 'rtl' },
  ],
  ...extra,
});

const firstDay = (id: string) => {
  const locale = new Intl.Locale(id) as Intl.Locale & {
    getWeekInfo?: () => { firstDay: number };
    weekInfo?: { firstDay: number };
  };
  return locale.getWeekInfo?.().firstDay ?? locale.weekInfo?.firstDay;
};

test('Nothing set: the locale as it is, its own first day', () => {
  expect(withWeekStart(config(), 'ar')).toBe('ar');
});

test('Set for every locale: Sunday for Arabic too (Intl reads it)', () => {
  const id = withWeekStart(config({ firstDayOfWeek: 7 }), 'ar');
  expect(id).toBe('ar-u-fw-sun');
  expect(firstDay(id)).toBe(7);
});

test("A locale's own wins over every locale's", () => {
  const c = config({ firstDayOfWeek: 7 });
  const fr = {
    ...c,
    locales: c.locales.map((l) =>
      l.id === 'fr' ? { ...l, firstDayOfWeek: 1 } : l,
    ),
  };
  expect(withWeekStart(fr, 'fr')).toBe('fr-u-fw-mon');
  expect(withWeekStart(fr, 'ar')).toBe('ar-u-fw-sun');
});

test('Its region kept', () => {
  expect(withWeekStart(config({ firstDayOfWeek: 7 }), 'pt-BR')).toBe(
    'pt-BR-u-fw-sun',
  );
});

test('The locale found from the id Angular has, its first day in it', () => {
  const c = config();
  expect(findLocale(c, 'ar-u-fw-sun')?.id).toBe('ar');
  expect(findLocale(c, 'pt-BR-u-fw-sun')?.id).toBe('pt-BR');
  expect(findLocale(c, 'fr-CA')?.id).toBe('fr');
  expect(findLocale(c, 'de')).toBeUndefined();
});
