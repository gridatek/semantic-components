import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: 'sc-pdf-viewer-sidebar-resizer',
  template: `
    <div
      class="flex w-1.5 cursor-col-resize items-center justify-center hover:bg-[#6b9edd]/30"
      [class.bg-[#6b9edd]/30]="resizing()"
      role="separator"
      tabindex="0"
      [attr.aria-valuenow]="pdfViewer.sidebarWidth()"
      aria-valuemin="150"
      aria-valuemax="500"
      aria-label="Resize sidebar"
      (pointerdown)="onPointerDown($event)"
      (keydown)="onKeyDown($event)"
    >
      <div class="h-8 w-px bg-[#666]"></div>
    </div>
  `,
  host: {
    'data-slot': 'pdf-viewer-sidebar-resizer',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerSidebarResizer {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  readonly resizing = signal(false);
  private startX = 0;
  private startWidth = 0;

  private onPointerMove = (e: PointerEvent): void => {
    const delta = e.clientX - this.startX;
    const newWidth = Math.max(150, Math.min(500, this.startWidth + delta));
    this.pdfViewer.sidebarWidth.set(newWidth);
  };

  private onPointerUp = (e: PointerEvent): void => {
    this.resizing.set(false);
    (e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId);
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
  };

  onPointerDown(event: PointerEvent): void {
    event.preventDefault();
    this.resizing.set(true);
    this.startX = event.clientX;
    this.startWidth = this.pdfViewer.sidebarWidth();

    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onKeyDown(event: KeyboardEvent): void {
    const step = event.shiftKey ? 20 : 5;
    const current = this.pdfViewer.sidebarWidth();

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.pdfViewer.sidebarWidth.set(Math.max(150, current - step));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.pdfViewer.sidebarWidth.set(Math.min(500, current + step));
    }
  }
}
