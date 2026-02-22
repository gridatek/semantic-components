import { _IdGenerator } from '@angular/cdk/a11y';
import {
  afterNextRender,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_FIELD } from '@semantic-components/ui';

@Directive({
  selector: 'input[scNativeSlider]',
  host: {
    type: 'range',
    'data-slot': 'native-slider',
    '[attr.id]': 'id()',
    '[class]': 'class()',
    '(input)': 'onInput()',
  },
})
export class ScNativeSlider {
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-native-slider-');
  private readonly el = inject<ElementRef<HTMLInputElement>>(ElementRef);

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  protected readonly class = computed(() =>
    cn(
      'w-full cursor-pointer appearance-none bg-transparent disabled:pointer-events-none disabled:opacity-50',
      '[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[image:linear-gradient(to_right,var(--primary)_var(--fill-percent,0%),var(--muted)_var(--fill-percent,0%))]',
      '[&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-muted',
      '[&::-moz-range-progress]:h-1 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-primary',
      '[&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-ring [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:transition-shadow',
      '[&::-webkit-slider-thumb:hover]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
      '[&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-ring [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:transition-shadow',
      '[&::-moz-range-thumb:hover]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
      'focus-visible:outline-none [&:focus-visible::-webkit-slider-thumb]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
      '[&:focus-visible::-moz-range-thumb]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
      this.classInput(),
    ),
  );

  constructor() {
    afterNextRender(() => {
      this.updateFillPercent();
    });
  }

  protected onInput() {
    this.updateFillPercent();
  }

  private updateFillPercent() {
    const el = this.el.nativeElement;
    const min = parseFloat(el.min) || 0;
    const max = parseFloat(el.max) || 100;
    const value = parseFloat(el.value) || 0;
    const percent = ((value - min) / (max - min)) * 100;

    el.style.setProperty('--fill-percent', `${percent}%`);
  }
}
