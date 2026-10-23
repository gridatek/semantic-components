import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScButtonVariants } from '../button/button';
import { ScCalendar } from './calendar';

/**
 * The view's heading as a button that zooms out (days → months → years).
 * The header has one, showing `heading()`; write your own in the header to
 * replace it.
 */
@Directive({
  selector: 'button[scCalendarHeading]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'calendar.view() === "year"',
    '(click)': 'onClick()',
  },
})
export class ScCalendarHeading {
  private readonly buttonStyles = injectPreset().button;

  readonly calendar = inject(ScCalendar);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  onClick(): void {
    this.calendar.zoomOut();
  }
}
