import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'input[sc-dual-range-slider-thumb]',
  imports: [],
  template: ``,
  host: {
    '[class]': 'class()',
    '[type]': '"range"',
    '[min]': 'min()',
    '[max]': 'max()',
    '[step]': 'step()',
    '[value]': 'value()',
    '(input)': 'handleInput($event)',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDualRangeSliderThumb {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly value = input<number>(0);

  readonly valueChange = output<number>();

  protected readonly class = computed(() =>
    cn(
      'absolute w-full h-2 appearance-none bg-transparent pointer-events-none',
      '[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent',
      '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:-mt-1.5',
      '[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-none',
      '[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:border-none',
      this.classInput(),
    ),
  );

  protected handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    this.valueChange.emit(value);
  }
}
