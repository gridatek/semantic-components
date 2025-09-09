import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'div[sc-clock-picker-hand-knob]',
  imports: [],
  template: `
    <ng-content />
  `,
  styles: `
    .sc-clock-picker-hand-knob {
      position: absolute;
      top: -16px; /* Centered at the tip of the hand */
      left: 50%;
      width: 32px; /* Same as time number circles */
      height: 32px; /* Same as time number circles */
      background: transparent; /* Invisible by default */
      border: none;
      border-radius: 50%;
      transform: translateX(-50%);
      cursor: grab;
      pointer-events: all;
      z-index: 25; /* Higher than selected numbers */
      transition:
        background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.15s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .sc-clock-picker-hand-knob:hover {
      background: color-mix(in srgb, var(--primary) 15%, transparent);
      transform: translateX(-50%) scale(1.1);
      box-shadow: 0 2px 8px color-mix(in srgb, var(--primary) 20%, transparent);
    }

    .sc-clock-picker-hand-knob.dragging {
      cursor: grabbing;
      background: color-mix(in srgb, var(--primary) 25%, transparent);
      transform: translateX(-50%) scale(1.05);
      box-shadow: 0 4px 12px color-mix(in srgb, var(--primary) 30%, transparent);
    }
  `,

  host: {
    '[class.sc-clock-picker-hand-knob]': 'true',
  },

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScClockPickerHandKnob {}
