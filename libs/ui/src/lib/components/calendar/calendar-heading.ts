import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScButtonVariants, buttonVariants } from '../button/button';
import { ScCalendar } from './calendar';

@Directive({
  selector: 'button[scCalendarHeading]',
  host: {
    'data-slot': 'calendar-heading',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-expanded]': 'calendar.viewMode() !== "day"',
    '(click)': 'onClick()',
  },
})
export class ScCalendarHeading {
  readonly calendar = inject(ScCalendar);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  onClick(): void {
    this.calendar.handleHeaderClick();
  }
}
