import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  LightboxImage,
  ScLightbox,
  ScLightboxContainer,
  ScLightboxImage,
  ScLightboxTrigger,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-single-lightbox-demo',
  imports: [
    ScLightbox,
    ScLightboxContainer,
    ScLightboxImage,
    ScLightboxTrigger,
    SiXIcon,
  ],
  template: `
    <div scLightbox [images]="[image]" #lightbox="scLightbox">
      <button
        scLightboxTrigger
        [index]="0"
        class="focus:ring-ring w-48 overflow-hidden rounded-lg focus:ring-2 focus:outline-none"
      >
        <img
          [src]="image.src"
          [alt]="image.alt"
          class="aspect-video w-full object-cover"
        />
      </button>

      @if (lightbox.isOpen()) {
        <div scLightboxContainer>
          <button
            type="button"
            class="absolute top-4 right-4 z-10 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            (click)="lightbox.close()"
            aria-label="Close lightbox"
          >
            <svg siXIcon class="size-6"></svg>
          </button>

          <div
            class="relative flex flex-1 items-center justify-center overflow-hidden"
          >
            <img scLightboxImage />
          </div>

          @if (
            lightbox.currentImage().title || lightbox.currentImage().description
          ) {
            <div class="bg-black/50 px-4 py-3 text-white">
              @if (lightbox.currentImage().title) {
                <h3 class="font-semibold">
                  {{ lightbox.currentImage().title }}
                </h3>
              }
              @if (lightbox.currentImage().description) {
                <p class="text-sm text-white/80">
                  {{ lightbox.currentImage().description }}
                </p>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleLightboxDemo {
  readonly image: LightboxImage = {
    src: 'https://picsum.photos/800/600?random=30',
    alt: 'Single image',
    title: 'Featured Photo',
    description: 'This is a featured photo with detailed information.',
  };
}
