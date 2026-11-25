import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';
import { SC_FIELD } from '../field/field';
import {
  type ScSignature,
  type ScSignaturePoint,
  nextPoint,
  strokePath,
} from './signature';

/**
 * A signature pad: where you sign — ink that follows the pen (its pressure;
 * a mouse's or a finger's speed). Its value is the strokes, plain data to
 * store and give back; a `[formField]`. Name it (`aria-label`). Focused,
 * Ctrl + Z takes the last stroke back and Delete clears it. What you put
 * inside shows under the ink ("Sign here", in your words).
 */
@Component({
  selector: 'div[scSignaturePad]',
  exportAs: 'scSignaturePad',
  template: `
    <ng-content />
    <svg
      class="pointer-events-none absolute inset-0 size-full"
      [attr.viewBox]="viewBox()"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      @for (path of paths(); track $index) {
        <path [attr.d]="path.d" [attr.fill]="path.color" />
      }
      @if (live(); as live) {
        <path [attr.d]="live.d" [attr.fill]="live.color" />
      }
    </svg>
  `,
  host: {
    role: 'img',
    '[attr.tabindex]': 'disabled() ? null : 0',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.aria-invalid]': 'showInvalid() || null',
    // In a field: its errors and description are read with it.
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.data-empty]': 'empty() ? "" : null',
    '[attr.data-drawing]': 'drawing().length ? "" : null',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'end()',
    '(pointercancel)': 'end()',
    '(keydown)': 'onKeydown($event)',
    '(blur)': 'touch.emit()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSignaturePad implements FormValueControl<ScSignature | null> {
  private readonly textareaStyles = injectStyle().textarea;
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  /** The strokes, or null before any: two-way, or a `[formField]`. */
  readonly value = model<ScSignature | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly touch = output<void>();

  /** The ink's colour: the text's by default (black when exported). */
  readonly penColor = input('currentColor');
  /** The pen's width, at an even pressure. */
  readonly penWidth = input(3);
  /** Yours (a hint beside it); in a field, its description and errors join it. */
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });

  /** Nothing signed. */
  readonly empty = computed(() => this.value() === null);
  /** A stroke to take back. */
  readonly canUndo = computed(() => this.editable() && !this.empty());

  private readonly editable = computed(
    () => !this.disabled() && !this.readonly(),
  );
  private readonly showInvalid = computed(
    () => this.invalid() && this.touched(),
  );
  private readonly describedBy = computed(
    () =>
      [this.ariaDescribedByInput(), ...(this.field?.descriptionIds() ?? [])]
        .filter(Boolean)
        .join(' ') || null,
  );

  /** The pad's size, as shown. */
  private readonly size = signal({ width: 0, height: 0 });
  /** The stroke being drawn. */
  private readonly drawing = signal<readonly ScSignaturePoint[]>([]);

  /** The strokes' space: the pad they were drawn on, fitted to this one. */
  private readonly viewBox = computed(() => {
    const space = this.value() ?? this.size();
    return `0 0 ${space.width || 1} ${space.height || 1}`;
  });

  private readonly paths = computed(() =>
    (this.value()?.strokes ?? []).map((stroke) => ({
      d: strokePath(stroke),
      color: stroke.color,
    })),
  );

  private readonly live = computed(() => {
    const points = this.drawing();
    if (!points.length) return null;
    return {
      d: strokePath({ points, color: '', width: this.penWidth() }),
      color: this.penColor(),
    };
  });

  private readonly class = computed(() =>
    cn(
      // The style's textarea: a box you write in.
      this.textareaStyles,
      'text-foreground relative block h-40 touch-none overflow-hidden select-none',
      'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
      this.editable() && 'cursor-crosshair',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scSignaturePad');
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new ResizeObserver(() =>
        this.size.set({
          width: this.element.clientWidth,
          height: this.element.clientHeight,
        }),
      );
      observer.observe(this.element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  /** Takes the last stroke back. */
  undo(): void {
    const value = this.value();
    if (!value || !this.editable()) return;
    const strokes = value.strokes.slice(0, -1);
    this.value.set(strokes.length ? { ...value, strokes } : null);
  }

  /** Clears the signature. */
  clear(): void {
    if (!this.editable() || this.empty()) return;
    this.value.set(null);
  }

  private onPointerDown(event: PointerEvent): void {
    if (!this.editable() || event.button !== 0) return;
    event.preventDefault();
    // Focused for its keys, without the keyboard's ring.
    this.element.focus({ preventScroll: true, focusVisible: false });
    this.element.setPointerCapture?.(event.pointerId);
    this.drawing.set([]);
    this.add(event);
  }

  private onPointerMove(event: PointerEvent): void {
    if (!this.drawing().length) return;
    // Every point the pointer passed, not only one a frame.
    const events = event.getCoalescedEvents?.() ?? [];
    for (const each of events.length ? events : [event]) this.add(each);
  }

  private end(): void {
    const points = this.drawing();
    if (!points.length) return;
    this.drawing.set([]);
    const value = this.value();
    const space = this.space();
    this.value.set({
      width: space.width,
      height: space.height,
      strokes: [
        ...(value?.strokes ?? []),
        { points, color: this.penColor(), width: this.penWidth() },
      ],
    });
    this.touch.emit();
  }

  private onKeydown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    if ((event.ctrlKey || event.metaKey) && key === 'z' && !event.shiftKey) {
      this.undo();
    } else if (key === 'delete' || key === 'backspace') {
      this.clear();
    } else {
      return;
    }
    event.preventDefault();
  }

  /** The point under the pointer, in the strokes' space. */
  private add(event: PointerEvent): void {
    const rect = this.element.getBoundingClientRect();
    const space = this.space();
    // The space is fitted in the pad, centred (as the SVG shows it).
    const scale = Math.min(
      rect.width / space.width,
      rect.height / space.height,
    );
    const x =
      (event.clientX - rect.left - (rect.width - space.width * scale) / 2) /
      scale;
    const y =
      (event.clientY - rect.top - (rect.height - space.height * scale) / 2) /
      scale;
    // A pen's pressure; a mouse or a finger has none worth reading.
    const pressure = event.pointerType === 'pen' ? event.pressure : null;
    this.drawing.update((points) => [
      ...points,
      nextPoint(points[points.length - 1], x, y, pressure),
    ]);
  }

  /** Where strokes are drawn: the signature's space, or this pad's. */
  private space(): { width: number; height: number } {
    const value = this.value();
    if (value) return { width: value.width, height: value.height };
    const rect = this.element.getBoundingClientRect();
    return { width: rect.width || 1, height: rect.height || 1 };
  }
}
