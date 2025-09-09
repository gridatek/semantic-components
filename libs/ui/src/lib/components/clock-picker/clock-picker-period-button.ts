import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'button[sc-clock-picker-period-button]',
  imports: [],
  template: `
    <ng-content />
  `,
  styles: `
    button[sc-clock-picker-period-button] {
      padding: 0.125rem 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      border-radius: 0.25rem;
      transition:
        background-color 0.15s ease-in-out,
        color 0.15s ease-in-out,
        border-color 0.15s ease-in-out;
      border: 1px solid #e2e8f0; /* oklch(var(--border)) */
      background: transparent;
      color: #0f172a; /* oklch(var(--foreground)) */
    }

    button[sc-clock-picker-period-button]:hover {
      background: #f1f5f9; /* oklch(var(--accent)) */
      color: #0f172a; /* oklch(var(--accent-foreground)) */
    }

    button[sc-clock-picker-period-button]:focus {
      background: #f1f5f9; /* oklch(var(--accent)) */
      color: #0f172a; /* oklch(var(--accent-foreground)) */
      outline: none;
    }

    button[sc-clock-picker-period-button]:focus-visible {
      outline: 2px solid #3b82f6; /* oklch(var(--ring)) */
      outline-offset: 2px;
    }

    button[sc-clock-picker-period-button][data-active='true'] {
      background: #3b82f6; /* oklch(var(--primary)) */
      color: white; /* oklch(var(--primary-foreground)) */
      border-color: #3b82f6; /* oklch(var(--primary)) */
    }

    button[sc-clock-picker-period-button][data-disabled='true'] {
      opacity: 0.5;
      pointer-events: none;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    '[attr.data-active]': 'active() ? "true" : null',
    '[attr.data-disabled]': 'disabled() ? "true" : null',
    '[attr.aria-pressed]': 'active()',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class ScClockPickerPeriodButton {
  readonly active = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly period = input.required<'AM' | 'PM'>();

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
