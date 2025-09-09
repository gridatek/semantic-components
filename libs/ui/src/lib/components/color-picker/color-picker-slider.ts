import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'div[sc-color-picker-slider]',
  imports: [],
  template: `
    <div
      class="relative w-full h-full cursor-pointer"
      (mousedown)="onMouseDown($event)"
      (mousemove)="onMouseMove($event)"
      (mouseup)="onMouseUp()"
      (mouseleave)="onMouseUp()"
    >
      <!-- Slider indicator -->
      <div
        class="absolute w-0.5 h-full bg-white shadow-sm pointer-events-none -translate-x-1/2"
        [style.left]="indicatorPosition() + '%'"
      ></div>
    </div>
  `,
  host: {
    '[class]': 'class()',
    '[style.background]': 'sliderBackground()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScColorPickerSlider {
  private readonly hostRef = inject(ElementRef);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly type = input<'hue' | 'saturation' | 'lightness'>('hue');
  readonly value = input<number>(0);
  readonly min = input<number>(0);
  readonly max = input<number>(100);

  readonly valueChange = output<number>();

  private readonly isDragging = signal(false);

  protected readonly class = computed(() =>
    cn('relative rounded-md border border-input overflow-hidden', this.classInput()),
  );

  protected readonly sliderBackground = computed(() => {
    const type = this.type();
    if (type === 'hue') {
      return 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)';
    }
    // For saturation and lightness, would need more context from parent
    return '#ccc';
  });

  protected readonly indicatorPosition = computed(() => {
    const value = this.value();
    const min = this.min();
    const max = this.max();
    return ((value - min) / (max - min)) * 100;
  });

  protected onMouseDown(event: MouseEvent): void {
    this.isDragging.set(true);
    this.updateValue(event);
  }

  protected onMouseMove(event: MouseEvent): void {
    if (this.isDragging()) {
      this.updateValue(event);
    }
  }

  protected onMouseUp(): void {
    this.isDragging.set(false);
  }

  private updateValue(event: MouseEvent): void {
    const rect = this.hostRef.nativeElement.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const min = this.min();
    const max = this.max();
    const value = Math.round(min + percentage * (max - min));

    this.valueChange.emit(value);
  }
}
