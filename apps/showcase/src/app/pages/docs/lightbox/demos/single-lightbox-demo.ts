import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  LightboxImage,
  ScLightbox,
  ScLightboxPortal,
  ScLightboxProvider,
  ScLightboxTrigger,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-single-lightbox-demo',
  imports: [
    ScLightboxProvider,
    ScLightbox,
    ScLightboxTrigger,
    ScLightboxPortal,
    SiXIcon,
  ],
  template: `
    <div scLightboxProvider [images]="[image]" #lightbox="scLightboxProvider">
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

      <ng-template scLightboxPortal>
        <div scLightbox>
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
            <img
              [src]="image.src"
              [alt]="image.alt || 'Image'"
              class="max-h-[calc(100vh-200px)] max-w-[calc(100vw-100px)] object-contain"
              draggable="false"
            />
          </div>

          @if (image.title || image.description) {
            <div class="bg-black/50 px-4 py-3 text-white">
              @if (image.title) {
                <h3 class="font-semibold">
                  {{ image.title }}
                </h3>
              }
              @if (image.description) {
                <p class="text-sm text-white/80">
                  {{ image.description }}
                </p>
              }
            </div>
          }
        </div>
      </ng-template>
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
