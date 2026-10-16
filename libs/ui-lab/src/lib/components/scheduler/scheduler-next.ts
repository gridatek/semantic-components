import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScScheduler } from './scheduler';

/** Shows the month, week or day after. Write its icon and name it. */
@Directive({
  selector: 'button[scSchedulerNext]',
  host: {
    type: 'button',
    'data-slot': 'scheduler-next',
    '[class]': 'class()',
    '(click)': 'scheduler.next()',
  },
})
export class ScSchedulerNext {
  protected readonly scheduler = inject(ScScheduler);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'rtl:[&_svg]:rotate-180',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scSchedulerNext');
  }
}
