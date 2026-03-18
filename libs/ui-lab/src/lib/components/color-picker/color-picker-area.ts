import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_COLOR_PICKER } from './color-picker';
import {
  normalizePosition,
  startDrag,
  startTouchDrag,
} from './color-picker-drag';

@Directive({
  selector: 'div[scColorPickerArea]',
  host: {
    'data-slot': 'color-picker-area',
    role: 'slider',
    tabindex: '0',
    'aria-roledescription': '2d color picker',
    'aria-label': 'Color',
    '[attr.aria-valuetext]': 'valueText()',
    '[class]': 'class()',
    '[style.background]': 'background()',
    '(mousedown)': 'onMouseDown($event)',
    '(touchstart)': 'onTouchStart($event)',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class ScColorPickerArea {
  protected readonly colorPicker = inject(SC_COLOR_PICKER);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative block h-40 w-full cursor-crosshair rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      this.classInput(),
    ),
  );

  protected readonly background = computed(
    () => `hsl(${this.colorPicker.hsv().h}, 100%, 50%)`,
  );

  protected readonly valueText = computed(() => {
    const { s, v } = this.colorPicker.hsv();
    return `Saturation ${Math.round(s)}%, Brightness ${Math.round(v)}%`;
  });

  private updateColor(x: number, y: number): void {
    this.colorPicker.setHsv({ s: x * 100, v: (1 - y) * 100 });
  }

  onMouseDown(event: MouseEvent): void {
    if (this.colorPicker.disabled()) return;
    const el = this.elementRef.nativeElement;
    const pos = normalizePosition(el, event.clientX, event.clientY);
    this.updateColor(pos.x, pos.y);
    startDrag(el, (x, y) => this.updateColor(x, y));
  }

  onTouchStart(event: TouchEvent): void {
    if (this.colorPicker.disabled()) return;
    event.preventDefault();
    const el = this.elementRef.nativeElement;
    const touch = event.touches[0];
    const pos = normalizePosition(el, touch.clientX, touch.clientY);
    this.updateColor(pos.x, pos.y);
    startTouchDrag(el, (x, y) => this.updateColor(x, y));
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.colorPicker.disabled()) return;
    const step = event.shiftKey ? 10 : 1;
    const { s, v } = this.colorPicker.hsv();

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        this.colorPicker.setSaturation(Math.min(100, s + step));
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.colorPicker.setSaturation(Math.max(0, s - step));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.colorPicker.setValue(Math.min(100, v + step));
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.colorPicker.setValue(Math.max(0, v - step));
        break;
      case 'Home':
        event.preventDefault();
        this.colorPicker.setSaturation(0);
        break;
      case 'End':
        event.preventDefault();
        this.colorPicker.setSaturation(100);
        break;
    }
  }
}
