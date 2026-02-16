import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDiffViewer } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-whitespace-diff-viewer-demo',
  imports: [ScDiffViewer],
  template: `
    <p class="text-sm text-muted-foreground mb-4">
      The following texts differ only in whitespace but are shown as identical.
    </p>
    <sc-diff-viewer
      [oldText]="'hello   world'"
      [newText]="'hello world'"
      [ignoreWhitespace]="true"
      [showFooter]="false"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhitespaceDiffViewerDemo {}
