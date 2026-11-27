import { LOCALE_ID, type Signal, computed, inject } from '@angular/core';
import {
  definePreference,
  injectPreference,
} from '../../components/preferences/preference';

/**
 * How the hours are counted, as Unicode names it — `Intl`'s `hourCycle`,
 * the locale tag's `hc` key (`ar-u-hc-h23`): `'h12'` 3:05 PM (٣:٠٥ م),
 * `'h23'` 15:05.
 */
export type ScHourCycle = 'h12' | 'h23';

/** The hour cycles offered. */
export const SC_HOUR_CYCLES: readonly ScHourCycle[] = ['h12', 'h23'];

/**
 * @internal The clock the user chose, kept (`sc-hour-cycle`, a cookie the
 * server reads; other tabs follow); nothing kept until they choose, so the
 * locale's follows the language meanwhile. Apps use `injectHourCycle()`.
 */
export const ɵHOUR_CYCLE = definePreference({
  attribute: 'data-hour-cycle',
  values: SC_HOUR_CYCLES,
  storageKey: 'sc-hour-cycle',
  global: true,
});

/** @internal The clock the user chose, if any: it comes before a part's. */
export function ɵchosenHourCycle(): Signal<ScHourCycle | undefined> {
  return injectPreference(ɵHOUR_CYCLE).value;
}

/** The locale's clock (12 hours for `h11` and `h12`, else 24). */
export function ɵlocaleHourCycle(locale: string): ScHourCycle {
  const resolved = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
  }).resolvedOptions().hourCycle;
  return resolved === 'h11' || resolved === 'h12' ? 'h12' : 'h23';
}

/** The user's clock: always one. */
export interface ScHourCyclePreference {
  /** The one the user chose, else the locale's. */
  readonly value: Signal<ScHourCycle>;
  /** Chosen: kept, and every time the parts show follows it. */
  set(cycle: ScHourCycle): void;
}

/**
 * The user's clock, for your settings: `value()` is always one — the one they
 * chose, else the locale's — and `set()` keeps their choice. The parts take,
 * in order: the user's choice, then their own `hourCycle`, then the
 * locale's. What they show follows at once, and in the user's other tabs.
 */
export function injectHourCycle(): ScHourCyclePreference {
  const preference = injectPreference(ɵHOUR_CYCLE);
  const locale = inject(LOCALE_ID);
  return {
    value: computed(() => preference.value() ?? ɵlocaleHourCycle(locale)),
    set: (cycle) => preference.set(cycle),
  };
}
