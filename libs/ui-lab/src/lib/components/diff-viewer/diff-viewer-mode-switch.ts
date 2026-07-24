import { Toolbar } from '@angular/aria/toolbar';
import { Directive, effect, inject } from '@angular/core';
import { DiffViewMode, SC_DIFF_VIEWER } from './diff-viewer';

@Directive({
  selector: 'div[scDiffViewerModeSwitch]',
  host: {},
})
export class ScDiffViewerModeSwitch {
  private readonly diffViewer = inject(SC_DIFF_VIEWER);
  private readonly toolbar = inject(Toolbar);

  constructor() {
    this.toolbar.value.set([this.diffViewer.viewMode()]);

    effect(() => {
      const values = this.toolbar.value() as DiffViewMode[];
      if (values.length > 0) {
        this.diffViewer.viewMode.set(values[0]);
      }
    });
  }
}
