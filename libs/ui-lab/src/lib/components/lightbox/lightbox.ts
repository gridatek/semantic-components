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

export const SC_LIGHTBOX = new InjectionToken<ScLightboxDirective>(
  'SC_LIGHTBOX',
);

@Directive({
  selector: '[scLightbox]',
  exportAs: 'scLightbox',
  providers: [{ provide: SC_LIGHTBOX, useExisting: ScLightboxDirective }],
  host: {
    'data-slot': 'lightbox',
  },
})
export class ScLightboxDirective {
  readonly images = input<LightboxImage[]>([]);
  readonly loop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);

  readonly isOpen = model<boolean>(false);
  readonly currentIndex = model<number>(0);

  readonly opened = output<number>();
  readonly closed = output<void>();

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
