import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyTitle,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

/**
 * Covers the content when the document can't be loaded, announced as an
 * alert. Project an icon in a `scEmptyMedia` and actions (a
 * `scPdfViewerRetry` button) as other content.
 */
@Component({
  selector: '[scPdfViewerError]',
  imports: [
    ScEmpty,
    ScEmptyHeader,
    ScEmptyTitle,
    ScEmptyDescription,
    ScEmptyBody,
  ],
  template: `
    @if (pdfViewer.error(); as error) {
      <div scEmpty role="alert" class="bg-background absolute inset-0 z-10">
        <div scEmptyHeader>
          <ng-content select="[scEmptyMedia]" />
          <div scEmptyTitle>{{ heading() }}</div>
          <div scEmptyDescription>{{ error }}</div>
        </div>
        <div scEmptyBody>
          <ng-content />
        </div>
      </div>
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-error',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerError {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly heading = input("Couldn't load the document");

  protected readonly class = computed(() => cn('contents', this.classInput()));
}
