import {
  Directive,
  ElementRef,
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
import { injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import {
  AsYouType,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';
import type { ScPhoneCountryCode } from '../phone-input/phone-input-types';
import { ScPhoneInputNextNumber } from './phone-input-next-number';
import { SC_PHONE_INPUT_NEXT } from './phone-input-next-token';

/**
 * A phone number: a country (`scPhoneInputNextCountry` on your combobox) and
 * the number (`input[scPhoneInputNextNumber]`), in one row — the style's input
 * group. Its value is the whole number in E.164 (`+33612345678`), empty when
 * there is none: a Signal Forms control. The country's dial code shows in the
 * picker, apart from the number — it can't be deleted; a number typed with
 * `+` chooses its country.
 */
@Directive({
  selector: 'div[scPhoneInputNext]',
  exportAs: 'scPhoneInputNext',
  providers: [{ provide: SC_PHONE_INPUT_NEXT, useExisting: ScPhoneInputNext }],
  host: {
    'data-slot': 'phone-input',
    role: 'group',
    '[attr.data-disabled]': 'disabled() || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusout($event)',
  },
})
export class ScPhoneInputNext implements FormValueControl<string> {
  private readonly groupStyles = injectStyle().inputGroup;
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  /** The whole number, E.164: `[formField]` or `[(value)]`. */
  readonly value = model('');
  /** The country chosen: two-way. */
  readonly country = model<ScPhoneCountryCode | undefined>(undefined);
  /** The country to start with, when the value doesn't say. */
  readonly defaultCountry = input<ScPhoneCountryCode | undefined>(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  readonly touch = output<void>();

  /** The number as shown in the field (formatted). */
  readonly text = signal('');
  /** The country's dial code, without `+` (`'33'`). */
  readonly callingCode = computed(() => {
    const country = this.country();
    return country ? getCountryCallingCode(country) : '';
  });

  private readonly numberInput = contentChild(ScPhoneInputNextNumber);
  /** The last value this control produced, to tell outside writes apart. */
  private produced: string | undefined;

  private readonly class = computed(() =>
    cn(
      this.groupStyles,
      // The picker, seated in the row: as tall as it, as wide as its content,
      // a line after it (the trigger's ghost look is its own variant).
      '*:data-[slot=combobox]:h-full *:data-[slot=combobox]:shrink-0',
      '[&>[data-slot=combobox]>[data-slot=combobox-trigger]]:h-full [&>[data-slot=combobox]>[data-slot=combobox-trigger]]:w-auto [&>[data-slot=combobox]>[data-slot=combobox-trigger]]:gap-1.5 [&>[data-slot=combobox]>[data-slot=combobox-trigger]]:rounded-none [&>[data-slot=combobox]>[data-slot=combobox-trigger]]:border-e [&>[data-slot=combobox]>[data-slot=combobox-trigger]]:border-input',
      this.classInput(),
    ),
  );

  constructor() {
    // No country yet: the default one.
    effect(() => {
      const fallback = this.defaultCountry();
      untracked(() => {
        if (!this.country() && fallback) this.country.set(fallback);
      });
    });
    // A value written from outside (initial value, form reset): show it.
    effect(() => {
      const value = this.value();
      untracked(() => {
        if (value !== this.produced) this.load(value);
      });
    });
  }

  /**
   * Formats what was typed or pasted, and updates the value — and the
   * country, when the text starts with `+`. `keepSeparator`: the text ends
   * with a space (or `-`, …): kept if the format puts one there next.
   */
  type(raw: string, keepSeparator = false): void {
    const typer = new AsYouType(this.country());
    const text = this.withoutTrunkPrefix(typer.input(raw), typer);
    this.text.set(keepSeparator ? this.withNextSeparator(text, raw) : text);
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

  /** How `raw` would be shown, without changing anything. */
  format(raw: string): string {
    const typer = new AsYouType(this.country());
    return this.withoutTrunkPrefix(typer.input(raw), typer);
  }

  focus(options?: FocusOptions): void {
    this.numberInput()?.focus(options);
  }

  private onFocusout(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.element.contains(next)) this.touch.emit();
  }

  /**
   * National formats include the trunk prefix (`06 12 34 56 78` in France), so
   * a number typed without it comes back as bare digits. Group those like the
   * international format instead, minus the dial code the picker shows
   * (`6 12 34 56 78`).
   */
  private withoutTrunkPrefix(text: string, typer: AsYouType): string {
    const country = this.country();
    if (!country || typer.isInternational() || /\D/.test(text)) return text;
    if (typer.getNationalNumber() !== text) return text;
    const code = getCountryCallingCode(country);
    return new AsYouType()
      .input(`+${code}${text}`)
      .slice(code.length + 1)
      .trim();
  }

  /**
   * The format only adds a separator once the digit after it is typed (`6`,
   * then `6 6`). Typed first, it shows now — the format's own separator,
   * found by formatting one more digit (`6` + space → `6 `).
   */
  private withNextSeparator(text: string, raw: string): string {
    const next = this.format(`${raw}0`);
    if (!next.startsWith(text)) return text;
    const separator = /^\D+/.exec(next.slice(text.length))?.[0];
    return separator ? text + separator : text;
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
