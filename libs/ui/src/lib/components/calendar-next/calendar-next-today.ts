import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScButtonVariants, buttonVariants } from '../button/button';
import { ScCalendarNext } from './calendar-next';

@Directive({
  selector: 'button[scCalendarNextToday]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScCalendarNextToday {
  private readonly calendar = inject(ScCalendarNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'flex-1',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.calendar.goToToday();
  }
}
