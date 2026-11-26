import {
  Component,
  ElementRef,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { injectDisplayLocale, ɵwarnIfUnnamed } from '../../utils';
import { ScColorPicker } from './color-picker';
import {
  SC_COLOR_AREA_CHANNELS,
  SC_COLOR_CHANNELS,
  type ScColorChannel,
  scColorToRgb,
  scFormatChannel,
} from './color-space';

/** The canvas's pixels: drawn, then stretched. */
const WIDTH = 96;
const HEIGHT = 72;

/**
 * Two channels on a surface — `x` across, `y` up (by default the space's:
 * saturation × brightness in HSV, chroma × lightness in OKLCH) — one thumb, a
 * slider. Drag, or the keys: ← → `x`, ↑ ↓ `y`, Shift ×10, Page Up / Down `y`
 * by a tenth, Home / End `x` to its ends. Painted with CSS where it can, on a
 * canvas otherwise. It reads its two values ("76 %, 96 %"); name it, and give
 * your words in `aria-valuetext`.
 */
@Component({
  selector: 'div[scColorPickerArea]',
  template: `
    @if (painted()) {
      <canvas
        #canvas
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 size-full"
        [class]="radius()"
        [width]="width"
        [height]="height"
      ></canvas>
    }
    <span
      aria-hidden="true"
      data-area-thumb=""
      [class]="thumbClass"
      [style.left.%]="xPercent()"
      [style.top.%]="100 - yPercent()"
      [style.background]="picker.css()"
    ></span>
  `,
  host: {
    'data-slot': 'color-picker-area',
    role: 'slider',
    '[attr.tabindex]': 'picker.disabled() ? null : 0',
    '[attr.aria-valuemin]': 'xInfo().min',
    '[attr.aria-valuemax]': 'xInfo().max',
    '[attr.aria-valuenow]': 'xValue()',
    '[attr.aria-valuetext]': 'valueText()',
    '[attr.aria-disabled]': 'picker.disabled() || null',
    '[attr.aria-readonly]': 'picker.readonly() || null',
    '[attr.data-out-of-gamut]': 'picker.outOfGamut() || null',
    '[style.--sc-color-picker-area-background]': 'background()',
    '[style.background]': 'background()',
    '[style.--sc-color-picker-area-x]': 'xPercent() / 100',
    '[style.--sc-color-picker-area-y]': 'yPercent() / 100',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp($event)',
    '(keydown)': 'onKeydown($event)',
    '(blur)': 'picker.touch.emit()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScColorPickerArea {
  private readonly picker = inject(ScColorPicker);
  /** What it shows: the locale, in the user's numbering system. */
  private readonly displayLocale = injectDisplayLocale();
  private readonly styles = injectStyle().colorPicker;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The channel across; by default the space's. */
  readonly x = input<ScColorChannel | null>(null);
  /** The channel up; by default the space's. */
  readonly y = input<ScColorChannel | null>(null);
  /** Your words for its value; by default its two values. */
  readonly ariaValueText = input<string | null>(null, {
    alias: 'aria-valuetext',
  });

  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly width = WIDTH;
  private readonly height = HEIGHT;

  private readonly xChannel = computed(
    () => this.x() ?? SC_COLOR_AREA_CHANNELS[this.picker.space()][0],
  );
  private readonly yChannel = computed(
    () => this.y() ?? SC_COLOR_AREA_CHANNELS[this.picker.space()][1],
  );
  private readonly xInfo = computed(() => SC_COLOR_CHANNELS[this.xChannel()]);
  private readonly yInfo = computed(() => SC_COLOR_CHANNELS[this.yChannel()]);
  private readonly xValue = computed(
    () => Math.round(this.picker.channel(this.xChannel()) * 1000) / 1000,
  );
  private readonly xPercent = computed(() => {
    const { min, max } = this.xInfo();
    return ((this.picker.channel(this.xChannel()) - min) / (max - min)) * 100;
  });
  private readonly yPercent = computed(() => {
    const { min, max } = this.yInfo();
    return ((this.picker.channel(this.yChannel()) - min) / (max - min)) * 100;
  });
  private readonly valueText = computed(
    () =>
      this.ariaValueText() ??
      `${scFormatChannel(this.xChannel(), this.picker.channel(this.xChannel()), this.displayLocale())}, ${scFormatChannel(this.yChannel(), this.picker.channel(this.yChannel()), this.displayLocale())}`,
  );

  /** Saturation × brightness in HSV: CSS gradients; any other pair: a canvas. */
  private readonly painted = computed(
    () =>
      !(
        this.picker.space() === 'hsv' &&
        this.xChannel() === 'saturation' &&
        this.yChannel() === 'brightness'
      ),
  );
  private readonly background = computed(() =>
    this.painted()
      ? null
      : `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent), hsl(${this.picker.channel('hue')} 100% 50%)`,
  );

  /** The thumb: white-edged, a dark outline, so it shows on any colour. */
  private readonly thumbClass = cn(
    'pointer-events-none absolute z-10 size-4 -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/0.4),0_1px_3px_rgb(0_0_0/0.4)]',
    this.styles.thumb,
  );
  private readonly radius = computed(() => cn(this.styles.area));

  private readonly class = computed(() =>
    cn(
      'relative block aspect-[4/3] w-full cursor-crosshair touch-none outline-none',
      this.styles.area,
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      this.classInput(),
    ),
  );

  /** What the canvas shows: every channel but the area's two. */
  private readonly paintKey = computed(() => {
    const values = { ...this.picker.values() };
    delete values[this.xChannel()];
    delete values[this.yChannel()];
    delete values.alpha;
    return JSON.stringify([
      this.picker.space(),
      this.xChannel(),
      this.yChannel(),
      values,
    ]);
  });

  constructor() {
    ɵwarnIfUnnamed('scColorPickerArea');
    afterRenderEffect(() => {
      this.paintKey();
      const canvas = this.canvas()?.nativeElement;
      if (canvas) this.paint(canvas);
    });
  }

  private paint(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('2d');
    if (!context) return;
    const space = this.picker.space();
    const base = this.picker.values();
    const [x, y] = [this.xChannel(), this.yChannel()];
    const [xi, yi] = [this.xInfo(), this.yInfo()];
    const image = context.createImageData(WIDTH, HEIGHT);
    for (let row = 0; row < HEIGHT; row++) {
      const yv = yi.max - ((yi.max - yi.min) * row) / (HEIGHT - 1);
      for (let col = 0; col < WIDTH; col++) {
        const xv = xi.min + ((xi.max - xi.min) * col) / (WIDTH - 1);
        const { r, g, b } = scColorToRgb(space, { ...base, [x]: xv, [y]: yv });
        const at = (row * WIDTH + col) * 4;
        image.data[at] = Math.round(Math.min(1, Math.max(0, r)) * 255);
        image.data[at + 1] = Math.round(Math.min(1, Math.max(0, g)) * 255);
        image.data[at + 2] = Math.round(Math.min(1, Math.max(0, b)) * 255);
        image.data[at + 3] = 255;
      }
    }
    context.putImageData(image, 0, 0);
  }

  private onPointerDown(event: PointerEvent): void {
    if (event.button !== 0 || this.picker.disabled()) return;
    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture(event.pointerId);
    target.focus({ focusVisible: false });
    event.preventDefault();
    this.pick(event);
  }

  private onPointerMove(event: PointerEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (target.hasPointerCapture(event.pointerId)) this.pick(event);
  }

  private onPointerUp(event: PointerEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!target.hasPointerCapture(event.pointerId)) return;
    target.releasePointerCapture(event.pointerId);
    if (!this.picker.readonly()) this.picker.commit();
  }

  private onKeydown(event: KeyboardEvent): void {
    const [x, y] = [this.xChannel(), this.yChannel()];
    const [xi, yi] = [this.xInfo(), this.yInfo()];
    const xv = this.picker.channel(x);
    const yv = this.picker.channel(y);
    const times = event.shiftKey ? 10 : 1;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [xv - xi.step * times, yv],
      ArrowRight: [xv + xi.step * times, yv],
      ArrowUp: [xv, yv + yi.step * times],
      ArrowDown: [xv, yv - yi.step * times],
      PageUp: [xv, yv + (yi.max - yi.min) / 10],
      PageDown: [xv, yv - (yi.max - yi.min) / 10],
      Home: [xi.min, yv],
      End: [xi.max, yv],
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    this.picker.set({ [x]: move[0], [y]: move[1] });
  }

  private pick(event: PointerEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const fx = Math.min(
      1,
      Math.max(0, (event.clientX - rect.left) / rect.width),
    );
    const fy = Math.min(
      1,
      Math.max(0, 1 - (event.clientY - rect.top) / rect.height),
    );
    const [xi, yi] = [this.xInfo(), this.yInfo()];
    this.picker.set(
      {
        [this.xChannel()]: xi.min + fx * (xi.max - xi.min),
        [this.yChannel()]: yi.min + fy * (yi.max - yi.min),
      },
      false,
    );
  }
}
