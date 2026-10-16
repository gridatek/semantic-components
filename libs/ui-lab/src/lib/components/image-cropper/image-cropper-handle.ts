import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageCropper } from './image-cropper';
import type { ScImageCropperHandlePosition } from './image-cropper-geometry';

/** Squares at the corners, bars on the edges, centred on the outline. */
const PLACES: Record<ScImageCropperHandlePosition, string> = {
  'top-left': '-top-1.5 -left-1.5 size-3 cursor-nwse-resize',
  top: '-top-1.5 left-1/2 h-3 w-6 -translate-x-1/2 cursor-ns-resize',
  'top-right': '-top-1.5 -right-1.5 size-3 cursor-nesw-resize',
  right: 'top-1/2 -right-1.5 h-6 w-3 -translate-y-1/2 cursor-ew-resize',
  'bottom-right': '-right-1.5 -bottom-1.5 size-3 cursor-nwse-resize',
  bottom: '-bottom-1.5 left-1/2 h-3 w-6 -translate-x-1/2 cursor-ns-resize',
  'bottom-left': '-bottom-1.5 -left-1.5 size-3 cursor-nesw-resize',
  left: 'top-1/2 -left-1.5 h-6 w-3 -translate-y-1/2 cursor-ew-resize',
};

/**
 * A handle to resize the crop by (`scImageCropperHandle="top-left"`), in
 * the selection: with any, the crop is a box resized over the image. For
 * the pointer: the keyboard resizes with Alt + arrows on the selection.
 */
@Directive({
  selector: '[scImageCropperHandle]',
  host: {
    'data-slot': 'image-cropper-handle',
    'aria-hidden': 'true',
    '[attr.data-handle]': 'position()',
    '[class]': 'class()',
  },
})
export class ScImageCropperHandle {
  private readonly cropper = inject(ScImageCropper);

  readonly position = input.required<ScImageCropperHandlePosition>({
    alias: 'scImageCropperHandle',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute z-10 border border-gray-400 bg-white',
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
