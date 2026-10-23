import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
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
  private readonly buttonStyles = injectPreset().button;

  protected readonly marquee = inject(ScMarquee);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scMarqueePause');
  }
}
