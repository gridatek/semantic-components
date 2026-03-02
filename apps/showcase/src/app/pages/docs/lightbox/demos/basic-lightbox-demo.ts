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
  selector: 'app-basic-lightbox-demo',
  imports: [ScLightbox, ScLightboxContainer, ScLightboxTrigger],
  template: `
    <div class="space-y-2">
      <div scLightbox [images]="images">
        <div class="flex gap-4">
          @for (image of images; track image.src; let i = $index) {
            <button
              scLightboxTrigger
              [index]="i"
              class="focus:ring-ring h-32 w-32 overflow-hidden rounded-lg focus:ring-2 focus:outline-none"
            >
              <img
                [src]="image.thumbnail || image.src"
                [alt]="image.alt"
                class="size-full object-cover"
              />
            </button>
          }
        </div>
        <div scLightboxContainer></div>
      </div>
      <p class="text-muted-foreground text-sm">
        Click an image to open the lightbox. Use arrow keys or buttons to
        navigate.
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicLightboxDemo {
  readonly images: LightboxImage[] = [
    { src: 'https://picsum.photos/800/600?random=1', alt: 'Random image 1' },
    { src: 'https://picsum.photos/800/600?random=2', alt: 'Random image 2' },
    { src: 'https://picsum.photos/800/600?random=3', alt: 'Random image 3' },
    { src: 'https://picsum.photos/800/600?random=4', alt: 'Random image 4' },
  ];
}
