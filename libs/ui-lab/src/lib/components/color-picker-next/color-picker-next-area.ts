import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScColorPickerNext } from './color-picker-next';

/**
 * Saturation (across) and brightness (up), at the picker's hue: one thumb, a
 * slider. Drag, or the keys: ← → saturation, ↑ ↓ brightness, Shift ×10, Page
 * Up / Down brightness ±10, Home / End saturation 0 / 100. Name it, and
 * write its `aria-valuetext` (from `picker.hsva()`).
 */
@Component({
  selector: 'div[scColorPickerNextArea]',
  template: `
    <span
      class="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/0.4),0_1px_3px_rgb(0_0_0/0.4)]"
      [style.left.%]="picker.hsva().s"
      [style.top.%]="100 - picker.hsva().v"
      [style.background]="opaque()"
      aria-hidden="true"
    ></span>
  `,
  host: {
    'data-slot': 'color-picker-area',
    role: 'slider',
    '[attr.tabindex]': 'picker.disabled() ? null : 0',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '[attr.aria-valuenow]': 'saturation()',
    '[attr.aria-disabled]': 'picker.disabled() || null',
    '[style.background]': 'background()',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(keydown)': 'onKeydown($event)',
    '(blur)': 'picker.touch.emit()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScColorPickerNextArea {
  protected readonly picker = inject(ScColorPickerNext);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly saturation = computed(() =>
    Math.round(this.picker.hsva().s),
  );

  /** The thumb: the colour, without its transparency. */
  protected readonly opaque = computed(() => {
    const { r, g, b } = this.picker.rgba();
    return `rgb(${r} ${g} ${b})`;
  });

  protected readonly background = computed(
    () =>
      `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent), hsl(${this.picker.hsva().h} 100% 50%)`,
  );

  protected readonly class = computed(() =>
    cn(
      'relative block aspect-[4/3] w-full cursor-crosshair touch-none rounded-md outline-none',
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerNextArea');
  }

  protected onPointerDown(event: PointerEvent): void {
    if (event.button !== 0 || this.picker.disabled()) return;
    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture(event.pointerId);
    target.focus({ focusVisible: false });
    event.preventDefault();
    this.pick(event);
  }

  protected onPointerMove(event: PointerEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (target.hasPointerCapture(event.pointerId)) this.pick(event);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const { s, v } = this.picker.hsva();
    const step = event.shiftKey ? 10 : 1;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [s - step, v],
      ArrowRight: [s + step, v],
      ArrowUp: [s, v + step],
      ArrowDown: [s, v - step],
      PageUp: [s, v + 10],
      PageDown: [s, v - 10],
      Home: [0, v],
      End: [100, v],
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    this.picker.set({ s: clamp(move[0]), v: clamp(move[1]) });
  }

  private pick(event: PointerEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.picker.set({
      s: clamp(((event.clientX - rect.left) / rect.width) * 100),
      v: clamp(100 - ((event.clientY - rect.top) / rect.height) * 100),
    });
  }
}

const clamp = (n: number) => Math.min(100, Math.max(0, n));
