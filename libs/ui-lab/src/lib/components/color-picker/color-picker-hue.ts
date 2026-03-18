import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_COLOR_PICKER } from './color-picker';
import {
  normalizePosition,
  startDrag,
  startTouchDrag,
} from './color-picker-drag';

@Directive({
  selector: 'div[scColorPickerHue]',
  host: {
    'data-slot': 'color-picker-hue',
    role: 'slider',
    tabindex: '0',
    'aria-label': 'Hue',
    'aria-valuemin': '0',
    'aria-valuemax': '360',
    '[attr.aria-valuenow]': 'colorPicker.hsv().h',
    '[attr.aria-valuetext]': 'valueText()',
    '[class]': 'class()',
    style:
      'background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
    '(mousedown)': 'onMouseDown($event)',
    '(touchstart)': 'onTouchStart($event)',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class ScColorPickerHue {
  protected readonly colorPicker = inject(SC_COLOR_PICKER);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative block h-3 w-full cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      this.classInput(),
    ),
  );

  protected readonly valueText = computed(
    () => `${Math.round(this.colorPicker.hsv().h)}°`,
  );

  private updateHue(x: number): void {
    this.colorPicker.setHue(x * 360);
  }

  onMouseDown(event: MouseEvent): void {
    if (this.colorPicker.disabled()) return;
    const el = this.elementRef.nativeElement;
    const pos = normalizePosition(el, event.clientX, event.clientY);
    this.updateHue(pos.x);
    startDrag(el, (x) => this.updateHue(x));
  }

  onTouchStart(event: TouchEvent): void {
    if (this.colorPicker.disabled()) return;
    event.preventDefault();
    const el = this.elementRef.nativeElement;
    const touch = event.touches[0];
    const pos = normalizePosition(el, touch.clientX, touch.clientY);
    this.updateHue(pos.x);
    startTouchDrag(el, (x) => this.updateHue(x));
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.colorPicker.disabled()) return;
    const step = event.shiftKey ? 10 : 1;
    const h = this.colorPicker.hsv().h;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        this.colorPicker.setHue((h + step) % 360);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        this.colorPicker.setHue((((h - step) % 360) + 360) % 360);
        break;
      case 'Home':
        event.preventDefault();
        this.colorPicker.setHue(0);
        break;
      case 'End':
        event.preventDefault();
        this.colorPicker.setHue(359);
        break;
    }
  }
}
