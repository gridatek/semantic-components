import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScButtonVariants, buttonVariants } from '../button/button';
import { ScCalendarNext } from './calendar-next';

@Directive({
  selector: 'button[scCalendarNextHeading]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'calendar.view() === "year"',
    '(click)': 'onClick()',
  },
})
export class ScCalendarNextHeading {
  readonly calendar = inject(ScCalendarNext);

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
    this.calendar.zoomOut();
  }
}
