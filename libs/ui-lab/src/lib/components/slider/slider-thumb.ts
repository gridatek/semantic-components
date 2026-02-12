import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-slider-thumb]',
  host: {
    'data-slot': 'slider-thumb',
    '[class]': 'class()',
    '[style.left.%]': 'percentage()',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '[attr.role]': '"slider"',
    '[attr.aria-valuemin]': 'min()',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuenow]': 'value()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.aria-label]': 'ariaLabel() ?? null',
    '[attr.aria-labelledby]': 'ariaLabelledby() ?? null',
    '(keydown)': 'onKeydown($event)',
    '(mousedown)': 'onMouseDown($event)',
    '(touchstart)': 'onTouchStart($event)',
  },
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSliderThumb {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly percentage = input.required<number>();
  readonly value = input.required<number>();
  readonly min = input<number | undefined>(0);
  readonly max = input<number | undefined>(100);
  readonly step = input<number>(1);
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: 'aria-label',
  });
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: 'aria-labelledby',
  });

  readonly keydown = output<KeyboardEvent>();
  readonly mouseDown = output<MouseEvent>();
  readonly touchStart = output<TouchEvent>();

  protected readonly class = computed(() =>
    cn(
      'absolute block size-5 -translate-x-1/2 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.disabled()
        ? 'cursor-not-allowed'
        : 'cursor-grab active:cursor-grabbing',
      this.classInput(),
    ),
  );

  protected onKeydown(event: KeyboardEvent): void {
    this.keydown.emit(event);
  }

  protected onMouseDown(event: MouseEvent): void {
    this.mouseDown.emit(event);
  }

  protected onTouchStart(event: TouchEvent): void {
    this.touchStart.emit(event);
  }
}
