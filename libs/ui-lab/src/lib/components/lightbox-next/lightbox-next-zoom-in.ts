import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScLightboxNext } from './lightbox-next';

/** Zooms in. Write its icon and name it ("Zoom in"). */
@Directive({
  selector: 'button[scLightboxNextZoomIn]',
  host: {
    type: 'button',
    'data-slot': 'lightbox-zoom-in',
    '[disabled]': 'lightbox.zoom() >= 4',
    '[class]': 'class()',
    '(click)': 'lightbox.zoomBy(1.5)',
  },
})
export class ScLightboxNextZoomIn {
  protected readonly lightbox = inject(ScLightboxNext);

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
    ɵwarnIfUnnamed('scLightboxNextZoomIn');
  }
}
