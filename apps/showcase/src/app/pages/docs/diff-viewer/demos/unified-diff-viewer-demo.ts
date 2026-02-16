import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDiffViewer } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-unified-diff-viewer-demo',
  imports: [ScDiffViewer],
  template: `
    <sc-diff-viewer
      [oldText]="oldText"
      [newText]="newText"
      [oldTitle]="'Draft v1'"
      [newTitle]="'Draft v2'"
      [defaultViewMode]="'unified'"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnifiedDiffViewerDemo {
  oldText = `The quick brown fox jumps over the lazy dog.

This is the first paragraph of our document.
It contains some important information.

The second paragraph discusses other topics.`;

  newText = `The quick brown fox leaps over the lazy dog.

This is the first paragraph of our revised document.
It contains some important and updated information.

The second paragraph discusses additional topics.

A new third paragraph has been added.`;
}
