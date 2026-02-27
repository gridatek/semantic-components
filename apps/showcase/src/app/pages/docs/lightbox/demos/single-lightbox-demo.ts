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
  selector: 'app-single-lightbox-demo',
  imports: [ScLightbox, ScLightboxContainer, ScLightboxTrigger],
  template: `
    <div scLightbox [images]="[image]">
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
      <div scLightboxContainer></div>
    </div>
  `,
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
