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
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Shown while there's no document (`src` empty). Project an icon in a
 * `scEmptyMedia` and actions (e.g. an "Open file" button) as other content.
 */
@Component({
  selector: '[scPdfViewerEmpty]',
  imports: [
    ScEmpty,
    ScEmptyHeader,
    ScEmptyTitle,
    ScEmptyDescription,
    ScEmptyBody,
  ],
  template: `
    @if (!pdfViewer.hasSource()) {
      <div scEmpty class="absolute inset-0">
        <div scEmptyHeader>
          <ng-content select="[scEmptyMedia]" />
          <div scEmptyTitle>{{ heading() }}</div>
          @if (description()) {
            <div scEmptyDescription>{{ description() }}</div>
          }
        </div>
        <div scEmptyBody>
          <ng-content />
        </div>
      </div>
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-empty',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerEmpty {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly heading = input('No document');
  readonly description = input('');

  protected readonly class = computed(() => cn('contents', this.classInput()));
}
