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
  selector: 'div[sc-color-picker-area]',
  imports: [],
  template: `
    <div
      class="relative w-full h-full cursor-crosshair"
      (mousedown)="onMouseDown($event)"
      (mousemove)="onMouseMove($event)"
      (mouseup)="onMouseUp()"
      (mouseleave)="onMouseUp()"
    >
      <!-- Color indicator -->
      <div
        class="absolute w-4 h-4 border-2 border-white rounded-full shadow-sm pointer-events-none -translate-x-1/2 -translate-y-1/2"
        [style.left]="indicatorX() + 'px'"
        [style.top]="indicatorY() + 'px'"
      ></div>
    </div>
  `,
  host: {
    '[class]': 'class()',
    '[style.background]': 'backgroundGradient()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScColorPickerArea {
  private readonly hostRef = inject(ElementRef);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly hue = input<number>(0);
  readonly saturation = input<number>(0);
  readonly lightness = input<number>(0);

  readonly colorChange = output<{ saturation: number; lightness: number }>();

  private readonly isDragging = signal(false);

  protected readonly class = computed(() =>
    cn('rounded-md border border-input overflow-hidden', this.classInput()),
  );

  protected readonly backgroundGradient = computed(() => {
    const hue = this.hue();
    return `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`;
  });

  protected readonly indicatorX = computed(() => {
    const rect = this.hostRef.nativeElement.getBoundingClientRect();
    return (this.saturation() / 100) * rect.width;
  });

  protected readonly indicatorY = computed(() => {
    const rect = this.hostRef.nativeElement.getBoundingClientRect();
    return (1 - this.lightness() / 100) * rect.height;
  });

  protected onMouseDown(event: MouseEvent): void {
    this.isDragging.set(true);
    this.updateColor(event);
  }

  protected onMouseMove(event: MouseEvent): void {
    if (this.isDragging()) {
      this.updateColor(event);
    }
  }

  protected onMouseUp(): void {
    this.isDragging.set(false);
  }

  private updateColor(event: MouseEvent): void {
    const rect = this.hostRef.nativeElement.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(event.clientY - rect.top, rect.height));

    const saturation = Math.round((x / rect.width) * 100);
    const lightness = Math.round((1 - y / rect.height) * 100);

    this.colorChange.emit({ saturation, lightness });
  }
}
