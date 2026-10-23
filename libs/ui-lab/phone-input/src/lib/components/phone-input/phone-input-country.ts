import { Directive, effect, inject, untracked } from '@angular/core';
import { ScCombobox, bindInput } from '@semantic-components/ui';
import { isSupportedCountry } from 'libphonenumber-js';
import { SC_PHONE_INPUT } from './phone-input-types';

/**
 * Makes a `scCombobox` the country picker of a `scPhoneInput`: its value is
 * the country code. The trigger content and the list are yours — see
 * `phoneCountries()`.
 */
@Directive({
  selector: 'div[scCombobox][scPhoneInputCountry]',
})
export class ScPhoneInputCountry {
  private readonly phone = inject(SC_PHONE_INPUT);
  private readonly combobox = inject(ScCombobox);

  constructor() {
    bindInput(this.combobox.disabled, this.phone.disabled);
    bindInput(this.combobox.readonly, this.phone.readonly);

    // phone → combobox
    effect(() => {
      const country = this.phone.country() ?? '';
      untracked(() => {
        if (this.combobox.value() !== country) this.combobox.value.set(country);
      });
    });
    // combobox → phone
    effect(() => {
      const value = this.combobox.value();
      untracked(() => {
        const country = isSupportedCountry(value) ? value : undefined;
        this.phone.selectCountry(country);
      });
    });
  }
}
