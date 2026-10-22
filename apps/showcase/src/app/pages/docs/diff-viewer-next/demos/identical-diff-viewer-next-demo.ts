import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockFooter,
  ScDiffViewerNext,
} from '@semantic-components/code';

/** identical(): nothing changed — show your own words. */
@Component({
  selector: 'app-identical-diff-viewer-next-demo',
  imports: [ScCodeBlock, ScDiffViewerNext, ScCodeBlockFooter],
  template: `
    <div scCodeBlock>
      <div
        scDiffViewerNext
        #diff="scDiffViewerNext"
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
export class IdenticalDiffViewerNextDemo {
  readonly text = `ng add @semantic-components/ui`;
}
