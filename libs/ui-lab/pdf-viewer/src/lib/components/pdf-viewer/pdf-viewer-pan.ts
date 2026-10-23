import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Moving around the pages with the pointer, on the canvas's scroll
 * container: the hand tool drags them; Ctrl/⌘ + wheel (and trackpad pinch,
 * which arrives as one) zooms around the pointer, 10% per wheel notch as in
 * pdf.js; two fingers pinch on touch; in page scroll mode a plain wheel at
 * the edge turns the page. In presentation mode a click / swipe turns the
 * page, and the cursor hides when still. Part of the canvas.
 */
@Directive({
  selector: '[scPdfViewerPan]',
  host: {
    '[class]': 'class()',
    '[attr.data-hand]': 'handTool() || null',
    '[attr.data-panning]': 'panning() || null',
    '[attr.data-idle]': 'cursorIdle() || null',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp($event)',
    '(pointercancel)': 'onPointerUp($event)',
  },
})
export class ScPdfViewerPan {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly container =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn(this.classInput()));

  /** The hand tool drags the pages (not while an annotation tool is on). */
  protected readonly handTool = computed(
    () =>
      this.pdfViewer.cursorTool() === 'hand' &&
      this.pdfViewer.editorMode() === 'none',
  );
  protected readonly panning = signal(false);
  private panStart: {
    x: number;
    y: number;
    left: number;
    top: number;
  } | null = null;
  private pinch: { distance: number } | null = null;

  /** Presentation mode: the cursor hides after a few seconds still. */
  protected readonly cursorIdle = signal(false);
  private idleTimer: ReturnType<typeof setTimeout> | null = null;
  /** Presentation mode: where a click / swipe started. */
  private presentationPointer: { x: number; y: number } | null = null;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => this.setupGestures(destroyRef));

    // Presentation mode: start the idle-cursor timer; show the cursor after.
    effect(() => {
      const presenting = this.pdfViewer.presenting();
      untracked(() => {
        if (this.idleTimer) clearTimeout(this.idleTimer);
        this.idleTimer = null;
        this.cursorIdle.set(false);
        if (presenting) this.onPresentationPointerMove();
      });
    });
    destroyRef.onDestroy(() => {
      if (this.idleTimer) clearTimeout(this.idleTimer);
    });
  }

  private setupGestures(destroyRef: DestroyRef): void {
    const container = this.container;

    // In page scroll mode, wheeling past the top / bottom edge turns the page.
    let lastTurn = 0;
    const turnPage = (event: WheelEvent): void => {
      if (this.pdfViewer.scrollMode() !== 'page' || !event.deltaY) return;
      const down = event.deltaY > 0;
      const atEdge = down
        ? container.scrollTop + container.clientHeight >=
          container.scrollHeight - 1
        : container.scrollTop <= 0;
      if (!atEdge) return;
      event.preventDefault();
      if (event.timeStamp - lastTurn < 400) return;
      lastTurn = event.timeStamp;
      if (down) this.pdfViewer.goToNextPage();
      else this.pdfViewer.goToPrevPage();
    };

    const onWheel = (event: WheelEvent): void => {
      if (!event.ctrlKey && !event.metaKey) {
        turnPage(event);
        return;
      }
      event.preventDefault();
      // The page stays fitted in presentation mode.
      if (this.pdfViewer.presenting()) return;
      const pixels =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? event.deltaY * 33
          : event.deltaY;
      this.zoomAround(
        Math.pow(1.1, -pixels / 100),
        event.clientX,
        event.clientY,
      );
    };

    const distance = (touches: TouchList): number =>
      Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY,
      );
    const onTouchStart = (event: TouchEvent): void => {
      if (event.touches.length === 2) {
        this.pinch = { distance: distance(event.touches) };
      }
    };
    const onTouchMove = (event: TouchEvent): void => {
      if (!this.pinch || event.touches.length !== 2) return;
      event.preventDefault();
      const now = distance(event.touches);
      const midX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
      const midY = (event.touches[0].clientY + event.touches[1].clientY) / 2;
      this.zoomAround(now / this.pinch.distance, midX, midY);
      this.pinch.distance = now;
    };
    const onTouchEnd = (event: TouchEvent): void => {
      if (event.touches.length < 2) this.pinch = null;
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd);
    destroyRef.onDestroy(() => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    });
  }

  /** Zooms by `factor`, keeping the point under (clientX, clientY) in place. */
  private zoomAround(factor: number, clientX: number, clientY: number): void {
    const container = this.container;
    if (factor === 1) return;
    const before = this.pdfViewer.currentScale();
    this.pdfViewer.zoomBy(factor);
    // zoomBy sets a number: the new scale.
    const after = this.pdfViewer.zoom();
    const ratio = typeof after === 'number' ? after / before : 1;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const contentX = container.scrollLeft + x;
    const contentY = container.scrollTop + y;
    // Once the pages are laid out at the new scale.
    requestAnimationFrame(() => {
      container.scrollLeft = contentX * ratio - x;
      container.scrollTop = contentY * ratio - y;
    });
  }

  private onPresentationPointerMove(): void {
    this.cursorIdle.set(false);
    if (this.idleTimer) clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => this.cursorIdle.set(true), 3000);
  }

  /**
   * Presentation mode: a click turns to the next page (Shift+click the
   * previous), a horizontal swipe either way — not on links or form fields.
   */
  private onPresentationPointerUp(event: PointerEvent): void {
    const start = this.presentationPointer;
    this.presentationPointer = null;
    if (!start || event.type === 'pointercancel') return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (event.pointerType === 'touch') {
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) this.pdfViewer.goToNextPage();
        else this.pdfViewer.goToPrevPage();
      }
      return;
    }
    if (Math.hypot(dx, dy) > 5) return;
    if (event.shiftKey) this.pdfViewer.goToPrevPage();
    else this.pdfViewer.goToNextPage();
  }

  protected onPointerDown(event: PointerEvent): void {
    if (this.pdfViewer.presenting()) {
      const target = event.target as HTMLElement;
      const interactive = target.closest(
        'a, button, input, select, textarea, [contenteditable]',
      );
      this.presentationPointer =
        event.button === 0 && !interactive
          ? { x: event.clientX, y: event.clientY }
          : null;
      return;
    }
    if (!this.handTool() || event.button !== 0) return;
    this.panStart = {
      x: event.clientX,
      y: event.clientY,
      left: this.container.scrollLeft,
      top: this.container.scrollTop,
    };
    this.panning.set(true);
    this.container.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  protected onPointerMove(event: PointerEvent): void {
    if (this.pdfViewer.presenting()) {
      this.onPresentationPointerMove();
      return;
    }
    if (!this.panStart) return;
    this.container.scrollLeft =
      this.panStart.left - (event.clientX - this.panStart.x);
    this.container.scrollTop =
      this.panStart.top - (event.clientY - this.panStart.y);
  }

  protected onPointerUp(event: PointerEvent): void {
    if (this.pdfViewer.presenting()) {
      this.onPresentationPointerUp(event);
      return;
    }
    if (!this.panStart) return;
    this.panStart = null;
    this.panning.set(false);
    this.container.releasePointerCapture(event.pointerId);
  }
}
