import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'div[sc-clock-picker-hand-knob]',
  imports: [],
  template: ``,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScClockPickerHandKnob {
  readonly dragging = input<boolean>(false);
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'absolute -top-4 left-1/2 w-8 h-8 bg-transparent border-none rounded-full -translate-x-1/2 cursor-grab pointer-events-auto z-[25] transition-all duration-200 ease-out hover:bg-primary/15 hover:scale-110 hover:shadow-md hover:shadow-primary/20',
      this.dragging() && 'cursor-grabbing bg-primary/25 scale-105 shadow-lg shadow-primary/30',
      this.classInput(),
    ),
  );
}
