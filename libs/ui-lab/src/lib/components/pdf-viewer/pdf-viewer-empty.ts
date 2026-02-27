import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiFileTextIcon } from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: '[scPdfViewerEmpty]',
  imports: [SiFileTextIcon],
  template: `
    @if (!pdfViewer.hasSource()) {
      <div [class]="overlayClass()">
        <ng-content>
          <div class="flex flex-col items-center gap-3 px-4 text-center">
            <div
              class="bg-muted flex h-16 w-16 items-center justify-center rounded-full"
            >
              <svg siFileTextIcon class="text-muted-foreground size-8"></svg>
            </div>
            <p class="text-muted-foreground text-sm">No PDF selected</p>
          </div>
        </ng-content>
      </div>
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-empty',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerEmpty {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly overlayClass = computed(() =>
    cn('absolute inset-0 flex items-center justify-center', this.classInput()),
  );
}
