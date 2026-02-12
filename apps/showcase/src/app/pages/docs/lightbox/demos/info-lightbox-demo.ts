import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScLightbox,
  ScLightboxContainer,
  ScLightboxTrigger,
  LightboxImage,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-info-lightbox-demo',
  imports: [ScLightbox, ScLightboxContainer, ScLightboxTrigger],
  template: `
    <div sc-lightbox [images]="images">
      <div class="flex gap-4">
        @for (image of images; track image.src; let i = $index) {
          <button
            sc-lightbox-trigger
            [index]="i"
            class="w-40 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <img
              [src]="image.thumbnail || image.src"
              [alt]="image.alt"
              class="w-full aspect-video object-cover"
            />
            <div class="p-2 text-left">
              <p class="text-sm font-medium truncate">{{ image.title }}</p>
            </div>
          </button>
        }
      </div>
      <div sc-lightbox-container></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoLightboxDemo {
  readonly images: LightboxImage[] = [
    {
      src: 'https://picsum.photos/800/600?random=10',
      alt: 'Mountain landscape',
      title: 'Mountain Sunrise',
      description: 'A beautiful sunrise over the mountains captured at dawn.',
    },
    {
      src: 'https://picsum.photos/800/600?random=11',
      alt: 'Ocean view',
      title: 'Ocean Waves',
      description: 'Peaceful ocean waves on a sunny afternoon.',
    },
    {
      src: 'https://picsum.photos/800/600?random=12',
      alt: 'Forest path',
      title: 'Forest Trail',
      description: 'A winding path through an ancient forest.',
    },
  ];
}
