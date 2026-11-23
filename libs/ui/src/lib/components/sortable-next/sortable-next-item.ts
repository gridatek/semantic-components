import {
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  contentChild,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScSortableNext } from './sortable-next';
import { ScSortableNextHandle } from './sortable-next-handle';

/**
 * An item — `[scSortableNextItem]="item"`: a Tab stop, dragged by the
 * pointer (by its handle, if it has one; a press on its buttons and links is
 * theirs), lifted by Space or Enter. As the others make room it glides to
 * its new place; dropped, it shows it a moment (the style's `sortable`).
 * `data-dragging`, `data-lifted`, `data-dropped`.
 */
@Directive({
  selector: '[scSortableNextItem]',
  exportAs: 'scSortableNextItem',
  host: {
    'data-slot': 'sortable-item',
    '[attr.tabindex]': 'list.off() ? null : 0',
    '[attr.data-dragging]': '(list.dragging() && active()) || null',
    '[attr.data-lifted]': '(list.lifted() && active()) || null',
    '[attr.data-dropped]': 'dropped() || null',
    '[attr.data-disabled]': 'list.off() || null',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(keydown)': 'list.itemKeydown($event, item(), element)',
    '(dragstart)': '$event.preventDefault()',
  },
})
export class ScSortableNextItem<T = unknown> {
  /** The list it is in. */
  readonly list = inject<ScSortableNext<T>>(forwardRef(() => ScSortableNext));
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly frame = injectStyle().frameSm;
  private readonly styles = injectStyle().sortable;

  readonly item = input.required<T>({ alias: 'scSortableNextItem' });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly handle = contentChild(ScSortableNextHandle, {
    descendants: true,
  });

  private readonly active = computed(() => this.list.active() === this.item());
  private readonly dragging = computed(
    () => this.list.dragging() && this.active(),
  );
  private readonly lifted = computed(() => this.list.lifted() && this.active());
  private readonly dropped = computed(
    () => this.list.dropped() === this.item(),
  );

  /** Where it was, in its list (layout, not transforms), the last time it moved. */
  private place: { x: number; y: number; index: number } | null = null;

  constructor() {
    // Its place changed (the others made room, or it was moved): it glides
    // there from where it was — not the one following the pointer, not under
    // reduced motion.
    afterRenderEffect(() => {
      const index = this.list.items().indexOf(this.item());
      const x = this.element.offsetLeft;
      const y = this.element.offsetTop;
      const was = this.place;
      this.place = { x, y, index };
      if (!was || was.index === index || this.dragging()) return;
      const dx = was.x - x;
      const dy = was.y - y;
      if (!dx && !dy) return;
      if (globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      this.element.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
        { duration: 150, easing: 'ease-out' },
      );
    });
  }

  private readonly class = computed(() =>
    cn(
      // A small box in the style: its corners and ring.
      this.frame,
      'bg-card text-card-foreground relative px-3 py-2 text-sm outline-none select-none',
      'focus-visible:ring-ring/50 focus-visible:ring-3',
      !this.handle() && !this.list.off() && 'cursor-grab touch-manipulation',
      // The look of its moments, from the style: dragged, lifted, just dropped.
      'transition-[box-shadow,background-color] duration-700 motion-reduce:transition-none',
      this.dragging() && cn('z-10 cursor-grabbing', this.styles.dragging),
      this.lifted() && this.styles.lifted,
      this.dropped() && this.styles.dropped,
      this.list.off() && 'opacity-60',
      this.classInput(),
    ),
  );

  focus(): void {
    this.element.focus();
  }

  private onPointerDown(event: PointerEvent): void {
    // With a handle, only the handle drags.
    const handle = this.handle()?.element;
    if (handle && !handle.contains(event.target as Node)) return;
    this.list.itemPointerDown(event, this.item(), this.element);
  }
}
