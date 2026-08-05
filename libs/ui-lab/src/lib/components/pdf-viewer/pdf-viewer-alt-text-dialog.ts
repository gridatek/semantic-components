import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: 'sc-pdf-viewer-alt-text-dialog',
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-50" (click)="cancel()"></div>
      <dialog
        #dialogEl
        open
        class="fixed z-50 m-0 w-80 rounded-lg border border-gray-200 bg-white p-5 text-gray-900 shadow-xl"
        [style.left.px]="dialogX()"
        [style.top.px]="dialogY()"
        (click)="$event.stopPropagation()"
      >
        <h2 class="mb-1 text-base font-semibold">Choose an option</h2>
        <p class="mb-4 text-sm text-gray-500">
          Alt text (alternative text) helps when people can't see the image or
          when it doesn't load.
        </p>

        <div class="mb-3 flex flex-col gap-3">
          <div>
            <label class="flex items-center gap-2 text-sm font-medium">
              <input
                type="radio"
                name="altTextMode"
                [checked]="!isDecorative()"
                (change)="isDecorative.set(false)"
                class="accent-blue-600"
              />
              Add a description
            </label>
            <p class="ms-6 mt-1 text-xs text-gray-500">
              Aim for 1-2 sentences that describe the subject, setting, or
              actions.
            </p>
            @if (!isDecorative()) {
              <textarea
                class="ms-6 mt-2 w-[calc(100%-1.5rem)] resize-none rounded border border-gray-300 bg-white p-2 text-sm text-gray-900 outline-none focus:border-blue-500"
                rows="3"
                [placeholder]="'For example, “A young man sits down at a table to eat a meal”'"
                [value]="altText()"
                (input)="altText.set($any($event.target).value)"
              ></textarea>
            }
          </div>

          <div>
            <label class="flex items-center gap-2 text-sm font-medium">
              <input
                type="radio"
                name="altTextMode"
                [checked]="isDecorative()"
                (change)="isDecorative.set(true)"
                class="accent-blue-600"
              />
              Mark as decorative
            </label>
            <p class="ms-6 mt-1 text-xs text-gray-500">
              This is used for ornamental images, like borders or watermarks.
            </p>
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            (click)="cancel()"
          >
            Cancel
          </button>
          <button
            type="button"
            class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            (click)="save()"
          >
            Save
          </button>
        </div>
      </dialog>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerAltTextDialog {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  readonly open = input(false);
  readonly annotationId = input<string | null>(null);
  readonly closed = output<void>();
  readonly saved = output<{
    annotationId: string;
    altText: string;
    isDecorative: boolean;
  }>();

  private readonly dialogEl =
    viewChild<ElementRef<HTMLDialogElement>>('dialogEl');

  readonly altText = signal('');
  readonly isDecorative = signal(false);
  readonly dialogX = signal(0);
  readonly dialogY = signal(0);

  constructor() {
    effect(() => {
      if (!this.open()) return;

      const id = this.annotationId();
      if (!id) return;

      // Load existing alt text from annotation
      const ann = this.pdfViewer.editorAnnotations().find((a) => a.id === id);
      if (ann) {
        this.altText.set(ann.altText || '');
        this.isDecorative.set(ann.isDecorative || false);
      }

      // Position next to the stamp wrapper
      setTimeout(() => {
        const wrapper = document.querySelector(
          `[data-annotation-id="${id}"]`,
        ) as HTMLElement;
        if (!wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        const dialogWidth = 320;
        const dialogHeight = 380;

        let x = rect.right + 8;
        let y = rect.top;

        // If dialog would go off-screen right, position to the left
        if (x + dialogWidth > window.innerWidth) {
          x = rect.left - dialogWidth - 8;
        }
        // If still off-screen, center horizontally
        if (x < 0) {
          x = Math.max(8, (window.innerWidth - dialogWidth) / 2);
        }
        // Keep within vertical bounds
        if (y + dialogHeight > window.innerHeight) {
          y = Math.max(8, window.innerHeight - dialogHeight - 8);
        }

        this.dialogX.set(x);
        this.dialogY.set(y);
      });
    });
  }

  cancel(): void {
    this.altText.set('');
    this.isDecorative.set(false);
    this.closed.emit();
  }

  save(): void {
    const id = this.annotationId();
    if (!id) return;

    const text = this.isDecorative() ? '' : this.altText();

    this.pdfViewer.updateEditorAnnotation(id, {
      altText: text,
      isDecorative: this.isDecorative(),
    });

    this.saved.emit({
      annotationId: id,
      altText: text,
      isDecorative: this.isDecorative(),
    });

    this.altText.set('');
    this.isDecorative.set(false);
    this.closed.emit();
  }
}
