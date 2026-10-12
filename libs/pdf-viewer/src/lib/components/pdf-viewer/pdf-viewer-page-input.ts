import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { ScInput, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * The current page, editable: Enter or leaving the field goes there. A
 * number field — or, when the document has page labels ("iv", "A-1"), a
 * text field showing the label and accepting a label or a number. Use on a
 * `scInput` and give it an `aria-label`; write the page count next to it
 * (`viewer.totalPages()`, `viewer.pageLabels()`).
 */
@Directive({
  selector: 'input[scInput][scPdfViewerPageInput]',
  host: {
    'data-slot': 'pdf-viewer-page-input',
    '[type]': 'labelled() ? "text" : "number"',
    '[attr.inputmode]': 'labelled() ? null : "numeric"',
    '[attr.min]': 'labelled() ? null : 1',
    '[attr.max]': 'labelled() ? null : pdfViewer.totalPages()',
    '(input)': 'typing = true',
    '(change)': 'go($event)',
    '(keydown.enter)': 'go($event)',
    '(blur)': 'show()',
  },
})
export class ScPdfViewerPageInput {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  /** Typed in since the last Enter / leaving the field. */
  protected typing = false;

  protected readonly labelled = computed(() => !!this.pdfViewer.pageLabels());

  protected readonly class = computed(() =>
    cn(
      'w-14 text-center',
      this.labelled()
        ? 'w-20'
        : '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
      this.classInput(),
    ),
  );

  constructor() {
    // Into the input's own classes, so they merge with ours.
    bindInput(inject(ScInput).classInput, this.class);

    // The current page — not over what's being typed (pages pass by while
    // scrolling). Focused but untouched, it stays selected, so typing
    // replaces it.
    effect(() => {
      const label = this.pdfViewer.pageLabel(this.pdfViewer.currentPage());
      untracked(() => {
        if (this.typing) return;
        this.element.value = label;
        if (document.activeElement === this.element) this.element.select();
      });
    });

    // Ctrl+Alt+G moves focus here.
    effect(() => {
      if (!this.pdfViewer.pageFocusRequest()) return;
      untracked(() => {
        this.element.focus();
        this.element.select();
      });
    });
  }

  protected go(event: Event): void {
    const field = event.target as HTMLInputElement;
    const page = this.pdfViewer.pageForLabel(field.value);
    this.typing = false;
    if (page) this.pdfViewer.jumpToPage(page);
    // Normalise what was typed ("04" → "4", a number → its label).
    field.value = this.pdfViewer.pageLabel(
      page ?? this.pdfViewer.currentPage(),
    );
  }

  /** Leaving the field: back to the current page. */
  protected show(): void {
    this.typing = false;
    this.element.value = this.pdfViewer.pageLabel(this.pdfViewer.currentPage());
  }
}
