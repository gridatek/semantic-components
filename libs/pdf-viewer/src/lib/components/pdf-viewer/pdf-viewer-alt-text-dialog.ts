import {
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import {
  ScButton,
  ScDialog,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScFieldDescription,
  ScLabel,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
  ScTextarea,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Edits the alternative text of an image annotation (a stamp or a
 * signature): a description, or marked as decorative.
 */
@Component({
  selector: 'sc-pdf-viewer-alt-text-dialog',
  imports: [
    ScDialogProvider,
    ScDialogPortal,
    ScDialog,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogDescription,
    ScDialogFooter,
    ScRadioGroup,
    ScRadioField,
    ScRadio,
    ScLabel,
    ScFieldDescription,
    ScTextarea,
    ScButton,
  ],
  template: `
    <div scDialogProvider [open]="open()" (openChange)="onOpenChange($event)">
      <ng-template scDialogPortal>
        <div scDialog>
          <div scDialogHeader>
            <h2 scDialogTitle>Alternative text</h2>
            <p scDialogDescription>
              Alt text describes the image for people who can't see it.
            </p>
          </div>
          <form class="grid gap-4" (submit)="save($event)">
            <div scRadioGroup aria-label="Alternative text">
              <div scRadioField>
                <input
                  type="radio"
                  scRadio
                  name="sc-pdf-alt-text"
                  value="describe"
                  [checked]="!isDecorative()"
                  (change)="isDecorative.set(false)"
                />
                <label scLabel>Add a description</label>
                <p scFieldDescription>
                  One or two sentences about the subject, setting or action.
                </p>
              </div>
              <div scRadioField>
                <input
                  type="radio"
                  scRadio
                  name="sc-pdf-alt-text"
                  value="decorative"
                  [checked]="isDecorative()"
                  (change)="isDecorative.set(true)"
                />
                <label scLabel>Mark as decorative</label>
                <p scFieldDescription>
                  For ornaments like borders or watermarks.
                </p>
              </div>
            </div>
            @if (!isDecorative()) {
              <textarea
                scTextarea
                rows="3"
                aria-label="Description"
                placeholder="A young man sits down at a table to eat a meal"
                [value]="altText()"
                (input)="altText.set($any($event.target).value)"
              ></textarea>
            }
            <div scDialogFooter>
              <button scButton variant="outline" (click)="cancel()">
                Cancel
              </button>
              <button scButton type="submit">Save</button>
            </div>
          </form>
        </div>
      </ng-template>
    </div>
  `,
  host: {
    'data-slot': 'pdf-viewer-alt-text-dialog',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerAltTextDialog {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('contents', this.classInput()));

  readonly open = input(false);
  readonly annotationId = input<string | null>(null);
  readonly closed = output<void>();
  readonly saved = output<{
    annotationId: string;
    altText: string;
    isDecorative: boolean;
  }>();

  readonly altText = signal('');
  readonly isDecorative = signal(false);

  constructor() {
    // Start from the annotation's current alt text each time it opens.
    effect(() => {
      if (!this.open()) return;
      const id = this.annotationId();
      untracked(() => {
        const annotation = this.pdfViewer
          .editorAnnotations()
          .find((a) => a.id === id);
        this.altText.set(annotation?.altText ?? '');
        this.isDecorative.set(annotation?.isDecorative ?? false);
      });
    });
  }

  protected cancel(): void {
    this.closed.emit();
  }

  protected save(event: Event): void {
    event.preventDefault();
    const id = this.annotationId();
    if (!id) return;

    const altText = this.isDecorative() ? '' : this.altText().trim();
    const isDecorative = this.isDecorative();
    this.pdfViewer.updateEditorAnnotation(id, { altText, isDecorative });
    this.saved.emit({ annotationId: id, altText, isDecorative });
    this.closed.emit();
  }

  /** Dismissed with Escape or a click outside. */
  protected onOpenChange(open: boolean): void {
    if (!open && this.open()) this.closed.emit();
  }
}
