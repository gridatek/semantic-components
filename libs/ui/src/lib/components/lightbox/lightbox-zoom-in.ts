import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { type ScButtonVariants } from '../button/button';
import { ScLightbox } from './lightbox';

/** Zooms in. Write its icon and name it ("Zoom in"). */
@Directive({
  selector: 'button[scLightboxZoomIn]',
  host: {
    type: 'button',
    'data-slot': 'lightbox-zoom-in',
    '[disabled]': 'lightbox.zoom() >= 4',
    '[class]': 'class()',
    '(click)': 'lightbox.zoomBy(1.5)',
  },
})
export class ScLightboxZoomIn {
  private readonly buttonStyles = injectStyle().button;

  private readonly lightbox = inject(ScLightbox);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      // On the dark viewer: white.
      'text-white hover:bg-white/15 hover:text-white dark:hover:bg-white/15',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scLightboxZoomIn');
  }
}
