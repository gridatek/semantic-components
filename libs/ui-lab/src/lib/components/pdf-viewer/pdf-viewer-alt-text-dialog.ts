import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: 'sc-pdf-viewer-alt-text-dialog',
  template: `
    @if (open()) {
      <div
        class="absolute inset-0 z-50 flex items-center justify-center bg-black/50"
        (click)="cancel()"
      >
        <dialog
          open
          class="relative w-96 rounded border border-[#333] bg-[#474747] p-5 text-[#d1d5db] shadow-lg"
          (click)="$event.stopPropagation()"
        >
          <h2 class="mb-4 text-base font-semibold text-white">Alt Text</h2>

          <div class="mb-3 flex flex-col gap-2">
            <label class="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="altTextMode"
                [checked]="!isDecorative()"
                (change)="isDecorative.set(false)"
                class="accent-[#6b9edd]"
              />
              Add description
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="altTextMode"
                [checked]="isDecorative()"
                (change)="isDecorative.set(true)"
                class="accent-[#6b9edd]"
              />
              Mark as decorative
            </label>
          </div>

          @if (!isDecorative()) {
            <textarea
              class="mb-4 w-full resize-none rounded border border-[#5a5a5a] bg-[#3d3d3d] p-2 text-sm text-[#d1d5db] outline-none focus:border-[#6b9edd]"
              rows="3"
              placeholder="Describe the content of this annotation..."
              [value]="altText()"
              (input)="altText.set($any($event.target).value)"
            ></textarea>
          } @else {
            <p class="mb-4 text-xs text-[#999]">
              Decorative elements are ignored by screen readers.
            </p>
          }

          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="rounded border border-[#666] bg-[#5a5a5a] px-4 py-1.5 text-sm text-[#d1d5db] hover:bg-[#666] hover:text-white"
              (click)="cancel()"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded bg-[#6b9edd] px-4 py-1.5 text-sm text-white hover:bg-[#5a8ecc]"
              (click)="save()"
            >
              Save
            </button>
          </div>
        </dialog>
      </div>
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-alt-text-dialog',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  readonly altText = signal('');
  readonly isDecorative = signal(false);

  cancel(): void {
    this.altText.set('');
    this.isDecorative.set(false);
    this.closed.emit();
  }

  save(): void {
    const id = this.annotationId();
    if (!id) return;

    const text = this.isDecorative() ? '' : this.altText();

    // Update the annotation's alt text
    this.pdfViewer.editorAnnotations.update((list) =>
      list.map((a) =>
        a.id === id
          ? { ...a, altText: text, isDecorative: this.isDecorative() }
          : a,
      ),
    );

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
