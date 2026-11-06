import {
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { ScResizablePanelGroupNext } from './resizable-panel-group-next';
import { type ScResizablePanelNext } from './resizable-panel-next';

/** An arrow key resizes by this much (%). */
const STEP = 10;

/**
 * The splitter between two panels (WAI-ARIA's window splitter): a focusable
 * `role="separator"` whose value is the size of the panel before it, which
 * it controls. Name it (`aria-label`). Dragged, it resizes the two panels
 * beside it; the arrow keys along its axis by 10% (mirrored right to left),
 * Home and End to the limits, Enter shuts or opens a collapsible panel.
 * Its grip, if you want one, is yours: `<div scResizableHandleNextGrip>`.
 * As react-resizable-panels' Separator (shadcn's ResizableHandle).
 */
@Directive({
  selector: 'div[scResizableHandleNext]',
  host: {
    role: 'separator',
    tabindex: '0',
    '[attr.aria-orientation]': 'ariaOrientation()',
    '[attr.aria-valuenow]': 'valueNow()',
    '[attr.aria-valuemin]': 'before()?.minSize() ?? 0',
    '[attr.aria-valuemax]': 'before()?.maxSize() ?? 100',
    '[attr.aria-controls]': 'before()?.id ?? null',
    '[attr.data-dragging]': 'dragging() ? "" : null',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp($event)',
    '(pointercancel)': 'onPointerUp($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScResizableHandleNext {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly group = inject(ScResizablePanelGroupNext);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly dragging = signal(false);
  private drag: {
    id: number;
    from: number;
    start: readonly number[];
    size: number;
  } | null = null;

  /** The panels beside it: read again with the group's panels. */
  private readonly neighbours = computed(() => {
    this.group.panels();
    return this.group.around(this.element);
  });
  protected readonly before = computed(() => this.neighbours().before);
  private readonly after = computed(() => this.neighbours().after);
  protected readonly valueNow = computed(() => {
    const b = this.before();
    return b ? Math.round(b.size()) : null;
  });

  /** A separator runs across its group's axis. */
  protected readonly ariaOrientation = computed(() =>
    this.group.orientation() === 'horizontal' ? 'vertical' : 'horizontal',
  );

  protected readonly class = computed(() =>
    cn(
      'relative flex shrink-0 items-center justify-center bg-border ring-offset-background touch-none select-none after:absolute focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden',
      // Plain classes, not aria-[orientation=…]: (they'd outrank yours).
      this.group.orientation() === 'horizontal'
        ? 'w-px cursor-ew-resize after:inset-y-0 after:start-1/2 after:w-1 after:-translate-x-1/2 rtl:after:translate-x-1/2'
        : 'h-px w-full cursor-ns-resize after:inset-x-0 after:top-1/2 after:h-1 after:-translate-y-1/2 *:rotate-90',
      this.classInput(),
    ),
  );

  protected onPointerDown(event: PointerEvent): void {
    if (event.button !== 0 || !this.before() || !this.after()) return;
    // No text selected while dragging.
    event.preventDefault();
    this.element.setPointerCapture(event.pointerId);
    this.drag = {
      id: event.pointerId,
      from: this.position(event),
      start: this.group.layout(),
      size: this.before()?.size() ?? 0,
    };
    this.dragging.set(true);
  }

  protected onPointerMove(event: PointerEvent): void {
    const d = this.drag;
    const [b, a] = [this.before(), this.after()];
    if (!d || event.pointerId !== d.id || !b || !a) return;
    const length = this.group.length();
    if (!length) return;
    let moved = ((this.position(event) - d.from) / length) * 100;
    if (this.group.reversed()) moved = -moved;
    this.group.resize(b, a, d.size + moved, d.start);
  }

  protected onPointerUp(event: PointerEvent): void {
    if (!this.drag || event.pointerId !== this.drag.id) return;
    this.drag = null;
    this.dragging.set(false);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const [b, a] = [this.before(), this.after()];
    if (!b || !a) return;
    const horizontal = this.group.orientation() === 'horizontal';
    const flip = this.group.reversed() ? -1 : 1;
    const step: Record<string, number> = horizontal
      ? { ArrowLeft: -STEP * flip, ArrowRight: STEP * flip }
      : { ArrowUp: -STEP, ArrowDown: STEP };
    if (event.key in step) this.group.resize(b, a, b.size() + step[event.key]);
    else if (event.key === 'Home') this.group.resize(b, a, b.minSize());
    else if (event.key === 'End') this.group.resize(b, a, b.maxSize());
    else if (event.key === 'Enter') this.toggle(b, a);
    else return;
    event.preventDefault();
  }

  /** Enter: the collapsible panel beside it shuts, or opens again. */
  private toggle(b: ScResizablePanelNext, a: ScResizablePanelNext): void {
    if (b.collapsible()) b.toggle(a, 'before');
    else if (a.collapsible()) a.toggle(b, 'after');
  }

  private position(event: PointerEvent): number {
    return this.group.orientation() === 'horizontal'
      ? event.clientX
      : event.clientY;
  }
}
