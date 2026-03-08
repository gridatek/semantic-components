import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScButtonVariants, buttonVariants } from '../button/button';
import { ScCalendar } from './calendar';

@Directive({
  selector: 'button[scCalendarPrevious]',
  host: {
    'data-slot': 'calendar-previous',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScCalendarPrevious {
  private readonly calendar = inject(ScCalendar);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'absolute left-1',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.calendar.handlePrevious();
  }
}
