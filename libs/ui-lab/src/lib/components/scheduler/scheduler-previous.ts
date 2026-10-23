import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScScheduler } from './scheduler';

/** Shows the month, week or day before. Write its icon and name it. */
@Directive({
  selector: 'button[scSchedulerPrevious]',
  host: {
    type: 'button',
    'data-slot': 'scheduler-previous',
    '[class]': 'class()',
    '(click)': 'scheduler.previous()',
  },
})
export class ScSchedulerPrevious {
  private readonly buttonStyles = injectPreset().button;

  protected readonly scheduler = inject(ScScheduler);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'rtl:[&_svg]:rotate-180',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scSchedulerPrevious');
  }
}
