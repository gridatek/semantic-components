import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import {
  type ScScrollAreaOrientation,
  ScScrollAreaState,
} from './scroll-area-state';

/** A thumb is never shorter than this (px). */
const MIN_THUMB = 16;

/**
 * A scrollbar along one axis (`orientation`: vertical by default), at the
 * box's end or bottom; hidden while that axis doesn't overflow. A press on
 * its track jumps there. `data-hovering` while the pointer is over the area,
 * `data-scrolling` while it scrolls. As Base UI's ScrollArea.Scrollbar, and
 * its look: a track (the foreground at 12%), hidden at rest, shown while
 * hovered or scrolling.
 */
@Directive({
  selector: 'div[scScrollAreaScrollbar]',
  host: {
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-hovering]': 'area.hovering() ? "" : null',
    '[attr.data-scrolling]': 'area.scrolling() ? "" : null',
    '[attr.hidden]': 'overflows() ? null : ""',
    '[class]': 'class()',
    '(pointerdown)': 'onTrackPress($event)',
  },
})
export class ScScrollAreaScrollbar {
  private readonly area = inject(ScScrollAreaState);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScScrollAreaOrientation>('vertical');

  /** Its track's length, less its padding (px). */
  private readonly track = signal(0);

  private readonly overflows = computed(() =>
    this.orientation() === 'vertical'
      ? this.area.hasOverflowY()
      : this.area.hasOverflowX(),
  );

  /** The thumb's length (px). */
  readonly thumbLength = computed(() =>
    Math.max(MIN_THUMB, this.track() * this.area.shown(this.orientation())),
  );

  /** The thumb's distance from the track's start, in the reading direction (px). */
  readonly thumbOffset = computed(() => {
    const axis = this.orientation();
    const max = this.area.maxScroll(axis);
    if (!max) return 0;
    return (this.area.position(axis) / max) * this.room();
  });

  private readonly room = computed(() =>
    Math.max(0, this.track() - this.thumbLength()),
  );

  /** Shown while the pointer is over the area or it scrolls (Base UI's). */
  private readonly shown = computed(
    () => this.area.hovering() || this.area.scrolling(),
  );

  private readonly class = computed(() =>
    cn(
      // Base UI's track: the theme's foreground at 12% (black on light, white
      // on dark) — the area the thumb moves in, seen. shadcn draws none.
      'bg-foreground/12 absolute flex touch-none p-px transition-opacity select-none',
      // Plain classes, not data-[orientation=…] / data-hovering: variants:
      // those outrank yours in specificity, and cn can't merge them. Hidden
      // at rest, it fades in over the area and shows at once as it scrolls.
      this.shown() ? 'opacity-100' : 'pointer-events-none opacity-0',
      this.area.scrolling() && 'duration-0',
      // Its corners on the box's edge rounded as the box's (inherited from
      // the area, its parent): the track stays inside a rounded box.
      this.orientation() === 'vertical'
        ? 'end-0 top-0 bottom-(--sc-scroll-area-corner-size) w-2.5 rounded-e-[inherit] border-s border-s-transparent'
        : 'start-0 end-(--sc-scroll-area-corner-size) bottom-0 h-2.5 flex-col rounded-b-[inherit] border-t border-t-transparent',
      this.classInput(),
    ),
  );

  constructor() {
    let observer: ResizeObserver | undefined;
    afterNextRender(() => {
      observer = new ResizeObserver(() => this.measure());
      observer.observe(this.element);
      this.measure();
    });
    inject(DestroyRef).onDestroy(() => observer?.disconnect());
  }

  private measure(): void {
    const vertical = this.orientation() === 'vertical';
    // The content box: inside its 1px padding and its transparent border.
    const size = vertical
      ? this.element.clientHeight
      : this.element.clientWidth;
    this.track.set(Math.max(0, size - 2));
  }

  /** Pointer distance from the track's start, in the reading direction. */
  pointerOffset(event: PointerEvent): number {
    const r = this.element.getBoundingClientRect();
    if (this.orientation() === 'vertical') return event.clientY - r.top;
    return this.area.isRtl() ? r.right - event.clientX : event.clientX - r.left;
  }

  /** Scrolls to where the thumb's start would be at `offset` on the track. */
  scrollToThumb(offset: number): void {
    const room = this.room();
    if (room <= 0) return;
    const axis = this.orientation();
    this.area.scrollTo(axis, (offset / room) * this.area.maxScroll(axis));
  }

  private onTrackPress(event: PointerEvent): void {
    if (event.button !== 0 || event.target !== this.element) return;
    this.scrollToThumb(this.pointerOffset(event) - this.thumbLength() / 2);
  }
}
