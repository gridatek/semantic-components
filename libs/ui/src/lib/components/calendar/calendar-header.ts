import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScCalendar } from './calendar';
import { ScCalendarHeading } from './calendar-heading';

/**
 * The calendar's header: your previous and next buttons, and the heading —
 * a button showing `heading()`, unless you write your own
 * `button[scCalendarHeading]`.
 */
@Component({
  selector: 'div[scCalendarHeader]',
  imports: [ScCalendarHeading],
  template: `
    <ng-content />
    <ng-content select="[scCalendarHeading]">
      <button scCalendarHeading>{{ calendar.heading() }}</button>
    </ng-content>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCalendarHeader {
  protected readonly calendar = inject(ScCalendar);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('relative flex items-center justify-center pt-1', this.classInput()),
  );
}
