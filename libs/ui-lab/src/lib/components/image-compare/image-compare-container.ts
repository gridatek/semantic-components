import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_IMAGE_COMPARE } from './image-compare';

@Component({
  selector: '[sc-image-compare-container]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'image-compare-container',
    '[class]': 'class()',
    tabindex: '0',
    role: 'slider',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-valuenow]': 'imageCompare.position()',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '(mousedown)': 'onPointerDown($event)',
    '(mousemove)': 'onPointerMove($event)',
    '(mouseup)': 'onPointerUp()',
    '(mouseleave)': 'onPointerUp()',
    '(touchstart)': 'onTouchStart($event)',
    '(touchmove)': 'onTouchMove($event)',
    '(touchend)': 'onPointerUp()',
    '(keydown)': 'onKeydown($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageCompareContainer {
  readonly imageCompare = inject(SC_IMAGE_COMPARE);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaLabel = input<string>('Image comparison slider');

  protected readonly class = computed(() =>
    cn(
      'relative select-none cursor-ew-resize overflow-hidden rounded-lg',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      this.imageCompare.orientation() === 'vertical' && 'cursor-ns-resize',
      this.classInput(),
    ),
  );

  protected onPointerDown(event: MouseEvent): void {
    this.imageCompare.startDragging();
    this.updatePosition(event.clientX, event.clientY);
  }

  protected onPointerMove(event: MouseEvent): void {
    if (!this.imageCompare.isDragging()) return;
    this.updatePosition(event.clientX, event.clientY);
  }

  protected onPointerUp(): void {
    this.imageCompare.stopDragging();
  }

  protected onTouchStart(event: TouchEvent): void {
    event.preventDefault();
    this.imageCompare.startDragging();
    const touch = event.touches[0];
    this.updatePosition(touch.clientX, touch.clientY);
  }

  protected onTouchMove(event: TouchEvent): void {
    if (!this.imageCompare.isDragging()) return;
    event.preventDefault();
    const touch = event.touches[0];
    this.updatePosition(touch.clientX, touch.clientY);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const step = event.shiftKey ? 10 : 1;
    const orientation = this.imageCompare.orientation();

    if (orientation === 'horizontal') {
      if (event.key === 'ArrowLeft') {
        this.imageCompare.moveSlider('backward', step);
        event.preventDefault();
      } else if (event.key === 'ArrowRight') {
        this.imageCompare.moveSlider('forward', step);
        event.preventDefault();
      }
    } else {
      if (event.key === 'ArrowUp') {
        this.imageCompare.moveSlider('backward', step);
        event.preventDefault();
      } else if (event.key === 'ArrowDown') {
        this.imageCompare.moveSlider('forward', step);
        event.preventDefault();
      }
    }

    if (event.key === 'Home') {
      this.imageCompare.setPositionToStart();
      event.preventDefault();
    } else if (event.key === 'End') {
      this.imageCompare.setPositionToEnd();
      event.preventDefault();
    }
  }

  private updatePosition(clientX: number, clientY: number): void {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    this.imageCompare.updatePosition(clientX, clientY, rect);
  }
}
