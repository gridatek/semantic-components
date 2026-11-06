import {
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScDrawerNextProvider } from './drawer-next-provider';

/** Dragged at least this far (px) before it is a swipe, not a press. */
const SLOP = 4;
/** A flick: faster than this (px/ms) dismisses, or skips a snap point. */
const FLICK = 0.5;
/** How it settles back, or onto a snap point. */
const SETTLE =
  'transform 300ms cubic-bezier(0.22, 1, 0.36, 1), scale 450ms, filter 450ms';

/**
 * The drawer's panel, in the preset's look: a dialog at its edge, named by
 * its title and described by its description. It follows a swipe towards
 * its edge and, let go, closes (far enough, or flicked), settles back, or
 * rests at the nearest snap point. A mouse drags it by its handle or its
 * edges (text inside stays selectable); a finger or a pen from anywhere but
 * a field. `data-swipe-ignore` keeps an element's drags its own. It slides in
 * and out (animate.enter / animate.leave) — out from where a swipe let go.
 */
@Directive({
  selector: 'div[scDrawerNext]',
  host: {
    role: 'dialog',
    '[attr.aria-modal]': 'drawer.modal() === true ? "true" : null',
    '[id]': 'drawer.id',
    '[attr.aria-labelledby]': 'drawer.titleId()',
    '[attr.aria-describedby]': 'drawer.descriptionId()',
    '[attr.data-swipe-direction]': 'drawer.physicalDirection()',
    '[attr.data-swipe-axis]': 'drawer.axis()',
    '[attr.data-snap-points]': 'drawer.hasSnapPoints() ? "" : null',
    '[attr.data-nested-drawer-open]': 'drawer.nestedOpen() ? "" : null',
    '[attr.data-swiping]': 'dragging() ? "" : null',
    '[attr.dir]': 'direction',
    '[attr.lang]': 'lang',
    '[tabindex]': '-1',
    '[class]': 'class()',
    '[style.transform]': 'transform()',
    '[style.transition]': 'transition()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp($event)',
    '(pointercancel)': 'onPointerUp($event)',
    'animate.enter': 'animate-in',
    'animate.leave': 'animate-out',
  },
})
export class ScDrawerNext {
  private readonly styles = injectPreset().drawer;
  protected readonly drawer = inject(ScDrawerNextProvider);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  // Created as it opens: its provider's direction and language then.
  protected readonly direction = this.drawer.direction();
  protected readonly lang = this.drawer.lang();
  readonly classInput = input<string>('', { alias: 'class' });

  /** How far it has been dragged towards its edge (px; negative: away). */
  private readonly offset = signal(0);
  protected readonly dragging = signal(false);
  private readonly settling = signal(false);
  private start: { x: number; y: number; id: number } | null = null;
  private samples: { at: number; offset: number }[] = [];

  /** Where it rests: hidden by its snap point (px), 0 without snap points. */
  private readonly snapOffset = computed(() => {
    const point = this.drawer.snapPoint();
    if (!this.drawer.hasSnapPoints() || point === null) return 0;
    return Math.max(0, window.innerHeight - this.drawer.snapHeight(point));
  });

  protected readonly transform = computed(() => {
    const distance = this.snapOffset() + this.offset();
    if (!distance) return null;
    const d = this.drawer.physicalDirection();
    const sign = d === 'down' || d === 'right' ? 1 : -1;
    return this.drawer.axis() === 'y'
      ? `translate3d(0, ${sign * distance}px, 0)`
      : `translate3d(${sign * distance}px, 0, 0)`;
  });
  protected readonly transition = computed(() =>
    this.dragging() ? 'none' : this.settling() ? SETTLE : null,
  );

  protected readonly class = computed(() =>
    cn(
      'group/drawer-popup fixed z-50 m-(--drawer-inset,0px) flex flex-col outline-none data-swiping:select-none duration-450 ease-[cubic-bezier(0.22,1,0.36,1)]',
      // At its edge, and sliding from and to it.
      'data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:slide-in-from-bottom data-[swipe-direction=down]:slide-out-to-bottom',
      'data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:slide-in-from-top data-[swipe-direction=up]:slide-out-to-top',
      'data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:slide-in-from-left data-[swipe-direction=left]:slide-out-to-left',
      'data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:slide-in-from-right data-[swipe-direction=right]:slide-out-to-right',
      'data-[swipe-axis=x]:w-3/4 data-[swipe-axis=x]:sm:w-96',
      // Dragged away from its edge: no gap behind it.
      'after:pointer-events-none after:absolute after:bg-inherit data-[swipe-axis=x]:after:inset-y-0 data-[swipe-axis=x]:after:w-12 data-[swipe-axis=y]:after:inset-x-0 data-[swipe-axis=y]:after:h-12 data-[swipe-direction=down]:after:top-full data-[swipe-direction=up]:after:bottom-full data-[swipe-direction=left]:after:right-full data-[swipe-direction=right]:after:left-full',
      // Snap points: the screen's height, shown in part.
      'data-[swipe-axis=y]:not-data-snap-points:max-h-[calc(100dvh-6rem)] data-snap-points:h-dvh',
      // A drawer open on top: this one shrinks and dims behind it.
      'transition-[scale,filter] data-nested-drawer-open:scale-95 data-nested-drawer-open:brightness-95 data-[swipe-direction=down]:origin-bottom data-[swipe-direction=up]:origin-top data-[swipe-direction=left]:origin-left data-[swipe-direction=right]:origin-right',
      this.styles.content,
      this.classInput(),
    ),
  );

