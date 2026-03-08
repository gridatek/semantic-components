import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scCalendarHeader]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'calendar-header',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCalendarHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('relative flex items-center justify-center pt-1', this.classInput()),
  );
}
