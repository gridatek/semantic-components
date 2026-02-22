import { DestroyRef, ElementRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge } from 'rxjs';

export function getClientX(event: MouseEvent | TouchEvent): number | null {
  if (event instanceof MouseEvent) {
    return event.clientX;
  }
  const touch = event.touches[0];
  return touch ? touch.clientX : null;
}

export function calculatePercentage(
  value: number,
  min: number,
  max: number,
): number {
  if (max === min) return 0;
  return ((value - min) / (max - min)) * 100;
}

export function calculateValueFromPosition(
  clientX: number,
  elementRef: ElementRef<HTMLElement>,
  min: number,
  max: number,
  step: number,
  lowerBound: number,
  upperBound: number,
): number {
  const rect = elementRef.nativeElement.getBoundingClientRect();
  const percentage = Math.max(
    0,
    Math.min(1, (clientX - rect.left) / rect.width),
  );

  let newValue = min + percentage * (max - min);
  newValue = Math.round(newValue / step) * step;
  return Math.max(lowerBound, Math.min(upperBound, newValue));
}

export function handleSliderKeydown(
  event: KeyboardEvent,
  currentValue: number,
  step: number,
  lowerBound: number,
  upperBound: number,
): number | null {
  let newValue = currentValue;

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      event.preventDefault();
      newValue = Math.min(newValue + step, upperBound);
      break;
    case 'ArrowLeft':
    case 'ArrowDown':
      event.preventDefault();
      newValue = Math.max(newValue - step, lowerBound);
      break;
    case 'Home':
      event.preventDefault();
      newValue = lowerBound;
      break;
    case 'End':
      event.preventDefault();
      newValue = upperBound;
      break;
    case 'PageUp':
      event.preventDefault();
      newValue = Math.min(newValue + step * 10, upperBound);
      break;
    case 'PageDown':
      event.preventDefault();
      newValue = Math.max(newValue - step * 10, lowerBound);
      break;
    default:
      return null;
  }

  return newValue;
}

export function setupDragListeners(
  destroyRef: DestroyRef,
  onMove: (event: MouseEvent | TouchEvent) => void,
  onEnd: () => void,
): void {
  merge(
    fromEvent<MouseEvent>(document, 'mousemove'),
    fromEvent<MouseEvent>(document, 'mouseup'),
    fromEvent<TouchEvent>(document, 'touchmove'),
    fromEvent<TouchEvent>(document, 'touchend'),
  )
    .pipe(takeUntilDestroyed(destroyRef))
    .subscribe((event) => {
      if (event.type === 'mouseup' || event.type === 'touchend') {
        onEnd();
        return;
      }
      onMove(event);
    });
}
