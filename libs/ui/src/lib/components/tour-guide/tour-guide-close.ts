import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScTourGuide } from './tour-guide';

/** Ends the tour, unfinished. Write its icon and name it ("Close tour"); placed in the card's corner. */
@Directive({
  selector: 'button[scTourGuideClose]',
  host: {
    type: 'button',
    'data-slot': 'tour-guide-close',
    '[class]': 'class()',
    '(click)': 'tour.close()',
  },
})
export class ScTourGuideClose {
  private readonly buttonStyles = injectPreset().button;

  protected readonly tour = inject(ScTourGuide);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'absolute end-2 top-2',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTourGuideClose');
  }
}
