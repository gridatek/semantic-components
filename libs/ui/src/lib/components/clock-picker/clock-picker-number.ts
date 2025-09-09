import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'button[sc-clock-picker-number]',
  imports: [],
  template: `
    <ng-content />
  `,
  styles: `
    button[sc-clock-picker-number] {
      position: absolute;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 500;
      border-radius: 50%;
      transition:
        background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.15s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 15;
      background: transparent;
      color: var(--foreground);
      border: none;
      cursor: pointer;
      user-select: none;
    }

    button[sc-clock-picker-number]:hover {
      background: var(--accent);
      color: var(--accent-foreground);
      transform: scale(1.1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    button[sc-clock-picker-number]:focus {
      background: var(--accent);
      color: var(--accent-foreground);
      transform: scale(1.05);
      outline: none;
    }

    button[sc-clock-picker-number]:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }

    button[sc-clock-picker-number][data-selected='true'] {
      background: var(--primary);
      color: var(--primary-foreground);
      transform: scale(1.15);
      box-shadow: 0 4px 12px color-mix(in srgb, var(--primary) 30%, transparent);
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    role: 'gridcell',
    tabindex: '-1',
    '[attr.data-selected]': 'selected() ? "true" : null',
    '[attr.aria-selected]': 'selected()',
    '[style.left.px]': 'x()',
    '[style.top.px]': 'y()',
    '(click)': 'clicked.emit(value())',
    '[class.sc-clock-picker-number]': 'true',
  },
})
export class ScClockPickerNumber {
  readonly value = input.required<number>();
  readonly x = input.required<number>();
  readonly y = input.required<number>();
  readonly selected = input<boolean>(false);

  readonly clicked = output<number>();
}
