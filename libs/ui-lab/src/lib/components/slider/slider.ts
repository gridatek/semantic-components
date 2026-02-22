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
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '@semantic-components/ui';
import { ScSliderTrack } from './slider-track';
import { ScSliderRange } from './slider-range';
import { ScSliderThumb } from './slider-thumb';
import {
  calculatePercentage,
  calculateValueFromPosition,
  getClientX,
  handleSliderKeydown,
  setupDragListeners,
} from './slider-utils';

@Component({
  selector: 'div[scSlider]',
  imports: [ScSliderTrack, ScSliderRange, ScSliderThumb],
  host: {
    'data-slot': 'slider',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
    '(mousedown)': 'onTrackStart($event)',
    '(touchstart)': 'onTrackStart($event)',
  },
  template: `
    <div scSliderTrack>
      <div scSliderRange [percentage]="percentage()"></div>
    </div>
    <div
      scSliderThumb
      [percentage]="percentage()"
      [value]="value()"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [disabled]="disabled()"
      [aria-label]="ariaLabel()"
      [aria-labelledby]="ariaLabelledby()"
      (keydown)="onKeydown($event)"
    ></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSlider implements FormValueControl<number> {
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

  protected readonly percentage = computed(() =>
    calculatePercentage(this.value(), this.min() ?? 0, this.max() ?? 100),
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
          if (!this.isDragging()) return;
          const clientX = getClientX(event);
          if (clientX !== null) {
            this.updateValueFromPosition(clientX);
          }
        },
        () => this.isDragging.set(false),
      );
    });
  }

  protected onTrackStart(event: MouseEvent | TouchEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    const clientX = getClientX(event);
    if (clientX !== null) {
      this.updateValueFromPosition(clientX);
    }
    this.isDragging.set(true);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    const minVal = this.min() ?? 0;
    const maxVal = this.max() ?? 100;
    const newValue = handleSliderKeydown(
      event,
      this.value(),
      this.step(),
      minVal,
      maxVal,
    );
    if (newValue !== null) {
      this.value.set(newValue);
    }
  }

  private updateValueFromPosition(clientX: number): void {
    const minVal = this.min() ?? 0;
    const maxVal = this.max() ?? 100;
    const newValue = calculateValueFromPosition(
      clientX,
      this.elementRef,
      minVal,
      maxVal,
      this.step(),
      minVal,
      maxVal,
    );
    this.value.set(newValue);
  }
}
