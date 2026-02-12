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
  selector: 'app-keyboard-lightbox-demo',
  imports: [ScLightbox, ScLightboxContainer, ScLightboxTrigger],
  template: `
    <div class="space-y-3">
      <ul class="text-sm space-y-1 list-disc list-inside text-muted-foreground">
        <li>
          <kbd class="px-1 py-0.5 bg-muted rounded text-xs">←</kbd>
          /
          <kbd class="px-1 py-0.5 bg-muted rounded text-xs">→</kbd>
          - Navigate images
        </li>
        <li>
          <kbd class="px-1 py-0.5 bg-muted rounded text-xs">+</kbd>
          /
          <kbd class="px-1 py-0.5 bg-muted rounded text-xs">-</kbd>
          - Zoom in/out
        </li>
        <li>
          <kbd class="px-1 py-0.5 bg-muted rounded text-xs">0</kbd>
          - Reset zoom
        </li>
        <li>
          <kbd class="px-1 py-0.5 bg-muted rounded text-xs">Esc</kbd>
          - Close lightbox
        </li>
      </ul>
      <div sc-lightbox [images]="images">
        <button
          sc-lightbox-trigger
          [index]="0"
          class="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-4"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          Open Gallery
        </button>
        <div sc-lightbox-container></div>
      </div>
    </div>
  `,
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
