import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScButtonVariants } from '../button/button';
import { ScCalendar } from './calendar';

@Directive({
  selector: 'button[scCalendarPrevious]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScCalendarPrevious {
  private readonly buttonStyles = injectStyle().button;

  private readonly calendar = inject(ScCalendar);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'absolute start-0 size-(--cell-size) p-0 select-none',
      // Its arrow points the reading way.
      'rtl:[&>svg]:rotate-180',
      this.classInput(),
    ),
  );

  private onClick(): void {
    this.calendar.previous();
  }
}
