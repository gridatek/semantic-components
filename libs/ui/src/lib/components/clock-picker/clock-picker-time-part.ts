import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'button[sc-clock-picker-time-part]',
  imports: [],
  template: `
    <ng-content />
  `,
  styles: `
    button[sc-clock-picker-time-part] {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      transition:
        background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid transparent;
      background: transparent;
      color: inherit;
      cursor: pointer;
    }

    button[sc-clock-picker-time-part]:hover {
      background: var(--accent);
      transform: scale(1.02);
    }

    button[sc-clock-picker-time-part]:focus {
      background: var(--accent);
      outline: none;
    }

    button[sc-clock-picker-time-part][data-active='true'] {
      border-color: var(--primary);
      background: color-mix(in srgb, var(--primary) 10%, transparent);
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    role: 'tab',
    tabindex: '0',
    '[attr.data-active]': 'active() ? "true" : null',
    '[attr.aria-selected]': 'active()',
    '(click)': 'clicked.emit()',
    '(keydown)': 'keyPressed.emit($event)',
    '[class.sc-clock-picker-time-part]': 'true',
  },
})
export class ScClockPickerTimePart {
  readonly active = input<boolean>(false);

  readonly clicked = output<void>();
  readonly keyPressed = output<KeyboardEvent>();
}
