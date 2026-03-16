import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_COLOR_PICKER } from './color-picker';

@Directive({
  selector: 'div[scColorPickerArea]',
  host: {
    'data-slot': 'color-picker-area',
    '[class]': 'class()',
    '[style.background]': '"hsl(" + colorPicker.hsv().h + ", 100%, 50%)"',
    '(mousedown)': 'onMouseDown($event)',
    '(touchstart)': 'onTouchStart($event)',
  },
})
export class ScColorPickerArea {
  protected readonly colorPicker = inject(SC_COLOR_PICKER);
  private readonly elementRef = inject(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative block h-40 w-full cursor-crosshair rounded-md',
      this.classInput(),
    ),
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
