import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScLightbox } from './lightbox';

/** The item after; disabled at the last, unless it loops. Write its icon and name it ("Next image"). */
@Directive({
  selector: 'button[scLightboxNext]',
  host: {
    type: 'button',
    'data-slot': 'lightbox-next',
    '[disabled]': '!lightbox.hasNext()',
    '[class]': 'class()',
    '(click)': 'lightbox.next()',
  },
})
export class ScLightboxNext {
  private readonly buttonStyles = injectPreset().button;

  protected readonly lightbox = inject(ScLightbox);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      // On the dark viewer: white.
      'text-white hover:bg-white/15 hover:text-white dark:hover:bg-white/15',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scLightboxNext');
  }
}
