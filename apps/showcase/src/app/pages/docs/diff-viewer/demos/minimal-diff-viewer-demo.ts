import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDiffViewer } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-minimal-diff-viewer-demo',
  imports: [ScDiffViewer],
  template: `
    <sc-diff-viewer
      [oldText]="oldText"
      [newText]="newText"
      [showHeader]="false"
      [showFooter]="false"
      [showSideHeaders]="false"
      [maxHeight]="'200px'"
    />
  `,
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
