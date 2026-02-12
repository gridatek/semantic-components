import { Directive, InjectionToken, input, model, signal } from '@angular/core';

/**
 * Injection token for ScImageCompare
 */
export interface ScImageCompare {
  orientation: () => 'horizontal' | 'vertical';
  position: ReturnType<typeof model<number>>;
  isDragging: ReturnType<typeof signal<boolean>>;
  startDragging: () => void;
  stopDragging: () => void;
  updatePosition: (clientX: number, clientY: number, rect: DOMRect) => void;
  moveSlider: (direction: 'forward' | 'backward', step?: number) => void;
  setPositionToStart: () => void;
  setPositionToEnd: () => void;
}

export const SC_IMAGE_COMPARE = new InjectionToken<ScImageCompare>(
  'SC_IMAGE_COMPARE',
);

@Directive({
  selector: '[sc-image-compare]',
  exportAs: 'scImageCompare',
  providers: [
    { provide: SC_IMAGE_COMPARE, useExisting: ScImageCompareDirective },
  ],
  host: {
    'data-slot': 'image-compare',
    '[attr.data-orientation]': 'orientation()',
  },
})
export class ScImageCompareDirective implements ScImageCompare {
  // Configuration inputs
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  // Model for two-way binding of slider position
  readonly position = model<number>(50);

  // Internal state
  readonly isDragging = signal(false);

  // Methods for child components
  startDragging(): void {
    this.isDragging.set(true);
  }

  stopDragging(): void {
    this.isDragging.set(false);
  }

  updatePosition(clientX: number, clientY: number, rect: DOMRect): void {
    let position: number;
    if (this.orientation() === 'horizontal') {
      position = ((clientX - rect.left) / rect.width) * 100;
    } else {
      position = ((clientY - rect.top) / rect.height) * 100;
    }

    this.position.set(Math.max(0, Math.min(100, position)));
  }

  moveSlider(direction: 'forward' | 'backward', step: number = 1): void {
    const current = this.position();
    const newPosition =
      direction === 'forward'
        ? Math.min(100, current + step)
        : Math.max(0, current - step);
    this.position.set(newPosition);
  }

  setPositionToStart(): void {
    this.position.set(0);
  }

  setPositionToEnd(): void {
    this.position.set(100);
  }
}
