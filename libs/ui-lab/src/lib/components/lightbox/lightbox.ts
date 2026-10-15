import { Directive, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_LIGHTBOX_PROVIDER } from './lightbox-provider';

@Directive({
  selector: '[scLightbox]',
  exportAs: 'scLightbox',
  host: {
    '[class]': 'class()',
    role: 'dialog',
    'aria-modal': 'true',
  },
})
export class ScLightbox {
  constructor() {
    ɵwarnIfUnnamed('scLightbox');
  }

  readonly provider = inject(SC_LIGHTBOX_PROVIDER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('fixed inset-0 z-10 flex flex-col', this.classInput()),
  );
}
