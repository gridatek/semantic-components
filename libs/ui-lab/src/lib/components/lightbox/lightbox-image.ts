import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScLightbox } from './lightbox';

/** How far a swipe goes before it counts, in pixels. */
const SWIPE = 60;

/**
 * The current image, fitted: its `src` is the item's; write its `alt` (the
 * thumbnail's: `lightbox.current()?.alt`). Zoom with the wheel, a
 * double-click or a pinch; drag to pan, zoomed; swipe sideways to change,
 * down to close.
 */
@Directive({
  selector: 'img[scLightboxImage]',
  host: {
    'data-slot': 'lightbox-image',
    draggable: 'false',
    '[src]': 'lightbox.current()?.src ?? ""',
    '[attr.data-loading]': 'lightbox.loading() || null',
    '[attr.data-zoomed]': 'lightbox.zoom() > 1 || null',
    '[style.transform]': 'transform()',
    '[class]': 'class()',
    '(load)': 'lightbox.loading.set(false)',
    '(error)': 'lightbox.loading.set(false)',
    '(wheel)': 'onWheel($event)',
    '(dblclick)': 'onDoubleClick($event)',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp($event)',
    '(pointercancel)': 'onPointerUp($event)',
  },
})
export class ScLightboxImage {
  protected readonly lightbox = inject(ScLightbox);
  private readonly element =
    inject<ElementRef<HTMLImageElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly transform = computed(() => {
    const { x, y } = this.lightbox.pan();
    return `translate(${x}px, ${y}px) scale(${this.lightbox.zoom()})`;
  });

  protected readonly class = computed(() =>
    cn(
      'max-h-full max-w-full touch-none object-contain select-none',
      'transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none',
      'data-loading:opacity-50 data-zoomed:cursor-grab data-zoomed:active:cursor-grabbing',
      this.classInput(),
    ),
  );

  /** The pointers down, where they are. */
  private readonly pointers = new Map<number, { x: number; y: number }>();
  private start: {
    x: number;
    y: number;
    pan: { x: number; y: number };
    zoom: number;
    spread: number;
  } | null = null;

  constructor() {
    this.lightbox.ɵimage.set(this.element);
  }

  protected onWheel(event: WheelEvent): void {
    event.preventDefault();
    this.lightbox.zoomBy(Math.exp(-event.deltaY * 0.002), this.at(event));
  }

  protected onDoubleClick(event: MouseEvent): void {
    if (this.lightbox.zoom() > 1) this.lightbox.resetZoom();
    else this.lightbox.zoomTo(2.5, this.at(event));
  }

  protected onPointerDown(event: PointerEvent): void {
    this.element.setPointerCapture(event.pointerId);
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    this.begin();
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.pointers.has(event.pointerId) || !this.start) return;
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const [a, b] = [...this.pointers.values()];
    const start = this.start;
    if (b) {
      // A pinch: zoomed by the fingers' spread, about their middle.
      this.lightbox.zoomTo(start.zoom * (spread(a, b) / start.spread));
    } else if (this.lightbox.zoom() > 1) {
      this.lightbox.panTo({
        x: start.pan.x + a.x - start.x,
        y: start.pan.y + a.y - start.y,
      });
    }
  }

  protected onPointerUp(event: PointerEvent): void {
    const last = this.pointers.get(event.pointerId);
    this.pointers.delete(event.pointerId);
    const start = this.start;
    if (this.pointers.size) {
      this.begin();
      return;
    }
    this.start = null;
    if (!last || !start || start.zoom > 1 || start.spread) return;
    // Unzoomed, one finger: a swipe.
    const dx = last.x - start.x;
    const dy = last.y - start.y;
    if (Math.abs(dx) > SWIPE && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) this.lightbox.next();
      else this.lightbox.previous();
    } else if (dy > SWIPE && dy > Math.abs(dx)) {
      this.lightbox.close();
    }
  }

  /** A gesture starts (again): from where the pointers are now. */
  private begin(): void {
    const [a, b] = [...this.pointers.values()];
    if (!a) return;
    this.start = {
      x: a.x,
      y: a.y,
      pan: this.lightbox.pan(),
      zoom: this.lightbox.zoom(),
      spread: b ? spread(a, b) : 0,
    };
  }

  /** A point from the image's centre, unscaled. */
  private at(event: MouseEvent): { x: number; y: number } {
    const rect = this.element.getBoundingClientRect();
    return {
      x: event.clientX - (rect.left + rect.width / 2),
      y: event.clientY - (rect.top + rect.height / 2),
    };
  }
}

const spread = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(a.x - b.x, a.y - b.y) || 1;
