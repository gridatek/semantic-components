import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { LightboxImage } from './lightbox.types';
import { ScLightboxDirective } from './lightbox';
import { ScLightboxContainer } from './lightbox-container';

@Component({
  selector: 'sc-lightbox-gallery',
  exportAs: 'scLightboxGallery',
  template: `
    <div [class]="galleryClass()">
      @for (image of images(); track image.src; let i = $index) {
        <button
          type="button"
          [class]="itemClass()"
          (click)="lightbox.open(i)"
          [attr.aria-label]="'Open image ' + (i + 1)"
        >
          <img
            [src]="image.thumbnail || image.src"
            [alt]="image.alt || 'Gallery image ' + (i + 1)"
            class="size-full object-cover"
          />
        </button>
      }
    </div>

    <div
      sc-lightbox
      #lightbox="scLightbox"
      [images]="images()"
      [loop]="loop()"
      [showCounter]="showCounter()"
      [showInfo]="showInfo()"
      [showZoom]="showZoom()"
      [showThumbnails]="showThumbnails()"
    >
      <div sc-lightbox-container></div>
    </div>
  `,
  host: {
    'data-slot': 'lightbox-gallery',
  },
  imports: [ScLightboxDirective, ScLightboxContainer],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScLightboxGallery {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly images = input<LightboxImage[]>([]);
  readonly columns = input<number>(3);
  readonly gap = input<number>(4);
  readonly loop = input<boolean>(true);
  readonly showCounter = input<boolean>(true);
  readonly showInfo = input<boolean>(true);
  readonly showZoom = input<boolean>(true);
  readonly showThumbnails = input<boolean>(true);

  protected readonly galleryClass = computed(() =>
    cn(
      'grid',
      `grid-cols-${this.columns()}`,
      `gap-${this.gap()}`,
      this.classInput(),
    ),
  );

  protected readonly itemClass = computed(() =>
    cn(
      'aspect-square overflow-hidden rounded-lg cursor-pointer',
      'hover:opacity-90 transition-opacity',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    ),
  );
}
