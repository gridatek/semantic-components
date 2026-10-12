import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ScButton, ScInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfSignatureData } from './pdf-viewer-types';

/**
 * The saved signatures: click one to place it on the current page, edit its
 * description or remove it; or add a new one (opens the signature dialog).
 * Put it in a popover on the signature button, as pdf.js does.
 */
@Component({
  selector: 'sc-pdf-viewer-signature-list',
  imports: [ScButton, ScInput],
  template: `
    @if (pdfViewer.savedSignatures().length > 0) {
      <ul class="grid gap-2" aria-label="Saved signatures">
        @for (signature of pdfViewer.savedSignatures(); track signature.id) {
          <li class="grid gap-1">
            @if (editingId() === signature.id) {
              <form
                class="flex gap-1"
                (submit)="saveDescription($event, signature)"
              >
                <input
                  scInput
                  class="h-8"
                  aria-label="Description"
                  [value]="draft()"
                  (input)="draft.set($any($event.target).value)"
                />
                <button scButton size="sm" type="submit">Save</button>
              </form>
            } @else {
              <button
                scButton
                variant="outline"
                class="h-16 w-full bg-white p-1 hover:bg-white dark:bg-white"
                [attr.aria-label]="'Place ' + label(signature)"
                (click)="place(signature)"
              >
                <img
                  [src]="signature.dataUrl"
                  alt=""
                  class="max-h-full max-w-full object-contain"
                />
              </button>
              <div class="flex items-center justify-between gap-1">
                <span class="text-muted-foreground truncate text-xs">
                  {{ signature.description || 'No description' }}
                </span>
                <div class="flex shrink-0">
                  <button
                    scButton
                    variant="ghost"
                    size="xs"
                    [attr.aria-label]="
                      'Edit description of ' + label(signature)
                    "
                    (click)="startEdit(signature)"
                  >
                    Edit
                  </button>
                  <button
                    scButton
                    variant="ghost"
                    size="xs"
                    class="text-destructive"
                    [attr.aria-label]="'Remove ' + label(signature)"
                    (click)="pdfViewer.removeSavedSignature(signature.id)"
                  >
                    Remove
                  </button>
                </div>
              </div>
            }
          </li>
        }
      </ul>
    } @else {
      <p class="text-muted-foreground text-sm">No saved signatures yet.</p>
    }
    <button scButton class="w-full" (click)="addNew()">
      Add new signature
    </button>
  `,
  host: {
    'data-slot': 'pdf-viewer-signature-list',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerSignatureList {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('flex w-60 flex-col gap-3', this.classInput()),
  );

  /** A signature was placed, or the dialog opened to add one — e.g. close the popover. */
  readonly done = output<void>();

  protected readonly editingId = signal<string | null>(null);
  protected readonly draft = signal('');

  protected label(signature: ScPdfSignatureData): string {
    return signature.description
      ? `signature “${signature.description}”`
      : 'signature';
  }

  protected place(signature: ScPdfSignatureData): void {
    this.pdfViewer.placeSignature(signature.dataUrl, signature.description);
    this.done.emit();
  }

  protected addNew(): void {
    this.pdfViewer.openSignatureDialog();
    this.done.emit();
  }

  protected startEdit(signature: ScPdfSignatureData): void {
    this.editingId.set(signature.id);
    this.draft.set(signature.description);
  }

  protected saveDescription(event: Event, signature: ScPdfSignatureData): void {
    event.preventDefault();
    this.pdfViewer.updateSavedSignature(signature.id, this.draft().trim());
    this.editingId.set(null);
  }
}
