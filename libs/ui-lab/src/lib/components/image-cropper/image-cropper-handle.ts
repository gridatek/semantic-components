import { computed, Directive, inject, input } from '@angular/core';
import { SC_IMAGE_CROPPER } from './image-cropper';

export type ScImageCropperHandlePosition =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'right'
  | 'bottom-right'
  | 'bottom'
  | 'bottom-left'
  | 'left';

const CURSOR_MAP: Record<ScImageCropperHandlePosition, string> = {
  'top-left': 'nw-resize',
  top: 'n-resize',
  'top-right': 'ne-resize',
  right: 'e-resize',
  'bottom-right': 'se-resize',
  bottom: 's-resize',
  'bottom-left': 'sw-resize',
  left: 'w-resize',
};

const POSITION_CLASSES: Record<ScImageCropperHandlePosition, string> = {
  'top-left': 'absolute -top-1.5 -left-1.5 z-10 size-3',
  top: 'absolute -top-1.5 left-1/2 z-10 h-3 w-6 -translate-x-1/2',
  'top-right': 'absolute -top-1.5 -right-1.5 z-10 size-3',
  right: 'absolute top-1/2 -right-1.5 z-10 h-6 w-3 -translate-y-1/2',
  'bottom-right': 'absolute -right-1.5 -bottom-1.5 z-10 size-3',
  bottom: 'absolute -bottom-1.5 left-1/2 z-10 h-3 w-6 -translate-x-1/2',
  'bottom-left': 'absolute -bottom-1.5 -left-1.5 z-10 size-3',
  left: 'absolute top-1/2 -left-1.5 z-10 h-6 w-3 -translate-y-1/2',
};

@Directive({
  selector: '[scImageCropperHandle]',
  host: {
    'data-slot': 'image-cropper-handle',
    '[class]': 'hostClass()',
    '[style.cursor]': 'cursor()',
    '[attr.data-position]': 'position()',
    '(mousedown)': 'onMouseDown($event)',
    '(touchstart)': 'onTouchStart($event)',
  },
})
export class ScImageCropperHandle {
  private readonly cropper = inject(SC_IMAGE_CROPPER);

  readonly position = input.required<ScImageCropperHandlePosition>();

  protected readonly cursor = computed(() => CURSOR_MAP[this.position()]);

  protected readonly hostClass = computed(
    () =>
      `${POSITION_CLASSES[this.position()]} border border-gray-400 bg-white`,
  );

  protected onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.cropper.startResizing(event.clientX, event.clientY, this.position());
  }

  protected onTouchStart(event: TouchEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const touch = event.touches[0];
    this.cropper.startResizing(touch.clientX, touch.clientY, this.position());
  }
}
