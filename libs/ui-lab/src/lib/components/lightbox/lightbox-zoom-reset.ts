import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScLightbox } from './lightbox';

/** Back to the whole image. Write its icon and name it ("Fit"). */
@Directive({
  selector: 'button[scLightboxZoomReset]',
  host: {
    type: 'button',
    'data-slot': 'lightbox-zoom-reset',
    '[disabled]': 'lightbox.zoom() === 1',
    '[class]': 'class()',
    '(click)': 'lightbox.resetZoom()',
  },
})
export class ScLightboxZoomReset {
  protected readonly lightbox = inject(ScLightbox);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      // On the dark viewer: white.
      'text-white hover:bg-white/15 hover:text-white dark:hover:bg-white/15',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scLightboxZoomReset');
  }
}
