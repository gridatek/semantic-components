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
import { SiImageIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-keyboard-lightbox-demo',
  imports: [ScLightbox, ScLightboxContainer, ScLightboxTrigger, SiImageIcon],
  template: `
    <div class="space-y-3">
      <ul class="text-muted-foreground list-inside list-disc space-y-1 text-sm">
        <li>
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">←</kbd>
          /
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">→</kbd>
          - Navigate images
        </li>
        <li>
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">+</kbd>
          /
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">-</kbd>
          - Zoom in/out
        </li>
        <li>
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">0</kbd>
          - Reset zoom
        </li>
        <li>
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">Esc</kbd>
          - Close lightbox
        </li>
      </ul>
      <div scLightbox [images]="images">
        <button
          scLightboxTrigger
          [index]="0"
          class="hover:bg-accent inline-flex items-center gap-2 rounded-md border px-4 py-2"
        >
          <svg siImageIcon class="size-4"></svg>
          Open Gallery
        </button>
        <div scLightboxContainer></div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardLightboxDemo {
  readonly images: LightboxImage[] = [
    { src: 'https://picsum.photos/800/600?random=1', alt: 'Random image 1' },
    { src: 'https://picsum.photos/800/600?random=2', alt: 'Random image 2' },
    { src: 'https://picsum.photos/800/600?random=3', alt: 'Random image 3' },
    { src: 'https://picsum.photos/800/600?random=4', alt: 'Random image 4' },
  ];
}
