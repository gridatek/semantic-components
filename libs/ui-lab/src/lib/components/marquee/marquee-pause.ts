import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScMarquee } from './marquee';

/**
 * Stops and starts the marquee — the way to pause moving content (WCAG
 * 2.2.2). Put it in the marquee; write its icon and its name from
 * `marquee.paused()` ("Pause" / "Play").
 */
@Directive({
  selector: 'button[scMarqueePause]',
  host: {
    type: 'button',
    'data-slot': 'marquee-pause',
    '[class]': 'class()',
    '(click)': 'marquee.paused.set(!marquee.paused())',
  },
})
export class ScMarqueePause {
  protected readonly marquee = inject(ScMarquee);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scMarqueePause');
  }
}
