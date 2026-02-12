import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_COLOR_PICKER } from './color-picker';

@Component({
  selector: '[sc-color-picker-hue]',
  template: `
    <div
      class="relative h-full w-full cursor-pointer rounded-md"
      style="background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)"
      (mousedown)="onMouseDown($event)"
      (touchstart)="onTouchStart($event)"
    >
      <div
        class="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
        [style.left.%]="(colorPicker.hsv().h / 360) * 100"
        [style.background]="'hsl(' + colorPicker.hsv().h + ', 100%, 50%)'"
      ></div>
    </div>
  `,
  host: {
    'data-slot': 'color-picker-hue',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScColorPickerHue {
  readonly colorPicker = inject(SC_COLOR_PICKER);
  private readonly elementRef = inject(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('block h-3 w-full', this.classInput()),
  );

  onMouseDown(event: MouseEvent): void {
    if (this.colorPicker.disabled()) return;
    this.updateFromEvent(event);
    const onMouseMove = (e: MouseEvent) => this.updateFromEvent(e);
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  onTouchStart(event: TouchEvent): void {
    if (this.colorPicker.disabled()) return;
    event.preventDefault();
    this.updateFromTouch(event);
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      this.updateFromTouch(e);
    };
    const onTouchEnd = () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
  }

  private updateFromEvent(event: MouseEvent): void {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width),
    );
    this.colorPicker.setHue(x * 360);
  }

  private updateFromTouch(event: TouchEvent): void {
    const touch = event.touches[0];
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(1, (touch.clientX - rect.left) / rect.width),
    );
    this.colorPicker.setHue(x * 360);
  }
}
