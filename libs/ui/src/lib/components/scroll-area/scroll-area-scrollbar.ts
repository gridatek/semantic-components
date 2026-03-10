import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_SCROLL_AREA } from './scroll-area-types';

const MIN_THUMB_SIZE = 20;

@Component({
  selector: 'div[scScrollBar]',
  host: {
    'data-slot': 'scroll-bar',
    '[class]': 'class()',
    '[attr.data-state]': 'visible() ? "visible" : "hidden"',
    '[attr.data-orientation]': 'orientation()',
    '(pointerdown)': 'onTrackPointerDown($event)',
  },
  template: `
    <div
      data-slot="scroll-bar-thumb"
      [class]="thumbClass()"
      [style]="thumbStyle()"
      (pointerdown)="onThumbPointerDown($event)"
    ></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScScrollBar {
  private readonly scrollArea = inject(SC_SCROLL_AREA);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly orientation = input.required<'vertical' | 'horizontal'>();

  protected readonly isVertical = computed(
    () => this.orientation() === 'vertical',
  );

  private readonly scrollPos = signal(0);
  private readonly scrollSize = signal(0);
  private readonly viewportSize = signal(0);
  private readonly trackSize = signal(0);
  private readonly dragging = signal(false);

  readonly visible = computed(() => this.scrollSize() > this.viewportSize());

  private readonly thumbSizePx = computed(() => {
    const ss = this.scrollSize();
    const vs = this.viewportSize();
    const ts = this.trackSize();
    if (ss <= 0 || ts <= 0) return 0;
    return Math.max(MIN_THUMB_SIZE, (vs / ss) * ts);
  });

  private readonly thumbOffsetPx = computed(() => {
    const maxScroll = this.scrollSize() - this.viewportSize();
    if (maxScroll <= 0) return 0;
    const maxOffset = this.trackSize() - this.thumbSizePx();
    return (this.scrollPos() / maxScroll) * maxOffset;
  });

  protected readonly thumbStyle = computed(() => {
    const size = this.thumbSizePx();
    const offset = this.thumbOffsetPx();
    if (this.isVertical()) {
      return `height:${size}px;transform:translateY(${offset}px)`;
    }
    return `width:${size}px;transform:translateX(${offset}px)`;
  });

  private dragStartPos = 0;
  private dragStartScroll = 0;

  constructor() {
    effect((onCleanup) => {
      const viewport = this.scrollArea.viewport();
      if (!viewport) return;

      const el = this.elementRef.nativeElement;
      const vertical = this.isVertical();

      const update = () => {
        if (vertical) {
          this.scrollPos.set(viewport.scrollTop);
          this.scrollSize.set(viewport.scrollHeight);
          this.viewportSize.set(viewport.clientHeight);
          this.trackSize.set(el.clientHeight);
        } else {
          this.scrollPos.set(viewport.scrollLeft);
          this.scrollSize.set(viewport.scrollWidth);
          this.viewportSize.set(viewport.clientWidth);
          this.trackSize.set(el.clientWidth);
        }
      };

      viewport.addEventListener('scroll', update, { passive: true });
      const ro = new ResizeObserver(update);
      ro.observe(viewport);
      ro.observe(el);
      if (viewport.firstElementChild) {
        ro.observe(viewport.firstElementChild);
      }
      requestAnimationFrame(update);

      onCleanup(() => {
        viewport.removeEventListener('scroll', update);
        ro.disconnect();
      });
    });
  }

  protected onTrackPointerDown(event: PointerEvent): void {
    const viewport = this.scrollArea.viewport();
    if (!viewport) return;

    const el = this.elementRef.nativeElement;
    const rect = el.getBoundingClientRect();
    const clickPos = this.isVertical()
      ? event.clientY - rect.top
      : event.clientX - rect.left;

    const thumbSize = this.thumbSizePx();
    const targetOffset = clickPos - thumbSize / 2;
    const maxOffset = this.trackSize() - thumbSize;
    if (maxOffset <= 0) return;

    const scrollRatio = Math.max(0, Math.min(1, targetOffset / maxOffset));
    const maxScroll = this.scrollSize() - this.viewportSize();

    if (this.isVertical()) {
      viewport.scrollTop = scrollRatio * maxScroll;
    } else {
      viewport.scrollLeft = scrollRatio * maxScroll;
    }
  }

  protected onThumbPointerDown(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const thumb = event.currentTarget as HTMLElement;
    thumb.setPointerCapture(event.pointerId);
    this.dragging.set(true);

    this.dragStartPos = this.isVertical() ? event.clientY : event.clientX;
    this.dragStartScroll = this.scrollPos();

    const onMove = (e: PointerEvent) => {
      const viewport = this.scrollArea.viewport();
      if (!viewport) return;

      const delta =
        (this.isVertical() ? e.clientY : e.clientX) - this.dragStartPos;
      const maxScroll = this.scrollSize() - this.viewportSize();
      const maxOffset = this.trackSize() - this.thumbSizePx();
      if (maxOffset <= 0) return;

      const scrollDelta = delta * (maxScroll / maxOffset);

      if (this.isVertical()) {
        viewport.scrollTop = this.dragStartScroll + scrollDelta;
      } else {
        viewport.scrollLeft = this.dragStartScroll + scrollDelta;
      }
    };

    const onUp = () => {
      this.dragging.set(false);
      thumb.releasePointerCapture(event.pointerId);
      thumb.removeEventListener('pointermove', onMove);
      thumb.removeEventListener('pointerup', onUp);
    };

    thumb.addEventListener('pointermove', onMove);
    thumb.addEventListener('pointerup', onUp);
  }

  protected readonly class = computed(() =>
    cn(
      'absolute touch-none select-none transition-opacity',
      this.isVertical()
        ? 'top-0 right-0 h-full w-2.5'
        : 'bottom-0 left-0 w-full h-2.5',
      this.dragging()
        ? '!opacity-100'
        : this.visible()
          ? 'opacity-0 group-hover:opacity-100'
          : 'opacity-0 pointer-events-none',
    ),
  );

  protected readonly thumbClass = computed(() =>
    cn(
      'rounded-full bg-border',
      this.isVertical() ? 'w-full' : 'h-full',
    ),
  );
}
