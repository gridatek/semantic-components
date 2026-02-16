import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLightboxGallery, LightboxImage } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-gallery-lightbox-demo',
  imports: [ScLightboxGallery],
  template: `
    <sc-lightbox-gallery [images]="images" class="grid-cols-4 gap-2 max-w-xl" />
  `,
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
