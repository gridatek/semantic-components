import { _IdGenerator } from '@angular/cdk/a11y';
import { Directive, computed, inject, input, model } from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';

@Directive({
  selector: 'input[scSlider]',
  host: {
    type: 'range',
    'data-slot': 'slider',
    '[attr.id]': 'id()',
    '[attr.min]': 'min()',
    '[attr.max]': 'max()',
    '[attr.step]': 'step()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[class]': 'class()',
    '[value]': 'value()',
    '[style.--fill-percent]': 'fillPercent()',
    '(input)': 'onInput($event)',
  },
})
export class ScSlider {
  protected readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-slider-');

  readonly value = model(0);
  readonly min = input(0);
  readonly max = input(100);
  readonly step = input(1);
  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.field?.descriptionIds().join(' ') ||
      null,
  );

  protected readonly fillPercent = computed(() => {
    const range = this.max() - this.min();
    if (range === 0) return '0%';
    const percent = ((this.value() - this.min()) / range) * 100;
    return `${percent}%`;
  });

  protected readonly class = computed(() =>
    cn(
      'w-full cursor-pointer appearance-none bg-transparent disabled:pointer-events-none disabled:opacity-50',
      '[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--primary)_var(--fill-percent,0%),var(--muted)_var(--fill-percent,0%))]',
      '[&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-muted',
      '[&::-moz-range-progress]:h-1 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-primary',
      '[&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:transition-shadow',
      '[&::-webkit-slider-thumb:hover]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
      '[&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:transition-shadow',
      '[&::-moz-range-thumb:hover]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
      'focus-visible:outline-none [&:focus-visible::-webkit-slider-thumb]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
      '[&:focus-visible::-moz-range-thumb]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
      this.classInput(),
    ),
  );

  protected onInput(event: Event) {
    this.value.set(+(event.target as HTMLInputElement).value);
  }
}
