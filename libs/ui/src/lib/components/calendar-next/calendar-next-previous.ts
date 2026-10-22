import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScButtonVariants, buttonVariants } from '../button/button';
import { ScCalendarNext } from './calendar-next';

@Directive({
  selector: 'button[scCalendarNextPrevious]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScCalendarNextPrevious {
  private readonly calendar = inject(ScCalendarNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'absolute start-1',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.calendar.previous();
  }
}
