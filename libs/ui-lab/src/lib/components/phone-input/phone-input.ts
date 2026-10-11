import {
  Directive,
  ElementRef,
  type OnInit,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn, inputGroupStyles } from '@semantic-components/ui';
import {
  AsYouType,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';
import { ScPhoneInputNumber } from './phone-input-number';
import { SC_PHONE_INPUT, type ScPhoneCountryCode } from './phone-input-types';

/**
 * A phone number: a country (`scPhoneInputCountry`) and the number
 * (`scPhoneInputNumber`), formatted as you type with `libphonenumber-js`.
 *
 * The value is the full international number (`+33612345678`), or `''` while
 * nothing is typed. It's whatever was typed, not necessarily valid: validate
 * it with `phoneNumber()` in your `form()` schema. Typing or pasting a number
 * with `+` switches the country.
 */
@Directive({
  selector: 'div[scPhoneInput]',
  exportAs: 'scPhoneInput',
  providers: [{ provide: SC_PHONE_INPUT, useExisting: ScPhoneInput }],
  host: {
    'data-slot': 'input-group',
    role: 'group',
    '[attr.data-disabled]': 'disabled() || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusout($event)',
  },
})
export class ScPhoneInput implements FormValueControl<string>, OnInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });

  /** The full international number. Bind with `[formField]` or `[(value)]`. */
  readonly value = model('');
  /** The selected country. */
  readonly country = model<ScPhoneCountryCode | undefined>(undefined);
  /** The country to start with when the value doesn't say. */
  readonly defaultCountry = input<ScPhoneCountryCode | undefined>(undefined);
  /**
   * Where `scPhoneInputFlag` images come from: `{XX}` / `{xx}` is replaced by
   * the country code. Defaults to the `country-flag-icons` 3x2 SVGs; point it
   * at your own copy to self-host.
   */
  readonly flagUrl = input(
    'https://purecatamphetamine.github.io/country-flag-icons/3x2/{XX}.svg',
  );
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  readonly touch = output<void>();

  /** The number as shown in the input (formatted). */
  readonly text = signal('');
  /** The country's calling code, without `+` (`'33'`). */
  readonly callingCode = computed(() => {
    const country = this.country();
    return country ? getCountryCallingCode(country) : '';
  });

  private readonly numberInput = contentChild(ScPhoneInputNumber);
  /** The last value this control produced, to tell outside writes apart. */
  private produced: string | undefined;

  protected readonly class = computed(() =>
    cn(
      inputGroupStyles,
      // The country trigger sits flush in the group, with a divider.
      '[&_[data-slot=combobox]]:h-full [&_[data-slot=combobox]]:min-w-0 [&_[data-slot=combobox]]:shrink-0',
      '[&_[data-slot=combobox-trigger]]:h-full [&_[data-slot=combobox-trigger]]:gap-1 [&_[data-slot=combobox-trigger]]:rounded-none [&_[data-slot=combobox-trigger]]:border-0 [&_[data-slot=combobox-trigger]]:border-e [&_[data-slot=combobox-trigger]]:border-input [&_[data-slot=combobox-trigger]]:bg-transparent [&_[data-slot=combobox-trigger]]:focus-visible:ring-0',
      this.classInput(),
    ),
  );

  constructor() {
    // A value written from outside (initial value, form reset): show it.
    effect(() => {
      const value = this.value();
      untracked(() => {
        if (value !== this.produced) this.load(value);
      });
    });
  }

  ngOnInit(): void {
    if (!this.country()) this.country.set(this.defaultCountry());
  }

  /** Formats what was typed or pasted, and updates the value (and country). */
  type(raw: string): void {
    const typer = new AsYouType(this.country());
    this.text.set(typer.input(raw));
    const detected = typer.getCountry();
    if (raw.trimStart().startsWith('+') && detected) {
      this.country.set(detected);
    }
    this.produce(typer.getNumberValue() ?? '');
  }

  /** Switches the country, keeping the digits typed so far. */
  selectCountry(country: ScPhoneCountryCode | undefined): void {
    if (country === this.country()) return;
    const typer = new AsYouType(this.country());
    typer.input(this.text());
    const national = typer.getNationalNumber();
    this.country.set(country);
    this.type(national);
  }

  focus(options?: FocusOptions): void {
    this.numberInput()?.focus(options);
  }

  protected onFocusout(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.host.nativeElement.contains(next)) this.touch.emit();
  }

  private produce(value: string): void {
    this.produced = value;
    this.value.set(value);
  }

  private load(value: string): void {
    this.produced = value;
    if (!value) {
      this.text.set('');
      return;
    }
    const parsed = parsePhoneNumberFromString(value);
    if (parsed?.country) this.country.set(parsed.country);
    const country = this.country();
    const typer = new AsYouType(country);
    this.text.set(
      typer.input(
        parsed && parsed.country === country ? parsed.formatNational() : value,
      ),
    );
  }
}
