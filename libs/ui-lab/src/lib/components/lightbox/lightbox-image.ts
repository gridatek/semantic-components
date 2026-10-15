import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_LIGHTBOX_PROVIDER } from './lightbox-provider';

@Directive({
  selector: 'img[scLightboxImage]',
  host: {
    '[class]': 'class()',
    '[src]': 'provider.currentImage().src',
    '[alt]': 'alt()',
    '[style.transform]': "'scale(' + provider.zoomLevel() + ')'",
    '(load)': 'provider.onImageLoad()',
    draggable: 'false',
  },
})
export class ScLightboxImage {
  readonly provider = inject(SC_LIGHTBOX_PROVIDER);

  readonly classInput = input<string>('', { alias: 'class' });

  /** The image's own `alt`: give each image one. */
  protected readonly alt = computed(
    () => this.provider.currentImage().alt ?? '',
  );

  protected readonly class = computed(() =>
    cn(
      'max-h-[calc(100vh-200px)] max-w-[calc(100vw-100px)] object-contain transition-transform duration-200',
      this.provider.imageLoading() && 'opacity-0',
      this.classInput(),
    ),
  );
}
