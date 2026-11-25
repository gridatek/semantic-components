import {
  Directive,
  LOCALE_ID,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { ScCombobox, bindInput } from '@semantic-components/ui';
import { isSupportedCountry } from 'libphonenumber-js';
import { phoneCountries } from './phone-countries';
import { SC_PHONE_INPUT } from './phone-input-token';
import type { ScPhoneCountry, ScPhoneCountryCode } from './phone-input-types';

/** Lower case, without accents: "Åland" is found by "aland". */
const plain = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase();

/**
 * The phone input's country, on your `scCombobox`: the combobox's value is the
 * country (both ways), and `results()` the countries to list — named in the
 * app's language (`LOCALE_ID`), the preferred ones first, matched as you type
 * against the name, its initials, the code (`fr`) and the dial code (`+33`).
 * Name the picker ("Country").
 */
@Directive({
  selector: 'div[scCombobox][scPhoneInputCountry]',
  exportAs: 'scPhoneInputCountry',
})
export class ScPhoneInputCountry {
  private readonly phone = inject(SC_PHONE_INPUT);
  private readonly combobox = inject<ScCombobox<string>>(ScCombobox);
  private readonly locale = inject(LOCALE_ID);

  /** Only these countries; all, by default. */
  readonly countries = input<readonly ScPhoneCountryCode[] | null>(null);
  /** These first, in this order, then the rest. */
  readonly preferred = input<readonly ScPhoneCountryCode[]>([]);

  /** Every country offered, in order: the preferred, then by name. */
  readonly all = computed<readonly ScPhoneCountry[]>(() => {
    const only = this.countries();
    const list = phoneCountries(this.locale).filter(
      (country) => !only || only.includes(country.code),
    );
    const preferred = this.preferred();
    const rank = (code: ScPhoneCountryCode) => {
      const at = preferred.indexOf(code);
      return at < 0 ? preferred.length : at;
    };
    // A stable sort: the rest keep their order by name.
    return [...list].sort((a, b) => rank(a.code) - rank(b.code));
  });

  /** The countries matching what is typed in the picker's search. */
  readonly results = computed<readonly ScPhoneCountry[]>(() => {
    const query = plain(this.combobox.query().trim());
    const all = this.all();
    if (!query) return all;
    const digits = query.replace(/^\+/, '');
    return all.filter((country) => {
      if (/^\d+$/.test(digits)) return country.callingCode.startsWith(digits);
      const name = plain(country.name);
      const initials = name
        .split(/[\s-]+/)
        .map((word) => word[0])
        .join('');
      return (
        name.includes(query) ||
        initials.startsWith(query) ||
        country.code.toLowerCase() === query
      );
    });
  });

  constructor() {
    bindInput(this.combobox.disabled, this.phone.disabled);
    bindInput(this.combobox.readonly, this.phone.readonly);
    // The field's label is the number's: the picker is named by you.
    this.combobox.namedByField.set(false);

    // phone → combobox
    effect(() => {
      const country = this.phone.country() ?? null;
      untracked(() => {
        if (this.combobox.value() !== country) this.combobox.value.set(country);
      });
    });
    // combobox → phone
    effect(() => {
      const value = this.combobox.value();
      untracked(() => {
        const country = value && isSupportedCountry(value) ? value : undefined;
        this.phone.selectCountry(country);
      });
    });
  }
}
