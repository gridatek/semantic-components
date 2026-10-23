import {
  DOCUMENT,
  DestroyRef,
  Directive,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

const MIN_WIDTH = 150;
const MAX_WIDTH = 500;

/**
 * Resizes the sidebar (`viewer.sidebarWidth()`): drag it, or ←/→ (Shift for
 * bigger steps). A focusable `role="separator"`; give it an `aria-label`.
 */
@Directive({
  selector: '[scPdfViewerSidebarResizer]',
  host: {
    'data-slot': 'pdf-viewer-sidebar-resizer',
    role: 'separator',
    tabindex: '0',
    'aria-orientation': 'vertical',
    '[attr.aria-valuenow]': 'pdfViewer.sidebarWidth()',
    '[attr.aria-valuemin]': 'minWidth',
    '[attr.aria-valuemax]': 'maxWidth',
    '[attr.data-resizing]': 'resizing() || null',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class ScPdfViewerSidebarResizer {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn(
      'hover:bg-primary/20 data-resizing:bg-primary/20 focus-visible:ring-ring/50 flex w-1.5 shrink-0 cursor-col-resize touch-none items-center justify-center outline-none focus-visible:ring-3',
      // The grip.
      'after:bg-border after:h-8 after:w-px',
      this.classInput(),
    ),
  );

  protected readonly minWidth = MIN_WIDTH;
  protected readonly maxWidth = MAX_WIDTH;
  protected readonly resizing = signal(false);
  private startX = 0;
  private startWidth = 0;

  private readonly onPointerMove = (event: PointerEvent): void => {
    const width = this.startWidth + event.clientX - this.startX;
    this.pdfViewer.sidebarWidth.set(
      Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, width)),
    );
  };

  private readonly onPointerUp = (): void => {
    this.resizing.set(false);
    this.document.removeEventListener('pointermove', this.onPointerMove);
    this.document.removeEventListener('pointerup', this.onPointerUp);
  };

  constructor() {
    inject(DestroyRef).onDestroy(this.onPointerUp);
  }

  protected onPointerDown(event: PointerEvent): void {
    event.preventDefault();
    this.resizing.set(true);
    this.startX = event.clientX;
    this.startWidth = this.pdfViewer.sidebarWidth();
    this.document.addEventListener('pointermove', this.onPointerMove);
    this.document.addEventListener('pointerup', this.onPointerUp);
  }

  protected onKeyDown(event: KeyboardEvent): void {
    const step = event.shiftKey ? 20 : 5;
    const width = this.pdfViewer.sidebarWidth();
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.pdfViewer.sidebarWidth.set(Math.max(MIN_WIDTH, width - step));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.pdfViewer.sidebarWidth.set(Math.min(MAX_WIDTH, width + step));
    }
  }
}
