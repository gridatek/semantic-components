import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { ScImageCropperNextSize } from './image-cropper-next-geometry';

/**
 * A live preview of the crop: size it (`size-24`, `rounded-full`…) and put
 * a `img[scImageCropperNextPreviewImage]` inside, with its `alt`. The crop
 * covers it.
 */
@Directive({
  selector: '[scImageCropperNextPreview]',
  exportAs: 'scImageCropperNextPreview',
  host: {
    'data-slot': 'image-cropper-preview',
    '[class]': 'class()',
  },
})
export class ScImageCropperNextPreview {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  /** Its size, for its image to cover it. */
  readonly size = signal<ScImageCropperNextSize>({ width: 0, height: 0 });

  protected readonly class = computed(() =>
    cn('bg-muted relative overflow-hidden', this.classInput()),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new ResizeObserver(([entry]) =>
        this.size.set({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        }),
      );
      observer.observe(this.element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
