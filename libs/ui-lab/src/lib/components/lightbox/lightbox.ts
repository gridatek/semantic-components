import {
  Directive,
  InjectionToken,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { LightboxImage } from './lightbox.types';

export interface ScLightbox {
  images: () => LightboxImage[];
  loop: () => boolean;
  closeOnEscape: () => boolean;

  isOpen: ReturnType<typeof model<boolean>>;
  currentIndex: ReturnType<typeof model<number>>;

  opened: ReturnType<typeof output<number>>;
  closed: ReturnType<typeof output<void>>;
  indexChange: ReturnType<typeof output<number>>;

  zoomLevel: ReturnType<typeof signal<number>>;
  imageLoading: ReturnType<typeof signal<boolean>>;

  currentImage: () => LightboxImage;

  open: (index?: number) => void;
  close: () => void;
  goTo: (index: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  onImageLoad: () => void;
}

export const SC_LIGHTBOX = new InjectionToken<ScLightbox>('SC_LIGHTBOX');

@Directive({
  selector: '[scLightbox]',
  exportAs: 'scLightbox',
  providers: [{ provide: SC_LIGHTBOX, useExisting: ScLightboxDirective }],
  host: {
    'data-slot': 'lightbox',
  },
})
export class ScLightboxDirective implements ScLightbox {
  readonly images = input<LightboxImage[]>([]);
  readonly loop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);

  readonly isOpen = model<boolean>(false);
  readonly currentIndex = model<number>(0);

  readonly opened = output<number>();
  readonly closed = output<void>();
  readonly indexChange = output<number>();

  readonly zoomLevel = signal(1);
  readonly imageLoading = signal(false);

  readonly currentImage = computed(() => {
    const images = this.images();
    const index = this.currentIndex();
    return images[index];
  });

  open(index = 0): void {
    this.currentIndex.set(index);
    this.isOpen.set(true);
    this.zoomLevel.set(1);
    this.imageLoading.set(true);
    this.opened.emit(index);
  }

  close(): void {
    this.isOpen.set(false);
    this.closed.emit();
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
    this.zoomLevel.set(1);
    this.imageLoading.set(true);
    this.indexChange.emit(index);
  }

  zoomIn(): void {
    this.zoomLevel.update((z) => Math.min(3, z + 0.25));
  }

  zoomOut(): void {
    this.zoomLevel.update((z) => Math.max(0.5, z - 0.25));
  }

  resetZoom(): void {
    this.zoomLevel.set(1);
  }

  onImageLoad(): void {
    this.imageLoading.set(false);
  }
}
