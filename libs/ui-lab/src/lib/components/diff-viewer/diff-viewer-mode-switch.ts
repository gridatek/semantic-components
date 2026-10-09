import { Directive, effect, inject } from '@angular/core';
import { ScToolbar } from '@semantic-components/ui';
import { DiffViewMode, SC_DIFF_VIEWER } from './diff-viewer';

@Directive({
  selector: 'div[scDiffViewerModeSwitch]',
  host: {},
})
export class ScDiffViewerModeSwitch {
  private readonly diffViewer = inject(SC_DIFF_VIEWER);
  private readonly toolbar = inject(ScToolbar);

  constructor() {
    this.toolbar.values.set([this.diffViewer.viewMode()]);

    effect(() => {
      const values = this.toolbar.values() as DiffViewMode[];
      if (values.length > 0) {
        this.diffViewer.viewMode.set(values[0]);
      }
    });
  }
}
