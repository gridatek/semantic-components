import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  model,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'input[sc-slider]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
    '[type]': 'type()',
    '[min]': 'min()',
    '[max]': 'max()',
    '[step]': 'step()',
    '(input)': 'handleInput($event)',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSlider {
  private readonly host = inject(ElementRef);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'appearance-none bg-transparent w-full rounded-full h-2',
      //track
      '[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full',
      //thumb
      '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:-mt-1.5 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary',
      this.classInput(),
    ),
  );

  readonly value = model<number>(0);
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);

  readonly type = input<'range'>('range');

  constructor() {
    effect(() => {
      const progress = (this.value() / this.max()) * 100;
      this.host.nativeElement.style.background = `linear-gradient(to right, var(--primary) ${progress}%, var(--input) ${progress}%)`;
      // Add a transition for smooth updates when progress changes
      this.host.nativeElement.style.transition = 'background 0.3s ease';
    });

    afterNextRender(() => {
      if (this.host.nativeElement.value > 0) {
        this.value.set(this.host.nativeElement.value);
      }
    });
  }

  protected handleInput(event: Event) {
    if (!event.target) return;
    this.value.set(+(event.target as HTMLInputElement).value);
  }
}
