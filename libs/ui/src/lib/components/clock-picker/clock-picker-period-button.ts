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
        background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid var(--border);
      background: transparent;
      color: var(--foreground);
      cursor: pointer;
    }

    button[sc-clock-picker-period-button]:hover {
      background: var(--accent);
      color: var(--accent-foreground);
      transform: scale(1.02);
    }

    button[sc-clock-picker-period-button]:focus {
      background: var(--accent);
      color: var(--accent-foreground);
      outline: none;
    }

    button[sc-clock-picker-period-button]:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }

    button[sc-clock-picker-period-button][data-active='true'] {
      background: var(--primary);
      color: var(--primary-foreground);
      border-color: var(--primary);
      transform: scale(1.05);
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
    '[class.sc-clock-picker-period-button]': 'true',
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
