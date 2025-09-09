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
  selector: 'button[sc-clock-picker-period-button]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
    type: 'button',
    '[attr.data-active]': 'active() ? "true" : null',
    '[attr.data-disabled]': 'disabled() ? "true" : null',
    '[attr.aria-pressed]': 'active()',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeydown($event)',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScClockPickerPeriodButton {
  readonly active = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly period = input.required<'AM' | 'PM'>();
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'py-0.5 px-2 text-sm leading-5 rounded border cursor-pointer transition-all duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2',
      // Inactive state
      !this.active() &&
        'border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] focus:bg-accent focus:text-accent-foreground',
      // Active state with stronger styling
      this.active() &&
        'bg-primary text-primary-foreground border-primary scale-105 shadow-sm font-medium',
      this.disabled() && 'opacity-50 pointer-events-none',
      this.classInput(),
    ),
  );

  readonly clicked = output<'AM' | 'PM'>();
  readonly keyPressed = output<{ period: 'AM' | 'PM'; event: KeyboardEvent }>();

  handleClick(event: Event) {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.clicked.emit(this.period());
  }

  handleKeydown(event: KeyboardEvent) {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.keyPressed.emit({ period: this.period(), event });
  }
}
