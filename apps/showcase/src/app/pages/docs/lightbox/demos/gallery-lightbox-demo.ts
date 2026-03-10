import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  LightboxImage,
  ScLightbox,
  ScLightboxContainer,
  ScLightboxGallery,
  ScLightboxGalleryItem,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-gallery-lightbox-demo',
  imports: [
    ScLightbox,
    ScLightboxContainer,
    ScLightboxGallery,
    ScLightboxGalleryItem,
  ],
  template: `
    <div scLightbox [images]="images" class="max-w-xl">
      <div scLightboxGallery class="grid-cols-4 gap-2">
        @for (image of images; track image.src; let i = $index) {
          <button type="button" scLightboxGalleryItem [index]="i">
            <img
              [src]="image.src"
              [alt]="image.alt || 'Gallery image ' + (i + 1)"
              class="size-full object-cover"
            />
          </button>
        }
      </div>
      <div scLightboxContainer></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryLightboxDemo {
  readonly images: LightboxImage[] = [
    { src: 'https://picsum.photos/800/600?random=20', alt: 'Gallery 1' },
    { src: 'https://picsum.photos/800/600?random=21', alt: 'Gallery 2' },
    { src: 'https://picsum.photos/800/600?random=22', alt: 'Gallery 3' },
    { src: 'https://picsum.photos/800/600?random=23', alt: 'Gallery 4' },
    { src: 'https://picsum.photos/800/600?random=24', alt: 'Gallery 5' },
    { src: 'https://picsum.photos/800/600?random=25', alt: 'Gallery 6' },
    { src: 'https://picsum.photos/800/600?random=26', alt: 'Gallery 7' },
    { src: 'https://picsum.photos/800/600?random=27', alt: 'Gallery 8' },
  ];
}
