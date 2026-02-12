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
import type { FormValueControl } from '@angular/forms/signals';
import { fromEvent, merge } from 'rxjs';
import { cn } from '../../utils';
import { ScSliderTrack } from './slider-track';
import { ScSliderRange } from './slider-range';
import { ScSliderThumb } from './slider-thumb';

@Component({
  selector: 'div[sc-slider]',
  imports: [ScSliderTrack, ScSliderRange, ScSliderThumb],
  host: {
    'data-slot': 'slider',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
  },
  template: `
    <div sc-slider-track>
      <div sc-slider-range [percentage]="percentage()"></div>
    </div>
    <div
      sc-slider-thumb
      [percentage]="percentage()"
      [value]="value()"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [disabled]="disabled()"
      [aria-label]="ariaLabel()"
      [aria-labelledby]="ariaLabelledby()"
      (keydown)="onKeydown($event)"
      (mouseDown)="onThumbMouseDown($event)"
      (touchStart)="onThumbTouchStart($event)"
    ></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSlider implements OnInit, FormValueControl<number> {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model<number>(0);
  readonly min = input<number | undefined>(0);
  readonly max = input<number | undefined>(100);
  readonly step = input<number>(1);
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: 'aria-label',
  });
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: 'aria-labelledby',
  });

  private readonly isDragging = signal(false);

  protected readonly percentage = computed(() => {
    const minVal = this.min() ?? 0;
    const maxVal = this.max() ?? 100;
    const val = this.value();
    if (maxVal === minVal) return 0;
    return ((val - minVal) / (maxVal - minVal)) * 100;
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
        if (!this.isDragging()) return;

        if (event.type === 'mouseup' || event.type === 'touchend') {
          this.isDragging.set(false);
          return;
        }

        if (event.type === 'mousemove') {
          this.updateValueFromPosition((event as MouseEvent).clientX);
        } else if (event.type === 'touchmove') {
          const touch = (event as TouchEvent).touches[0];
          if (touch) {
            this.updateValueFromPosition(touch.clientX);
          }
        }
      });
  }

  protected onThumbMouseDown(event: MouseEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDragging.set(true);
  }

  protected onThumbTouchStart(event: TouchEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDragging.set(true);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    const stepVal = this.step();
    const minVal = this.min() ?? 0;
    const maxVal = this.max() ?? 100;
    let newValue = this.value();

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

    this.value.set(newValue);
  }

  private updateValueFromPosition(clientX: number): void {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width),
    );

    const minVal = this.min() ?? 0;
    const maxVal = this.max() ?? 100;
    const stepVal = this.step();

    let newValue = minVal + percentage * (maxVal - minVal);
    newValue = Math.round(newValue / stepVal) * stepVal;
    newValue = Math.max(minVal, Math.min(maxVal, newValue));

    this.value.set(newValue);
  }
}
