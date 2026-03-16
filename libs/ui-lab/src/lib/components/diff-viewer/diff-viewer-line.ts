import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_DIFF_VIEWER } from './diff-viewer';

@Directive({
  selector: 'div[scDiffViewerLine]',
  host: {
    'data-slot': 'diff-viewer-line',
    '[class]': 'class()',
  },
})
export class ScDiffViewerLine {
  private readonly diffViewer = inject(SC_DIFF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly type = input.required<string>();

  protected readonly class = computed(() =>
    cn(this.diffViewer.getLineClass(this.type()), this.classInput()),
  );
}
