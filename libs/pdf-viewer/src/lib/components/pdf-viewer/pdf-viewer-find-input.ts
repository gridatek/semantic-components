import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Searches the document as you type; Enter goes to the next match,
 * Shift+Enter to the previous one. Use on an `input[scInput]`. Marked
 * `aria-invalid` when nothing matches.
 */
@Directive({
  selector: 'input[scPdfViewerFindInput]',
  host: {
    type: 'search',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.placeholder]': 'placeholder()',
    // Shows a search started elsewhere (the `search` open parameter).
    '[value]': 'pdfViewer.findQuery()',
    '[attr.aria-invalid]': 'pdfViewer.findState() === "not-found" || null',
    '(input)': 'onInput($event)',
    '(keydown.enter)': 'onEnter($event)',
    '(keydown.shift.enter)': 'onShiftEnter($event)',
  },
})
export class ScPdfViewerFindInput {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  /** Accessible name. */
  readonly ariaLabel = input('Find in document', { alias: 'aria-label' });
  readonly placeholder = input('Find in document…');

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    // Opening the find bar (or Ctrl+F) puts the cursor here.
    const element =
      inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
    effect(() => {
      if (!this.pdfViewer.findFocusRequest()) return;
      untracked(() =>
        requestAnimationFrame(() => {
          element.focus();
          element.select();
        }),
      );
    });
  }

  protected onInput(event: Event): void {
    this.pdfViewer.find((event.target as HTMLInputElement).value);
  }

  protected onEnter(event: Event): void {
    if ((event as KeyboardEvent).shiftKey) return;
    event.preventDefault();
    this.pdfViewer.findNext();
  }

  protected onShiftEnter(event: Event): void {
    event.preventDefault();
    this.pdfViewer.findPrevious();
  }
}
