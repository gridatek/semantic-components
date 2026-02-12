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
  selector: '[sc-color-picker-area]',
  template: `
    <div
      class="relative size-full cursor-crosshair rounded-md"
      [style.background]="'hsl(' + colorPicker.hsv().h + ', 100%, 50%)'"
      (mousedown)="onMouseDown($event)"
      (touchstart)="onTouchStart($event)"
    >
      <div
        class="absolute inset-0 rounded-md bg-gradient-to-r from-white to-transparent"
      ></div>
      <div
        class="absolute inset-0 rounded-md bg-gradient-to-t from-black to-transparent"
      ></div>
      <div
        class="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
        [style.left.%]="colorPicker.hsv().s"
        [style.top.%]="100 - colorPicker.hsv().v"
        [style.background-color]="colorPicker.hex()"
      ></div>
    </div>
  `,
  host: {
    'data-slot': 'color-picker-area',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScColorPickerArea {
  readonly colorPicker = inject(SC_COLOR_PICKER);
  private readonly elementRef = inject(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('block h-40 w-full', this.classInput()),
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
    const y = Math.max(
      0,
      Math.min(1, (event.clientY - rect.top) / rect.height),
    );
    this.colorPicker.setHsv({ s: x * 100, v: (1 - y) * 100 });
  }

  private updateFromTouch(event: TouchEvent): void {
    const touch = event.touches[0];
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(1, (touch.clientX - rect.left) / rect.width),
    );
    const y = Math.max(
      0,
      Math.min(1, (touch.clientY - rect.top) / rect.height),
    );
    this.colorPicker.setHsv({ s: x * 100, v: (1 - y) * 100 });
  }
}
