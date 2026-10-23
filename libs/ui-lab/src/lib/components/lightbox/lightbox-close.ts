import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScLightbox } from './lightbox';

/** Closes the lightbox. Write its icon and name it ("Close"). */
@Directive({
  selector: 'button[scLightboxClose]',
  host: {
    type: 'button',
    'data-slot': 'lightbox-close',
    '[class]': 'class()',
    '(click)': 'lightbox.close()',
  },
})
export class ScLightboxClose {
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
    ɵwarnIfUnnamed('scLightboxClose');
  }
}
