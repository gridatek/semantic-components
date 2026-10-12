import {
  Directive,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { ScDialogProvider, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/** The viewer's dialogs. */
export type ScPdfViewerDialogKind =
  'password' | 'print' | 'signature' | 'altText';

/**
 * Opens a `scDialogProvider` when the viewer needs that dialog, and tells the
 * viewer when it's closed (`scDialogClose`, Escape, a click outside):
 *
 * - `password` — a protected document; closing gives up on it;
 * - `print` — pages being prepared for print; closing cancels the print;
 * - `signature` — creating a signature (`viewer.openSignatureDialog()`);
 * - `altText` — an image annotation's alt text (`viewer.openAltText(id)`).
 *
 * Write the dialog and its content.
 */
@Directive({
  selector: '[scDialogProvider][scPdfViewerDialog]',
  host: {
    'data-slot': 'pdf-viewer-dialog',
    '[class]': 'class()',
  },
})
export class ScPdfViewerDialog {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly kind = input.required<ScPdfViewerDialogKind>({
    alias: 'scPdfViewerDialog',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  /** Whether the viewer wants the dialog open. */
  private readonly wanted = computed(() => {
    const viewer = this.pdfViewer;
    switch (this.kind()) {
      case 'password':
        return viewer.passwordRequired();
      case 'print':
        return viewer.printDialogOpen();
      case 'signature':
        return viewer.signatureDialogOpen();
      case 'altText':
        return viewer.altTextDialogOpen();
    }
  });

  constructor() {
    const provider = inject(ScDialogProvider);

    effect(() => {
      const open = this.wanted();
      untracked(() => {
        if (provider.open() !== open) provider.open.set(open);
      });
    });

    // Closed by the user while the viewer still wants it: dismiss.
    provider.open.subscribe((open) => {
      if (open || !untracked(this.wanted)) return;
      const viewer = this.pdfViewer;
      switch (untracked(this.kind)) {
        case 'password':
          viewer.cancelPassword();
          break;
        case 'print':
          viewer.cancelPrint();
          break;
        case 'signature':
          viewer.closeSignatureDialog();
          break;
        case 'altText':
          viewer.closeAltText();
          break;
      }
    });
  }
}
