import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button/button';
import { ScScheduler } from './scheduler';

/** Shows today. Write its text ("Today"). */
@Directive({
  selector: 'button[scSchedulerToday]',
  host: {
    type: 'button',
    'data-slot': 'scheduler-today',
    '[class]': 'class()',
    '(click)': 'scheduler.goToToday()',
  },
})
export class ScSchedulerToday {
  private readonly buttonStyles = injectStyle().button;

  private readonly scheduler = inject(ScScheduler);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'rtl:[&_svg]:rotate-180',
      this.classInput(),
    ),
  );
}
