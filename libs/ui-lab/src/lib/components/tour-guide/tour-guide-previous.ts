import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
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
  private readonly buttonStyles = injectPreset().button;

  protected readonly tour = inject(ScTourGuide);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTourGuidePrevious');
  }
}
