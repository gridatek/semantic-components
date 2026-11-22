import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScMeter } from './meter';

/**
 * The value, shown: as the meter writes it — or your text inside it. Hidden
 * from screen readers (the meter reads its value). The style's progress value.
 */
@Component({
  selector: '[scMeterValue]',
  template: ` <ng-content>{{ meter.text() }}</ng-content> `,
  host: {
    'data-slot': 'meter-value',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMeterValue {
  private readonly styles = injectStyle().progress;
  private readonly meter = inject(ScMeter);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.value, this.classInput()),
  );
}
