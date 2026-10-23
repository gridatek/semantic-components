import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScTourGuide } from './tour-guide';

/** The next step — at the last, the end (finished). Write its text from `tour.last()` ("Next" / "Done"). */
@Directive({
  selector: 'button[scTourGuideNext]',
  host: {
    type: 'button',
    'data-slot': 'tour-guide',
    '[class]': 'class()',
    '(click)': 'tour.next()',
  },
})
export class ScTourGuideNext {
  private readonly buttonStyles = injectPreset().button;

  protected readonly tour = inject(ScTourGuide);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTourGuideNext');
  }
}
