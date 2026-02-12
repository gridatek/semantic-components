import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-slider-range]',
  host: {
    'data-slot': 'slider-range',
    '[class]': 'class()',
    '[style.width.%]': 'percentage()',
  },
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSliderRange {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly percentage = input.required<number>();

  protected readonly class = computed(() =>
    cn('absolute h-full bg-primary', this.classInput()),
  );
}
