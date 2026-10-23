import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScLightbox } from './lightbox';

/** Zooms out. Write its icon and name it ("Zoom out"). */
@Directive({
  selector: 'button[scLightboxZoomOut]',
  host: {
    type: 'button',
    'data-slot': 'lightbox-zoom-out',
    '[disabled]': 'lightbox.zoom() <= 1',
    '[class]': 'class()',
    '(click)': 'lightbox.zoomBy(1 / 1.5)',
  },
})
export class ScLightboxZoomOut {
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
    ɵwarnIfUnnamed('scLightboxZoomOut');
  }
}
