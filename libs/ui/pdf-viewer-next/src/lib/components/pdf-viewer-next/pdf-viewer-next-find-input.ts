import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * Searches the document as you type; Enter goes to the next match,
 * Shift+Enter to the previous one. Use on an `input[scInput]` and give it an
 * `aria-label` (and a placeholder). Marked `aria-invalid` when nothing
 * matches.
 */
@Directive({
  selector: 'input[scPdfViewerNextFindInput]',
  host: {
    type: 'search',
    '[class]': 'class()',
    // Shows a search started elsewhere (the `search` open parameter).
    '[value]': 'pdfViewer.findQuery()',
    '[attr.aria-invalid]': 'pdfViewer.findState() === "not-found" || null',
    '(input)': 'onInput($event)',
    '(keydown.enter)': 'onEnter($event)',
    '(keydown.shift.enter)': 'onShiftEnter($event)',
  },
})
export class ScPdfViewerNextFindInput {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

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

  private onInput(event: Event): void {
    this.pdfViewer.find((event.target as HTMLInputElement).value);
  }

  private onEnter(event: Event): void {
    if ((event as KeyboardEvent).shiftKey) return;
    event.preventDefault();
    this.pdfViewer.findNext();
  }

  private onShiftEnter(event: Event): void {
    event.preventDefault();
    this.pdfViewer.findPrevious();
  }
}
