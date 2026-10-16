import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageCropperNext } from './image-cropper-next';
import type { ScImageCropperNextHandlePosition } from './image-cropper-next-geometry';

const PLACES: Record<ScImageCropperNextHandlePosition, string> = {
  'top-left': 'top-0 left-0 cursor-nwse-resize',
  top: 'top-0 left-1/2 cursor-ns-resize',
  'top-right': 'top-0 left-full cursor-nesw-resize',
  right: 'top-1/2 left-full cursor-ew-resize',
  'bottom-right': 'top-full left-full cursor-nwse-resize',
  bottom: 'top-full left-1/2 cursor-ns-resize',
  'bottom-left': 'top-full left-0 cursor-nesw-resize',
  left: 'top-1/2 left-0 cursor-ew-resize',
};

/**
 * A handle to resize the crop by (`scImageCropperNextHandle="top-left"`), in
 * the selection: with any, the crop is a box resized over the image. For
 * the pointer: the keyboard resizes with Alt + arrows on the selection.
 */
@Directive({
  selector: '[scImageCropperNextHandle]',
  host: {
    'data-slot': 'image-cropper-handle',
    'aria-hidden': 'true',
    '[attr.data-handle]': 'position()',
    '[class]': 'class()',
  },
})
export class ScImageCropperNextHandle {
  private readonly cropper = inject(ScImageCropperNext);

  readonly position = input.required<ScImageCropperNextHandlePosition>({
    alias: 'scImageCropperNextHandle',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-black/30 bg-white shadow-sm',
      // A larger target than it looks, for fingers.
      'before:absolute before:-inset-2',
      PLACES[this.position()],
      this.classInput(),
    ),
  );

  constructor() {
    this.cropper.ɵhandles.update((n) => n + 1);
    inject(DestroyRef).onDestroy(() =>
      this.cropper.ɵhandles.update((n) => n - 1),
    );
  }
}