  /** Its size along the swipe. */
  private size(): number {
    const rect = this.element.getBoundingClientRect();
    return this.drawer.axis() === 'y' ? rect.height : rect.width;
  }

  /** The distance a pointer has moved towards the edge. */
  private towardsEdge(event: PointerEvent): number {
    if (!this.start) return 0;
    switch (this.drawer.physicalDirection()) {
      case 'down':
        return event.clientY - this.start.y;
      case 'up':
        return this.start.y - event.clientY;
      case 'right':
        return event.clientX - this.start.x;
      default:
        return this.start.x - event.clientX;
    }
  }

  protected onPointerDown(event: PointerEvent): void {
    if (event.button !== 0 || this.drawer.nestedOpen()) return;
    const target = event.target as HTMLElement;
    if (target.closest('[data-swipe-ignore]')) return;
    if (target.closest('input, textarea, select, [contenteditable]')) return;
    // A mouse: by the handle or the panel's edges, so text stays selectable.
    if (
      event.pointerType === 'mouse' &&
      target !== this.element &&
      !target.closest('[data-slot=drawer-handle]')
    )
      return;
    this.start = { x: event.clientX, y: event.clientY, id: event.pointerId };
    this.samples = [];
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.start || event.pointerId !== this.start.id) return;
    let moved = this.towardsEdge(event);
    if (!this.dragging()) {
      if (Math.abs(moved) < SLOP) return;
      this.dragging.set(true);
      this.settling.set(false);
      this.element.setPointerCapture(event.pointerId);
    }
    // Away from the edge: stretched, unless a snap point is above.
    const room = this.roomAbove();
    if (moved < -room) moved = -room + (moved + room) * 0.2;
    this.offset.set(moved);
    const at = performance.now();
    this.samples.push({ at, offset: moved });
    this.samples = this.samples.filter((s) => at - s.at < 100);
  }

  protected onPointerUp(event: PointerEvent): void {
    if (!this.start || event.pointerId !== this.start.id) return;
    this.start = null;
    if (!this.dragging()) return;
    this.dragging.set(false);
    const moved = this.offset();
    const first = this.samples[0];
    const last = this.samples[this.samples.length - 1];
    const velocity =
      first && last && last.at > first.at
        ? (last.offset - first.offset) / (last.at - first.at)
        : 0;
    if (this.drawer.hasSnapPoints()) this.release(moved, velocity);
    else if (moved > this.size() / 2 || (velocity > FLICK && moved > SLOP))
      // From where it was let go: the leave animation starts there.
      this.drawer.close();
    else this.settle();
  }

  /** Snap points: to the nearest one where it would come to rest, or closed. */
  private release(moved: number, velocity: number): void {
    const points = this.drawer.snapPoints() ?? [];
    const shown =
      this.drawer.snapHeight(this.drawer.snapPoint() ?? points[0]) - moved;
    const projected = shown - velocity * 200;
    const lowest = this.drawer.snapHeight(points[0]);
    if (projected < lowest / 2) {
      this.drawer.close();
      return;
    }
    const nearest = points.reduce((best, p) =>
      Math.abs(this.drawer.snapHeight(p) - projected) <
      Math.abs(this.drawer.snapHeight(best) - projected)
        ? p
        : best,
    );
    // Its new rest, from where it was: offset folded into the snap point.
    this.settling.set(true);
    this.offset.set(0);
    this.drawer.snapPoint.set(nearest);
  }

  private settle(): void {
    this.settling.set(true);
    this.offset.set(0);
  }

  /** How far it may move away from its edge: to the highest snap point. */
  private roomAbove(): number {
    const points = this.drawer.snapPoints();
    if (!points?.length) return 0;
    const top = this.drawer.snapHeight(points[points.length - 1]);
    const at = this.drawer.snapHeight(this.drawer.snapPoint() ?? points[0]);
    return Math.max(0, top - at);
  }
}
