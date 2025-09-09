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
  selector: 'button[sc-clock-picker-number]',
  imports: [],
  template: `
    <ng-content />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'class()',
    type: 'button',
    role: 'gridcell',
    tabindex: '-1',
    '[attr.data-selected]': 'selected() ? "true" : null',
    '[attr.aria-selected]': 'selected()',
    '[style.left.px]': 'x()',
    '[style.top.px]': 'y()',
    '(click)': 'clicked.emit(value())',
  },
})
export class ScClockPickerNumber {
  readonly value = input.required<number>();
  readonly x = input.required<number>();
  readonly y = input.required<number>();
  readonly selected = input<boolean>(false);
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'absolute w-8 h-8 flex items-center justify-center text-sm font-medium rounded-full transition-all duration-200 z-10 bg-transparent text-foreground border-none cursor-pointer select-none hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:shadow-md focus:bg-accent focus:text-accent-foreground focus:scale-105 focus:outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2',
      this.selected() && 'opacity-0 pointer-events-none',
      this.classInput(),
    ),
  );

  readonly clicked = output<number>();
}
