import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

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
  styles: ``,

  host: {
    '[class]': 'class()',
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
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'absolute top-1/2 left-1/2 w-0.5 bg-primary origin-bottom z-[15] h-[110px] rounded-sm -mt-[110px] pointer-events-none transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:bg-primary/80',
      this.isDragging() && 'transition-none bg-primary/80',
      this.classInput(),
    ),
  );

  readonly dragStarted = output<MouseEvent | TouchEvent>();
}
