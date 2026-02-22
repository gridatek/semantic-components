import { _IdGenerator } from '@angular/cdk/a11y';
import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_FIELD } from '@semantic-components/ui';

@Directive({
  selector: 'input[scNativeSlider]',
  host: {
    type: 'range',
    'data-slot': 'native-slider',
    '[attr.id]': 'id()',
    '[class]': 'class()',
  },
})
export class ScNativeSlider {
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-native-slider-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  protected readonly class = computed(() =>
    cn(
      'w-full cursor-pointer appearance-none bg-transparent disabled:pointer-events-none disabled:opacity-50',
      '[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-secondary',
      '[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-secondary',
      '[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:transition-colors',
      '[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:transition-colors',
      'focus-visible:outline-none [&:focus-visible::-webkit-slider-thumb]:ring-2 [&:focus-visible::-webkit-slider-thumb]:ring-ring [&:focus-visible::-webkit-slider-thumb]:ring-offset-2 [&:focus-visible::-webkit-slider-thumb]:ring-offset-background',
      '[&:focus-visible::-moz-range-thumb]:ring-2 [&:focus-visible::-moz-range-thumb]:ring-ring [&:focus-visible::-moz-range-thumb]:ring-offset-2 [&:focus-visible::-moz-range-thumb]:ring-offset-background',
      this.classInput(),
    ),
  );
}
