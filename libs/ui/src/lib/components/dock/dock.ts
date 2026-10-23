import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import type { ScDockItem } from './dock-item';

/**
 * A dock: your items in a bar, the ones near the pointer magnified — their
 * neighbours move aside. Put it on a `nav` (named) for navigation, or a
 * `role="toolbar"` for actions; place it yourself.
 */
@Directive({
  selector: '[scDock]',
  exportAs: 'scDock',
  host: {
    'data-slot': 'dock',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'class()',
    '(pointerenter)': 'onPointerEnter($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerleave)': 'pointer.set(null)',
  },
})
export class ScDock {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  /** How big the item under the pointer grows; 1, not at all. */
  readonly magnification = input(1.6);
  /** How far from the pointer items still grow, in pixels. */
  readonly distance = input(140);

  /** The pointer along the dock (or the focused item's centre), in pixels. */
  readonly pointer = signal<number | null>(null);
  readonly ɵfocusAt = signal<number | null>(null);

  /** Magnifying: asked for, and motion welcome. */
  readonly magnifying = computed(
    () => this.magnification() > 1 && !this.reducedMotion(),
  );

  protected readonly class = computed(() =>
    cn(
      'bg-background/80 inline-flex gap-2 rounded-2xl border p-2 shadow-lg backdrop-blur-lg [--dock-item:2.75rem]',
      this.orientation() === 'horizontal'
        ? 'flex-row items-end'
        : 'flex-col items-start',
      this.classInput(),
    ),
  );

  private readonly items = signal<readonly ScDockItem[]>([]);
  private readonly reducedMotion = signal(false);

  constructor() {
    // No media queries on the server (its window has none).
    const media = inject(DOCUMENT).defaultView?.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    );
    if (media) {
      this.reducedMotion.set(media.matches);
      const onChange = () => this.reducedMotion.set(media.matches);
      media.addEventListener('change', onChange);
      inject(DestroyRef).onDestroy(() =>
        media.removeEventListener('change', onChange),
      );
    }
  }

  /** How much an item at `center` grows now: 1 → `magnification`. */
  ɵscale(center: number | null): number {
    const at = this.pointer() ?? this.ɵfocusAt();
    if (!this.magnifying() || at === null || center === null) return 1;
    const away = Math.abs(at - center);
    if (away >= this.distance()) return 1;
    // A bell: full at the pointer, none at `distance`.
    const near = (1 + Math.cos((Math.PI * away) / this.distance())) / 2;
    return 1 + (this.magnification() - 1) * near;
  }

  /** The position along the dock of a client point. */
  ɵalong(x: number, y: number): number {
    return this.orientation() === 'horizontal' ? x : y;
  }

  ɵregister(item: ScDockItem): () => void {
    this.items.update((items) => [...items, item]);
    return () =>
      this.items.update((items) => items.filter((each) => each !== item));
  }

  /** Measures where each item rests, before any grows (no feedback). */
  ɵmeasure(): void {
    if (this.pointer() === null && this.ɵfocusAt() === null) {
      this.items().forEach((item) => item.ɵmeasure());
    }
  }

  protected onPointerEnter(event: PointerEvent): void {
    this.ɵmeasure();
    this.onPointerMove(event);
  }

  protected onPointerMove(event: PointerEvent): void {
    // Touch: tapped, not hovered — nothing grows.
    if (event.pointerType === 'touch') return;
    this.pointer.set(this.ɵalong(event.clientX, event.clientY));
  }
}
