import { _IdGenerator } from '@angular/cdk/a11y';
import {
  computed,
  Directive,
  ElementRef,
  inject,
  InjectionToken,
  input,
  model,
  output,
} from '@angular/core';
import { SC_FIELD } from '../field';

// Token for number field context
export const SC_NUMBER_FIELD = new InjectionToken<ScNumberField>(
  'SC_NUMBER_FIELD',
);

@Directive({
  selector: 'div[sc-number-field], label[sc-number-field]',
  exportAs: 'scNumberField',
  providers: [
    { provide: SC_NUMBER_FIELD, useExisting: ScNumberField },
    { provide: SC_FIELD, useExisting: ScNumberField },
  ],
  host: {
    '[attr.role]': 'role()',
    'data-slot': 'number-field',
    '[attr.data-disabled]': 'disabled() || null',
  },
})
export class ScNumberField {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly id = input(inject(_IdGenerator).getId('sc-number-field-'));

  protected readonly role = computed(() => {
    const tagName = this.elementRef.nativeElement.tagName;
    return tagName === 'LABEL' ? null : 'group';
  });
  readonly value = model<number | null>(null);
  readonly min = input<number | null>(null);
  readonly max = input<number | null>(null);
  readonly step = input<number>(1);
  readonly disabled = input<boolean>(false);
  readonly allowEmpty = input<boolean>(true);
  readonly scrubSpeed = input<number>(1);
  readonly formatOptions = input<Intl.NumberFormatOptions>({});

  readonly valueChange = output<number | null>();

  readonly canIncrement = computed(() => {
    if (this.disabled()) return false;
    const val = this.value();
    const max = this.max();
    if (val === null) return true;
    if (max === null) return true;
    return val < max;
  });

  readonly canDecrement = computed(() => {
    if (this.disabled()) return false;
    const val = this.value();
    const min = this.min();
    if (val === null) return true;
    if (min === null) return true;
    return val > min;
  });

  increment(): void {
    if (!this.canIncrement()) return;

    const current = this.value() ?? 0;
    const step = this.step();
    const max = this.max();
    let newValue = current + step;

    if (max !== null && newValue > max) {
      newValue = max;
    }

    this.setValue(this.roundToStep(newValue));
  }

  decrement(): void {
    if (!this.canDecrement()) return;

    const current = this.value() ?? 0;
    const step = this.step();
    const min = this.min();
    let newValue = current - step;

    if (min !== null && newValue < min) {
      newValue = min;
    }

    this.setValue(this.roundToStep(newValue));
  }

  setValue(value: number | null): void {
    if (this.disabled()) return;

    if (value === null) {
      if (this.allowEmpty()) {
        this.value.set(null);
        this.valueChange.emit(null);
      }
      return;
    }

    const min = this.min();
    const max = this.max();

    let clamped = value;
    if (min !== null && clamped < min) clamped = min;
    if (max !== null && clamped > max) clamped = max;

    const rounded = this.roundToStep(clamped);
    this.value.set(rounded);
    this.valueChange.emit(rounded);
  }

  formatValue(value: number | null): string {
    if (value === null) return '';
    const options = this.formatOptions();
    if (Object.keys(options).length > 0) {
      return new Intl.NumberFormat(undefined, options).format(value);
    }
    return String(value);
  }

  private roundToStep(value: number): number {
    const step = this.step();
    const decimals = this.getDecimalPlaces(step);
    return Number(value.toFixed(decimals));
  }

  private getDecimalPlaces(num: number): number {
    const str = num.toString();
    const dotIndex = str.indexOf('.');
    return dotIndex === -1 ? 0 : str.length - dotIndex - 1;
  }
}
