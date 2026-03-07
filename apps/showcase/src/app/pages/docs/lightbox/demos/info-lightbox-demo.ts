import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  LightboxImage,
  ScLightbox,
  ScLightboxContainer,
  ScLightboxTrigger,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-info-lightbox-demo',
  imports: [ScLightbox, ScLightboxContainer, ScLightboxTrigger],
  template: `
    <div scLightbox [images]="images">
      <div class="flex gap-4">
        @for (image of images; track image.src; let i = $index) {
          <button
            scLightboxTrigger
            [index]="i"
            class="focus:ring-ring w-40 overflow-hidden rounded-lg focus:ring-2 focus:outline-none"
          >
            <img
              [src]="image.thumbnail || image.src"
              [alt]="image.alt"
              class="aspect-video w-full object-cover"
            />
            <div class="p-2 text-left">
              <p class="truncate text-sm font-medium">{{ image.title }}</p>
            </div>
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
