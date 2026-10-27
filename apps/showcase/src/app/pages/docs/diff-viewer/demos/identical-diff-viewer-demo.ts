import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockFooter,
} from '@semantic-components/ui/code-block';
import { ScDiffViewer } from '@semantic-components/ui/diff-viewer';

/** identical(): nothing changed — show your own words. */
@Component({
  selector: 'app-identical-diff-viewer-demo',
  imports: [ScCodeBlock, ScDiffViewer, ScCodeBlockFooter],
  template: `
    <div scCodeBlock>
      <div
        scDiffViewer
        #diff="scDiffViewer"
        [oldText]="text"
        [newText]="text"
      ></div>
      @if (diff.identical()) {
        <div scCodeBlockFooter>No differences.</div>
      }
    </div>
  `,
  host: { class: 'block w-full max-w-3xl' },
  encapsulation: ViewEncapsulation.None,
})
export class IdenticalDiffViewerDemo {
  readonly text = `ng add @semantic-components/ui`;
}
