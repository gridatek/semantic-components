import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScDiffViewer,
  ScDiffViewerContent,
  ScDiffViewerLines,
  ScDiffViewerPane,
  ScDiffViewerSplit,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-minimal-diff-viewer-demo',
  imports: [
    ScDiffViewer,
    ScDiffViewerContent,
    ScDiffViewerSplit,
    ScDiffViewerPane,
    ScDiffViewerLines,
  ],
  template: `
    <div scDiffViewer [oldText]="oldText" [newText]="newText">
      <div scDiffViewerContent maxHeight="200px">
        <div scDiffViewerSplit>
          <div scDiffViewerPane side="old">
            <sc-diff-viewer-lines side="old" />
          </div>
          <div scDiffViewerPane side="new">
            <sc-diff-viewer-lines side="new" />
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalDiffViewerDemo {
  oldText = `Line 1
Line 2
Line 3`;

  newText = `Line 1
Modified Line 2
Line 3
New Line 4`;
}
