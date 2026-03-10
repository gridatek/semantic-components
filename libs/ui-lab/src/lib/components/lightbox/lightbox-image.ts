import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_LIGHTBOX } from './lightbox';

@Directive({
  selector: 'img[scLightboxImage]',
  host: {
    'data-slot': 'lightbox-image',
    '[class]': 'class()',
    '[src]': 'lightbox.currentImage().src',
    '[alt]': 'alt()',
    '[style.transform]': "'scale(' + lightbox.zoomLevel() + ')'",
    '(load)': 'lightbox.onImageLoad()',
    draggable: 'false',
  },
})
export class ScLightboxImage {
  readonly lightbox = inject(SC_LIGHTBOX);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly alt = computed(
    () =>
      this.lightbox.currentImage().alt ||
      'Image ' + (this.lightbox.currentIndex() + 1),
  );

  protected readonly class = computed(() =>
    cn(
      'max-h-[calc(100vh-200px)] max-w-[calc(100vw-100px)] object-contain transition-transform duration-200',
      this.lightbox.imageLoading() && 'opacity-0',
      this.classInput(),
    ),
  );
}
