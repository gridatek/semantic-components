import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { type ScButtonVariants } from '../button/button';
import { ScScheduler } from './scheduler';

/** Shows the month, week or day after. Write its icon and name it. */
@Directive({
  selector: 'button[scSchedulerNext]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'scheduler.next()',
  },
})
export class ScSchedulerNext {
  private readonly buttonStyles = injectStyle().button;

  private readonly scheduler = inject(ScScheduler);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'rtl:[&_svg]:rotate-180',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scSchedulerNext');
  }
}
