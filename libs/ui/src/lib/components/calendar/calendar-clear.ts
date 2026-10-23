import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScButtonVariants } from '../button/button';
import { ScCalendar } from './calendar';

@Directive({
  selector: 'button[scCalendarClear]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScCalendarClear {
  private readonly buttonStyles = injectPreset().button;

  private readonly calendar = inject(ScCalendar);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'flex-1',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.calendar.clear();
  }
}
