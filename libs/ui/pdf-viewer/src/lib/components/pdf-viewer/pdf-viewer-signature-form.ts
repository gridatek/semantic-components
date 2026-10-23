import {
  DOCUMENT,
  Directive,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/** How a signature is made. */
export type ScPdfSignatureMode = 'type' | 'draw' | 'image';

/** A drawn stroke, in the pad's pixels. */
export interface ScPdfSignatureStroke {
  points: { x: number; y: number }[];
  width: number;
}

/** Signatures are typed and drawn in black, like ink on paper. */
export const SC_PDF_SIGNATURE_INK = '#000000';
/** The font typed signatures are written in. */
export const SC_PDF_SIGNATURE_FONT =
  '"Brush Script MT", "Segoe Script", cursive, serif';

/**
 * Creates a signature — typed, drawn or from an image — in the `signature`
 * dialog (`#signature="scPdfViewerSignatureForm"`, e.g. on its `scDialog`).
 * Bind `signature.mode()` to tabs (`signature.setMode($event)`), and put
 * `scPdfViewerSignatureName`, `scPdfViewerSignaturePad` (with a slider on
 * `signature.thickness`), `scPdfViewerSignatureImage`,
 * `scPdfViewerSignatureDescription`, a checkbox on `signature.saveForReuse`,
 * `scPdfViewerSignatureClear` and `scPdfViewerSignatureAdd` in it. The draft
 * lasts while the dialog is open.
 */
@Directive({
  selector: '[scPdfViewerSignatureForm]',
  exportAs: 'scPdfViewerSignatureForm',
  host: {
    'data-slot': 'pdf-viewer-signature-form',
    '[class]': 'class()',
  },
})
export class ScPdfViewerSignatureForm {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn(this.classInput()));

  readonly mode = signal<ScPdfSignatureMode>('type');
  /** The typed name. */
  readonly name = signal('');
  /** The drawn strokes. */
  readonly strokes = signal<readonly ScPdfSignatureStroke[]>([]);
  /** The thickness of new strokes, in pixels. */
  readonly thickness = signal(2);
  /** The chosen image, as a data URL. */
  readonly image = signal<string | null>(null);
  readonly description = signal('');
  /** Keep it in `viewer.savedSignatures()` too. */
  readonly saveForReuse = signal(true);

  /** The drawing as an image, set by the pad. */
  drawing: (() => string) | null = null;

  /** Whether the current mode has something to add. */
  readonly canAdd = computed(() => {
    switch (this.mode()) {
      case 'type':
        return this.name().trim().length > 0;
      case 'draw':
        return this.strokes().length > 0;
      case 'image':
        return !!this.image();
    }
  });

  /** From tabs' `selectedTabChange`. */
  setMode(mode: unknown): void {
    if (mode === 'type' || mode === 'draw' || mode === 'image') {
      this.mode.set(mode);
    }
  }

  /** Clears what the current mode has. */
  clear(): void {
    switch (this.mode()) {
      case 'type':
        this.name.set('');
        break;
      case 'draw':
        this.strokes.set([]);
        break;
      case 'image':
        this.image.set(null);
        break;
    }
  }

  /** Places the signature on the current page (and saves it), closing the dialog. */
  add(): void {
    if (!this.canAdd()) return;
    const mode = this.mode();
    const dataUrl =
      mode === 'type'
        ? this.renderName()
        : mode === 'draw'
          ? (this.drawing?.() ?? '')
          : (this.image() ?? '');
    if (!dataUrl) return;

    const description = this.description().trim();
    if (this.saveForReuse()) {
      this.pdfViewer.addSavedSignature({
        dataUrl,
        description,
        width: 200,
        height: 80,
      });
    }
    this.pdfViewer.placeSignature(dataUrl, description);
    this.pdfViewer.closeSignatureDialog();
  }

  private renderName(): string {
    const canvas = this.document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 120;
    const context = canvas.getContext('2d');
    if (!context) return '';
    context.fillStyle = SC_PDF_SIGNATURE_INK;
    context.font = `italic 44px ${SC_PDF_SIGNATURE_FONT}`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(this.name(), canvas.width / 2, canvas.height / 2);
    return canvas.toDataURL('image/png');
  }
}
