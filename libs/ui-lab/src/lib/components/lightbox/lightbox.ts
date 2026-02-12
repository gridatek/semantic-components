import {
  Directive,
  InjectionToken,
  input,
  model,
  output,
  signal,
  computed,
  DestroyRef,
  inject,
  afterNextRender,
} from '@angular/core';
import { LightboxImage } from './lightbox.types';

/**
 * Injection token for ScLightbox
 */
export interface ScLightbox {
  // Inputs
  images: () => LightboxImage[];
  loop: () => boolean;
  showCounter: () => boolean;
  showInfo: () => boolean;
  showZoom: () => boolean;
  showThumbnails: () => boolean;
  closeOnOverlayClick: () => boolean;
  closeOnEscape: () => boolean;

  // Models
  isOpen: ReturnType<typeof model<boolean>>;
  currentIndex: ReturnType<typeof model<number>>;

  // Outputs
  opened: ReturnType<typeof output<number>>;
  closed: ReturnType<typeof output<void>>;
  indexChange: ReturnType<typeof output<number>>;

  // State
  zoomLevel: ReturnType<typeof signal<number>>;
  imageLoading: ReturnType<typeof signal<boolean>>;

  // Computed
  currentImage: () => LightboxImage;

  // Methods
  open: (index?: number) => void;
  close: () => void;
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  onImageLoad: () => void;
  onOverlayClick: (event: MouseEvent) => void;
  onKeydown: (event: KeyboardEvent) => void;
  getCurrentImage: () => LightboxImage | undefined;
}

export const SC_LIGHTBOX = new InjectionToken<ScLightbox>('SC_LIGHTBOX');

@Directive({
  selector: '[sc-lightbox]',
  exportAs: 'scLightbox',
  providers: [{ provide: SC_LIGHTBOX, useExisting: ScLightboxDirective }],
  host: {
    'data-slot': 'lightbox',
  },
})
export class ScLightboxDirective implements ScLightbox {
  private readonly destroyRef = inject(DestroyRef);

  // Configuration inputs
  readonly images = input<LightboxImage[]>([]);
  readonly loop = input<boolean>(true);
  readonly showCounter = input<boolean>(true);
  readonly showInfo = input<boolean>(true);
  readonly showZoom = input<boolean>(true);
  readonly showThumbnails = input<boolean>(true);
  readonly closeOnOverlayClick = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);

  // Models for two-way binding
  readonly isOpen = model<boolean>(false);
  readonly currentIndex = model<number>(0);

  // Outputs
  readonly opened = output<number>();
  readonly closed = output<void>();
  readonly indexChange = output<number>();

  // Internal state signals
  readonly zoomLevel = signal(1);
  readonly imageLoading = signal(false);

  // Computed
  readonly currentImage = computed(() => {
    const images = this.images();
    const index = this.currentIndex();
    return images[index];
  });

  constructor() {
    // Set up keyboard handling
    afterNextRender(() => {
      this.destroyRef.onDestroy(() => {
        document.body.style.overflow = '';
      });
    });
  }

  // Public methods for child components
  open(index = 0): void {
    this.currentIndex.set(index);
    this.isOpen.set(true);
    this.zoomLevel.set(1);
    this.imageLoading.set(true);
    this.opened.emit(index);
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.isOpen.set(false);
    this.closed.emit();
    document.body.style.overflow = '';
  }

  next(): void {
    const images = this.images();
    const current = this.currentIndex();

    if (current < images.length - 1) {
      this.goTo(current + 1);
    } else if (this.loop()) {
      this.goTo(0);
    }
  }

  previous(): void {
    const current = this.currentIndex();

    if (current > 0) {
      this.goTo(current - 1);
    } else if (this.loop()) {
      this.goTo(this.images().length - 1);
    }
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

  onOverlayClick(event: MouseEvent): void {
    if (
      this.closeOnOverlayClick() &&
      (event.target as HTMLElement).classList.contains('lightbox-overlay')
    ) {
      this.close();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        if (this.closeOnEscape()) {
          this.close();
        }
        break;
      case 'ArrowLeft':
        this.previous();
        break;
      case 'ArrowRight':
        this.next();
        break;
      case '+':
      case '=':
        this.zoomIn();
        break;
      case '-':
        this.zoomOut();
        break;
      case '0':
        this.resetZoom();
        break;
    }
  }

  getCurrentImage(): LightboxImage | undefined {
    return this.currentImage();
  }
}
