import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { type ScButtonVariants } from '../button/button';
import { ScTourGuide } from './tour-guide';

/** The step before; disabled at the first. Write its text ("Back"). */
@Directive({
  selector: 'button[scTourGuidePrevious]',
  host: {
    type: 'button',
    'data-slot': 'tour-guide-previous',
    '[disabled]': 'tour.first()',
    '[class]': 'class()',
    '(click)': 'tour.previous()',
  },
})
export class ScTourGuidePrevious {
  private readonly buttonStyles = injectStyle().button;

  private readonly tour = inject(ScTourGuide);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTourGuidePrevious');
  }
}
