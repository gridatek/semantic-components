import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: 'input[scPdfViewerFindInput]',
  template: ``,
  host: {
    '[class]': 'class()',
    'aria-label': 'Find in document',
    placeholder: 'Find in document…',
    '(input)': 'onInput($event)',
    '(keydown.enter)': 'pdfViewer.findNext()',
    '(keydown.shift.enter)': 'onShiftEnter($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerFindInput {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn(
      'bg-background focus:ring-ring rounded border px-2 py-1 text-sm focus:ring-2 focus:outline-none',
      this.classInput(),
    ),
  );

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.pdfViewer.find(value);
  }

  protected onShiftEnter(event: Event): void {
    event.preventDefault();
    this.pdfViewer.findPrevious();
  }
}
