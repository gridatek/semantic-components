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
  selector: 'button[sc-clock-picker-time-part]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
    type: 'button',
    role: 'tab',
    tabindex: '0',
    '[attr.data-active]': 'active() ? "true" : null',
    '[attr.aria-selected]': 'active()',
    '(click)': 'clicked.emit()',
    '(keydown)': 'keyPressed.emit($event)',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScClockPickerTimePart {
  readonly active = input<boolean>(false);
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'py-1 px-2 rounded border-2 border-transparent bg-transparent cursor-pointer transition-all duration-200 hover:bg-accent hover:scale-105 focus:bg-accent focus:outline-none',
      this.active() && 'border-primary bg-primary/10',
      this.classInput(),
    ),
  );

  readonly clicked = output<void>();
  readonly keyPressed = output<KeyboardEvent>();
}
