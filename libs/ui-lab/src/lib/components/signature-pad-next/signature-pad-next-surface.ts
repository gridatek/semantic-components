import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { SC_FIELD, cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import {
  type ScSignaturePoint,
  isTyped,
  nextPoint,
  outline,
  pathData,
} from './ink';
import { ScSignaturePadNext } from './signature-pad-next';

/**
 * Where you sign: the ink, drawn as you write — pressure from a pen, speed
 * from a mouse or a finger. Name it ("Signature"). Focused: Ctrl+Z undoes,
 * Ctrl+Shift+Z (or Ctrl+Y) redoes, Delete clears. Put your line in it
 * (`scSignaturePadNextLine`).
 */
@Component({
  selector: 'div[scSignaturePadNextSurface]',
  template: `
    <ng-content />
    <svg
      class="pointer-events-none absolute inset-0 size-full"
      [attr.viewBox]="viewBox()"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      @if (typed(); as typed) {
        <text
          x="50%"
          y="50%"
          text-anchor="middle"
          dominant-baseline="central"
          fill="currentColor"
          [attr.font-family]="typed.font"
          [attr.font-size]="size().height * 0.4"
        >
          {{ typed.text }}
        </text>
      }
      @for (path of paths(); track $index) {
        <path [attr.d]="path.d" [attr.fill]="path.color" />
      }
      @if (live(); as live) {
        <path [attr.d]="live.d" [attr.fill]="live.color" />
      }
    </svg>
  `,
  host: {
    'data-slot': 'signature-pad-surface',
    role: 'img',
    '[attr.tabindex]': 'pad.disabled() ? null : 0',
    '[attr.aria-disabled]': 'pad.disabled() || null',
    '[attr.data-invalid]': 'pad.showInvalid() || null',
    // In a field: its errors and descriptions describe the signature.
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.data-drawing]': 'points().length > 0 || null',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'end()',
    '(pointercancel)': 'end()',
    '(keydown)': 'onKeydown($event)',
    '(blur)': 'pad.touch.emit()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSignaturePadNextSurface {
  protected readonly pad = inject(ScSignaturePadNext);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly describedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );

  /** The surface's size, as shown. */
  protected readonly size = signal({ width: 0, height: 0 });
  /** The stroke being drawn. */
  protected readonly points = signal<readonly ScSignaturePoint[]>([]);

  protected readonly typed = computed(() => {
    const value = this.pad.value();
    return isTyped(value) ? value : null;
  });

  private readonly drawn = computed(() => {
    const value = this.pad.value();
    return value && !isTyped(value) ? value : null;
  });

  /** The strokes' space: the surface it was drawn on, or this one. */
  protected readonly viewBox = computed(() => {
    const space = this.drawn() ?? this.size();
    return `0 0 ${space.width || 1} ${space.height || 1}`;
  });

  protected readonly paths = computed(() =>
    (this.drawn()?.strokes ?? []).map((stroke) => ({
      d: pathData(outline(stroke)),
      color: stroke.color,
    })),
  );

  protected readonly live = computed(() => {
    const points = this.points();
    if (!points.length) return null;
    return {
      d: pathData(outline({ points, color: '', width: this.pad.penWidth() })),
      color: this.pad.penColor(),
    };
  });

  protected readonly class = computed(() =>
    cn(
      'relative block h-40 w-full touch-none overflow-hidden rounded-md border bg-background text-foreground outline-none',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'data-invalid:border-destructive',
      'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
      this.pad.editable() && 'cursor-crosshair',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scSignaturePadNextSurface');
    const observer = new ResizeObserver(([entry]) =>
      this.size.set({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }),
    );
    observer.observe(this.element);
    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }

  protected onPointerDown(event: PointerEvent): void {
    if (!this.pad.editable() || event.button !== 0) return;
    event.preventDefault();
    // Focused for its keys (undo…), without the keyboard's ring.
    this.element.focus({ focusVisible: false });
    this.element.setPointerCapture(event.pointerId);
    this.points.set([]);
    this.add(event);
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.points().length) return;
    // Every point the pointer passed, not only one per frame.
    const events = event.getCoalescedEvents?.() ?? [];
    for (const each of events.length ? events : [event]) this.add(each);
  }

  protected end(): void {
    const points = this.points();
    if (!points.length) return;
    this.points.set([]);
    const { width, height } = this.space();
    this.pad.ɵaddStroke(
      { points, color: this.pad.penColor(), width: this.pad.penWidth() },
      width,
      height,
    );
  }

  protected onKeydown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    const mod = event.ctrlKey || event.metaKey;
    if (mod && key === 'z' && !event.shiftKey) this.pad.undo();
    else if (mod && (key === 'y' || (key === 'z' && event.shiftKey))) {
      this.pad.redo();
    } else if (key === 'delete' || key === 'backspace') this.pad.clear();
    else return;
    event.preventDefault();
  }

  /** The point under the pointer, in the strokes' space. */
  private add(event: PointerEvent): void {
    const rect = this.element.getBoundingClientRect();
    const space = this.space();
    // The space is fitted in the surface, centred (as the SVG shows it).
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
    this.points.update((points) => [
      ...points,
      nextPoint(points[points.length - 1], x, y, pressure),
    ]);
  }

  private space(): { width: number; height: number } {
    const drawn = this.drawn();
    if (drawn) return drawn;
    const rect = this.element.getBoundingClientRect();
    return { width: rect.width || 1, height: rect.height || 1 };
  }
}
