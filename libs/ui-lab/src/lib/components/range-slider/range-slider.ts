import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge } from 'rxjs';
import { cn } from '../../utils';
import { ScSliderTrack, ScSliderRange, ScSliderThumb } from '../slider';

@Component({
  selector: 'div[sc-range-slider]',
  imports: [ScSliderTrack, ScSliderRange, ScSliderThumb],
  host: {
    'data-slot': 'range-slider',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
  },
  template: `
    <div sc-slider-track>
      <div
        sc-slider-range
        [percentage]="rangeWidth()"
        [style.left.%]="rangeStart()"
      ></div>
    </div>
    <div
      sc-slider-thumb
      [percentage]="minPercentage()"
      [value]="minValue()"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [disabled]="disabled()"
      [aria-label]="minAriaLabel()"
      [aria-labelledby]="minAriaLabelledby()"
      (keydown)="onMinKeydown($event)"
      (mouseDown)="onMinThumbMouseDown($event)"
      (touchStart)="onMinThumbTouchStart($event)"
    ></div>
    <div
      sc-slider-thumb
      [percentage]="maxPercentage()"
      [value]="maxValue()"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [disabled]="disabled()"
      [aria-label]="maxAriaLabel()"
      [aria-labelledby]="maxAriaLabelledby()"
      (keydown)="onMaxKeydown($event)"
      (mouseDown)="onMaxThumbMouseDown($event)"
      (touchStart)="onMaxThumbTouchStart($event)"
    ></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScRangeSlider implements OnInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly minValue = model<number>(0);
  readonly maxValue = model<number>(100);
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly disabled = input<boolean>(false);
  readonly minAriaLabel = input<string | undefined>(undefined, {
    alias: 'min-aria-label',
  });
  readonly maxAriaLabel = input<string | undefined>(undefined, {
    alias: 'max-aria-label',
  });
  readonly minAriaLabelledby = input<string | undefined>(undefined, {
    alias: 'min-aria-labelledby',
  });
  readonly maxAriaLabelledby = input<string | undefined>(undefined, {
    alias: 'max-aria-labelledby',
  });

  private readonly isDraggingMin = signal(false);
  private readonly isDraggingMax = signal(false);

  protected readonly minPercentage = computed(() => {
    const minVal = this.min();
    const maxVal = this.max();
    const val = this.minValue();
    if (maxVal === minVal) return 0;
    return ((val - minVal) / (maxVal - minVal)) * 100;
  });

  protected readonly maxPercentage = computed(() => {
    const minVal = this.min();
    const maxVal = this.max();
    const val = this.maxValue();
    if (maxVal === minVal) return 0;
    return ((val - minVal) / (maxVal - minVal)) * 100;
  });

  protected readonly rangeStart = computed(() => this.minPercentage());

  protected readonly rangeWidth = computed(() => {
    return this.maxPercentage() - this.minPercentage();
  });

  protected readonly class = computed(() =>
    cn(
      'relative flex w-full touch-none select-none items-center',
      this.disabled() && 'opacity-50 cursor-not-allowed',
      this.classInput(),
    ),
  );

  ngOnInit(): void {
    merge(
      fromEvent<MouseEvent>(document, 'mousemove'),
      fromEvent<MouseEvent>(document, 'mouseup'),
      fromEvent<TouchEvent>(document, 'touchmove'),
      fromEvent<TouchEvent>(document, 'touchend'),
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (!this.isDraggingMin() && !this.isDraggingMax()) return;

        if (event.type === 'mouseup' || event.type === 'touchend') {
          this.isDraggingMin.set(false);
          this.isDraggingMax.set(false);
          return;
        }

        if (event.type === 'mousemove') {
          const clientX = (event as MouseEvent).clientX;
          if (this.isDraggingMin()) {
            this.updateMinValueFromPosition(clientX);
          } else if (this.isDraggingMax()) {
            this.updateMaxValueFromPosition(clientX);
          }
        } else if (event.type === 'touchmove') {
          const touch = (event as TouchEvent).touches[0];
          if (touch) {
            if (this.isDraggingMin()) {
              this.updateMinValueFromPosition(touch.clientX);
            } else if (this.isDraggingMax()) {
              this.updateMaxValueFromPosition(touch.clientX);
            }
          }
        }
      });
  }

  protected onMinThumbMouseDown(event: MouseEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDraggingMin.set(true);
  }

  protected onMinThumbTouchStart(event: TouchEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDraggingMin.set(true);
  }

  protected onMaxThumbMouseDown(event: MouseEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDraggingMax.set(true);
  }

  protected onMaxThumbTouchStart(event: TouchEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDraggingMax.set(true);
  }

  protected onMinKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    const stepVal = this.step();
    const minVal = this.min();
    const maxVal = this.maxValue(); // Min thumb can't go beyond max thumb
    let newValue = this.minValue();

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        newValue = Math.min(newValue + stepVal, maxVal);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        newValue = Math.max(newValue - stepVal, minVal);
        break;
      case 'Home':
        event.preventDefault();
        newValue = minVal;
        break;
      case 'End':
        event.preventDefault();
        newValue = maxVal;
        break;
      case 'PageUp':
        event.preventDefault();
        newValue = Math.min(newValue + stepVal * 10, maxVal);
        break;
      case 'PageDown':
        event.preventDefault();
        newValue = Math.max(newValue - stepVal * 10, minVal);
        break;
      default:
        return;
    }

    this.minValue.set(newValue);
  }

  protected onMaxKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    const stepVal = this.step();
    const minVal = this.minValue(); // Max thumb can't go below min thumb
    const maxVal = this.max();
    let newValue = this.maxValue();

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        newValue = Math.min(newValue + stepVal, maxVal);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        newValue = Math.max(newValue - stepVal, minVal);
        break;
      case 'Home':
        event.preventDefault();
        newValue = minVal;
        break;
      case 'End':
        event.preventDefault();
        newValue = maxVal;
        break;
      case 'PageUp':
        event.preventDefault();
        newValue = Math.min(newValue + stepVal * 10, maxVal);
        break;
      case 'PageDown':
        event.preventDefault();
        newValue = Math.max(newValue - stepVal * 10, minVal);
        break;
      default:
        return;
    }

    this.maxValue.set(newValue);
  }

  private updateMinValueFromPosition(clientX: number): void {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width),
    );

    const minVal = this.min();
    const maxVal = this.maxValue(); // Min thumb can't go beyond max thumb
    const stepVal = this.step();

    let newValue = minVal + percentage * (this.max() - minVal);
    newValue = Math.round(newValue / stepVal) * stepVal;
    newValue = Math.max(minVal, Math.min(maxVal, newValue));

    this.minValue.set(newValue);
  }

  private updateMaxValueFromPosition(clientX: number): void {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width),
    );

    const minVal = this.minValue(); // Max thumb can't go below min thumb
    const maxVal = this.max();
    const stepVal = this.step();

    let newValue = this.min() + percentage * (maxVal - this.min());
    newValue = Math.round(newValue / stepVal) * stepVal;
    newValue = Math.max(minVal, Math.min(maxVal, newValue));

    this.maxValue.set(newValue);
  }
}
