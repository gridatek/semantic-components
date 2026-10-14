import {
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_NUMBER_FIELD } from './number-field';

export const SC_NUMBER_FIELD_SCRUB_AREA =
  new InjectionToken<ScNumberFieldScrubArea>('SC_NUMBER_FIELD_SCRUB_AREA');

/**
 * Drag on it to change the value (e.g. on the label), as Base UI's scrub
 * area: one step per `pixelSensitivity` pixels (Shift: `largeStep`, Alt:
 * `smallStep`). With a mouse the pointer is locked — no edge of the screen
 * stops you — and `scNumberFieldScrubAreaCursor` stands in for it.
 */
@Directive({
  selector: '[scNumberFieldScrubArea]',
  exportAs: 'scNumberFieldScrubArea',
  providers: [
    {
      provide: SC_NUMBER_FIELD_SCRUB_AREA,
      useExisting: ScNumberFieldScrubArea,
    },
  ],
  host: {
    'data-slot': 'number-field-scrub-area',
    '[class]': 'class()',
    '[attr.data-scrubbing]': 'scrubbing() || null',
    '[attr.data-disabled]': 'number.disabled() || null',
    '(pointerdown)': 'onPointerDown($event)',
  },
})
export class ScNumberFieldScrubArea {
  protected readonly number = inject(SC_NUMBER_FIELD);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Drag left–right, or up–down (up increases). */
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  /** Pixels of movement per step. */
  readonly pixelSensitivity = input(2);

  readonly scrubbing = signal(false);
  /** The pointer is locked: the cursor part shows instead of it. */
  readonly locked = signal(false);
  /** Where the (virtual) cursor is. */
  readonly cursorX = signal(0);
  readonly cursorY = signal(0);

  protected readonly class = computed(() =>
    cn(
      'touch-none select-none',
      this.direction() === 'vertical' ? 'cursor-ns-resize' : 'cursor-ew-resize',
      'data-disabled:cursor-not-allowed data-disabled:opacity-50',
      this.classInput(),
    ),
  );

  private end: (() => void) | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.end?.());
  }

  protected onPointerDown(event: PointerEvent): void {
    const number = this.number;
    if (event.button !== 0 || number.disabled() || number.readonly()) return;
    event.preventDefault();
    number.flushInput();
    this.end?.();

    this.scrubbing.set(true);
    this.cursorX.set(event.clientX);
    this.cursorY.set(event.clientY);
    let lastX = event.clientX;
    let lastY = event.clientY;
    let travelled = 0;
    const vertical = this.direction() === 'vertical';

    // A mouse: lock the pointer (the cursor part takes its place).
    if (event.pointerType === 'mouse' && this.element.requestPointerLock) {
      Promise.resolve(this.element.requestPointerLock())
        .then(() =>
          this.locked.set(document.pointerLockElement === this.element),
        )
        .catch(() => this.locked.set(false));
    } else {
      this.element.setPointerCapture?.(event.pointerId);
    }

    const onMove = (move: PointerEvent) => {
      const locked = document.pointerLockElement === this.element;
      const dx = locked ? move.movementX : move.clientX - lastX;
      const dy = locked ? move.movementY : move.clientY - lastY;
      lastX = move.clientX;
      lastY = move.clientY;
      if (locked) this.moveCursor(dx, dy);
      else {
        this.cursorX.set(move.clientX);
        this.cursorY.set(move.clientY);
      }
      // Right / up increases.
      travelled += vertical ? -dy : dx;
      const sensitivity = Math.max(1, this.pixelSensitivity());
      const steps = Math.trunc(travelled / sensitivity);
      if (!steps) return;
      travelled -= steps * sensitivity;
      number.stepBy(steps * number.stepSize(move));
    };
    const onUp = () => this.end?.();

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('pointercancel', onUp);
    this.end = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onUp);
      if (document.pointerLockElement === this.element) {
        document.exitPointerLock();
      }
      this.scrubbing.set(false);
      this.locked.set(false);
      this.end = null;
      number.valueCommitted.emit(number.value());
    };
  }

  /** Moves the virtual cursor, wrapping round the window's edges. */
  private moveCursor(dx: number, dy: number): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.cursorX.set((((this.cursorX() + dx) % width) + width) % width);
    this.cursorY.set((((this.cursorY() + dy) % height) + height) % height);
  }
}
