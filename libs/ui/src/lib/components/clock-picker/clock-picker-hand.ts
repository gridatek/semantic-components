import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';

import { ScClockPickerHandKnob } from './clock-picker-hand-knob';

@Component({
  selector: 'div[sc-clock-picker-hand]',
  imports: [ScClockPickerHandKnob],
  template: `
    <div
      [class.dragging]="isDragging()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-valuemin]="valueMin()"
      [attr.aria-valuemax]="valueMax()"
      [attr.aria-valuenow]="valueNow()"
      [attr.aria-valuetext]="valueText()"
      (mousedown)="dragStarted.emit($event)"
      (touchstart)="dragStarted.emit($event)"
      sc-clock-picker-hand-knob
      role="slider"
      tabindex="0"
    ></div>
  `,
  styles: `
    .sc-clock-picker-hand {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      background: var(--primary);
      transform-origin: 50% 100%;
      transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      z-index: 15;
      height: 110px;
      border-radius: 1px;
      margin-top: -110px;
      margin-left: 0px;
      pointer-events: none; /* Let the knob handle interactions */
    }

    .sc-clock-picker-hand:hover {
      background: color-mix(in srgb, var(--primary) 80%, black);
    }

    .sc-clock-picker-hand.dragging {
      transition: none;
      background: color-mix(in srgb, var(--primary) 80%, black);
    }
  `,

  host: {
    '[class.sc-clock-picker-hand]': 'true',
    '[class.dragging]': 'isDragging()',
    '[style.transform]': "'rotate(' + angle() + 'deg)'",
  },

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScClockPickerHand {
  readonly angle = input.required<number>();
  readonly isDragging = input<boolean>(false);
  readonly ariaLabel = input<string>('');
  readonly valueMin = input<number>(0);
  readonly valueMax = input<number>(59);
  readonly valueNow = input<number>(0);
  readonly valueText = input<string>('');

  readonly dragStarted = output<MouseEvent | TouchEvent>();
}
