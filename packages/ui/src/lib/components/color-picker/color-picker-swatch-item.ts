import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';
import { ScColorPicker } from './color-picker';
import { SC_COLOR_CHECKERBOARD } from './color-picker-slider';
import { ScColorPickerSwatches } from './color-picker-swatches';
import { scColorToRgb } from './color-space';

/**
 * A preset colour (`[scColorPickerSwatchItem]="'#e11d48'"`, any CSS
 * colour) in the swatches: a radio, checked while it is the colour — however
 * either is written. Name it ("Rose").
 */
@Directive({
  selector: 'button[scColorPickerSwatchItem]',
  host: {
    type: 'button',
    'data-slot': 'color-picker-swatch-item',
    role: 'radio',
    '[attr.aria-checked]': 'checked()',
    '[attr.data-selected]': 'checked() || null',
    '[attr.tabindex]': 'reachable() ? 0 : -1',
    '[disabled]': 'picker.disabled()',
    '[style.--sc-color-picker-color]': 'color()',
    '[style.background]': 'background()',
    '[class]': 'class()',
    '(click)': 'pick()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScColorPickerSwatchItem {
  private readonly picker = inject(ScColorPicker);
  private readonly group = inject(ScColorPickerSwatches);
  private readonly element =
    inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;
  private readonly styles = injectStyle().colorPicker;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Its colour. */
  readonly color = input('', { alias: 'scColorPickerSwatchItem' });

  /** It is the colour — to the 8-bit channel (no colour: none is). */
  private readonly checked = computed(() => {
    if (!this.picker.value()) return false;
    const read = this.picker.parse(this.color());
    if (!read) return false;
    const space = this.picker.space();
    const a = scColorToRgb(space, read);
    const b = scColorToRgb(space, this.picker.shown());
    const same = (x: number, y: number) => Math.abs(x - y) * 255 < 0.6;
    return (
      same(a.r, b.r) &&
      same(a.g, b.g) &&
      same(a.b, b.b) &&
      Math.abs((read.alpha ?? 100) - (this.picker.shown().alpha ?? 100)) < 1
    );
  });

  private readonly reachable = computed(
    () => this.group.reachable() === this.element,
  );

  private readonly background = computed(
    () =>
      `linear-gradient(${this.color()}, ${this.color()}), ${SC_COLOR_CHECKERBOARD}`,
  );

  private readonly class = computed(() =>
    cn(
      'size-6 shrink-0 cursor-pointer border shadow-xs outline-none transition-shadow',
      this.styles.option,
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      'aria-checked:ring-2 aria-checked:ring-ring aria-checked:ring-offset-2 aria-checked:ring-offset-background',
      'disabled:pointer-events-none disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerSwatchItem');
    const self = { element: this.element, checked: this.checked };
    this.group.register(self);
    inject(DestroyRef).onDestroy(() => this.group.unregister(self));
  }

  private pick(): void {
    this.picker.setColor(this.color());
  }

  private onKeydown(event: KeyboardEvent): void {
    const items = this.group.items().map((item) => item.element);
    const steps: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    const step = steps[event.key];
    const at = items.indexOf(this.element);
    const next =
      event.key === 'Home'
        ? items[0]
        : event.key === 'End'
          ? items[items.length - 1]
          : step
            ? items[(at + step + items.length) % items.length]
            : null;
    if (!next) return;
    event.preventDefault();
    // A radio: moved to, chosen.
    next.focus();
    next.click();
  }
}
