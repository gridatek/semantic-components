import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSliderTrack, ScSliderRange, ScSliderThumb } from '../slider';
import {
  calculatePercentage,
  calculateValueFromPosition,
  getClientX,
  handleSliderKeydown,
  setupDragListeners,
} from '../slider/slider-utils';

@Component({
  selector: 'div[scRangeSlider]',
  imports: [ScSliderTrack, ScSliderRange, ScSliderThumb],
  host: {
    'data-slot': 'range-slider',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
    '(mousedown)': 'onTrackStart($event)',
    '(touchstart)': 'onTrackStart($event)',
  },
  template: `
    <div scSliderTrack>
      <div
        scSliderRange
        [percentage]="rangeWidth()"
        [style.left.%]="rangeStart()"
      ></div>
    </div>
    <div
      scSliderThumb
      [percentage]="minPercentage()"
      [value]="minValue()"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [disabled]="disabled()"
      [aria-label]="minAriaLabel()"
      [aria-labelledby]="minAriaLabelledby()"
      (keydown)="onMinKeydown($event)"
    ></div>
    <div
      scSliderThumb
      [percentage]="maxPercentage()"
      [value]="maxValue()"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [disabled]="disabled()"
      [aria-label]="maxAriaLabel()"
      [aria-labelledby]="maxAriaLabelledby()"
      (keydown)="onMaxKeydown($event)"
    ></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScRangeSlider {
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

  protected readonly minPercentage = computed(() =>
    calculatePercentage(this.minValue(), this.min(), this.max()),
  );

  protected readonly maxPercentage = computed(() =>
    calculatePercentage(this.maxValue(), this.min(), this.max()),
  );

  protected readonly rangeStart = computed(() => this.minPercentage());

  protected readonly rangeWidth = computed(
    () => this.maxPercentage() - this.minPercentage(),
  );

  protected readonly class = computed(() =>
    cn(
      'relative flex w-full touch-none select-none items-center',
      this.disabled() && 'opacity-50 cursor-not-allowed',
      this.classInput(),
    ),
  );

  constructor() {
    afterNextRender(() => {
      setupDragListeners(
        this.destroyRef,
        (event) => {
          if (!this.isDraggingMin() && !this.isDraggingMax()) return;
          const clientX = getClientX(event);
          if (clientX === null) return;

          if (this.isDraggingMin()) {
            this.updateMinValueFromPosition(clientX);
          } else if (this.isDraggingMax()) {
            this.updateMaxValueFromPosition(clientX);
          }
        },
        () => {
          this.isDraggingMin.set(false);
          this.isDraggingMax.set(false);
        },
      );
    });
  }

  protected onTrackStart(event: MouseEvent | TouchEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    const clientX = getClientX(event);
    if (clientX === null) return;

    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const percentage = ((clientX - rect.left) / rect.width) * 100;
    const minDist = Math.abs(percentage - this.minPercentage());
    const maxDist = Math.abs(percentage - this.maxPercentage());

    if (minDist <= maxDist) {
      this.updateMinValueFromPosition(clientX);
      this.isDraggingMin.set(true);
    } else {
      this.updateMaxValueFromPosition(clientX);
      this.isDraggingMax.set(true);
    }
  }

  protected onMinKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    const newValue = handleSliderKeydown(
      event,
      this.minValue(),
      this.step(),
      this.min(),
      this.maxValue(),
    );
    if (newValue !== null) {
      this.minValue.set(newValue);
    }
  }

  protected onMaxKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    const newValue = handleSliderKeydown(
      event,
      this.maxValue(),
      this.step(),
      this.minValue(),
      this.max(),
    );
    if (newValue !== null) {
      this.maxValue.set(newValue);
    }
  }

  private updateMinValueFromPosition(clientX: number): void {
    const newValue = calculateValueFromPosition(
      clientX,
      this.elementRef,
      this.min(),
      this.max(),
      this.step(),
      this.min(),
      this.maxValue(),
    );
    this.minValue.set(newValue);
  }

  private updateMaxValueFromPosition(clientX: number): void {
    const newValue = calculateValueFromPosition(
      clientX,
      this.elementRef,
      this.min(),
      this.max(),
      this.step(),
      this.minValue(),
      this.max(),
    );
    this.maxValue.set(newValue);
  }
}
