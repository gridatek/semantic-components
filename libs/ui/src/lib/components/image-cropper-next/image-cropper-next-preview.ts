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
import { cn } from 'cn';
import type { ScImageCropperNextSize } from './image-cropper-next-geometry';

/**
 * A live preview of the crop: size it (`size-24`, `rounded-full`…) and put
 * an `img[scImageCropperNextPreviewImage]` inside, with its `alt`. The crop
 * covers it.
 */
@Directive({
  selector: '[scImageCropperNextPreview]',
  host: {
    '[class]': 'class()',
  },
})
export class ScImageCropperNextPreview {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  /** Its size, for its image to cover it. */
  readonly size = signal<ScImageCropperNextSize>({ width: 0, height: 0 });

  private readonly class = computed(() =>
    cn('bg-muted relative overflow-hidden', this.classInput()),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new ResizeObserver(() =>
        this.size.set({
          width: this.element.clientWidth,
          height: this.element.clientHeight,
        }),
      );
      observer.observe(this.element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
