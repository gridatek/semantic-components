import { Menu } from '@angular/aria/menu';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfViewerCommand } from './pdf-viewer-types';

/**
 * Runs the viewer's commands from a menu (on a `scMenu`): each item's
 * `value` is a command — `open`, `download`, `print`, `presentation`,
 * `fullscreen`, `first-page`, `last-page`, `rotate-right`, `rotate-left`,
 * `properties` (the Document properties dialog). Write the items and their
 * text.
 */
@Directive({
  selector: '[scMenu][scPdfViewerMenu]',
  host: {
    'data-slot': 'pdf-viewer-menu',
    '[class]': 'class()',
  },
})
export class ScPdfViewerMenu {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() => cn(this.classInput()));

  constructor() {
    inject(Menu, { self: true }).itemSelected.subscribe((value) =>
      this.run(value as ScPdfViewerCommand | undefined),
    );
  }

  private run(command: ScPdfViewerCommand | undefined): void {
    const viewer = this.pdfViewer;
    switch (command) {
      case 'open':
        viewer.openFile();
        break;
      case 'download':
        viewer.download();
        break;
      case 'print':
        viewer.printWithProgress();
        break;
      case 'presentation':
        viewer.togglePresentation();
        break;
      case 'fullscreen':
        viewer.toggleFullscreen();
        break;
      case 'first-page':
        viewer.goToPage(1);
        break;
      case 'last-page':
        viewer.goToPage(viewer.totalPages());
        break;
      case 'rotate-right':
        viewer.rotateRight();
        break;
      case 'rotate-left':
        viewer.rotateLeft();
        break;
      case 'properties':
        viewer.openProperties();
        break;
    }
  }
}
