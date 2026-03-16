import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_DIFF_VIEWER } from './diff-viewer';

@Component({
  selector: 'div[scDiffViewerLine]',
  template: `
    <ng-content />
  `,
  styles: `
    .word-added {
      background-color: rgba(34, 197, 94, 0.3);
      border-radius: 2px;
    }

    .word-removed {
      background-color: rgba(239, 68, 68, 0.3);
      border-radius: 2px;
    }
  `,
  host: {
    'data-slot': 'diff-viewer-line',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDiffViewerLine {
  private readonly diffViewer = inject(SC_DIFF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly type = input.required<string>();

  protected readonly class = computed(() =>
    cn(this.diffViewer.getLineClass(this.type()), this.classInput()),
  );
}
