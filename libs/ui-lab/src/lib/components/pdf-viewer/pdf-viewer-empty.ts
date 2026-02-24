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
          <div class="flex flex-col items-center gap-3 text-center px-4">
            <div
              class="w-16 h-16 rounded-full bg-muted flex items-center justify-center"
            >
              <svg siFileTextIcon class="size-8 text-muted-foreground"></svg>
            </div>
            <p class="text-sm text-muted-foreground">No PDF selected</p>
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
